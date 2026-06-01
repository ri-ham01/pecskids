import type { CategoryItem, PictogramItem } from "@/types";
import { pictogramImageForLabel } from "@/data/pictogram-images";

const categoryDefs = [
  { id: "cat-pronouns", nameAr: "ضمائر", slug: "pronouns", color: "#4CAF50", sortOrder: 1 },
  { id: "cat-verbs", nameAr: "أفعال", slug: "verbs", color: "#2196F3", sortOrder: 2 },
  { id: "cat-food", nameAr: "طعام وشراب", slug: "food", color: "#FF9800", sortOrder: 3 },
  { id: "cat-feelings", nameAr: "مشاعر", slug: "feelings", color: "#E91E63", sortOrder: 4 },
  { id: "cat-places", nameAr: "أماكن", slug: "places", color: "#9C27B0", sortOrder: 5 },
  { id: "cat-people", nameAr: "أشخاص", slug: "people", color: "#00BCD4", sortOrder: 6 },
  { id: "cat-activities", nameAr: "أنشطة", slug: "activities", color: "#795548", sortOrder: 7 },
  { id: "cat-needs", nameAr: "احتياجات", slug: "needs", color: "#607D8B", sortOrder: 8 },
] as const;

type Slug = (typeof categoryDefs)[number]["slug"];

const pictogramLabels: Record<Slug, { labelAr: string; keywords: string[] }[]> = {
  pronouns: [
    { labelAr: "أنا", keywords: ["انا", "أنا"] },
    { labelAr: "أنت", keywords: ["انت", "أنت"] },
    { labelAr: "هو", keywords: ["هو"] },
    { labelAr: "هي", keywords: ["هي"] },
    { labelAr: "نحن", keywords: ["نحن"] },
  ],
  verbs: [
    { labelAr: "أريد", keywords: ["اريد", "أريد"] },
    { labelAr: "أحب", keywords: ["احب", "أحب"] },
    { labelAr: "أذهب", keywords: ["اذهب", "أذهب"] },
    { labelAr: "آكل", keywords: ["آكل", "اكل"] },
    { labelAr: "أشرب", keywords: ["اشرب", "أشرب"] },
    { labelAr: "ألعب", keywords: ["العب", "ألعب"] },
    { labelAr: "أنام", keywords: ["انام", "أنام"] },
    { labelAr: "أساعد", keywords: ["اساعد", "أساعد"] },
  ],
  food: [
    { labelAr: "ماء", keywords: ["ماء", "مياه"] },
    { labelAr: "عصير", keywords: ["عصير"] },
    { labelAr: "حليب", keywords: ["حليب"] },
    { labelAr: "تفاح", keywords: ["تفاح"] },
    { labelAr: "خبز", keywords: ["خبز"] },
    { labelAr: "أرز", keywords: ["ارز", "أرز"] },
    { labelAr: "لحم", keywords: ["لحم"] },
  ],
  feelings: [
    { labelAr: "سعيد", keywords: ["سعيد", "فرح"] },
    { labelAr: "حزين", keywords: ["حزين", "حزن"] },
    { labelAr: "غاضب", keywords: ["غاضب", "غضب"] },
    { labelAr: "خائف", keywords: ["خائف", "خوف"] },
    { labelAr: "متعب", keywords: ["متعب", "تعب"] },
    { labelAr: "جائع", keywords: ["جائع", "جوع"] },
    { labelAr: "عطشان", keywords: ["عطشان", "عطش"] },
  ],
  places: [
    { labelAr: "البيت", keywords: ["بيت", "البيت", "منزل"] },
    { labelAr: "المدرسة", keywords: ["مدرسة", "المدرسة"] },
    { labelAr: "الحديقة", keywords: ["حديقة", "الحديقة"] },
    { labelAr: "المستشفى", keywords: ["مستشفى", "المستشفى"] },
    { labelAr: "الحمام", keywords: ["حمام", "الحمام"] },
  ],
  people: [
    { labelAr: "أمي", keywords: ["ام", "أم", "أمي"] },
    { labelAr: "أبي", keywords: ["اب", "أب", "أبي"] },
    { labelAr: "أخي", keywords: ["اخ", "أخ", "أخي"] },
    { labelAr: "أختي", keywords: ["اخت", "أخت", "أختي"] },
    { labelAr: "المعلم", keywords: ["معلم", "المعلم"] },
    { labelAr: "الطبيب", keywords: ["طبيب", "الطبيب"] },
  ],
  activities: [
    { labelAr: "قراءة", keywords: ["قراءة", "كتاب"] },
    { labelAr: "رسم", keywords: ["رسم"] },
    { labelAr: "موسيقى", keywords: ["موسيقى", "اغنية"] },
    { labelAr: "تلفاز", keywords: ["تلفاز", "تلفزيون"] },
    { labelAr: "رياضة", keywords: ["رياضة", "لعب"] },
  ],
  needs: [
    { labelAr: "مساعدة", keywords: ["مساعدة", "ساعدني"] },
    { labelAr: "توقف", keywords: ["توقف", "كفى"] },
    { labelAr: "نعم", keywords: ["نعم", "موافق"] },
    { labelAr: "لا", keywords: ["لا", "رفض"] },
    { labelAr: "من فضلك", keywords: ["من فضلك", "لو سمحت"] },
    { labelAr: "شكراً", keywords: ["شكرا", "شكراً"] },
    { labelAr: "آسف", keywords: ["اسف", "آسف"] },
  ],
};

export const demoCategories: CategoryItem[] = categoryDefs.map((cat) => ({
  ...cat,
  _count: { pictograms: pictogramLabels[cat.slug].length },
}));

export const demoPictograms: PictogramItem[] = categoryDefs.flatMap((cat) =>
  pictogramLabels[cat.slug].map((item, index) => ({
    id: `${cat.slug}-${index}`,
    labelAr: item.labelAr,
    imageUrl: pictogramImageForLabel(item.labelAr),
    keywords: item.keywords,
    categoryId: cat.id,
    category: { ...cat },
  }))
);

export function filterDemoPictograms(categoryId?: string, search?: string): PictogramItem[] {
  return demoPictograms.filter((p) => {
    const matchesCategory = !categoryId || p.categoryId === categoryId;
    const matchesSearch =
      !search ||
      p.labelAr.includes(search) ||
      p.keywords?.some((k) => k.includes(search));
    return matchesCategory && matchesSearch;
  });
}

export { isDemoMode, getDatabaseMode } from "@/lib/db-config";
