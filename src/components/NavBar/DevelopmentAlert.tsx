import { env } from "@/env.mjs";

export default async function DevWarning() {
  if (env.NODE_ENV === "production") return null;
  return (
    <div className="flex h-8 w-full items-center justify-center bg-black p-1 text-sm font-light">
      ⛔️ Development Area – things may be even more broken here ⛔
    </div>
  );
}
