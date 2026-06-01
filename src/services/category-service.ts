import { prisma } from "@/lib/prisma";

export async function getCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    include: { _count: { select: { pictograms: true } } },
    orderBy: { sortOrder: "asc" },
  });
}

export async function createCategory(data: {
  nameAr: string;
  slug: string;
  color?: string;
  iconUrl?: string;
}) {
  return prisma.category.create({ data });
}

export async function updateCategory(
  id: string,
  data: Partial<{ nameAr: string; color: string; sortOrder: number; isActive: boolean }>
) {
  return prisma.category.update({ where: { id }, data });
}

export async function deleteCategory(id: string) {
  return prisma.category.update({
    where: { id },
    data: { isActive: false },
  });
}
