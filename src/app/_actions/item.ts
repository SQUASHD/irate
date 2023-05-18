"use server";

import { createItemSchema } from "@/app/_models/item";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const create = async (formData: FormData) => {
  const { userId } = auth();
  if (!userId) throw new Error("User not logged in");

  const data = createItemSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    imageHref: formData.get("imageHref"),
    categorySlug: formData.get("categorySlug"),
  });
  const [category] = await Promise.all([
    prisma.category.findFirst({
      where: {
        slug: data.categorySlug,
      },
    }),
  ]);
  if (!category) throw new Error("Category does not exist");

  try {
    const item = await prisma.item.create({
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categorySlug,
        createdBy: data.userId,
        images: {
          create: {
            href: data.imageHref,
            alt: data.name,
            addedBy: data.userId,
          },
        },
      },
    });
    if (item) {
      revalidatePath(
        `/categories/${data.categorySlug}/${encodeURI(item.name)}`
      );
      redirect(`/categories/${data.categorySlug}/${encodeURI(item.name)}`);
    }
  } catch (error) {
    throw new Error("Error creating item");
  }
};
export const read = async () => {
  //   Read an existing item
};

export const update = async () => {
  //   Update an existing item
};

export const destroy = async () => {
  //   Delete an existing item
};
