import Link from "next/link";
import { isClerkConfigured } from "@/lib/clerk-config";
import { Button } from "@/components/ui/button";

export default async function SignInPage() {
  if (!isClerkConfigured()) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4 text-center">
        <h1 className="text-3xl font-bold">تسجيل الدخول</h1>
        <p className="max-w-md text-lg text-foreground/70">
          أضف مفاتيح Clerk في ملف <code dir="ltr">.env</code> لتفعيل المصادقة.
        </p>
        <Link href="/">
          <Button size="lg">العودة للرئيسية</Button>
        </Link>
      </div>
    );
  }

  const { SignIn } = await import("@clerk/nextjs");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <SignIn />
    </div>
  );
}
