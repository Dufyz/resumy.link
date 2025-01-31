import { Either, failure, success } from "../../../shared/utils/either";
import { RepositoryErrors } from "../../errors";
import { SectionRepository } from "../../interfaces/section.repository";

export const deleteSection =
  (sectionRepository: SectionRepository) =>
  async (id: number): Promise<Either<RepositoryErrors, void>> => {
    const sectionOrError = await sectionRepository.delete(id);

    if (sectionOrError.isFailure()) return failure(sectionOrError.value);

    return success(undefined);
  };
