import { isMetadataOfType } from "@/lib/utils/isMetadataOfType";
import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

export default function PortfolioSectionItemEducation({
  portfolioSectionItem,
}: {
  portfolioSectionItem: PortfolioSectionItem;
}) {
  const { metadata } = portfolioSectionItem;

  if (!isMetadataOfType(metadata, "education")) return null;

  return (
    <div className="">
      <div className="flex items-center gap-2 text-gray-700">
        <p className="font-semibold">{metadata.organization}</p>
        <span>•</span>
        <div className="flex items-center gap-2">
          <p>{new Date(metadata.start_date).getFullYear()}</p>
          <span>-</span>
          <p>
            {metadata.end_date
              ? new Date(metadata.end_date).getFullYear()
              : "atual"}
          </p>
        </div>
      </div>
      <div className="mt-2 text-gray-600">
        <p>{metadata.description}</p>
      </div>
    </div>
  );
}
