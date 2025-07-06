import { AgentsPage } from "@/components/home/AgentsPage";
import { getServerSideAgents } from "@/lib/data-fetching";

export default async function Home() {
  // Server-side data fetching
  const agents = await getServerSideAgents();

  return <AgentsPage initialAgents={agents} />;
}
