"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PictogramImage } from "./pictogram-image";
import type { PictogramItem } from "@/types";

interface PictogramCardProps {
  pictogram: PictogramItem;
  onClick?: () => void;
  isDraggable?: boolean;
  isInSentence?: boolean;
  className?: string;
}

export function PictogramCard({
  pictogram,
  onClick,
  isDraggable = true,
  isInSentence = false,
  className,
}: PictogramCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: pictogram.id,
    data: pictogram,
    disabled: !isDraggable,
  });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <motion.button
      ref={setNodeRef}
      style={style}
      {...(isDraggable ? { ...listeners, ...attributes } : {})}
      type="button"
      onClick={onClick}
      whileHover={isDragging ? undefined : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "calm-card flex flex-col items-center gap-3 p-4 touch-target w-full bg-white",
        "focus-visible:ring-2 focus-visible:ring-primary",
        isDragging && "opacity-50 shadow-calm-lg z-50",
        isInSentence && "min-w-[120px] flex-shrink-0",
        className
      )}
      aria-label={`صورة رمزية: ${pictogram.labelAr}`}
    >
      <div className="relative h-28 w-28 overflow-hidden rounded-calm-lg border-2 border-border/60 bg-white sm:h-32 sm:w-32">
        <PictogramImage
          src={pictogram.imageUrl}
          alt={pictogram.labelAr}
          sizes="(max-width: 640px) 112px, 128px"
        />
      </div>
      <span className="text-center text-lg font-bold text-foreground sm:text-xl">
        {pictogram.labelAr}
      </span>
    </motion.button>
  );
}
