"use client";

import Image from "next/image";
import { Portfolio } from "@/types/portfolio-type";
import { UpdatePortfolioModal } from "./update-portfolio-modal";

export function PortfolioProfile({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="flex flex-col gap-6 rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20">
            <Image
              src={portfolio.avatar_path || "/placeholder.svg"}
              alt={portfolio.username}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">{portfolio.title}</h2>
            <p className="text-sm text-muted-foreground">{portfolio.bio}</p>
            {/* <PortfolioSocialIcons /> */}
          </div>
        </div>
        <UpdatePortfolioModal portfolio={portfolio} />
      </div>
    </div>
  );
}
