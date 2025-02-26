"use client";

import { usePortfolioStore } from "@/stores/portfolio-store";

export default function usePortfolio() {
  // Portfolio
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const setPortfolio = usePortfolioStore((state) => state.setPortfolio);
  const updatePortfolio = usePortfolioStore((state) => state.updatePortfolio);

  // Portolio Section
  const createPortfolioSection = usePortfolioStore(
    (state) => state.createPortfolioSection
  );
  const updatePortfolioSection = usePortfolioStore(
    (state) => state.updatePortfolioSection
  );
  const deletePortfolioSection = usePortfolioStore(
    (state) => state.deletePortfolioSection
  );

  // Portfolio Section Item
  const createPortfolioSectionItem = usePortfolioStore(
    (state) => state.createPortfolioSectionItem
  );
  const updatePortfolioSectionItem = usePortfolioStore(
    (state) => state.updatePortfolioSectionItem
  );
  const deletePortfolioSectionItem = usePortfolioStore(
    (state) => state.deletePortfolioSectionItem
  );

  return {
    portfolio,
    setPortfolio,
    updatePortfolio,
    createPortfolioSection,
    updatePortfolioSection,
    deletePortfolioSection,
    createPortfolioSectionItem,
    updatePortfolioSectionItem,
    deletePortfolioSectionItem,
  };
}
