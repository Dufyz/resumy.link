import { isMetadataOfType } from "@/lib/utils/isMetadataOfType";
import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

export default function PortfolioSectionItemProject({
  portfolioSectionItem,
}: {
  portfolioSectionItem: PortfolioSectionItem;
}) {
  const { metadata } = portfolioSectionItem;

  if (!isMetadataOfType(metadata, "project")) return null;

  return (
    <div className="flex flex-col gap-2">
      <p>{metadata.description}</p>
      <div className="flex flex-wrap gap-2">
        {metadata.skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
