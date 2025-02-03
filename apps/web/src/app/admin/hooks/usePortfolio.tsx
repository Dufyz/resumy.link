"use client";

import { usePortfolioStore } from "@/stores/portfolio-store";

export default function usePortfolio() {
  const portfolio = usePortfolioStore((state) => state.portfolio);

  return {
    portfolio,
  };
}
