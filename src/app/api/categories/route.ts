import { NextResponse } from "next/server";
import { getCategories } from "@/services/category-service";
import { demoCategories, isDemoMode } from "@/data/demo-data";

export async function GET() {
  if (isDemoMode()) {
    return NextResponse.json(demoCategories);
  }

  try {
    const categories = await getCategories();
    if (categories.length === 0) {
      return NextResponse.json(demoCategories);
    }
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(demoCategories);
  }
}
