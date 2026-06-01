import { APP_NAME, APP_NAME_AR } from "@/utils/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-card py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold text-foreground">{APP_NAME_AR}</p>
        <p className="mt-2 text-foreground/60">{APP_NAME}</p>
        <p className="mt-4 text-sm text-foreground/50">
          منصة تواصل معزز وبديل للأطفال ذوي التوحد
        </p>
      </div>
    </footer>
  );
}
