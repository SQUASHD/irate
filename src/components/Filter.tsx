"use client";
import { Image, Item } from "@prisma/client";
import ItemCard from "@/components/ItemCard";
import { useSearchParams } from "next/navigation";

interface FilterProps {
  items: (Item & {
    ratings: { userId: string; rating: number }[];
    images: Image[];
  })[];
  userId: string;
}
export function Filter({ items, userId }: FilterProps) {
  const searchParams = useSearchParams()!;
  let filteredItems = items;

  const rated = searchParams.get("rated");

  if (rated) {
    filteredItems = items.filter((item) => {
      const ratings = item.ratings.map((rating) => rating.userId);
      if (rated === "true") {
        // If rated=true, filter items the user has rated
        return ratings.includes(userId);
      } else if (rated === "false") {
        // If rated=false, filter items the user hasn't rated
        return !ratings.includes(userId);
      } else {
        return ratings;
      }
    });
  }
  return (
    <>
      {filteredItems.map((item) => (
        <ItemCard
          key={item.id}
          category={item.categoryId}
          id={item.id}
          images={item.images}
          name={item.name}
        />
      ))}
    </>
  );
}
