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
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="text-center mb-8"
      >
        <motion.h1
          className="text-4xl font-bold text-foreground mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          AI Agents Catalog
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Discover and explore our comprehensive collection of AI agents
          designed to streamline your business operations
        </motion.p>
      </motion.div>

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
  );
}
