"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { User, LogOut } from "lucide-react";
import { signOut } from "@/app/login/actions/sign-out-action";
import { redirect } from "next/navigation";

const profile = {
  name: "Guilherme Thomaz",
  username: "dufyz",
  role: "Software engineer",
  avatar: null,
  bio: "Passionate about creating amazing web experiences",
  socialLinks: [],
};

export function UserProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button variant="ghost" className="h-auto p-0">
          <div className="flex items-center gap-2">
            <Image
              src={profile.avatar || "/placeholder.svg"}
              alt={profile.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex flex-col items-start text-sm">
              <span className="font-medium">{profile.name}</span>
              <span className="text-xs text-muted-foreground">
                resumy.link/{profile.username}
              </span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="start">
        <div className="flex items-center gap-2 p-2">
          <Image
            src={profile.avatar || "/placeholder.svg"}
            alt={profile.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">{profile.name}</span>
              <Badge variant="secondary" className="text-xs font-normal">
                Grátis
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">
              resumy.link/{profile.username}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => redirect("/admin/account")}>
            <User className="mr-2 h-4 w-4" />
            Minha conta
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={async () => await signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
