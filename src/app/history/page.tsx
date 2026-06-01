"use client";

import { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useArabicTTS } from "@/hooks/use-arabic-tts";
import { formatArabicDate } from "@/lib/utils";
import type { SentenceHistoryItem } from "@/types";

export default function HistoryPage() {
  const [history, setHistory] = useState<SentenceHistoryItem[]>([]);
  const { speak } = useArabicTTS();

  useEffect(() => {
    fetch("/api/history")
      .then((r) => (r.ok ? r.json() : []))
      .then(setHistory)
      .catch(() => setHistory([]));
  }, []);

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold text-foreground">سجل التواصل</h1>
        {history.length === 0 ? (
          <p className="py-16 text-center text-2xl text-foreground/60">
            لا يوجد سجل بعد
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <p className="text-2xl font-bold">{item.sentenceAr}</p>
                    <p className="mt-1 text-sm text-foreground/50">
                      {formatArabicDate(new Date(item.spokenAt))}
                    </p>
                  </div>
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => speak(item.sentenceAr)}
                    aria-label="تحدث"
                  >
                    <Volume2 className="h-6 w-6" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
