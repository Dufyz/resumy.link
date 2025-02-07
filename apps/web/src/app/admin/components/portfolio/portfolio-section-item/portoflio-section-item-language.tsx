import { isMetadataOfType } from "@/lib/utils/isMetadataOfType";
import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

export default function PortfolioSectionItemLanguage({
  portfolioSectionItem,
}: {
  portfolioSectionItem: PortfolioSectionItem;
}) {
  const { metadata } = portfolioSectionItem;

  if (!isMetadataOfType(metadata, "language")) return null;

  return (
    <div className="flex flex-col gap-2">
      <p>
        {metadata.level === "advanced" && "Avançado"}
        {metadata.level === "intermediate" && "Intermediário"}
        {metadata.level === "beginner" && "Iniciante"}
        {metadata.level === "native" && "Nativo"}
      </p>
      <p>{metadata.description}</p>
    </div>
  );
}
