"use client";

import { useSettingsStore } from "@/stores/settings-store";
import { cn } from "@/lib/utils";
import { Header } from "./header";
import { Footer } from "./footer";

interface AppShellProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function AppShell({ children, showFooter = true }: AppShellProps) {
  const { highContrast, reduceMotion, largeText, darkMode } = useSettingsStore();

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col",
        darkMode && "dark",
        highContrast && "high-contrast",
        reduceMotion && "reduce-motion",
        largeText && "large-text"
      )}
    >
      <Header />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
