"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { initializeAgents } from "@/store/agentSlice";
import { AgentCard } from "@/components/home/AgentCard";
import { LoadingSpinner } from "@/components/general/LoadingSpinner";
import { Agent } from "@/types/agent";
import { AgentDetailsModal } from "./AgentDetailsModal";
import { AgentFilters } from "./AgentFilters";
import { motion } from "framer-motion";
import AgentHero from "./AgentHero";

interface AgentsPageProps {
  initialAgents: Agent[];
}

export function AgentsPage({ initialAgents }: AgentsPageProps) {
  const dispatch = useAppDispatch();
  const { filteredAgents, loading } = useAppSelector((state) => state.agents);
  const initializedRef = useRef(false);
  const [viewType, setViewType] = useState("Grid");

  useEffect(() => {
    // Only initialize agents once
    if (!initializedRef.current && initialAgents.length > 0) {
      dispatch(initializeAgents(initialAgents));
      initializedRef.current = true;
    }
  }, [dispatch, initialAgents]);

  // Use filteredAgents if store is initialized, otherwise use initialAgents for SSR
  const agentsToRender = initializedRef.current
    ? filteredAgents
    : initialAgents;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden">
      {/* Enhanced Hero Section */}
      <AgentHero />

      <div className="container mx-auto px-4 pb-8 relative z-10">
        {/* Background blur effect for content section */}
        <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm rounded-t-3xl -top-8" />

        <div className="relative z-20">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <AgentFilters />
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
          >
            <motion.p
              key={agentsToRender.length} // Re-animate when count changes
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Showing {agentsToRender.length} of {initialAgents.length} agents
            </motion.p>

            <motion.div
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
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
            </motion.div>
          </motion.div>

          {/* Agents Grid / List */}
          <motion.div
            key={agentsToRender.length} // This will trigger re-animation when filter results change
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {agentsToRender.length > 0 ? (
              <motion.div
                className={`gap-4 sm:gap-6 ${
                  viewType === "Grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "w-full lg:w-2/3 mx-auto flex flex-col"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {agentsToRender.map((agent, index) => (
                  <AgentCard key={agent.id} agent={agent} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
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
              </motion.div>
            )}
          </motion.div>

          {/* Agent Details Modal */}
          <AgentDetailsModal />
        </div>
      </div>
    </div>
  );
}
