export function isClerkConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  return (
    key.length > 0 &&
    !key.includes("placeholder") &&
    key.startsWith("pk_")
  );
}
