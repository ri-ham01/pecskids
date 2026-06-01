import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PictogramItem } from "@/types";
import { demoCategories } from "@/data/demo-data";

interface CustomPictogramsState {
  items: PictogramItem[];
  addPictogram: (data: { labelAr: string; imageUrl: string; categoryId: string }) => void;
  removePictogram: (id: string) => void;
}

export const useCustomPictogramsStore = create<CustomPictogramsState>()(
  persist(
    (set) => ({
      items: [],
      addPictogram: (data) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: `custom-${Date.now()}`,
              labelAr: data.labelAr,
              imageUrl: data.imageUrl,
              categoryId: data.categoryId,
              category: demoCategories.find((c) => c.id === data.categoryId),
              keywords: [data.labelAr],
              isCustom: true,
            },
          ],
        })),
      removePictogram: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
    }),
    { name: "pecs-custom-pictograms" }
  )
);

export function mergeWithCustomPictograms(base: PictogramItem[]): PictogramItem[] {
  const custom = useCustomPictogramsStore.getState().items;
  const baseIds = new Set(base.map((p) => p.id));
  const uniqueCustom = custom.filter((c) => !baseIds.has(c.id));
  return [...base, ...uniqueCustom];
}
