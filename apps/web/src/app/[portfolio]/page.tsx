import PortfolioSection from "@/app/[portfolio]/components/portfolio-section";
import PortfolioProfile from "@/app/[portfolio]/components/portfolio-profile";
import { getPortfolioByUsername } from "@/queries/portfolio-queries";
import NotFoundPage from "./not-found-page";
import { getPortfolioSectionsByPortfolioId } from "@/queries/portfolio-section-queries";
import { getPortfolioSectionItemsByPortfolioId } from "@/queries/portfolio-section-item-queries";
import { sortPortfolioSections } from "../../lib/utils/useSortPortfolioSections";

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
        section.portfolio_section_items = portfolio_section_items.filter(
          (item) => item.portfolio_section_id === section.id && item.is_active
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
        {/* <div className="w-full lg:w-3/4 space-y-6">
          <PortfolioLinkSection
            icon={<Code className="w-5 h-5" />}
            title="Projects"
            items={[
              {
                main: true,
                title: "E-commerce Platform",
                subtitle: "Next.js • TypeScript • Stripe",
                link: "https://project1.com",
              },
              {
                main: false,
                title: "AI Chat Application",
                subtitle: "React • OpenAI • Node.js",
                link: "https://project2.com",
              },
              {
                main: false,
                title: "Task Management Dashboard",
                subtitle: "Vue.js • Firebase • Material UI",
                link: "https://project3.com",
              },
            ]}
          />

          <PortfolioLinkSection
            icon={<Briefcase className="w-5 h-5" />}
            title="Experience"
            items={[
              {
                main: true,
                title: "Senior Full Stack Developer",
                subtitle: "Tech Corp • 2021 - Present",
                content: "Leading development of enterprise applications",
              },
              {
                main: false,
                title: "Frontend Developer",
                subtitle: "StartUp Inc • 2019 - 2021",
                content: "Developed modern web applications",
              },
            ]}
          />

          <PortfolioLinkSection
            icon={<GraduationCap className="w-5 h-5" />}
            title="Education"
            items={[
              {
                main: true,
                title: "Master of Computer Science",
                subtitle: "Tech University • 2018 - 2020",
                content: "Machine Learning Specialization",
              },
              {
                main: false,
                title: "Bachelor of Software Engineering",
                subtitle: "State University • 2014 - 2018",
                content: "First Class Honors",
              },
            ]}
          />

          <PortfolioLinkSection
            icon={<Trophy className="w-5 h-5" />}
            title="Certifications"
            items={[
              {
                main: true,
                title: "AWS Certified Solutions Architect",
                subtitle: "Amazon Web Services • 2023",
              },
              {
                main: false,
                title: "Google Cloud Professional Developer",
                subtitle: "Google • 2022",
              },
            ]}
          />
        </div> */}
      </div>
    </main>
  );
}
