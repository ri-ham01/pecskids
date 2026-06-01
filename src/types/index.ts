export interface PictogramItem {
  id: string;
  labelAr: string;
  imageUrl: string;
  audioUrl?: string | null;
  categoryId: string;
  category?: CategoryItem;
  keywords?: string[];
  isCustom?: boolean;
}

export interface CategoryItem {
  id: string;
  nameAr: string;
  slug: string;
  iconUrl?: string | null;
  color: string;
  sortOrder: number;
  _count?: { pictograms: number };
}

export interface ChildProfileItem {
  id: string;
  name: string;
  avatarUrl?: string | null;
  birthDate?: Date | null;
  notes?: string | null;
  isActive: boolean;
}

export interface SentenceHistoryItem {
  id: string;
  sentenceAr: string;
  pictogramIds: string[];
  spokenAt: Date;
  childProfile?: { name: string };
}

export interface FavoriteSentenceItem {
  id: string;
  title?: string | null;
  sentenceAr: string;
  pictogramIds: string[];
  createdAt: Date;
}

export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  reduceMotion: boolean;
  largeText: boolean;
  darkMode: boolean;
}

export interface AppSettings extends VoiceSettings, AccessibilitySettings {
  activeChildId?: string | null;
}

export type UserRole = "PARENT" | "ADMIN" | "THERAPIST";

export interface DashboardStats {
  totalPictograms: number;
  totalCategories: number;
  totalUsers: number;
  totalSentences: number;
  recentActivity: SentenceHistoryItem[];
}
