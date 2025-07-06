export interface Agent {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Beta" | "Archived";
  category: string;
  pricingModel: "Subscription" | "Per-Use" | "Free Tier";
}

export interface AgentState {
  agents: Agent[];
  loading: boolean;
  selectedAgent: Agent | null;
}
