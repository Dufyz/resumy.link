/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/api";
import { ApiError } from "@/errors/api-error";
import { Either, failure, success } from "@/lib/either";
import {
  CreatePortfolioSchema,
  UpdatePortfolioSchema,
} from "@/schemas/portfolio-schema";
import { Portfolio } from "@/types/portfolio-type";

export async function getPortfoliosByUserId(id: number): Promise<
  Either<
    ApiError,
    {
      portfolio: Portfolio;
      message: string;
    }
  >
> {
  try {
    const response = await api.get(`/portfolios/user/${id}`);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function getPortfolioById(id: number): Promise<
  Either<
    ApiError,
    {
      portfolio: Portfolio;
      message: string;
    }
  >
> {
  try {
    const response = await api.get(`/portfolios/${id}`);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function getPortfolioByUsername(username: string): Promise<
  Either<
    ApiError,
    {
      portfolio: Portfolio;
      message: string;
    }
  >
> {
  try {
    const response = await api.get(`/portfolios/username/${username}`);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function postPortfolio(body: CreatePortfolioSchema): Promise<
  Either<
    ApiError,
    {
      portfolio: Portfolio;
      message: string;
    }
  >
> {
  try {
    const response = await api.post("/portfolios", body);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function postCheckPortfolioUsernameAvailability(
  username: string
): Promise<
  Either<
    ApiError,
    {
      available: boolean;
      message: string;
    }
  >
> {
  try {
    const response = await api.post("/portfolios/check-username-availability", {
      username,
    });

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}

export async function patchPortfolio(
  id: number,
  body: UpdatePortfolioSchema
): Promise<
  Either<
    ApiError,
    {
      portfolio: Portfolio;
      message: string;
    }
  >
> {
  try {
    const response = await api.patch(`/portfolios/${id}`, body);

    return success(response.data);
  } catch (error: any) {
    return failure({
      status: error.response.status,
      message: error.response.data,
    });
  }
}
