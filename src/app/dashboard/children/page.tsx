"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettingsStore } from "@/stores/settings-store";

interface LocalChild {
  id: string;
  name: string;
}

export default function ChildrenPage() {
  const [children, setChildren] = useState<LocalChild[]>([
    { id: "local-1", name: "طفلي" },
  ]);
  const [newName, setNewName] = useState("");
  const setActiveChildId = useSettingsStore((s) => s.setActiveChildId);
  const activeChildId = useSettingsStore((s) => s.activeChildId);

  const handleAdd = () => {
    if (!newName.trim()) return;
    const child = { id: `local-${Date.now()}`, name: newName.trim() };
    setChildren((prev) => [...prev, child]);
    setNewName("");
  };

  return (
    <AppShell>
      <div className="container mx-auto max-w-2xl px-4 py-6">
        <Link href="/dashboard" className="mb-6 inline-flex items-center gap-2 text-primary">
          <ArrowRight className="h-5 w-5" />
          العودة للوحة التحكم
        </Link>

        <h1 className="mb-6 text-3xl font-bold">ملفات الأطفال</h1>

        <Card className="mb-6">
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="child-name">اسم الطفل</Label>
              <Input
                id="child-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="أدخل اسم الطفل"
              />
            </div>
            <Button onClick={handleAdd} className="w-full">
              <Plus className="h-5 w-5" />
              إضافة طفل
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {children.map((child) => (
            <Card
              key={child.id}
              className={activeChildId === child.id ? "ring-2 ring-primary" : ""}
            >
              <CardContent className="flex items-center justify-between p-6">
                <span className="text-xl font-bold">{child.name}</span>
                <Button
                  variant={activeChildId === child.id ? "default" : "outline"}
                  onClick={() => setActiveChildId(child.id)}
                >
                  {activeChildId === child.id ? "نشط" : "تفعيل"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
