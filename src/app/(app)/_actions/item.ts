"use server";

import { createItemSchema } from "@/app/(app)/_models/item";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const create = async (formData: FormData) => {
  const { userId } = auth();
  if (!userId) throw new Error("User not logged in");

  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    imageHref: formData.get("imageHref"),
    categorySlug: formData.get("categorySlug"),
  };

  const item = createItemSchema.safeParse(data);
  if (!item.success) throw new Error("Invalid data");

  const [category] = await Promise.all([
    prisma.category.findFirst({
      where: {
        slug: item.data.categorySlug,
      },
    }),
  ]);

  if (!category) throw new Error("Category does not exist");

  try {
    const newItem = await prisma.item.create({
      data: {
        name: item.data.name,
        description: item.data.description,
        categoryId: item.data.categorySlug,
        createdBy: userId,
        images: {
          create: {
            href: item.data.imageHref,
            alt: item.data.name,
            addedBy: userId,
          },
        },
      },
    });
    if (newItem) {
      redirect(`/categories/${data.categorySlug}/${encodeURI(newItem.name)}`);
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
