"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PictogramGrid } from "@/components/pictogram/pictogram-grid";
import { CategoryFilter } from "@/components/pictogram/category-filter";
import { SearchBar } from "@/components/pictogram/search-bar";
import { usePictograms } from "@/hooks/use-pictograms";
import { useSentenceStore } from "@/stores/sentence-store";

export default function LibraryPage() {
  const {
    filteredPictograms,
    categories,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
    isLoading,
  } = usePictograms();
  const addItem = useSentenceStore((s) => s.addItem);

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold text-foreground">مكتبة الصور الرمزية</h1>
        <div className="mb-6 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            selectedId={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <PictogramGrid pictograms={filteredPictograms} onSelect={addItem} />
        )}
      </div>
    </AppShell>
  );
}
