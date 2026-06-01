import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/board(.*)",
  "/builder(.*)",
  "/library(.*)",
  "/favorites(.*)",
  "/settings(.*)",
  "/add-pictogram(.*)",
  "/admin(.*)",
  "/history(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/pictograms(.*)",
  "/api/categories(.*)",
  "/api/status(.*)",
]);

function isClerkConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  return key.length > 0 && !key.includes("placeholder") && key.startsWith("pk_");
}

export default isClerkConfigured()
  ? clerkMiddleware(async (auth, request) => {
      if (!isPublicRoute(request)) {
        await auth.protect();
      }
    })
  : function middleware() {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
