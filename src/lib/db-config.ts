/**
 * إعدادات قاعدة البيانات
 * USE_DEMO_MODE=false + DATABASE_URL صحيح = استخدام PostgreSQL
 */

const PLACEHOLDER_PATTERNS = [
  "user:password@",
  "USERNAME:PASSWORD",
  "YOUR_PASSWORD",
  "ep-xxxxx",
  "placeholder",
];

export function getDatabaseUrl(): string {
  return process.env.DATABASE_URL?.trim() ?? "";
}

export function isValidDatabaseUrl(url: string): boolean {
  if (!url) return false;
  if (!url.startsWith("postgresql://") && !url.startsWith("postgres://")) return false;
  return !PLACEHOLDER_PATTERNS.some((p) => url.includes(p));
}

export function isDemoMode(): boolean {
  if (process.env.USE_DEMO_MODE === "true") return true;
  if (process.env.USE_DEMO_MODE === "false") {
    return !isValidDatabaseUrl(getDatabaseUrl());
  }
  return !isValidDatabaseUrl(getDatabaseUrl());
}

export function getDatabaseMode(): "demo" | "postgresql" {
  return isDemoMode() ? "demo" : "postgresql";
}
