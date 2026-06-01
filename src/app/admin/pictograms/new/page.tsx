"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { AddPictogramForm } from "@/features/admin/add-pictogram-form";

export default function NewPictogramPage() {
  return (
    <AppShell>
      <div className="container mx-auto max-w-xl px-4 py-6">
        <Link href="/admin/pictograms" className="mb-6 inline-flex items-center gap-2 text-primary">
          <ArrowRight className="h-5 w-5" />
          العودة
        </Link>

        <h1 className="mb-6 text-3xl font-bold">إضافة صورة رمزية</h1>
        <AddPictogramForm redirectTo="/admin/pictograms" />
      </div>
    </AppShell>
  );
}
