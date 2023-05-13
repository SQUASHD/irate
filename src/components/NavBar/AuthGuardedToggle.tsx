import AuthGuard from "@/components/AuthGuard";
import ToggleEdit from "@/components/ToggleEdit";

export default function AuthGuardedToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <ToggleEdit>{children}</ToggleEdit>
    </AuthGuard>
  );
}
