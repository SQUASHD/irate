"use client";
import { ReactNode } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Image, Item } from "@prisma/client";
import GridCard from "@/components/GridCard";
import { useFilteredItems } from "@/hooks/useFilteredItems";
import { FavButton } from "@/components/FavouriteButton";

interface GridProps {
  items: (Item & {
    ratings: { rating: number }[];
    favourites: { favourited: boolean }[];
    images: Image[];
  })[];
  userId: string;
  children?: ReactNode;
}
export default function ClientGrid({ items, userId, children }: GridProps) {
  const [parent] = useAutoAnimate();

  const filteredItems = useFilteredItems({ items, userId });
  return (
    <ul
      ref={parent}
      className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
      {children}
      {filteredItems.length < 1 && <GridCard type="empty" />}
      {filteredItems.map((item) => (
        <GridCard
          key={item.id}
          type={"item"}
          id={item.id}
          category={item.categoryId}
          name={item.name}
          images={item.images}
        >
          <FavButton
            itemId={item.id}
            userId={userId}
            favourited={
              item.favourites.length === 1 && item.favourites[0].favourited
            }
          />
        </GridCard>
      ))}
    </ul>
  );
}
