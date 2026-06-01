import { NextRequest, NextResponse } from "next/server";
import { getFavoritesByUser, createFavorite } from "@/services/favorite-service";
import { getCurrentDbUser } from "@/lib/auth";
import { isDemoMode } from "@/data/demo-data";

export async function GET() {
  if (isDemoMode()) {
    return NextResponse.json({ demo: true, favorites: [] });
  }

  try {
    const user = await getCurrentDbUser();
    if (!user) return NextResponse.json([]);
    const favorites = await getFavoritesByUser(user.id);
    return NextResponse.json(favorites);
  } catch {
    return NextResponse.json({ demo: true, favorites: [] });
  }
}

export async function POST(request: NextRequest) {
  if (isDemoMode()) {
    const body = await request.json();
    return NextResponse.json(
      {
        id: `fav-${Date.now()}`,
        sentenceAr: body.sentenceAr,
        pictogramIds: body.pictogramIds ?? [],
        demo: true,
      },
      { status: 201 }
    );
  }

  try {
    const user = await getCurrentDbUser();
    if (!user) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const body = await request.json();
    const favorite = await createFavorite({
      userId: user.id,
      sentenceAr: body.sentenceAr,
      pictogramIds: body.pictogramIds ?? [],
      title: body.title,
      childProfileId: body.childProfileId,
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch {
    return NextResponse.json({ error: "فشل الحفظ" }, { status: 500 });
  }
}
