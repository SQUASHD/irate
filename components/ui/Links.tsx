import Link from "next/link";

type StyledLinkProps = {
  href: string;
  text: string;
};
export default function StyledLink({ href, text }: StyledLinkProps) {
  return (
    <Link href={href} className="group relative inline-block text-amber-400">
      {text}
      <span className="relative bottom-2 block h-[1px] max-w-0 bg-current transition-all duration-500 group-hover:max-w-full"></span>
    </Link>
  );
}
