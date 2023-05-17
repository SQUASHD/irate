"use server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
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
