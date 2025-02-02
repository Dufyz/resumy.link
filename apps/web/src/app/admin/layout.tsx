import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="w-full flex min-h-screen">
      <Sidebar />
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
