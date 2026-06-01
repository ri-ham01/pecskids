import { AppShell } from "@/components/layout/app-shell";
import { SentenceBuilder } from "@/features/sentence-builder/sentence-builder";

export const metadata = {
  title: "إنشاء الجمل",
};

export default function BuilderPage() {
  return (
    <AppShell showFooter={false}>
      <div className="container mx-auto px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold text-foreground">إنشاء الجمل</h1>
        <SentenceBuilder />
      </div>
    </AppShell>
  );
}
