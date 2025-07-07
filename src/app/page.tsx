import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Footer } from "@/components/general/Footer";
import { Header } from "@/components/general/Header";
import { AgentsPage } from "@/components/home/AgentsPage";
import { getServerSideAgents } from "@/lib/data-fetching";
import { getMetadataFromSearchParams } from "@/lib/metadata";
import { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  // Fetch agents data to calculate filtered counts
  const agents = await getServerSideAgents();

  // Await searchParams before using it
  const resolvedSearchParams = await searchParams;

  const urlSearchParams = new URLSearchParams();
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        urlSearchParams.set(key, value.join(","));
      } else {
        urlSearchParams.set(key, value);
      }
    }
  });

  return getMetadataFromSearchParams(urlSearchParams, agents);
}

export default async function Home() {
  // Server-side data fetching
  const agents = await getServerSideAgents();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProtectedRoute requireAuth={true}>
        <AgentsPage initialAgents={agents} />
      </ProtectedRoute>
      <Footer />
    </main>
  );
}
