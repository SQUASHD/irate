import { prisma } from "@/lib/db";

export async function getRatingCount() {
  return prisma.rating.count();
}
export async function getItemCount() {
  return prisma.item.count();
}

export async function getCategoryCount() {
  return prisma.category.count();
}
