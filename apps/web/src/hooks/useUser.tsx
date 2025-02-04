"use client";

import { useUserStore } from "@/stores/user-store";

export default function useUser() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  return { user, setUser };
}
