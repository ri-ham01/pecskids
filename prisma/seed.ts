import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { nameAr: "ضمائر", slug: "pronouns", color: "#4CAF50", sortOrder: 1 },
  { nameAr: "أفعال", slug: "verbs", color: "#2196F3", sortOrder: 2 },
  { nameAr: "طعام وشراب", slug: "food", color: "#FF9800", sortOrder: 3 },
  { nameAr: "مشاعر", slug: "feelings", color: "#E91E63", sortOrder: 4 },
  { nameAr: "أماكن", slug: "places", color: "#9C27B0", sortOrder: 5 },
  { nameAr: "أشخاص", slug: "people", color: "#00BCD4", sortOrder: 6 },
  { nameAr: "أنشطة", slug: "activities", color: "#795548", sortOrder: 7 },
  { nameAr: "احتياجات", slug: "needs", color: "#607D8B", sortOrder: 8 },
];

const pictograms: Record<string, { labelAr: string; imageUrl: string; keywords: string[] }[]> = {
  pronouns: [
    { labelAr: "أنا", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", keywords: ["انا", "أنا"] },
    { labelAr: "أنت", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", keywords: ["انت", "أنت"] },
    { labelAr: "هو", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop", keywords: ["هو"] },
    { labelAr: "هي", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop", keywords: ["هي"] },
    { labelAr: "نحن", imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop", keywords: ["نحن"] },
  ],
  verbs: [
    { labelAr: "أريد", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop", keywords: ["اريد", "أريد"] },
    { labelAr: "أحب", imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=200&h=200&fit=crop", keywords: ["احب", "أحب"] },
    { labelAr: "أذهب", imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02afe5c88?w=200&h=200&fit=crop", keywords: ["اذهب", "أذهب"] },
    { labelAr: "آكل", imageUrl: "https://images.unsplash.com/photo-1414235073718-337989a2e8b0?w=200&h=200&fit=crop", keywords: ["آكل", "اكل"] },
    { labelAr: "أشرب", imageUrl: "https://images.unsplash.com/photo-1548839140-29a7493551cf?w=200&h=200&fit=crop", keywords: ["اشرب", "أشرب"] },
    { labelAr: "ألعب", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop", keywords: ["العب", "ألعب"] },
    { labelAr: "أنام", imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200&h=200&fit=crop", keywords: ["انام", "أنام"] },
    { labelAr: "أساعد", imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628905774?w=200&h=200&fit=crop", keywords: ["اساعد", "أساعد"] },
  ],
  food: [
    { labelAr: "ماء", imageUrl: "https://images.unsplash.com/photo-1548839140-29a7493551cf?w=200&h=200&fit=crop", keywords: ["ماء", "مياه"] },
    { labelAr: "عصير", imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop", keywords: ["عصير"] },
    { labelAr: "حليب", imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop", keywords: ["حليب"] },
    { labelAr: "تفاح", imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=200&fit=crop", keywords: ["تفاح"] },
    { labelAr: "خبز", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop", keywords: ["خبز"] },
    { labelAr: "أرز", imageUrl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=200&h=200&fit=crop", keywords: ["ارز", "أرز"] },
    { labelAr: "لحم", imageUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=200&h=200&fit=crop", keywords: ["لحم"] },
  ],
  feelings: [
    { labelAr: "سعيد", imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&h=200&fit=crop", keywords: ["سعيد", "فرح"] },
    { labelAr: "حزين", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop", keywords: ["حزين", "حزن"] },
    { labelAr: "غاضب", imageUrl: "https://images.unsplash.com/photo-1573497019940-88c345a0b0b9?w=200&h=200&fit=crop", keywords: ["غاضب", "غضب"] },
    { labelAr: "خائف", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", keywords: ["خائف", "خوف"] },
    { labelAr: "متعب", imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200&h=200&fit=crop", keywords: ["متعب", "تعب"] },
    { labelAr: "جائع", imageUrl: "https://images.unsplash.com/photo-1414235073718-337989a2e8b0?w=200&h=200&fit=crop", keywords: ["جائع", "جوع"] },
    { labelAr: "عطشان", imageUrl: "https://images.unsplash.com/photo-1548839140-29a7493551cf?w=200&h=200&fit=crop", keywords: ["عطشان", "عطش"] },
  ],
  places: [
    { labelAr: "البيت", imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=200&fit=crop", keywords: ["بيت", "البيت", "منزل"] },
    { labelAr: "المدرسة", imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed255b7a?w=200&h=200&fit=crop", keywords: ["مدرسة", "المدرسة"] },
    { labelAr: "الحديقة", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", keywords: ["حديقة", "الحديقة"] },
    { labelAr: "المستشفى", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=200&fit=crop", keywords: ["مستشفى", "المستشفى"] },
    { labelAr: "الحمام", imageUrl: "https://images.unsplash.com/photo-1552321884-ff52a9d1e6d6?w=200&h=200&fit=crop", keywords: ["حمام", "الحمام"] },
  ],
  people: [
    { labelAr: "أمي", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", keywords: ["ام", "أم", "أمي"] },
    { labelAr: "أبي", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop", keywords: ["اب", "أب", "أبي"] },
    { labelAr: "أخي", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", keywords: ["اخ", "أخ", "أخي"] },
    { labelAr: "أختي", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop", keywords: ["اخت", "أخت", "أختي"] },
    { labelAr: "المعلم", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop", keywords: ["معلم", "المعلم"] },
    { labelAr: "الطبيب", imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop", keywords: ["طبيب", "الطبيب"] },
  ],
  activities: [
    { labelAr: "قراءة", imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop", keywords: ["قراءة", "كتاب"] },
    { labelAr: "رسم", imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop", keywords: ["رسم"] },
    { labelAr: "موسيقى", imageUrl: "https://images.unsplash.com/photo-1511379938544-c1f69419868d?w=200&h=200&fit=crop", keywords: ["موسيقى", "اغنية"] },
    { labelAr: "تلفاز", imageUrl: "https://images.unsplash.com/photo-1593359677877-a4bb92f829d1?w=200&h=200&fit=crop", keywords: ["تلفاز", "تلفزيون"] },
    { labelAr: "رياضة", imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607f82181?w=200&h=200&fit=crop", keywords: ["رياضة", "لعب"] },
  ],
  needs: [
    { labelAr: "مساعدة", imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628905774?w=200&h=200&fit=crop", keywords: ["مساعدة", "ساعدني"] },
    { labelAr: "توقف", imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200&h=200&fit=crop", keywords: ["توقف", "كفى"] },
    { labelAr: "نعم", imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e939e113?w=200&h=200&fit=crop", keywords: ["نعم", "موافق"] },
    { labelAr: "لا", imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=200&fit=crop", keywords: ["لا", "رفض"] },
    { labelAr: "من فضلك", imageUrl: "https://images.unsplash.com/photo-1573497019940-88c345a0b0b9?w=200&h=200&fit=crop", keywords: ["من فضلك", "لو سمحت"] },
    { labelAr: "شكراً", imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=200&h=200&fit=crop", keywords: ["شكرا", "شكراً"] },
    { labelAr: "آسف", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop", keywords: ["اسف", "آسف"] },
  ],
};

async function main() {
  console.log("🌱 Seeding database...");

  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });

    const items = pictograms[cat.slug] ?? [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await prisma.pictogram.upsert({
        where: { id: `${cat.slug}-${i}` },
        update: {
          labelAr: item.labelAr,
          imageUrl: item.imageUrl,
          keywords: item.keywords,
          sortOrder: i,
        },
        create: {
          id: `${cat.slug}-${i}`,
          labelAr: item.labelAr,
          imageUrl: item.imageUrl,
          keywords: item.keywords,
          categoryId: category.id,
          sortOrder: i,
        },
      });
    }
  }

  console.log("✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
