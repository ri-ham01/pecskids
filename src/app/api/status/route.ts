import { NextResponse } from "next/server";
import { getDatabaseMode, isValidDatabaseUrl, getDatabaseUrl } from "@/lib/db-config";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const mode = getDatabaseMode();
  let connected = false;

  if (mode === "postgresql") {
    try {
      await prisma.$queryRaw`SELECT 1`;
      connected = true;
    } catch {
      connected = false;
    }
  }

  return NextResponse.json({
    mode,
    connected,
    hasUrl: isValidDatabaseUrl(getDatabaseUrl()),
  });
}
