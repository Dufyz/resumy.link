import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

function isLanguageMetadata(
  metadata: PortfolioSectionItem["metadata"]
): metadata is Extract<PortfolioSectionItem["metadata"], { type: "language" }> {
  return metadata.type === "language";
}

export default function PortfolioSectionItemLanguage({
  portfolioSectionItem,
}: {
  portfolioSectionItem: PortfolioSectionItem;
}) {
  const { metadata } = portfolioSectionItem;

  if (!isLanguageMetadata(metadata)) return null;

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
