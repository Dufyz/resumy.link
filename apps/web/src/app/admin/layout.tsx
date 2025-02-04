import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";
import { AuthProvider } from "@/providers/auth-provider";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser || !authUser.email) redirect("/login");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <AuthProvider session={session}>
      <div className="w-full flex min-h-screen">
        <Sidebar />
        <div className="w-full flex-1">{children}</div>
      </div>
    </AuthProvider>
  );
}
