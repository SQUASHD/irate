"use server";

import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

interface AddRating {
  ratingScore: number;
  comment: string;
  itemId: number;
}
export async function addRating(formData: FormData) {
  const { userId } = auth();
  console.log(formData);

  if (!userId) throw new Error("Not logged in");

  const ratingSchema = z.object({
    ratingScore: z.number().min(1).max(5),
    comment: z.string().min(1).max(500),
    itemId: z.number(),
  });

  const data = {
    ratingScore: Number(formData.get("ratingScore")),
    comment: formData.get("comment"),
    itemId: Number(formData.get("itemId")),
  };

  const newRating = ratingSchema.parse(data);

  const rating = await prisma.rating.findFirst({
    where: {
      userId: userId,
      item: {
        id: newRating.itemId,
      },
    },
  });
  if (rating) {
    await prisma.rating.update({
      where: {
        id: rating.id,
      },
      data: {
        rating: newRating.ratingScore,
        comment: newRating.comment,
      },
    });
  } else {
    await prisma.rating.create({
      data: {
        rating: newRating.ratingScore,
        comment: newRating.comment,
        userId: userId,
        itemId: newRating.itemId,
      },
    });
  }
  revalidatePath(`/categories/${newRating.itemId}`);
}

export async function deleteRating(formData: FormData) {
  const ratingId = formData.get("ratingId");
  const categoryName = formData.get("categoryName");
  const itemName = formData.get("itemName");
  await prisma.rating.delete({
    where: {
      id: parseInt(ratingId as string),
    },
  });
  revalidatePath(`/category/${categoryName}/${itemName}`);
}
