"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createPictogram, deletePictogram, updatePictogram } from "@/services/pictogram-service";
import { getUserByClerkId } from "@/services/user-service";

async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("غير مصرح");

  const user = await getUserByClerkId(userId);
  if (!user || user.role !== "ADMIN") throw new Error("غير مصرح");

  return user;
}

export async function createPictogramAction(data: {
  labelAr: string;
  imageUrl: string;
  categoryId: string;
  keywords?: string[];
}) {
  const user = await requireAdmin();
  const pictogram = await createPictogram({
    ...data,
    uploadedBy: user.id,
    isCustom: true,
  });
  revalidatePath("/admin/pictograms");
  revalidatePath("/library");
  return pictogram;
}

export async function updatePictogramAction(
  id: string,
  data: Partial<{ labelAr: string; imageUrl: string; categoryId: string }>
) {
  await requireAdmin();
  const pictogram = await updatePictogram(id, data);
  revalidatePath("/admin/pictograms");
  revalidatePath("/library");
  return pictogram;
}

export async function deletePictogramAction(id: string) {
  await requireAdmin();
  await deletePictogram(id);
  revalidatePath("/admin/pictograms");
  revalidatePath("/library");
}
