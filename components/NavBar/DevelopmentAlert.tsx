import { env } from "../../env.mjs";

export default async function DevWarning() {
  if (env.APP_ENV === "production") return null;
  return (
    <div className="flex h-8 w-full items-center justify-center bg-black p-1 text-sm font-light">
      ⛔️ Development Area
      <span className="hidden sm:block">
        {" "}
        – things may be even more broken here
      </span>{" "}
      ⛔
    </div>
  );
}
