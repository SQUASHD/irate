"use server";

import { auth } from "@clerk/nextjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const create = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) throw new Error("Not logged in");

  const ratingSchema = z.object({
    ratingScore: z.number().min(1).max(5),
    comment: z.string().max(500).optional(),
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
};

export const destroy = async (formData: FormData) => {
  const ratingId = formData.get("ratingId");
  const categoryName = formData.get("categoryName");
  const itemName = formData.get("itemName");
  await prisma.rating.delete({
    where: {
      id: parseInt(ratingId as string),
    },
  });
  revalidatePath(`/categories/${categoryName}/${itemName}`);
};
