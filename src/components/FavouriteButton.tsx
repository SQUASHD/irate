"use client";
import { HeartFillIcon, HeartLineIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { toggleFavorite } from "@/app/_actions/favourite";
import { useState } from "react";

type FavButtonProps = {
  itemId: number;
  userId: string;
  favourited: boolean;
  className?: string;
};
export const FavButton = (props: FavButtonProps) => {
  const [animate, setAnimate] = useState<boolean>(false);
  const [favouritedState, setFavouritedState] = useState<boolean>(
    props.favourited
  );
  return (
    <form
      action={async (formData) => {
        setFavouritedState((prev) => !prev);
        setAnimate(true);
        void toggleFavorite(formData);
      }}
    >
      <input type="hidden" name="userId" value={props.userId} />
      <input type="hidden" name="itemId" value={props.itemId} />
      <button
        type="submit"
        className={cn(
          "group/button absolute z-20 flex h-8 w-8 items-center justify-center",
          props.className
        )}
        onClick={() => setAnimate(false)}
      >
        <HeartFillIcon
          className={cn(
            "absolute h-6 text-rose-500",
            favouritedState
              ? "opacity-100 group-hover/button:opacity-0"
              : "opacity-0 group-hover/button:opacity-100",
            animate && "animate-[ping_700ms_ease-in-out_1]"
          )}
        />
        <HeartLineIcon
          className={cn(
            "absolute h-6 text-rose-500",
            favouritedState
              ? "opacity-0 group-hover/button:opacity-100"
              : "opacity-100 group-hover/button:opacity-0",
            animate && "animate-[ping_700ms_ease-in-out_1]"
          )}
        />
      </button>
    </form>
  );
};
