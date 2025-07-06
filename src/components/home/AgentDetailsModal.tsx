"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedAgent } from "@/store/agentSlice";
import { getStatusColor, getPricingColor } from "@/lib/badgeColor";

export function AgentDetailsModal() {
  const dispatch = useAppDispatch();
  const { selectedAgent } = useAppSelector((state) => state.agents);

  if (!selectedAgent) return null;

  return (
    <Dialog
      open={!!selectedAgent}
      onOpenChange={(open) => !open && dispatch(setSelectedAgent(null))}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold mb-2">
                {selectedAgent.name}
              </DialogTitle>
              <div className="flex gap-2 mb-3">
                <Badge className={getStatusColor(selectedAgent.status)}>
                  {selectedAgent.status}
                </Badge>
                <Badge variant="outline">{selectedAgent.category}</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <DialogDescription className="text-base leading-relaxed">
              {selectedAgent.description}
            </DialogDescription>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Agent ID</h4>
              <p className="text-sm text-muted-foreground font-mono">
                {selectedAgent.id}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Pricing Model</h4>
              <Badge className={getPricingColor(selectedAgent.pricingModel)}>
                {selectedAgent.pricingModel}
              </Badge>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex gap-2">
              <Button className="flex-1">Get Started</Button>
              <Button variant="outline" className="flex-1">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
