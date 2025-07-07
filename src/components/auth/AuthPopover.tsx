"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { User, LogOut } from "lucide-react";

export function AuthPopover() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignIn = () => {
    signIn("google");
  };

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={session ? "ghost" : "outline"}
          size="sm"
          className="relative"
        >
          {session?.user ? (
            <div className="flex items-center gap-2">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
              <span className="hidden sm:inline max-w-20 truncate">
                {session.user.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-72 p-4"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        {session?.user ? (
          <div className="flex flex-col items-center gap-3">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            <div className="text-center">
              <div className="font-semibold">{session.user.name}</div>
              <div className="text-sm text-muted-foreground">
                {session.user.email}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className="font-semibold text-lg mb-2">
                Welcome to ArkLab AI
              </div>
              <p className="text-sm text-muted-foreground">
                Sign in to access your personalized AI agent catalog
              </p>
            </div>
            {status === "loading" ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : (
              <Button
                onClick={handleSignIn}
                className="w-full"
                size="lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </Button>
            )}
            <div className="text-xs text-muted-foreground text-center">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
