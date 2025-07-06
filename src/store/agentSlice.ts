import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Agent, AgentFilters, AgentState } from "@/types/agent";
import { fetchAgentsData } from "@/lib/data-fetching";

export const fetchAgents = createAsyncThunk("agents/fetchAgents", async () => {
  // Use the centralized data fetching utility
  return fetchAgentsData();
});

const initialState: AgentState = {
  agents: [],
  filteredAgents: [],
  filters: {
    search: "",
    status: [],
    category: [],
    pricingModel: "",
  },
  loading: false,
  selectedAgent: null,
};

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<Agent[]>) => {
      state.agents = action.payload;
      state.filteredAgents = filterAgents(action.payload, state.filters);
    },
    initializeAgents: (state, action: PayloadAction<Agent[]>) => {
      // Only set agents if not already initialized
      if (state.agents.length === 0) {
        state.agents = action.payload;
        state.filteredAgents = filterAgents(action.payload, state.filters);
      }
    },
    setFilters: (state, action: PayloadAction<Partial<AgentFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredAgents = filterAgents(state.agents, state.filters);
    },
    setSelectedAgent: (state, action: PayloadAction<Agent | null>) => {
      state.selectedAgent = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        status: [],
        category: [],
        pricingModel: "",
      };
      state.filteredAgents = state.agents;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
        state.filteredAgents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Helper function to filter agents
function filterAgents(agents: Agent[], filters: AgentFilters): Agent[] {
  return agents.filter((agent) => {
    const matchesSearch =
      filters.search === "" ||
      agent.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      agent.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(agent.status);
    const matchesCategory =
      filters.category.length === 0 ||
      filters.category.includes(agent.category);
    const matchesPricing =
      filters.pricingModel === "" ||
      agent.pricingModel === filters.pricingModel;

    return matchesSearch && matchesStatus && matchesCategory && matchesPricing;
  });
}

export const {
  setAgents,
  initializeAgents,
  setFilters,
  setSelectedAgent,
  clearFilters,
} = agentSlice.actions;
export default agentSlice.reducer;
