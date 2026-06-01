import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getUserByClerkId } from "@/services/user-service";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const user = await getUserByClerkId(userId);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    const [totalPictograms, totalCategories, totalUsers, totalSentences, recentActivity] =
      await Promise.all([
        prisma.pictogram.count({ where: { isActive: true } }),
        prisma.category.count({ where: { isActive: true } }),
        prisma.user.count(),
        prisma.sentenceHistory.count(),
        prisma.sentenceHistory.findMany({
          take: 10,
          orderBy: { spokenAt: "desc" },
          include: { childProfile: { select: { name: true } } },
        }),
      ]);

    return NextResponse.json({
      totalPictograms,
      totalCategories,
      totalUsers,
      totalSentences,
      recentActivity,
    });
  } catch {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
