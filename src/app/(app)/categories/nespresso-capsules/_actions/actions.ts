"use server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { createNespressoItemSchema } from "@/app/(app)/categories/nespresso-capsules/_model/model";

export async function createNespressoItem(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("User not logged in");

  const data = {
    name: formData.get("capsuleName"),
    description: formData.get("description"),
    imageHref: formData.get("imageHref"),
    informationField: {
      capsuleType: "Vertuo",
      tagLine: formData.get("tagLine"),
      cupSize: formData.get("cupSize"),
      intensity: parseInt(formData.get("intensity") as string),
      notes: formData.get("aromaticNotes"),
      flavourProfile: {
        bitterness: parseInt(formData.get("bitterness") as string),
        acidity: parseInt(formData.get("acidity") as string),
        roast: parseInt(formData.get("roast") as string),
        body: parseInt(formData.get("body") as string),
      },
    },
  };

  const newItem = createNespressoItemSchema.safeParse(data);
  if (!newItem.success) {
    console.log(newItem.error.issues);
    throw new Error("Invalid data");
  }

  const itemExists = await prisma.item.findFirst({
    where: {
      name: newItem.data.name,
      categoryId: "nespresso-capsules",
    },
  });

  if (itemExists) throw new Error("Item with that name already exists");

  try {
    await prisma.item.create({
      data: {
        name: newItem.data.name,
        description: newItem.data.description,
        categoryId: "nespresso-capsules",
        createdBy: userId,
        images: {
          create: {
            href: newItem.data.imageHref,
            alt: newItem.data.name,
            addedBy: userId,
          },
        },
        informationField: newItem.data.informationField,
      },
    });
  } catch (error) {
    console.error(error);
  }
  const href = `/category/nespresso-capsules/${encodeURI(newItem.data.name)}`;
  redirect(href);
}
