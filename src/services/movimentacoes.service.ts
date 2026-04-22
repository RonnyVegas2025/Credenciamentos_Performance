import { supabase } from "@/lib/supabaseClient";

export async function listarMovimentacoes() {
  return await supabase
    .from("movimentacoes")
    .select("*")
    .order("data_movimentacao", { ascending: false });
}
