"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CategoryItem } from "@/types";

interface CategoryFilterProps {
  categories: CategoryItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function CategoryFilter({ categories, selectedId, onSelect }: CategoryFilterProps) {
  return (
    <div
      className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
      role="tablist"
      aria-label="فئات الصور الرمزية"
    >
      <Button
        variant={selectedId === null ? "default" : "secondary"}
        size="sm"
        onClick={() => onSelect(null)}
        role="tab"
        aria-selected={selectedId === null}
        className="flex-shrink-0"
      >
        الكل
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selectedId === cat.id ? "default" : "secondary"}
          size="sm"
          onClick={() => onSelect(cat.id)}
          role="tab"
          aria-selected={selectedId === cat.id}
          className={cn("flex-shrink-0")}
          style={
            selectedId === cat.id
              ? { backgroundColor: cat.color, borderColor: cat.color }
              : undefined
          }
        >
          {cat.nameAr}
        </Button>
      ))}
    </div>
  );
}
