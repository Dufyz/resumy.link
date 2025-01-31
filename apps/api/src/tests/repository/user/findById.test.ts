import { v4 } from "uuid";
import { userRepository } from "../../../infra/database/repositories/user.repository";

describe("User repository - Find by id", () => {
  it("Should successfully find a user by id", async () => {
    const baseUser = {
      name: "User",
      email: `${v4()}@email.com`,
    };

    const createdUserOrError = await userRepository.create({
      name: baseUser.name,
      email: baseUser.email,
    });

    if (createdUserOrError.isFailure()) {
      throw new Error(createdUserOrError.value.message);
    }

    const userOrError = await userRepository.findById(
      createdUserOrError.value.id
    );

    if (userOrError.isFailure()) {
      throw new Error(userOrError.value.message);
    }

    const user = userOrError.value;
    expect(user).toEqual({
      id: createdUserOrError.value.id.toString(),
      name: baseUser.name,
      email: baseUser.email,
      created_at: createdUserOrError.value.created_at,
      updated_at: createdUserOrError.value.updated_at,
    });
  });
});
