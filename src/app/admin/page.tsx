"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserMenu } from "@/components/auth/user-menu";
import { BarChart3, ImageIcon, FolderOpen, Users, MessageSquare, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DashboardStats } from "@/types";

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  const statCards = [
    { label: "الصور الرمزية", value: stats?.totalPictograms ?? "—", icon: ImageIcon },
    { label: "الفئات", value: stats?.totalCategories ?? "—", icon: FolderOpen },
    { label: "المستخدمون", value: stats?.totalUsers ?? "—", icon: Users },
    { label: "الجمل المسجلة", value: stats?.totalSentences ?? "—", icon: MessageSquare },
  ];

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">لوحة الإدارة</h1>
            <p className="mt-1 text-lg text-foreground/60">إدارة المنصة والمحتوى</p>
          </div>
          <UserMenu />
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-6">
                <stat.icon className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/admin/pictograms">
            <Button variant="default" size="lg" className="w-full">
              <ImageIcon className="h-6 w-6" aria-hidden />
              إدارة الصور الرمزية
            </Button>
          </Link>
          <Link href="/admin/pictograms/new">
            <Button variant="accent" size="lg" className="w-full">
              <Plus className="h-6 w-6" />
              إضافة صورة رمزية
            </Button>
          </Link>
        </div>

        {stats?.recentActivity && stats.recentActivity.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                النشاط الأخير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stats.recentActivity.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-calm border border-border p-3 text-lg"
                  >
                    {item.sentenceAr}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
