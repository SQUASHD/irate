import Link from "next/link";
import { cn } from "@/lib/utils";

type StyledLinkProps = {
  href: string;
  text: string;
};
export default function StyledLink({ href, text }: StyledLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-block text-amber-400",
        "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:max-w-full after:bg-amber-400 after:opacity-0 after:transition-all hover:after:bottom-0 hover:after:opacity-100"
      )}
    >
      {text}
    </Link>
  );
}
