"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { PictogramGrid } from "@/components/pictogram/pictogram-grid";
import { CategoryFilter } from "@/components/pictogram/category-filter";
import { usePictograms } from "@/hooks/use-pictograms";
import { useArabicTTS } from "@/hooks/use-arabic-tts";
import type { PictogramItem } from "@/types";

export default function BoardPage() {
  const {
    filteredPictograms,
    categories,
    selectedCategory,
    setSelectedCategory,
    isLoading,
  } = usePictograms();
  const { speak } = useArabicTTS();

  const handleSelect = useCallback(
    (item: PictogramItem) => {
      speak(item.labelAr);
    },
    [speak]
  );

  return (
    <AppShell showFooter={false}>
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="mb-2 text-3xl font-bold text-foreground">لوحة التواصل</h1>
          <p className="mb-6 text-lg text-foreground/60">
            اضغط على أي صورة للتحدث فوراً
          </p>
          <CategoryFilter
            categories={categories}
            selectedId={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <div className="mt-6">
            {isLoading ? (
              <div className="flex justify-center py-16">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <PictogramGrid
                pictograms={filteredPictograms}
                onSelect={handleSelect}
                isDraggable={false}
              />
            )}
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}
