import {
  CreatePortfolioSectionSchema,
  UpdatePortfolioSectionSchema,
} from "@/schemas/portfolio-section-schema";
import api from "@/config/api";
import { PortfolioSection } from "@/types/portfolio-section-type";

export async function getPortfolioSectionsByPortfolioId(
  portfolioId: number
): Promise<{
  portfolio_sections: PortfolioSection[];
}> {
  const response = await api.get(
    `/portfolio-sections/portfolio/${portfolioId}`
  );

  return response.data;
}

export async function postPortfolioSection(
  body: CreatePortfolioSectionSchema
): Promise<{
  portfolio_section: PortfolioSection;
  message: string;
}> {
  const response = await api.post("/portfolio-sections", body);

  return response.data;
}

export async function patchPortfolioSection(
  id: number,
  body: UpdatePortfolioSectionSchema
): Promise<{
  portfolio_section: PortfolioSection;
  message: string;
}> {
  const response = await api.patch(`/portfolio-sections/${id}`, body);

  return response.data;
}

export async function deletePortfolioSection(id: number): Promise<{
  message: string;
}> {
  const response = await api.delete(`/portfolio-sections/${id}`);

  return response.data;
}
