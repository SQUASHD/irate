import { StarIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

interface StarReviews extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  className?: string;
}
export default function StarReviews({ rating, className }: StarReviews) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((value) => (
        <StarIcon
          key={value}
          className={cn(
            "h-4 w-4",
            className,
            rating > value ? "text-amber-400" : ""
          )}
        />
      ))}
    </>
  );
}
