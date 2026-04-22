import { supabase } from "@/lib/supabaseClient";

export async function listarEmpresas() {
  return await supabase
    .from("empresas_clientes")
    .select("*")
    .order("created_at", { ascending: false });
}
