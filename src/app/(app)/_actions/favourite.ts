"use server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const favouriteSchema = z.object({
  itemId: z.number(),
  userId: z.string(),
});

export async function toggleFavorite(formData: FormData) {
  const itemId = Number(formData.get("itemId"));
  const userId = formData.get("userId");

  const data = favouriteSchema.parse({
    itemId: itemId,
    userId: userId,
  });

  const favourite = await prisma.favourite.findFirst({
    where: {
      userId: data.userId,
      itemId: data.itemId,
    },
  });

  if (!favourite)
    try {
      return prisma.favourite.create({
        data: {
          userId: data.userId,
          itemId: data.itemId,
        },
      });
    } catch (e) {
      console.error(e);
    }
  else {
    try {
      return prisma.favourite.update({
        where: {
          id: favourite.id,
        },
        data: {
          favourited: !favourite.favourited,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
