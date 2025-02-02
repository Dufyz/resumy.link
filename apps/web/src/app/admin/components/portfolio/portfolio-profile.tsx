"use client";

import Image from "next/image";
import { Portfolio } from "@/types/portfolio-type";
import { EditPortfolioModal } from "./edit-portfolio-modal";

const portfolio: Portfolio = {
  id: 1,
  user_id: 1,
  name: "Guilherme Iago Schmidt Thomaz",
  username: "dufyz",
  bio: "Engenheiro de software",
  avatar_path: null,
  created_at: new Date(),
  updated_at: new Date(),
};

export function PortfolioProfile() {
  return (
    <div className="flex flex-col gap-6 rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20">
            <Image
              src={portfolio.avatar_path || "/placeholder.svg"}
              alt={portfolio.name}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">{portfolio.name}</h2>
            <p className="text-sm text-muted-foreground">{portfolio.bio}</p>
            {/* <PortfolioSocialIcons /> */}
          </div>
        </div>
        <EditPortfolioModal />
      </div>
    </div>
  );
}
