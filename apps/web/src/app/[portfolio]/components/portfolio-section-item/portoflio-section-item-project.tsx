import { cn } from "@/lib/utils";
import { isMetadataOfType } from "@/lib/utils/isMetadataOfType";
import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

export default function PortfolioSectionItemProject({
  portfolioSectionItem,
  className,
}: {
  portfolioSectionItem: PortfolioSectionItem;
  className?: string;
}) {
  const { metadata } = portfolioSectionItem;

  if (!isMetadataOfType(metadata, "project")) return null;

  return (
    <div
      className={cn(
        "block p-4 bg-gray-800  shadow-md hover:bg-gray-700 transition-colors",
        className
      )}
    >
      <h3 className="font-semibold text-lg text-gray-100">{metadata.title}</h3>
      {metadata.description && (
        <p className="text-sm text-gray-400">{metadata.description}</p>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {metadata.skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center bg-gray-500 text-gray-100 rounded-full px-3 py-1 text-sm"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
