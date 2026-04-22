import { supabase } from "@/lib/supabaseClient";

export async function listarCredenciamentos() {
  return await supabase
    .from("credenciamentos")
    .select("*")
    .order("data_cadastro", { ascending: false });
}
