"use client";

import { PortfolioSection } from "@/types/portfolio-section-type";

export function useSortPortfolioSections(
  portfolioSections: PortfolioSection[]
): PortfolioSection[] {
  return portfolioSections.sort((a: PortfolioSection, b: PortfolioSection) => {
    if (a.is_active && !b.is_active) return -1;
    if (!a.is_active && b.is_active) return 1;
    return 0;
  });
}
