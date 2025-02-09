import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Palette, BarChart, Settings, Crown, Link2, Code2 } from "lucide-react";
import { UserProfileMenu } from "./user-profile-menu";
import { cn } from "@/lib/utils";
import PaymentModal from "./payment-modal";

const SIDEBAR_ITEMS = [
  {
    icon: <Link2 className="h-5 w-5" />,
    label: "Links",
    href: "/",
    disabled: false,
  },
  {
    icon: <Palette className="h-5 w-5" />,
    label: "Aparência",
    href: "/admin/appearance",
    disabled: true,
  },
  {
    icon: <BarChart className="h-5 w-5" />,
    label: "Análise",
    href: "/admin/analytics",
    disabled: true,
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Configurações",
    href: "/admin/settings",
    disabled: true,
  },
];

export function Sidebar() {
  return (
    <div className="sticky inset-y-0 left-0 z-30 flex w-[240px] flex-col border-r bg-background max-h-screen min-h-screen">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Code2 className="w-6 h-6 text-blue-600" />
          <span>Resumy.link</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <div className="flex flex-col gap-1">
          {SIDEBAR_ITEMS.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "" : item.href}
              className={cn("", {
                "cursor-default": item.disabled,
              })}
            >
              <Button
                variant={item.href === "/" ? "secondary" : "ghost"}
                className="w-full justify-start flex gap-2"
                disabled={item.disabled}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4 flex flex-col gap-4">
        <PaymentModal />
        <UserProfileMenu />
      </div>
    </div>
  );
}
