import { prisma } from "@/lib/prisma";

export async function getPictograms(categoryId?: string, search?: string) {
  return prisma.pictogram.findMany({
    where: {
      isActive: true,
      ...(categoryId && { categoryId }),
      ...(search && {
        OR: [
          { labelAr: { contains: search, mode: "insensitive" } },
          { keywords: { has: search } },
        ],
      }),
    },
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { labelAr: "asc" }],
  });
}

export async function getPictogramById(id: string) {
  return prisma.pictogram.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function createPictogram(data: {
  labelAr: string;
  imageUrl: string;
  categoryId: string;
  keywords?: string[];
  uploadedBy?: string;
  isCustom?: boolean;
}) {
  return prisma.pictogram.create({ data });
}

export async function updatePictogram(
  id: string,
  data: Partial<{
    labelAr: string;
    imageUrl: string;
    categoryId: string;
    keywords: string[];
    isActive: boolean;
  }>
) {
  return prisma.pictogram.update({ where: { id }, data });
}

export async function deletePictogram(id: string) {
  return prisma.pictogram.update({
    where: { id },
    data: { isActive: false },
  });
}
