import Link from "next/link";

type GridCardProps =
  | { type: "empty" }
  | {
      type: "item";
      id: number;
      category: string;
      name: string;
      images: { href: string }[];
      children?: React.ReactNode;
    }
  | { type: "loading" };

const GridCard = (props: GridCardProps) => {
  if (props.type === "item") {
    return (
      <div className="group">
        {props.children}
        <Link
          href={`/categories/${props.category}/${encodeURI(props.name)}`}
          className="group relative"
          prefetch={true}
        >
          <div className="h-48 w-full overflow-hidden rounded-lg bg-zinc-200">
            <img
              src={props.images[0]?.href ?? "https://via.placeholder.com/300"}
              alt={"Alt"}
              className="h-full w-full object-cover object-center group-hover/card:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm">{props.name}</h3>
        </Link>
      </div>
    );
  }
  if (props.type === "empty")
    return (
      <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-200">
        <p className="text-lg font-semibold tracking-tight text-zinc-800">
          No items matched
        </p>
      </div>
    );
  if (props.type === "loading")
    return (
      <div className="flex h-48 w-full animate-pulse items-center justify-center overflow-hidden rounded-lg bg-zinc-200"></div>
    );
  return null;
};

export default GridCard;
