"use client";

import { useCallback, useEffect } from "react";
import { usePictogramStore } from "@/stores/pictogram-store";
import {
  useCustomPictogramsStore,
  mergeWithCustomPictograms,
} from "@/stores/custom-pictograms-store";
import { demoCategories, demoPictograms } from "@/data/demo-data";

export function usePictograms() {
  const store = usePictogramStore();
  const customItems = useCustomPictogramsStore((s) => s.items);

  const fetchData = useCallback(async () => {
    store.setLoading(true);
    try {
      const [pictoRes, catRes] = await Promise.all([
        fetch("/api/pictograms"),
        fetch("/api/categories"),
      ]);

      let pictograms = demoPictograms;
      let categories = demoCategories;

      if (pictoRes.ok) {
        const data = await pictoRes.json();
        if (Array.isArray(data) && data.length > 0) pictograms = data;
      }
      if (catRes.ok) {
        const data = await catRes.json();
        if (Array.isArray(data) && data.length > 0) categories = data;
      }

      store.setPictograms(mergeWithCustomPictograms(pictograms));
      store.setCategories(categories);
    } catch {
      store.setPictograms(mergeWithCustomPictograms(demoPictograms));
      store.setCategories(demoCategories);
    } finally {
      store.setLoading(false);
    }
  }, [store]);

  useEffect(() => {
    if (store.pictograms.length === 0) {
      fetchData();
    }
  }, [fetchData, store.pictograms.length]);

  useEffect(() => {
    const current = usePictogramStore.getState().pictograms;
    if (current.length === 0) return;
    const base = current.filter((p) => !p.isCustom);
    usePictogramStore.getState().setPictograms([...base, ...customItems]);
  }, [customItems]);

  return {
    ...store,
    filteredPictograms: store.getFilteredPictograms(),
    refetch: fetchData,
  };
}
