"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ImagePlus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/stores/settings-store";
import { useCustomPictogramsStore } from "@/stores/custom-pictograms-store";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function SettingsPage() {
  const settings = useSettingsStore();
  const customItems = useCustomPictogramsStore((s) => s.items);
  const removePictogram = useCustomPictogramsStore((s) => s.removePictogram);
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(settings.darkMode ? "dark" : "light");
  }, [settings.darkMode, setTheme]);

  return (
    <AppShell>
      <div className="container mx-auto max-w-2xl px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold text-foreground">الإعدادات</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الصور الرمزية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-foreground/60">
                أضف صوراً مخصصة لطفلك — تُحفظ في المتصفح تلقائياً
              </p>
              <Link href="/add-pictogram">
                <Button size="lg" className="w-full">
                  <ImagePlus className="h-6 w-6" />
                  إضافة صورة جديدة
                </Button>
              </Link>

              {customItems.length > 0 && (
                <ul className="space-y-3 pt-2">
                  {customItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-calm-lg border border-border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 overflow-hidden rounded-calm">
                          <Image
                            src={item.imageUrl}
                            alt={item.labelAr}
                            fill
                            className="object-cover"
                            unoptimized={item.imageUrl.startsWith("data:")}
                          />
                        </div>
                        <span className="text-lg font-bold">{item.labelAr}</span>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removePictogram(item.id)}
                        aria-label={`حذف ${item.labelAr}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الصوت</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rate">سرعة الكلام: {settings.rate.toFixed(1)}</Label>
                <input
                  id="rate"
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={settings.rate}
                  onChange={(e) => settings.setVoiceSettings({ rate: parseFloat(e.target.value) })}
                  className="h-3 w-full cursor-pointer accent-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pitch">نبرة الصوت: {settings.pitch.toFixed(1)}</Label>
                <input
                  id="pitch"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.pitch}
                  onChange={(e) => settings.setVoiceSettings({ pitch: parseFloat(e.target.value) })}
                  className="h-3 w-full cursor-pointer accent-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">مستوى الصوت: {settings.volume.toFixed(1)}</Label>
                <input
                  id="volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) => settings.setVoiceSettings({ volume: parseFloat(e.target.value) })}
                  className="h-3 w-full cursor-pointer accent-primary"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إمكانية الوصول</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: "darkMode" as const, label: "الوضع الداكن" },
                { key: "highContrast" as const, label: "تباين عالي" },
                { key: "largeText" as const, label: "نص كبير" },
                { key: "reduceMotion" as const, label: "تقليل الحركة" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <Label htmlFor={key}>{label}</Label>
                  <Switch
                    id={key}
                    checked={settings[key]}
                    onCheckedChange={(checked) =>
                      settings.setAccessibility({ [key]: checked })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
