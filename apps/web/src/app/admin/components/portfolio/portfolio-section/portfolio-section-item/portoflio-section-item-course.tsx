import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

function isCourseMetadata(
  metadata: PortfolioSectionItem["metadata"]
): metadata is Extract<PortfolioSectionItem["metadata"], { type: "course" }> {
  return metadata.type === "course";
}

export default function PortfolioSectionItemCourse({
  portfolioSectionItem,
}: {
  portfolioSectionItem: PortfolioSectionItem;
}) {
  const { metadata } = portfolioSectionItem;

  if (!isCourseMetadata(metadata)) return null;

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
