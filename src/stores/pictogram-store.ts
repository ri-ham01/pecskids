import { create } from "zustand";
import type { CategoryItem, PictogramItem } from "@/types";

interface PictogramState {
  pictograms: PictogramItem[];
  categories: CategoryItem[];
  selectedCategory: string | null;
  searchQuery: string;
  isLoading: boolean;
  setPictograms: (items: PictogramItem[]) => void;
  setCategories: (items: CategoryItem[]) => void;
  setSelectedCategory: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  getFilteredPictograms: () => PictogramItem[];
}

export const usePictogramStore = create<PictogramState>((set, get) => ({
  pictograms: [],
  categories: [],
  selectedCategory: null,
  searchQuery: "",
  isLoading: false,
  setPictograms: (items) => set({ pictograms: items }),
  setCategories: (items) => set({ categories: items }),
  setSelectedCategory: (id) => set({ selectedCategory: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ isLoading: loading }),
  getFilteredPictograms: () => {
    const { pictograms, selectedCategory, searchQuery } = get();
    return pictograms.filter((p) => {
      const matchesCategory = !selectedCategory || p.categoryId === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        p.labelAr.includes(searchQuery) ||
        p.keywords?.some((k) => k.includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
  },
}));
