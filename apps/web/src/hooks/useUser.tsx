"use client";

import { useUserStore } from "@/stores/user-store";

export default function useUser() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const updateUser = useUserStore((state) => state.updateUser);

  function purchasePlan() {}

  return { user, setUser, updateUser, purchasePlan };
}
