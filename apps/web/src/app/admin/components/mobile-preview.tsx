import PortfolioProfile from "@/app/[portfolio]/components/portfolio-profile";
import PortfolioSection from "@/app/[portfolio]/components/portfolio-section";
import usePortfolio from "@/hooks/usePortfolio";
import { sortPortfolioSectionItems } from "@/lib/utils/sortPortfolioSectionItems";
import { sortPortfolioSections } from "@/lib/utils/sortPortfolioSections";
import { ReactNode } from "react";

type PreviewWrapperProps = {
  children: ReactNode;
  deviceWidth?: number;
  deviceHeight?: number;
};

export function PreviewWrapper({
  children,
  deviceWidth = 375,
  deviceHeight = 667,
}: PreviewWrapperProps) {
  return (
    <div className="sticky top-4">
      <div className="overflow-hidden rounded-[40px] border-4 border-gray-800 bg-black p-2 shadow-xl relative">
        <div
          className="overflow-y-auto scrollbar-hide rounded-[28px] relative bg-black"
          style={{
            width: `${deviceWidth}px`,
            height: `${deviceHeight}px`,
          }}
        >
          <style>
            {`
              .mobile-preview-content .lg\\:items-start {
                align-items: center !important;
              }

              .mobile-preview-content .lg\\:text-left {
                text-align: center !important;
              }
                
              .mobile-preview-content .lg\\:hidden {
                display: none !important;
              }

              .mobile-preview-content .lg\\:flex-row {
                flex-direction: column !important;
              }

              .mobile-preview-content .lg\\:w-1\\/4,
              .mobile-preview-content .lg\\:w-3\\/4 {
                width: 100% !important;
              }

              .mobile-preview-content .lg\\:sticky {
                position: relative !important;
              }

              .mobile-preview-content .lg\\:mb-0 {
                margin-bottom: 2rem !important;
              }

              /* Customização da scrollbar */
              .mobile-preview-content::-webkit-scrollbar {
                width: 4px;
              }

              .mobile-preview-content::-webkit-scrollbar-track {
                background: transparent;
              }

              .mobile-preview-content::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
              }
            `}
          </style>
          <div className="mobile-preview-content rounded-md scrollbar-hide">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobilePreview() {
  const { portfolio } = usePortfolio();

  if (!portfolio) return null;

  const portfolio_sections = portfolio.portfolio_sections || [];
  const portfolio_section_items = portfolio.portfolio_section_items || [];

  const portfolioSections = sortPortfolioSections(
    portfolio_sections
      .filter((section) => section.is_active)
      .map((section) => {
        section.portfolio_section_items = sortPortfolioSectionItems(
          portfolio_section_items.filter(
            (item) => item.portfolio_section_id === section.id && item.is_active
          ) || []
        );
        return section;
      }) || []
  );

  return (
    <PreviewWrapper deviceWidth={375} deviceHeight={767}>
      <main className="p-4 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row lg:items-start lg:gap-8">
          <div className="lg:sticky lg:top-8 lg:w-1/4 mb-8 lg:mb-0">
            <PortfolioProfile portfolio={portfolio} />
          </div>
          <div className="w-full lg:w-3/4 flex flex-col gap-6">
            {portfolioSections.map((section, index) => (
              <PortfolioSection key={index} portfolioSection={section} />
            ))}
          </div>
        </div>
      </main>
    </PreviewWrapper>
  );
}
