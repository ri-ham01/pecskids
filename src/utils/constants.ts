export const APP_NAME = "PECS Kids Arabic";
export const APP_NAME_AR = "بيكس كيدز عربي";
export const APP_DESCRIPTION =
  "منصة تواصل معزز وبديل للأطفال ذوي التوحد وغير الناطقين";

export const ROUTES = {
  home: "/",
  board: "/board",
  builder: "/builder",
  library: "/library",
  favorites: "/favorites",
  settings: "/settings",
  history: "/history",
  dashboard: "/dashboard",
  admin: "/admin",
  signIn: "/sign-in",
  signUp: "/sign-up",
} as const;

export const SENTENCE_ACTIONS = {
  speak: "تحدث",
  clear: "حذف",
  save: "حفظ",
} as const;

export const NAV_ITEMS = [
  { href: ROUTES.board, label: "لوحة التواصل", icon: "LayoutGrid" },
  { href: ROUTES.builder, label: "إنشاء الجمل", icon: "MessageSquare" },
  { href: ROUTES.favorites, label: "المفضلة", icon: "Heart" },
  { href: ROUTES.settings, label: "الإعدادات", icon: "Settings" },
] as const;

export const PICTOGRAM_GRID_COLS = {
  mobile: 2,
  tablet: 3,
  desktop: 4,
} as const;

export const TOUCH_TARGET_MIN = 56;
