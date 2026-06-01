"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import { useSentenceStore } from "@/stores/sentence-store";
import { useArabicTTS } from "@/hooks/use-arabic-tts";
import { usePictograms } from "@/hooks/use-pictograms";
import { SentenceStrip } from "./sentence-strip";
import { SentenceActions } from "./sentence-actions";
import { PictogramGrid } from "@/components/pictogram/pictogram-grid";
import { CategoryFilter } from "@/components/pictogram/category-filter";
import { SearchBar } from "@/components/pictogram/search-bar";
import { PictogramCard } from "@/components/pictogram/pictogram-card";
import { useFavoritesStore } from "@/stores/favorites-store";
import type { PictogramItem } from "@/types";

export function SentenceBuilder() {
  const { items, addItem, removeItem, clearItems, reorderItems, getSentenceText } =
    useSentenceStore();
  const { speak, isSpeaking } = useArabicTTS();
  const {
    filteredPictograms,
    categories,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
    isLoading,
  } = usePictograms();

  const [activeDrag, setActiveDrag] = useState<PictogramItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const addFavorite = useFavoritesStore((s) => s.addFavorite);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current as PictogramItem;
    setActiveDrag(data);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDrag(null);
    const { active, over } = event;

    if (!over) return;

    const draggedItem = active.data.current as PictogramItem;

    if (over.id === "sentence-area") {
      addItem(draggedItem);
      return;
    }

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      reorderItems(oldIndex, newIndex);
    } else if (oldIndex === -1) {
      addItem(draggedItem);
    }
  };

  const handleSpeak = useCallback(() => {
    const text = getSentenceText();
    if (text) speak(text);
  }, [getSentenceText, speak]);

  const handleSave = async () => {
    const text = getSentenceText();
    if (!text) return;
    setIsSaving(true);
    try {
      addFavorite({
        sentenceAr: text,
        pictogramIds: items.map((i) => i.id),
      });
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sentenceAr: text,
          pictogramIds: items.map((i) => i.id),
        }),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelect = (item: PictogramItem) => addItem(item);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-6">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
          aria-label="منطقة الجملة"
        >
          <h2 className="text-2xl font-bold text-foreground">جملتي</h2>
          {items.length > 0 && (
            <p
              className="rounded-calm-lg bg-primary/10 px-4 py-3 text-2xl font-bold text-primary"
              aria-live="polite"
            >
              {getSentenceText()}
            </p>
          )}
          <SentenceStrip items={items} onRemove={removeItem} />
          <SentenceActions
            onSpeak={handleSpeak}
            onClear={clearItems}
            onSave={handleSave}
            isSpeaking={isSpeaking}
            hasItems={items.length > 0}
            isSaving={isSaving}
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4"
          aria-label="مكتبة الصور"
        >
          <h2 className="text-2xl font-bold text-foreground">اختر صورة</h2>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            selectedId={selectedCategory}
            onSelect={setSelectedCategory}
          />
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <PictogramGrid
              pictograms={filteredPictograms}
              onSelect={handleSelect}
            />
          )}
        </motion.section>
      </div>

      <DragOverlay>
        {activeDrag ? (
          <PictogramCard pictogram={activeDrag} isDraggable={false} className="shadow-calm-lg" />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
