import { cn } from "@/lib/utils";
import { isMetadataOfType } from "@/lib/utils/isMetadataOfType";
import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

export default function PortfolioSectionItemLanguage({
  portfolioSectionItem,
  className,
}: {
  portfolioSectionItem: PortfolioSectionItem;
  className?: string;
}) {
  const { metadata } = portfolioSectionItem;

  if (!isMetadataOfType(metadata, "language")) return null;

  return (
    <div
      className={cn(
        "block p-4 bg-gray-800 hover:bg-gray-700 transition-colors",
        className
      )}
    >
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg text-gray-100">
          {metadata.title}
        </h3>
        <p className="text-base text-gray-300">
          {metadata.level === "advanced" && "Avançado"}
          {metadata.level === "intermediate" && "Intermediário"}
          {metadata.level === "beginner" && "Iniciante"}
          {metadata.level === "native" && "Nativo"}
        </p>
        {metadata.description && (
          <p className="text-sm text-gray-400">{metadata.description}</p>
        )}
      </div>
    </div>
  );
}
