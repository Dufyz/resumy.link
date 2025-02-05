/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreatePortfolioSectionSchema,
  UpdatePortfolioSectionSchema,
} from "@/schemas/portfolio-section-schema";
import api from "@/config/api";
import { PortfolioSection } from "@/types/portfolio-section-type";
import { Either, failure, success } from "@/lib/either";
import { ApiError } from "@/errors/api-error";

export async function getPortfolioSectionsByPortfolioId(
  portfolioId: number
): Promise<
  Either<
    ApiError,
    {
      portfolio_sections: PortfolioSection[];
    }
  >
> {
  try {
    const response = await api.get(
      `/portfolio-sections/portfolio/${portfolioId}`
    );

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function postPortfolioSection(
  body: CreatePortfolioSectionSchema
): Promise<
  Either<
    ApiError,
    {
      portfolio_section: PortfolioSection;
      message: string;
    }
  >
> {
  try {
    const response = await api.post("/portfolio-sections", body);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function patchPortfolioSection(
  id: number,
  body: UpdatePortfolioSectionSchema
): Promise<
  Either<
    ApiError,
    {
      portfolio_section: PortfolioSection;
      message: string;
    }
  >
> {
  try {
    const response = await api.patch(`/portfolio-sections/${id}`, body);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function deletePortfolioSection(id: number): Promise<
  Either<
    ApiError,
    {
      message: string;
    }
  >
> {
  try {
    const response = await api.delete(`/portfolio-sections/${id}`);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}
