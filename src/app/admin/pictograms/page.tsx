"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PictogramItem } from "@/types";

export default function AdminPictogramsPage() {
  const [pictograms, setPictograms] = useState<PictogramItem[]>([]);

  useEffect(() => {
    fetch("/api/admin/pictograms")
      .then((r) => (r.ok ? r.json() : []))
      .then(setPictograms)
      .catch(() => setPictograms([]));
  }, []);

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center gap-2 text-primary">
            <ArrowRight className="h-5 w-5" />
            العودة
          </Link>
          <Link href="/admin/pictograms/new">
            <Button>
              <Plus className="h-5 w-5" />
              إضافة جديد
            </Button>
          </Link>
        </div>

        <h1 className="mb-6 text-3xl font-bold">إدارة الصور الرمزية</h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pictograms.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-calm">
                  <Image src={p.imageUrl} alt={p.labelAr} fill className="object-cover" />
                </div>
                <span className="text-lg font-bold">{p.labelAr}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
