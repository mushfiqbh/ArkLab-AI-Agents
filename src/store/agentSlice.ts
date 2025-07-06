import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Agent, AgentState } from "@/types/agent";
import { fetchAgentsData } from "@/lib/data-fetching";

export const fetchAgents = createAsyncThunk("agents/fetchAgents", async () => {
  // Use the centralized data fetching utility
  return fetchAgentsData();
});

const initialState: AgentState = {
  agents: [],
  loading: false,
  selectedAgent: null,
};

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<Agent[]>) => {
      state.agents = action.payload;
    },
    initializeAgents: (state, action: PayloadAction<Agent[]>) => {
      // Only set agents if not already initialized
      if (state.agents.length === 0) {
        state.agents = action.payload;
      }
    },
    setSelectedAgent: (state, action: PayloadAction<Agent | null>) => {
      state.selectedAgent = action.payload;
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
      })
      .addCase(fetchAgents.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setAgents, initializeAgents, setSelectedAgent } =
  agentSlice.actions;
export default agentSlice.reducer;
