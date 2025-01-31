import { Section } from "../../domain/section";
import { Either } from "../../shared/utils/either";
import { RepositoryErrors } from "../errors";

export type SectionRepository = {
  create(
    body: Pick<Section, "portfolio_id" | "type" | "is_active">
  ): Promise<Either<RepositoryErrors, Section>>;
  update(
    id: number,
    body: Partial<Pick<Section, "type" | "is_active">>
  ): Promise<Either<RepositoryErrors, Section>>;
  delete(id: number): Promise<Either<RepositoryErrors, void>>;
};
