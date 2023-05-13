import { prisma } from "@/lib/db";
import { z } from "zod";
import { UploadIcon } from "@/assets/icons";

export default async function NewImageUrl({ imageId }: { imageId: number }) {
  async function changeImageUrl(formData: FormData) {
    "use server";
    const imageUrl = formData.get("imageUrl") as string;

    const input = z.object({
      href: z.string().url(),
    });

    const parsedInput = input.parse({ href: imageUrl });

    await prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        href: parsedInput["href"],
      },
    });
  }

  return (
    <div>
      <form action={changeImageUrl} className="flex flex-col">
        <div className="relative flex w-full items-center p-1">
          <label className="sr-only">New Image URL:</label>
          <input
            type="url"
            name="imageUrl"
            className="h-8 w-full rounded-lg bg-transparent text-sm"
            required={true}
            placeholder="New Image URL"
          />
          <button
            type="submit"
            value="Submit"
            className="group absolute end-1 m-1 h-6 rounded-lg bg-transparent"
          >
            <UploadIcon className="m-1 aspect-square h-4 text-zinc-500 group-hover:text-zinc-200" />
            <span className="sr-only">Upload</span>
          </button>
        </div>
      </form>
    </div>
  );
}
