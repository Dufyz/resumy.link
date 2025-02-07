import { PORTFOLIO_LINKS } from "@/app/admin/data/portfolio-link-data";
import { PortfolioLinkType } from "@/types/portfolio-type";

export default function PortfolioLinkIcon({
  type,
}: {
  type: PortfolioLinkType;
}) {
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
      {PORTFOLIO_LINKS[type].icon}
    </div>
  );
}
