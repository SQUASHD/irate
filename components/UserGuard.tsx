import { auth } from "@clerk/nextjs";

interface UserGuard {
  children: React.ReactNode;
  id: string;
}

export default function UserGuard({ children, id }: UserGuard) {
  const { userId } = auth();

  if (userId !== id) {
    return null;
  }
  return <>{children}</>;
}
