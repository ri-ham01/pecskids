import { auth, currentUser } from "@clerk/nextjs/server";
import { getOrCreateUser } from "@/services/user-service";

export async function getCurrentDbUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? `${userId}@placeholder.local`;
  const name = clerkUser?.fullName ?? clerkUser?.firstName ?? undefined;

  return getOrCreateUser(userId, email, name ?? undefined);
}
