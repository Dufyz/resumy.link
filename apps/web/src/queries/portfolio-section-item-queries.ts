/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/api";
import { ApiError } from "@/errors/api-error";
import { Either, failure, success } from "@/lib/either";
import {
  CreatePortfolioSectionItemSchema,
  UpdatePortfolioSectionItemSchema,
} from "@/schemas/portfolio-section-item-schema";
import { PortfolioSectionItem } from "@/types/portfolio-section-item-type";

export async function getPortfolioSectionItemsByPortfolioId(
  portfolioId: number
): Promise<
  Either<
    ApiError,
    {
      portfolio_section_items: PortfolioSectionItem[];
    }
  >
> {
  try {
    const response = await api.get(
      `/portfolio-section-items/portfolio/${portfolioId}`
    );

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function postPortfolioSectionItem(
  body: CreatePortfolioSectionItemSchema
): Promise<
  Either<
    ApiError,
    {
      portfolio_section_item: PortfolioSectionItem;
      message: string;
    }
  >
> {
  try {
    const response = await api.post("/portfolio-section-items", body);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function patchPortfolioSectionItem(
  id: number,
  body: UpdatePortfolioSectionItemSchema
): Promise<
  Either<
    ApiError,
    {
      portfolio_section_item: PortfolioSectionItem;
      message: string;
    }
  >
> {
  try {
    const response = await api.patch(`/portfolio-section-items/${id}`, body);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function deletePortfolioSectionItem(id: number): Promise<
  Either<
    ApiError,
    {
      message: string;
    }
  >
> {
  try {
    const response = await api.delete(`/portfolio-section-items/${id}`);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}
