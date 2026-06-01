import { NextRequest, NextResponse } from "next/server";
import { getPictograms, createPictogram } from "@/services/pictogram-service";
import { filterDemoPictograms, isDemoMode } from "@/data/demo-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  if (isDemoMode()) {
    return NextResponse.json(filterDemoPictograms(categoryId, search));
  }

  try {
    const pictograms = await getPictograms(categoryId, search);
    if (pictograms.length === 0) {
      return NextResponse.json(filterDemoPictograms(categoryId, search));
    }
    return NextResponse.json(pictograms);
  } catch {
    return NextResponse.json(filterDemoPictograms(categoryId, search));
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (isDemoMode()) {
    return NextResponse.json(
      { demo: true, labelAr: body.labelAr, imageUrl: body.imageUrl, categoryId: body.categoryId },
      { status: 201 }
    );
  }

  try {
    const pictogram = await createPictogram({
      labelAr: body.labelAr,
      imageUrl: body.imageUrl,
      categoryId: body.categoryId,
      keywords: body.keywords ?? [body.labelAr],
      isCustom: true,
    });
    return NextResponse.json(pictogram, { status: 201 });
  } catch {
    return NextResponse.json({ error: "فشل حفظ الصورة في قاعدة البيانات" }, { status: 500 });
  }
}

export async function HEAD() {
  return NextResponse.json({ mode: isDemoMode() ? "demo" : "database" });
}
