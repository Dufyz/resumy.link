import PortfolioSection from "@/app/[portfolio]/components/portfolio-section";
import PortfolioProfile from "@/app/[portfolio]/components/portfolio-profile";
import { getPortfolioByUsername } from "@/queries/portfolio-queries";
import NotFoundPage from "./not-found-page";
import { getPortfolioSectionsByPortfolioId } from "@/queries/portfolio-section-queries";
import { getPortfolioSectionItemsByPortfolioId } from "@/queries/portfolio-section-item-queries";
import { sortPortfolioSections } from "../../lib/utils/sortPortfolioSections";
import { sortPortfolioSectionItems } from "@/lib/utils/sortPortfolioSectionItems";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{
    portfolio: string;
  }>;
}) {
  const { portfolio: portfolioUsername } = await params;

  const portfolioOrError = await getPortfolioByUsername(portfolioUsername);

  if (portfolioOrError.isFailure()) return <NotFoundPage />;

  const { portfolio } = portfolioOrError.value;

  const [portfolioSectionsOrError, portfolioSectionItemsOrError] =
    await Promise.all([
      getPortfolioSectionsByPortfolioId(portfolio.id),
      getPortfolioSectionItemsByPortfolioId(portfolio.id),
    ]);

  if (portfolioSectionsOrError.isFailure()) return;
  if (portfolioSectionItemsOrError.isFailure()) return;

  const { portfolio_sections } = portfolioSectionsOrError.value;
  const { portfolio_section_items } = portfolioSectionItemsOrError.value;

  portfolio.portfolio_sections = sortPortfolioSections(
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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-8 lg:py-12 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row lg:items-start lg:gap-8">
        <div className="lg:sticky lg:top-8 lg:w-1/4 mb-8 lg:mb-0">
          <PortfolioProfile portfolio={portfolio} />
        </div>
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          {portfolio.portfolio_sections?.map((section, index) => (
            <PortfolioSection key={index} portfolioSection={section} />
          ))}
        </div>
      </div>
    </main>
  );
}
