import { Agent } from "@/types/agent";

/**
 * Simulates an API call to fetch agents data
 * This function includes a network delay to mimic real-world conditions
 */
export async function fetchAgentsData(): Promise<Agent[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const mockAgents = await import("@/data/mock-agents.json");

    // Validate the data structure
    const agents = mockAgents.default as Agent[];

    if (!Array.isArray(agents)) {
      throw new Error("Invalid agents data format");
    }

    // Validate each agent has required fields
    agents.forEach((agent, index) => {
      if (
        !agent.id ||
        !agent.name ||
        !agent.description ||
        !agent.status ||
        !agent.category ||
        !agent.pricingModel
      ) {
        throw new Error(
          `Invalid agent data at index ${index}: missing required fields`
        );
      }
    });

    console.log(`Successfully fetched ${agents.length} agents`);
    return agents;
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    throw new Error("Failed to load agents data");
  }
}

/**
 * Fetches agents data specifically for server-side rendering
 * This ensures the data is available during initial page load
 */
export async function getServerSideAgents(): Promise<Agent[]> {
  try {
    const agents = await fetchAgentsData();
    console.log(`Server-side fetched ${agents} agents`);
    return agents;
  } catch (error) {
    console.error("Server-side agent fetch failed:", error);
    // Return empty array as fallback to prevent page crash
    return [];
  }
}
