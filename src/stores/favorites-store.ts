import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavoriteSentenceItem } from "@/types";

interface FavoritesState {
  favorites: FavoriteSentenceItem[];
  addFavorite: (data: { sentenceAr: string; pictogramIds: string[]; title?: string }) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (data) =>
        set((state) => ({
          favorites: [
            {
              id: `fav-${Date.now()}`,
              sentenceAr: data.sentenceAr,
              pictogramIds: data.pictogramIds,
              title: data.title ?? null,
              createdAt: new Date(),
            },
            ...state.favorites,
          ],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),
    }),
    { name: "pecs-favorites" }
  )
);
