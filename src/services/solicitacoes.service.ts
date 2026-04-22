import { supabase } from "@/lib/supabaseClient";

export async function listarSolicitacoes() {
  return await supabase
    .from("solicitacoes_credenciamento")
    .select("*")
    .order("created_at", { ascending: false });
}
