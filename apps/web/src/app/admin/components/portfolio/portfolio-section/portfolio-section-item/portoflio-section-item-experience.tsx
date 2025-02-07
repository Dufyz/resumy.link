import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

function isExperienceMetadata(
  metadata: PortfolioSectionItem["metadata"]
): metadata is Extract<
  PortfolioSectionItem["metadata"],
  { type: "experience" }
> {
  return metadata.type === "experience";
}

export default function PortfolioSectionItemExperience({
  portfolioSectionItem,
}: {
  portfolioSectionItem: PortfolioSectionItem;
}) {
  const { metadata } = portfolioSectionItem;

  if (!isExperienceMetadata(metadata)) return null;

  return (
    <div>
      <div className="flex gap-2">
        <p>{metadata.organization}</p>
        <span>•</span>
        <div className="flex gap-2">
          <p>{new Date(metadata.start_date).getFullYear()}</p>
          <span>-</span>
          <p>
            {metadata.end_date
              ? new Date(metadata.end_date).getFullYear()
              : "atual"}
          </p>
        </div>
      </div>
      <div>
        <p>{metadata.description}</p>
      </div>
    </div>
  );
}
