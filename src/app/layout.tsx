import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { AuthProvider } from "@/components/providers/clerk-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SkipLink } from "@/components/accessibility/skip-link";
import { APP_DESCRIPTION } from "@/utils/constants";
import "@/styles/globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PECS Kids Arabic | بيكس كيدز عربي",
    template: "%s | PECS Kids Arabic",
  },
  description: APP_DESCRIPTION,
  keywords: ["PECS", "AAC", "تواصل", "توحد", "صور رمزية", "عربي"],
  authors: [{ name: "PECS Kids Arabic" }],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#4CAF50",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="ar" dir="rtl" suppressHydrationWarning>
        <body className={`${cairo.variable} font-arabic`}>
          <SkipLink />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
