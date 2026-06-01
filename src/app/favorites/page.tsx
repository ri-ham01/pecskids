"use client";

import { Volume2, Trash2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useArabicTTS } from "@/hooks/use-arabic-tts";
import { useFavoritesStore } from "@/stores/favorites-store";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const { speak } = useArabicTTS();

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold text-foreground">المفضلة</h1>
        {favorites.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-2xl text-foreground/60">لا توجد جمل محفوظة بعد</p>
            <p className="mt-2 text-lg text-foreground/40">
              أنشئ جملة واحفظها من صفحة إنشاء الجمل
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((fav) => (
              <Card key={fav.id}>
                <CardContent className="flex items-center justify-between gap-4 p-6">
                  <p className="text-2xl font-bold text-foreground">{fav.sentenceAr}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => speak(fav.sentenceAr)}
                      aria-label="تحدث"
                    >
                      <Volume2 className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFavorite(fav.id)}
                      aria-label="حذف"
                    >
                      <Trash2 className="h-6 w-6" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
