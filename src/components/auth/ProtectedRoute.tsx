"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Lock, User, Sparkles } from "lucide-react";
import { AuthPopover } from "./AuthPopover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  requireAuth = false,
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();

  // If no authentication is required, render children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Show loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show authentication required message
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center min-h-[60vh]"
        >
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Authentication Required
              </CardTitle>
              <p className="text-muted-foreground">
                Please sign in to access the AI Agent Catalog
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span>Discover powerful AI solutions</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Personalized recommendations</span>
              </div>
              <div className="flex justify-center">
                <AuthPopover />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
}
