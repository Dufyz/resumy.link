"use client";

import { signOut } from "../login/actions/sign-out-action";

export default function Teste() {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
    >
      {" "}
      Logout{" "}
    </button>
  );
}
