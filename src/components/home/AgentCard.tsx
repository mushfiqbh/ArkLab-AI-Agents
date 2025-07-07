"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Agent } from "@/types/agent";
import { useAppDispatch } from "@/hooks/redux";
import { setSelectedAgent } from "@/store/agentSlice";
import { getStatusColor, getPricingColor } from "@/lib/badgeColor";

interface AgentCardProps {
  agent: Agent;
  index: number;
}

export function AgentCard({ agent, index }: AgentCardProps) {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        scale: 1.03,
        y: -4,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
      className="h-full group"
    >
      <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 overflow-hidden relative bg-gradient-to-br from-white/90 via-white/70 to-slate-50/80 dark:from-slate-800/90 dark:via-slate-800/70 dark:to-slate-900/80 backdrop-blur-enhanced card-glow card-shine card-float border border-slate-200/50 hover:border-slate-300/80 dark:border-slate-700/30 dark:hover:border-slate-600/50">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 animated-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top accent gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(59,130,246,0.4) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Corner accent */}
        <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-start gap-4">
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm relative overflow-hidden bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/10">
                {/* Avatar background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-base font-bold text-primary relative z-10">
                  {agent.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-3">
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {agent.name}
                </CardTitle>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Badge
                    className={`${getStatusColor(
                      agent.status
                    )} text-xs flex-shrink-0 ml-2 border shadow-sm font-medium backdrop-blur-sm`}
                  >
                    {agent.status}
                  </Badge>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <CardDescription className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {agent.description}
                </CardDescription>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <div className="flex flex-col justify-end pt-0 pb-2 mt-auto relative z-10">
          <CardContent className="pt-0 pb-2 relative z-10">
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <div className="flex flex-col items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-white/80 via-slate-50/60 to-white/40 dark:from-slate-700/60 dark:via-slate-800/40 dark:to-slate-700/30 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex-shrink-0 shadow-sm" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Category:
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-white/90 dark:bg-slate-800/90 border-slate-300/60 dark:border-slate-600/60 backdrop-blur-sm"
                  >
                    {agent.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 shadow-sm" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Pricing:
                  </span>
                  <Badge
                    className={`${getPricingColor(
                      agent.pricingModel
                    )} text-xs border shadow-sm font-medium backdrop-blur-sm`}
                  >
                    {agent.pricingModel}
                  </Badge>
                </div>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter className="pt-1 pb-0 relative z-10">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full transition-all duration-300 hover:opacity-80 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white group-hover:shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-none text-slate-700 dark:text-slate-300 font-medium shadow-sm"
                onClick={() => dispatch(setSelectedAgent(agent))}
              >
                <span className="flex items-center gap-2">
                  View Details
                  <motion.span
                    className="text-xs opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                    initial={{ x: -2 }}
                    animate={{ x: 0 }}
                  >
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
