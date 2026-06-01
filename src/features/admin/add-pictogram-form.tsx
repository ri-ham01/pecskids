"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useCustomPictogramsStore, mergeWithCustomPictograms } from "@/stores/custom-pictograms-store";
import { usePictogramStore } from "@/stores/pictogram-store";
import type { CategoryItem } from "@/types";

const MAX_FILE_SIZE = 800_000; // ~800KB for localStorage

interface AddPictogramFormProps {
  redirectTo?: string;
}

export function AddPictogramForm({ redirectTo = "/library" }: AddPictogramFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addPictogram = useCustomPictogramsStore((s) => s.addPictogram);
  const setPictograms = usePictogramStore((s) => s.setPictograms);
  const currentPictograms = usePictogramStore((s) => s.pictograms);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [labelAr, setLabelAr] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [mode, setMode] = useState<"file" | "url">("file");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: CategoryItem[]) => {
        setCategories(data);
        if (data[0]) setCategoryId(data[0].id);
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("يرجى اختيار ملف صورة (PNG, JPG, WEBP)");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("الصورة كبيرة جداً. استخدم صورة أصغر من 800 كيلوبايت.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!labelAr.trim()) {
      setError("أدخل اسم الصورة بالعربية");
      return;
    }
    if (!imageUrl) {
      setError(mode === "file" ? "اختر صورة من جهازك" : "أدخل رابط الصورة");
      return;
    }
    if (!categoryId) {
      setError("اختر فئة");
      return;
    }

    try {
      const res = await fetch("/api/pictograms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          labelAr: labelAr.trim(),
          imageUrl,
          categoryId,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "فشل الحفظ");
      }

      const saved = await res.json();

      if (saved.demo) {
        addPictogram({ labelAr: labelAr.trim(), imageUrl, categoryId });
        setPictograms(mergeWithCustomPictograms(currentPictograms));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الحفظ");
      return;
    }

    setSuccess(true);
    setLabelAr("");
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";

    setTimeout(() => {
      router.push(redirectTo);
    }, 1200);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={mode === "file" ? "default" : "secondary"}
              className="flex-1"
              onClick={() => setMode("file")}
            >
              <Upload className="h-5 w-5" />
              من الجهاز
            </Button>
            <Button
              type="button"
              variant={mode === "url" ? "default" : "secondary"}
              className="flex-1"
              onClick={() => setMode("url")}
            >
              <Link2 className="h-5 w-5" />
              رابط إنترنت
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">اسم الصورة بالعربية</Label>
            <Input
              id="label"
              value={labelAr}
              onChange={(e) => setLabelAr(e.target.value)}
              placeholder="مثال: تفاحة"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">الفئة</Label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="flex min-h-touch w-full rounded-calm-lg border-2 border-border bg-card px-4 py-3 text-lg"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameAr}
                </option>
              ))}
            </select>
          </div>

          {mode === "file" ? (
            <div className="space-y-2">
              <Label htmlFor="file">اختر صورة</Label>
              <input
                ref={fileInputRef}
                id="file"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleFileChange}
                className="flex min-h-touch w-full cursor-pointer rounded-calm-lg border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-lg file:mr-4 file:rounded-calm file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white"
              />
              <p className="text-sm text-foreground/50">
                PNG أو JPG — حجم أقصى 800 كيلوبايت. صور بسيطة وواضحة أفضل للأطفال.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="image-url">رابط الصورة</Label>
              <Input
                id="image-url"
                type="url"
                value={imageUrl.startsWith("data:") ? "" : imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.png"
                dir="ltr"
              />
            </div>
          )}

          {imageUrl && (
            <div className="flex flex-col items-center gap-2 rounded-calm-lg bg-primary/5 p-4">
              <p className="text-sm font-semibold text-foreground/60">معاينة</p>
              <div className="relative h-32 w-32 overflow-hidden rounded-calm-lg">
                <Image
                  src={imageUrl}
                  alt="معاينة"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-calm-lg bg-red-50 p-3 text-lg text-red-600" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-calm-lg bg-primary/10 p-3 text-lg text-primary" role="status">
              تمت الإضافة بنجاح! جاري التحويل...
            </p>
          )}

          <Button type="submit" className="w-full" size="lg">
            إضافة الصورة
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
