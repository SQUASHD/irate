"use client";
import { Image, Item } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface ItemWithRatingAndImage extends Item {
  ratings: { rating: number }[];
  favourites: { favourited: boolean }[];
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
  const favourited = searchParams.get("favourited");

  useEffect(() => {
    let newFilteredItems = items;

    if (rated) {
      newFilteredItems = newFilteredItems.filter((item) => {
        if (rated === "true") {
          return item.ratings.length === 1;
        } else if (rated === "false") {
          return item.ratings.length === 0;
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

    if (favourited) {
      newFilteredItems = newFilteredItems.filter((item) => {
        if (favourited === "true") {
          return item.favourites.length > 0 && item.favourites[0].favourited;
        } else if (favourited === "false") {
          return item.favourites.length === 0 || !item.favourites[0].favourited;
        } else {
          return true;
        }
      });
    }

    setFilteredItems(newFilteredItems);
  }, [items, userId, rated, search, favourited]);

  return filteredItems;
}
