"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { arSA } from "@clerk/localizations";
import { isClerkConfigured } from "@/lib/clerk-config";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured()) {
    return <>{children}</>;
  }

  return <ClerkProvider localization={arSA}>{children}</ClerkProvider>;
}
