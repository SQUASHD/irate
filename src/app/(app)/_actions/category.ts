"use server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSlug } from "@/utils/stringUtils";

export async function create(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("User not logged in");

  const createCategorySchema = z.object({
    name: z.string().min(5).max(50),
    description: z.string().max(500).min(10),
    imageURL: z.string().url(),
  });

  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    imageURL: formData.get("imageURL"),
  };

  const category = createCategorySchema.safeParse(data);
  if (!category.success) throw new Error("Invalid data");

  const categoryExists = await prisma.category.findUnique({
    where: {
      name: category.data.name,
    },
  });
  if (categoryExists) throw new Error("Category already exists");
  const generatedSlug = createSlug(category.data.name);

  try {
    await prisma.category.create({
      data: {
        slug: generatedSlug,
        name: category.data.name,
        description: category.data.description,
        createdBy: userId,
        image: {
          create: {
            href: category.data.imageURL,
            addedBy: userId,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Error creating category");
  }
  revalidatePath(`/categories/`);
  redirect(`/categories/`);
}
