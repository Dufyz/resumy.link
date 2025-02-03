"use client";

import { PortfolioProfile } from "@/app/admin/components/portfolio/portfolio-profile";
import { CreatePortfolioSectionModal } from "./components/portfolio/portfolio-section/create-portfolio-section-modal";
import ListPortfolioSections from "./components/portfolio/portfolio-section/list-portfolio-sections";
import usePortfolio from "./hooks/usePortfolio";

export default function AdminPage() {
  const { portfolio } = usePortfolio();

  if (!portfolio) return null;

  return (
    <div className="w-full flex flex-1 h-full">
      <div className="flex-1 p-6 border-r">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex w-full flex-col gap-4">
            <PortfolioProfile portfolio={portfolio} />
            <CreatePortfolioSectionModal portfolio={portfolio} />
            <ListPortfolioSections portfolio={portfolio} />
          </div>
        </div>
      </div>
      {/* <div className="flex-2 py-6 px-8">
        <MobilePreview />
      </div> */}
    </div>
  );
}
