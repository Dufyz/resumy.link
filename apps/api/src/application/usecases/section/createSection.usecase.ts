import { Section } from "../../../domain/section";
import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { SectionRepository } from "../../interfaces/section.repository";

export const createSection =
  (sectionRepository: SectionRepository) =>
  async (
    body: Pick<Section, "portfolio_id" | "type" | "is_active">
  ): Promise<Either<RepositoryErrors, Section>> => {
    const sectionOrError = await sectionRepository.create({
      portfolio_id: body.portfolio_id,
      type: body.type,
      is_active: body.is_active,
    });

    if (sectionOrError.isFailure()) return failure(sectionOrError.value);

    const section = sectionOrError.value;
    return success(section);
  };
