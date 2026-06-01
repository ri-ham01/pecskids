"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserMenu } from "@/components/auth/user-menu";
import { Users, History, Heart, Settings } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatArabicDate } from "@/lib/utils";
import type { SentenceHistoryItem } from "@/types";

export default function DashboardPage() {
  const [history, setHistory] = useState<SentenceHistoryItem[]>([]);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => (r.ok ? r.json() : []))
      .then(setHistory)
      .catch(() => setHistory([]));
  }, []);

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">لوحة الوالدين</h1>
            <p className="mt-1 text-lg text-foreground/60">تتبع تواصل طفلك</p>
          </div>
          <UserMenu />
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, label: "ملفات الأطفال", href: "/dashboard/children" },
            { icon: Heart, label: "المفضلة", href: "/favorites" },
            { icon: Settings, label: "الإعدادات", href: "/settings" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="transition-shadow hover:shadow-calm-lg">
                <CardContent className="flex items-center gap-4 p-6">
                  <item.icon className="h-8 w-8 text-primary" />
                  <span className="text-xl font-semibold">{item.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-6 w-6" />
              سجل التواصل
            </CardTitle>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <p className="py-8 text-center text-lg text-foreground/60">
                لا يوجد سجل تواصل بعد
              </p>
            ) : (
              <ul className="space-y-3">
                {history.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-calm-lg border border-border p-4"
                  >
                    <span className="text-xl font-semibold">{item.sentenceAr}</span>
                    <span className="text-sm text-foreground/50">
                      {formatArabicDate(new Date(item.spokenAt))}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
