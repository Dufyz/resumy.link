import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

export function sortPortfolioSectionItems(
  portfolioSectionItems: PortfolioSectionItem[]
): PortfolioSectionItem[] {
  return portfolioSectionItems.sort(
    (a: PortfolioSectionItem, b: PortfolioSectionItem) => {
      return a.index - b.index;
    }
  );
}
