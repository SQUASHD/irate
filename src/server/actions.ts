"use server";

import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function addRating(formData: FormData) {
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
  revalidatePath(`/categories/${categoryName}/${itemName}`);
}

export async function createCategory(formData: FormData) {
  // model Category {
  //   id           Int      @id @default(autoincrement())
  //   slug         String   @unique
  //   name         String
  //   description  String
  //   totalRatings Int      @default(0)
  //   createdAt    DateTime @default(now())
  //   updatedAt    DateTime @updatedAt
  //   items        Item[]
  //   image        Image    @relation(fields: [imageId], references: [id])
  //   imageId      Int
  //
  // @@index([slug], name: "slug")
  // }
  const createCategorySchema = z.object({
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .min(5)
      .max(25),
    name: z.string().max(50),
    description: z.string().max(500).min(10),
    imageURL: z.string().url(),
  });

  const data = {
    slug: formData.get("slug"),
    name: formData.get("name"),
    description: formData.get("description"),
    imageURL: formData.get("imageURL"),
  };

  const newCategory = createCategorySchema.safeParse(data);
  if (!newCategory.success) throw new Error("Invalid data");

  try {
    await prisma.category.create({
      data: {
        slug: newCategory.data.slug,
        name: newCategory.data.name,
        description: newCategory.data.description,
        image: {
          create: {
            href: newCategory.data.imageURL,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Error creating category");
  }
  redirect(`/categories/`);
}
