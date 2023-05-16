"use client";
import { Image, Item } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface ItemWithRatingAndImage extends Item {
  ratings: { userId: string; rating: number }[];
  images: Image[];
}

interface UseFilteredItemsProps {
  items: ItemWithRatingAndImage[];
  userId: string;
}

export function useFilteredItems({ items, userId }: UseFilteredItemsProps) {
  const [filteredItems, setFilteredItems] =
    useState<ItemWithRatingAndImage[]>(items);
  const searchParams = useSearchParams();

  const rated = searchParams.get("rated");
  const search = searchParams.get("search");

  useEffect(() => {
    let newFilteredItems = items;

    if (rated) {
      newFilteredItems = newFilteredItems.filter((item) => {
        const ratings = item.ratings.map((rating) => rating.userId);
        if (rated === "true") {
          // If rated=true, filter items the user has rated
          return ratings.includes(userId);
        } else if (rated === "false") {
          // If rated=false, filter items the user hasn't rated
          return !ratings.includes(userId);
        } else {
          return true;
        }
      });
    }

    if (search) {
      newFilteredItems = newFilteredItems.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    setFilteredItems(newFilteredItems);
  }, [items, userId, rated, search]);

  return filteredItems;
}
