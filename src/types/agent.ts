export interface Agent {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Beta" | "Archived";
  category: string;
  pricingModel: "Subscription" | "Per-Use" | "Free Tier";
}

export interface AgentFilters {
  search: string;
  status: string[];
  category: string[];
  pricingModel: string;
}

export interface AgentState {
  agents: Agent[];
  filteredAgents: Agent[];
  filters: AgentFilters;
  loading: boolean;
  selectedAgent: Agent | null;
}
