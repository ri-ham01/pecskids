"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { isClerkConfigured } from "@/lib/clerk-config";

const ClerkUserButton = dynamic(
  () => import("@clerk/nextjs").then((m) => m.UserButton),
  { ssr: false }
);

export function UserMenu() {
  if (!isClerkConfigured()) {
    return (
      <Link href="/sign-in">
        <Button variant="outline" size="sm">
          تسجيل الدخول
        </Button>
      </Link>
    );
  }

  return <ClerkUserButton afterSignOutUrl="/" />;
}
