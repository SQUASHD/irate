import * as z from "zod";

export const informationFieldSchema = z.object({
  capsuleType: z.string(),
  tagLine: z.string(),
  cupSize: z.enum([
    "Espresso (40ml)",
    "Double Espresso (80ml)",
    "Gran Lungo (150ml)",
    "Coffee (230ml)",
  ]),
  intensity: z.number().min(2).max(12),
  notes: z.string(),
  flavourProfile: z.object({
    bitterness: z.number().min(1).max(5),
    acidity: z.number().min(1).max(5),
    body: z.number().min(1).max(5),
    roast: z.number().min(1).max(5),
  }),
});
export const createNespressoItemSchema = z.object({
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(255),
  imageHref: z.string().url(),
  informationField: informationFieldSchema,
});
