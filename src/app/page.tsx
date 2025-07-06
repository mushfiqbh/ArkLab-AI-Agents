import { getServerSideAgents } from "@/lib/data-fetching";

export default async function Home() {
  // Test server-side data fetching
  const agents = await getServerSideAgents();
  console.log(`Server-side fetched ${agents.length} agents`);

  return (
    <div>
      <h1>Welcome to ArkLab AI Agents Catalog</h1>
      <p>
        Explore our collection of AI agents designed to streamline your business
        operations.
      </p>
    </div>
  );
}
