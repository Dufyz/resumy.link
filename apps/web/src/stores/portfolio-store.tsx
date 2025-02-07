import { UpdatePortfolioSchema } from "@/schemas/portfolio-schema";
import { UpdatePortfolioSectionItemSchema } from "@/schemas/portfolio-section-item-schema";
import { UpdatePortfolioSectionSchema } from "@/schemas/portfolio-section-schema";
import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";
import { PortfolioSection } from "@/types/portfolio-section-type";
import { Portfolio } from "@/types/portfolio-type";
import { create } from "zustand";

type PortfolioStore = {
  portfolio: Portfolio | undefined;

  setPortfolio(portfolio: Portfolio): void;

  updatePortfolio(body: UpdatePortfolioSchema): void;

  createPortfolioSection(body: PortfolioSection): void;
  updatePortfolioSection(id: number, body: UpdatePortfolioSectionSchema): void;
  deletePortfolioSection(id: number): void;

  createPortfolioSectionItem(body: PortfolioSectionItem): void;
  updatePortfolioSectionItem(
    id: number,
    body: UpdatePortfolioSectionItemSchema
  ): void;
  deletePortfolioSectionItem(id: number): void;
};

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  portfolio: undefined,

  setPortfolio: (portfolio) => set({ portfolio }),

  updatePortfolio: (body) => {
    const portfolio = get().portfolio;

    if (!portfolio) return;

    set({
      portfolio: {
        ...portfolio,
        ...body,
      },
    });
  },

  createPortfolioSection: (body) => {
    const portfolio = get().portfolio;

    if (!portfolio) return;

    const portfolioSections = [...(portfolio.portfolio_sections || []), body];

    set({
      portfolio: {
        ...portfolio,
        portfolio_sections: portfolioSections,
      },
    });
  },

  updatePortfolioSection: (id, body) => {
    const portfolio = get().portfolio;

    if (!portfolio) return;

    const updatedPortfolioSections = (portfolio.portfolio_sections || []).map(
      (s) => {
        if (s.id === id) {
          return { ...s, ...body };
        }

        return s;
      }
    );

    set({
      portfolio: {
        ...portfolio,
        portfolio_sections: updatedPortfolioSections,
      },
    });
  },

  deletePortfolioSection: (id) => {
    const portfolio = get().portfolio;

    if (!portfolio) return;

    const updatedPortfolioSections = (
      portfolio.portfolio_sections || []
    ).filter((s) => s.id !== id);

    set({
      portfolio: {
        ...portfolio,
        portfolio_sections: updatedPortfolioSections,
      },
    });
  },

  createPortfolioSectionItem: (body) => {
    const portfolio = get().portfolio;

    if (!portfolio) return;

    const updatePortfolioSectionItems = [
      ...(portfolio.portfolio_section_items || []),
      body,
    ];

    set({
      portfolio: {
        ...portfolio,
        portfolio_section_items: updatePortfolioSectionItems,
      },
    });
  },

  updatePortfolioSectionItem: (id, body) => {
    const portfolio = get().portfolio;

    if (!portfolio) return;

    const portfolioSectionItems: PortfolioSectionItem[] = (
      portfolio.portfolio_section_items || []
    ).map((i) => {
      if (i.id === id) {
        return { ...i, ...body };
      }

      return i;
    });

    set({
      portfolio: {
        ...portfolio,
        portfolio_section_items: portfolioSectionItems,
      },
    });
  },

  deletePortfolioSectionItem: (id) => {
    const portfolio = get().portfolio;

    if (!portfolio) return;

    const updatedPortfolioSections = (
      portfolio.portfolio_section_items || []
    ).filter((i) => i.id !== id);

    set({
      portfolio: {
        ...portfolio,
        portfolio_section_items: updatedPortfolioSections,
      },
    });
  },
}));
