import AuthGuard from "./AuthGuard";
import ToggleEdit from "./ToggleEdit";

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
