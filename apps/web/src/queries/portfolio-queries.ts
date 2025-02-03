import api from "@/config/api";
import {
  CreatePortfolioSchema,
  UpdatePortfolioSchema,
} from "@/schemas/portfolio-schema";
import { Portfolio } from "@/types/portfolio-type";

export async function getPortfoliosByUserId(id: number): Promise<{
  portfolios: Portfolio[];
  message: string;
}> {
  const response = await api.get(`/portfolios/user/${id}`);

  return response.data;
}

export async function getPortfolioById(id: number): Promise<{
  portfolio: Portfolio;
  message: string;
}> {
  const response = await api.get(`/portfolios/${id}`);

  return response.data;
}

export async function getPortfolioByUsername(username: string): Promise<{
  portfolio: Portfolio;
  message: string;
}> {
  const response = await api.get(`/portfolios/name/${username}`);

  return response.data;
}

export async function postPortfolio(body: CreatePortfolioSchema): Promise<{
  portfolio: Portfolio;
  message: string;
}> {
  const response = await api.post("/portfolios", body);

  return response.data;
}

export async function patchPortfolio(
  id: number,
  body: UpdatePortfolioSchema
): Promise<{
  portfolio: Portfolio;
  message: string;
}> {
  const response = await api.patch(`/portfolios/${id}`, body);

  return response.data;
}
