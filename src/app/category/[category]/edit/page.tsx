import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { env } from "@/env.mjs";

export default async function EditCategoryPage() {
  const { userId } = await auth();

  if (userId !== env.CLERK_ADMIN_ID) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-8xl font-black tracking-tighter">401</h1>
        <h2 className="text-2xl font-light">Unauthorized</h2>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <form>
        <label>Capsule Name</label>
        <input type="text" />
      </form>
    </div>
  );
}
