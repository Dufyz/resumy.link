import z from "zod";
import { Request, Response } from "express";
import {
  deletePortfolioSectionItemSchema,
  getPortfolioSectionItemsByPortfolioIdSchema,
  patchPortfolioSectionItemSchema,
  postPortfolioSectionItemSchema,
} from "../validators/schemas/portfolio_section_item";
import {
  createPortfolioSectionItem,
  deletePortfolioSectionItem,
  updatePortfolioSectionItem,
} from "../../application/usecases/portfolio/portfolio_section_item";
import { portfolioSectionItemRepository } from "../../infra/database/repositories/portfolio_section_item.repository";
import { listPortfolioSectionItemsByPortfolioId } from "../../application/usecases/portfolio/portfolio_section_item/listPortfolioSectionItemsByPortfolioId.usecase";

export async function handleGetPortfolioSectionItemsByPortfolioId(
  req: Request,
  res: Response
) {
  const { portfolio_id } = req.params as unknown as z.infer<
    typeof getPortfolioSectionItemsByPortfolioIdSchema
  >["params"];

  const portfolioSectionItemsOrError =
    await listPortfolioSectionItemsByPortfolioId(
      portfolioSectionItemRepository
    )(portfolio_id);

  if (portfolioSectionItemsOrError.isFailure()) {
    res
      .status(400)
      .json({ message: portfolioSectionItemsOrError.value.message });
    return;
  }

  const portfolioSectionItems = portfolioSectionItemsOrError.value;
  res.status(201).json({
    portfolio_section_items: portfolioSectionItems,
  });
}

export async function handlePostPortfolioSectionItem(
  req: Request,
  res: Response
) {
  const { portfolio_id, portfolio_section_id, is_active } =
    req.body as unknown as z.infer<
      typeof postPortfolioSectionItemSchema
    >["body"];

  const portfolioSectionItemOrError = await createPortfolioSectionItem(
    portfolioSectionItemRepository
  )({
    portfolio_id,
    portfolio_section_id,
    is_active,
  });

  if (portfolioSectionItemOrError.isFailure()) {
    res
      .status(400)
      .json({ message: portfolioSectionItemOrError.value.message });
    return;
  }

  const portfolioSectionItem = portfolioSectionItemOrError.value;
  res.status(201).json({
    portfolio_section_item: portfolioSectionItem,
    message: "Portfolio Section Item created",
  });
}

export async function handlePatchPortfolioSectionItem(
  req: Request,
  res: Response
) {
  const { id } = req.params as unknown as z.infer<
    typeof patchPortfolioSectionItemSchema
  >["params"];
  const { is_active } = req.body as unknown as z.infer<
    typeof patchPortfolioSectionItemSchema
  >["body"];

  const portfolioSectionItemOrError = await updatePortfolioSectionItem(
    portfolioSectionItemRepository
  )(id, { is_active });

  if (portfolioSectionItemOrError.isFailure()) {
    res
      .status(404)
      .json({ message: portfolioSectionItemOrError.value.message });
    return;
  }

  const portfolioSectionItem = portfolioSectionItemOrError.value;
  res.status(200).json({
    portfolio_section_item: portfolioSectionItem,
    message: "Portfolio Section Item updated",
  });
}

export async function handleDeletePortfolioSectionItem(
  req: Request,
  res: Response
) {
  const { id } = req.params as unknown as z.infer<
    typeof deletePortfolioSectionItemSchema
  >["params"];

  const portfolioSectionItemOrError = await deletePortfolioSectionItem(
    portfolioSectionItemRepository
  )(id);

  if (portfolioSectionItemOrError.isFailure()) {
    res
      .status(404)
      .json({ message: portfolioSectionItemOrError.value.message });
    return;
  }

  res.status(200).json({
    message: "Portfolio Section Item deleted",
  });
}
