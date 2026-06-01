"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { APP_NAME_AR, NAV_ITEMS } from "@/utils/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto flex min-h-16 items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="الصفحة الرئيسية">
          <div className="flex h-12 w-12 items-center justify-center rounded-calm-lg bg-primary text-2xl text-white">
            🗣️
          </div>
          <span className="text-xl font-bold text-foreground">{APP_NAME_AR}</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="التنقل الرئيسي">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                size="sm"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-border/50 bg-card md:hidden"
          aria-label="قائمة الجوال"
        >
          <div className="container mx-auto flex flex-col gap-2 p-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={cn("w-full justify-start", pathname === item.href && "bg-primary")}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </motion.nav>
      )}
    </header>
  );
}
