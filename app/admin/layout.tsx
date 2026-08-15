import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const loggedIn = cookieStore.get("admin-auth");

  if (!loggedIn || loggedIn.value !== "true") {
    redirect("/admin/login");
  }

  return <>{children}</>;
}