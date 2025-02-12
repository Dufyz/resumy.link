import { cn } from "@/lib/utils";
import { isMetadataOfType } from "@/lib/utils/isMetadataOfType";
import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

export default function PortfolioSectionItemCourse({
  portfolioSectionItem,
  className,
}: {
  portfolioSectionItem: PortfolioSectionItem;
  className?: string;
}) {
  const { metadata } = portfolioSectionItem;

  if (!isMetadataOfType(metadata, "course")) return null;

  return (
    <div
      className={cn(
        "block p-4 bg-gray-800 shadow-md hover:bg-gray-700 transition-colors",
        className
      )}
    >
      <h3 className="font-semibold text-lg text-gray-100 flex gap-2">
        {metadata.title}
      </h3>
      <div className="flex flex-col gap-2 text-gray-400">
        <div className="flex items-center gap-2">
          <p>{metadata.organization}</p>
          <span>•</span>
          <div className="flex items-center gap-2">
            <p>
              {new Date(metadata.start_date).toLocaleDateString("pt-BR", {
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <span>-</span>
            <p>
              {metadata.end_date
                ? new Date(metadata.end_date).toLocaleDateString("pt-BR", {
                    month: "2-digit",
                    year: "numeric",
                  })
                : "atual"}
            </p>
          </div>
        </div>
        {metadata.description && (
          <p className="text-sm text-gray-500">{metadata.description}</p>
        )}
      </div>
    </div>
  );
}
