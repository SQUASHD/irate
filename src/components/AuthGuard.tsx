import { auth } from "@clerk/nextjs";
import { env } from "@/env.mjs";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (userId !== env.CLERK_ADMIN_ID) {
    return null;
  }
  return <>{children}</>;
}
