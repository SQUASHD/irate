import Link from "next/link";

interface ItemCard {
  id: number;
  category: string;
  name: string;
  images: { href: string }[];
}

export default function ItemCard({ category, name, images }: ItemCard) {
  return (
    <Link
      href={`/categories/${category}/${encodeURI(name)}`}
      className="group"
      prefetch={true}
    >
      <div className="h-48 w-full overflow-hidden rounded-lg bg-zinc-200">
        <img
          src={images[0]?.href ?? "https://via.placeholder.com/300"}
          alt={"Alt"}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm">{name}</h3>
    </Link>
  );
}
