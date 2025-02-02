import { User } from "@/types/user-type";
import { create } from "zustand";

type UserStore = {
  user: User | undefined;

  setUser(user: User): void;

  updateUser(user: Partial<Pick<User, "name" | "email">>): void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: undefined,

  setUser: (user) => set({ user }),

  updateUser: (user) => {
    const updatedUser = get().user;

    if (!updatedUser) return;

    set({ user: { ...updatedUser, ...user } });
  },
}));
