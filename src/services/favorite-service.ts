import { prisma } from "@/lib/prisma";

export async function getFavoritesByUser(userId: string) {
  return prisma.favoriteSentence.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createFavorite(data: {
  userId: string;
  sentenceAr: string;
  pictogramIds: string[];
  title?: string;
  childProfileId?: string;
}) {
  return prisma.favoriteSentence.create({ data });
}

export async function deleteFavorite(id: string, userId: string) {
  return prisma.favoriteSentence.deleteMany({
    where: { id, userId },
  });
}
