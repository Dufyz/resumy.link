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

    const portfolioSection = (portfolio.portfolio_sections || []).find(
      (s) => s.id === body.portfolio_section_id
    );

    if (!portfolioSection) return;

    const updatedSectionItems = [
      ...(portfolioSection.portfolio_section_items || []),
      body,
    ];

    const updatedPortfolioSections = (portfolio.portfolio_sections || []).map(
      (s) => {
        if (s.id === body.portfolio_section_id) {
          return {
            ...s,
            portfolio_section_items: updatedSectionItems,
          };
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

  updatePortfolioSectionItem: (id, body) => {
    const portfolio = get().portfolio;

    if (!portfolio) return;

    const portfolioSection = (portfolio.portfolio_sections || []).find(
      (s) => s.id === id
    );

    if (!portfolioSection) return;

    const updatedSectionItems = (
      portfolioSection.portfolio_section_items || []
    ).map((i) => (i.id === id ? { ...i, ...body } : i));

    const updatedPortfolioSections = (portfolio.portfolio_sections || []).map(
      (s) => {
        if (s.id === id) {
          return {
            ...s,
            portfolio_section_items: updatedSectionItems,
          };
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

  deletePortfolioSectionItem: (id) => {
    const portfolio = get().portfolio;

    if (!portfolio) return;

    const updatedPortfolioSections = (portfolio.portfolio_sections || []).map(
      (s) => {
        return {
          ...s,
          portfolio_section_items: (s.portfolio_section_items || []).filter(
            (i) => i.id !== id
          ),
        };
      }
    );

    set({
      portfolio: {
        ...portfolio,
        portfolio_sections: updatedPortfolioSections,
      },
    });
  },
}));
