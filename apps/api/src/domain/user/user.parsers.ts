import { User } from "./user.entities";

export const parseUserFromDB = (user: User): User => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  created_at: user.created_at,
  updated_at: user.updated_at,
});
