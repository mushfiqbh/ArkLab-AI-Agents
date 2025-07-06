"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { initializeAgents } from "@/store/agentSlice";
import { AgentCard } from "@/components/home/AgentCard";
import { LoadingSpinner } from "@/components/general/LoadingSpinner";
import { Agent } from "@/types/agent";
import { AgentDetailsModal } from "./AgentDetailsModal";

interface AgentsPageProps {
  initialAgents: Agent[];
}

export function AgentsPage({ initialAgents }: AgentsPageProps) {
  const { loading } = useAppSelector((state) => state.agents);
  const dispatch = useAppDispatch();
  const [viewType, setViewType] = useState("Grid");

  useEffect(() => {
    // Only initialize agents once
    if (initialAgents.length > 0) {
      dispatch(initializeAgents(initialAgents));
    }
  }, [dispatch, initialAgents]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI Agents Catalog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover and explore our comprehensive collection of AI agents
          designed to streamline your business operations
        </p>
      </div>

      {/* Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p
          key={initialAgents.length} // Re-animate when count changes
          className="text-sm text-muted-foreground"
        >
          Showing {initialAgents.length} of {initialAgents.length} agents
        </p>

        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="hidden sm:inline">View:</span>
          <Button
            onClick={() => setViewType("Grid")}
            size="sm"
            className={`h-8 px-3 transition-all duration-200 ${
              viewType === "Grid"
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            Grid
          </Button>

          <Button
            onClick={() => setViewType("List")}
            size="sm"
            className={`h-8 px-3 transition-all duration-200 ${
              viewType === "List"
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            List
          </Button>
        </div>
      </div>

      {/* Agents Grid / List */}
      <div
        key={initialAgents.length} // This will trigger re-animation when filter results change
      >
        {initialAgents.length > 0 ? (
          <div
            className={`gap-4 sm:gap-6 ${
              viewType === "Grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "w-full lg:w-2/3 mx-auto flex flex-col"
            }`}
          >
            {initialAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <p className="text-lg font-medium mb-2">No agents found</p>
              <p className="text-sm">
                Try adjusting your filters or search terms to find what
                you&apos;re looking for
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Agent Details Modal */}
      <AgentDetailsModal />
    </div>
  );
}
