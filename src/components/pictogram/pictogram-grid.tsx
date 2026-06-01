"use client";

import { PictogramCard } from "./pictogram-card";
import type { PictogramItem } from "@/types";

interface PictogramGridProps {
  pictograms: PictogramItem[];
  onSelect?: (item: PictogramItem) => void;
  isDraggable?: boolean;
}

export function PictogramGrid({ pictograms, onSelect, isDraggable = true }: PictogramGridProps) {
  if (pictograms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-2xl text-foreground/60">لا توجد صور رمزية</p>
        <p className="mt-2 text-lg text-foreground/40">جرب البحث أو تغيير الفئة</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      role="list"
      aria-label="مكتبة الصور الرمزية"
    >
      {pictograms.map((pictogram) => (
        <div key={pictogram.id} role="listitem">
          <PictogramCard
            pictogram={pictogram}
            onClick={() => onSelect?.(pictogram)}
            isDraggable={isDraggable}
          />
        </div>
      ))}
    </div>
  );
}
