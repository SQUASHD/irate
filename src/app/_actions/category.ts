"use server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function create(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("User not logged in");

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

  const category = createCategorySchema.safeParse(data);
  if (!category.success) throw new Error("Invalid data");

  try {
    await prisma.category.create({
      data: {
        slug: category.data.slug,
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
