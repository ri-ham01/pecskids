import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppSettings } from "@/types";

interface SettingsState extends AppSettings {
  setVoiceSettings: (settings: Partial<Pick<AppSettings, "rate" | "pitch" | "volume">>) => void;
  setAccessibility: (settings: Partial<Pick<AppSettings, "highContrast" | "reduceMotion" | "largeText" | "darkMode">>) => void;
  setActiveChildId: (id: string | null) => void;
  reset: () => void;
}

const defaultSettings: AppSettings = {
  rate: 0.9,
  pitch: 1.0,
  volume: 1.0,
  highContrast: false,
  reduceMotion: false,
  largeText: false,
  darkMode: false,
  activeChildId: null,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setVoiceSettings: (settings) => set((s) => ({ ...s, ...settings })),
      setAccessibility: (settings) => set((s) => ({ ...s, ...settings })),
      setActiveChildId: (id) => set({ activeChildId: id }),
      reset: () => set(defaultSettings),
    }),
    { name: "pecs-settings" }
  )
);
