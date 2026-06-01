import { NextRequest, NextResponse } from "next/server";
import { deleteFavorite } from "@/services/favorite-service";
import { getCurrentDbUser } from "@/lib/auth";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentDbUser();
    if (!user) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const { id } = await params;
    await deleteFavorite(id, user.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "فشل الحذف" }, { status: 500 });
  }
}
