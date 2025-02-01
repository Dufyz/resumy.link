import { createClient } from "@/lib/supabase/server";
import Teste from "./sign-out-button";

export default async function AdminPage() {
  const supabase = await createClient();

  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    return (
      <div>
        <h1>Admin</h1>
        <p>Você não está autenticado</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>Olá, {user.email}</p>
      <Teste />
    </div>
  );
}
