import { v4 } from "uuid";
import { userRepository } from "../../../infra/database/repositories/user.repository";

describe("User repository - Create", () => {
  it("Should successfully create a user", async () => {
    const baseUser = {
      name: "User",
      username: v4(),
      email: `${v4()}@email.com`,
    };

    const userOrError = await userRepository.create({
      name: baseUser.name,
      username: baseUser.username,
      email: baseUser.email,
    });

    if (userOrError.isFailure()) {
      throw new Error(userOrError.value.message);
    }

    const user = userOrError.value;
    expect(user).toEqual({
      id: expect.any(String),
      name: baseUser.name,
      username: baseUser.username,
      email: baseUser.email,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
