import { prisma } from "@/lib/prisma";

export async function saveSentenceHistory(data: {
  sentenceAr: string;
  pictogramIds: string[];
  childProfileId: string;
}) {
  return prisma.sentenceHistory.create({ data });
}

export async function getHistoryByChild(childProfileId: string, limit = 50) {
  return prisma.sentenceHistory.findMany({
    where: { childProfileId },
    orderBy: { spokenAt: "desc" },
    take: limit,
  });
}

export async function getHistoryByUser(userId: string, limit = 50) {
  return prisma.sentenceHistory.findMany({
    where: {
      childProfile: { userId },
    },
    include: { childProfile: { select: { name: true } } },
    orderBy: { spokenAt: "desc" },
    take: limit,
  });
}
