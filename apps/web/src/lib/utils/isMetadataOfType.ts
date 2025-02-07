import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

export function isMetadataOfType<
  T extends PortfolioSectionItem["metadata"]["type"]
>(
  metadata: PortfolioSectionItem["metadata"],
  type: T
): metadata is Extract<PortfolioSectionItem["metadata"], { type: T }> {
  return metadata.type === type;
}
