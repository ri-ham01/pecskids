import { prisma } from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

export async function getOrCreateUser(clerkId: string, email: string, name?: string) {
  return prisma.user.upsert({
    where: { clerkId },
    update: { email, name },
    create: { clerkId, email, name },
    include: { settings: true, childProfiles: true },
  });
}

export async function updateUserRole(clerkId: string, role: UserRole) {
  return prisma.user.update({
    where: { clerkId },
    data: { role },
  });
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
    include: {
      childProfiles: { where: { isActive: true } },
      settings: true,
      favorites: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
}
