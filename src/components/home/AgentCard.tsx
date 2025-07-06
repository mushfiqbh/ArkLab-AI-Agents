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
import { getStatusColor, getPricingColor } from "@/lib/badgeColor";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const dispatch = useAppDispatch();

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
