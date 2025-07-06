"use client";

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

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const dispatch = useAppDispatch();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      case "Beta":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "Archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  const getPricingColor = (pricingModel: string) => {
    switch (pricingModel) {
      case "Free Tier":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "Subscription":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      case "Per-Use":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <div className="h-full">
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:border-primary/30 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {agent.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg font-semibold line-clamp-2">
                  {agent.name}
                </CardTitle>
                <div>
                  <Badge
                    className={`${getStatusColor(
                      agent.status
                    )} text-xs flex-shrink-0 ml-2 border`}
                  >
                    {agent.status}
                  </Badge>
                </div>
              </div>
              <div>
                <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                  {agent.description}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Category:</span>
              <Badge variant="outline" className="text-xs">
                {agent.category}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Pricing:</span>
              <Badge
                className={`${getPricingColor(
                  agent.pricingModel
                )} text-xs border`}
              >
                {agent.pricingModel}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="w-full">
            <Button
              variant="outline"
              className="w-full transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              onClick={() => dispatch(setSelectedAgent(agent))}
            >
              View Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
