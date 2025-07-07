"use client";

import { ThemeToggle } from "./ThemeToggle";
import { AuthPopover } from "../auth/AuthPopover";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">ArkLab AI Agents</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AuthPopover />
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
}
