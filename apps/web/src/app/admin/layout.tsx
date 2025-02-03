import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";
import { getUserByEmail } from "@/queries/user-queries";
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

  // const { user } = await getUserByEmail(authUser.email);
  // const { portfolios } = await getPortfoliosByUserId(user.id);

  return (
    <div className="w-full flex min-h-screen">
      <Sidebar />
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
