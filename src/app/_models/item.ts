import { z } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(255),
  imageHref: z.string().url(),
  categorySlug: z.string().min(1).max(40),
  userId: z.string().trim(),
});
