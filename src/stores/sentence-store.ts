import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PictogramItem } from "@/types";

interface SentenceState {
  items: PictogramItem[];
  addItem: (item: PictogramItem) => void;
  removeItem: (id: string) => void;
  reorderItems: (fromIndex: number, toIndex: number) => void;
  clearItems: () => void;
  setItems: (items: PictogramItem[]) => void;
  getSentenceText: () => string;
}

export const useSentenceStore = create<SentenceState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      reorderItems: (fromIndex, toIndex) =>
        set((state) => {
          const items = [...state.items];
          const [removed] = items.splice(fromIndex, 1);
          items.splice(toIndex, 0, removed);
          return { items };
        }),
      clearItems: () => set({ items: [] }),
      setItems: (items) => set({ items }),
      getSentenceText: () =>
        get()
          .items.map((i) => i.labelAr)
          .join(" "),
    }),
    { name: "pecs-sentence" }
  )
);
