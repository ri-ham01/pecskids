import { NextRequest, NextResponse } from "next/server";
import { saveSentenceHistory, getHistoryByUser } from "@/services/history-service";
import { getCurrentDbUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentDbUser();
    if (!user) return NextResponse.json([]);
    const history = await getHistoryByUser(user.id);
    return NextResponse.json(history);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentDbUser();
    if (!user) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const body = await request.json();
    const entry = await saveSentenceHistory({
      sentenceAr: body.sentenceAr,
      pictogramIds: body.pictogramIds ?? [],
      childProfileId: body.childProfileId,
    });

    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json({ error: "فشل الحفظ" }, { status: 500 });
  }
}
