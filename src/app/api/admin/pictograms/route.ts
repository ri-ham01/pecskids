import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createPictogram, getPictograms } from "@/services/pictogram-service";
import { getUserByClerkId } from "@/services/user-service";
import { demoPictograms, isDemoMode } from "@/data/demo-data";

export async function GET() {
  if (isDemoMode()) {
    return NextResponse.json(demoPictograms);
  }

  try {
    const pictograms = await getPictograms();
    return NextResponse.json(pictograms.length ? pictograms : demoPictograms);
  } catch {
    return NextResponse.json(demoPictograms);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const user = await getUserByClerkId(userId);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    const body = await request.json();
    const pictogram = await createPictogram({
      labelAr: body.labelAr,
      imageUrl: body.imageUrl,
      categoryId: body.categoryId,
      keywords: body.keywords ?? [],
      uploadedBy: user.id,
      isCustom: true,
    });

    return NextResponse.json(pictogram, { status: 201 });
  } catch {
    return NextResponse.json({ error: "فشل الإنشاء" }, { status: 500 });
  }
}
