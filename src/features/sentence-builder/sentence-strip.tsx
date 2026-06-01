"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PictogramImage } from "@/components/pictogram/pictogram-image";
import type { PictogramItem } from "@/types";

interface SentenceStripProps {
  items: PictogramItem[];
  onRemove: (id: string) => void;
}

function SortableSentenceItem({
  item,
  onRemove,
}: {
  item: PictogramItem;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative flex flex-shrink-0 flex-col items-center gap-2 rounded-calm-lg bg-card p-3 shadow-calm",
        isDragging && "opacity-70 z-10"
      )}
      {...attributes}
      {...listeners}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
        aria-label={`حذف ${item.labelAr}`}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="relative h-20 w-20 overflow-hidden rounded-calm border-2 border-border/60 bg-white">
        <PictogramImage src={item.imageUrl} alt={item.labelAr} sizes="80px" />
      </div>
      <span className="text-base font-bold">{item.labelAr}</span>
    </div>
  );
}

export function SentenceStrip({ items, onRemove }: SentenceStripProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "sentence-area" });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[140px] rounded-calm-xl border-2 border-dashed p-4 transition-colors duration-300",
        isOver ? "border-primary bg-primary/5" : "border-border bg-card/50",
        items.length === 0 && "flex items-center justify-center"
      )}
      aria-label="منطقة بناء الجملة"
      aria-dropeffect="move"
    >
      {items.length === 0 ? (
        <p className="text-xl text-foreground/40">اسحب الصور هنا لبناء جملة</p>
      ) : (
        <SortableContext items={items.map((i) => i.id)} strategy={horizontalListSortingStrategy}>
          <div className="sentence-strip">
            {items.map((item) => (
              <SortableSentenceItem key={item.id} item={item} onRemove={onRemove} />
            ))}
          </div>
        </SortableContext>
      )}
    </div>
  );
}
