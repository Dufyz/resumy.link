import api from "@/config/api";
import {
  CreatePortfolioSectionItemSchema,
  UpdatePortfolioSectionItemSchema,
} from "@/schemas/portfolio-section-item-schema";
import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

export async function postPortfolioSectionItem(
  body: CreatePortfolioSectionItemSchema
): Promise<{
  portfolio_section_item: PortfolioSectionItem;
  message: string;
}> {
  const response = await api.post("/portfolio-section-items", body);

  return response.data;
}

export async function patchPortfolioSectionItem(
  id: number,
  body: UpdatePortfolioSectionItemSchema
): Promise<{
  portfolio_section_item: PortfolioSectionItem;
  message: string;
}> {
  const response = await api.patch(`/portfolio-section-items/${id}`, body);

  return response.data;
}

export async function deletePortfolioSectionItem(id: number): Promise<{
  message: string;
}> {
  const response = await api.delete(`/portfolio-section-items/${id}`);

  return response.data;
}
