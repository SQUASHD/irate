import { auth } from "@clerk/nextjs/server";
import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { z } from "zod";

export default async function NewImageUrl({ imageId }: { imageId: number }) {
  const { userId } = auth();

  if (userId !== env.CLERK_ADMIN_ID) {
    return null;
  }

  async function changeImageUrl(formData: FormData) {
    "use server";
    const imageUrl = formData.get("imageUrl") as string;

    const input = z.object({
      name: z.string().url(),
    });

    const parsedInput = input.parse({ name: imageUrl });

    await prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        href: imageUrl,
      },
    });
  }

  return (
    <div>
      <form action={changeImageUrl} className="flex flex-col">
        <label className="mb-1 text-sm font-light">New Image URL:</label>
        <input type="text" name="imageUrl" />
        <button type="submit" value="Submit" />
      </form>
    </div>
  );
}
