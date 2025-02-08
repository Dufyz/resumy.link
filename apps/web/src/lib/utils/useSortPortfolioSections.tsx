import { PortfolioSection } from "@/types/portfolio-section-type";

export function sortPortfolioSections(
  portfolioSections: PortfolioSection[]
): PortfolioSection[] {
  return portfolioSections.sort((a: PortfolioSection, b: PortfolioSection) => {
    return a.index - b.index;
  });
}
