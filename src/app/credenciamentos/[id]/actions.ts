"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL não configurada.");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY não configurada.");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

export async function atualizarCredenciamento(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const id = String(formData.get("id") || "").trim();

  if (!id) {
    throw new Error("ID do credenciamento não informado.");
  }

  const departamento_solicitante = String(
    formData.get("departamento_solicitante") || ""
  ).trim();

  const empresa_solicitante = String(
    formData.get("empresa_solicitante") || ""
  ).trim();

  const movimentacao_financeira_mensal = Number(
    String(formData.get("movimentacao_financeira_mensal") || "0").replace(",", ".")
  );

  const apto_transacionar =
    String(formData.get("apto_transacionar") || "") === "true";

  const esta_movimentando =
    String(formData.get("esta_movimentando") || "") === "true";

  const status_credenciamento = String(
    formData.get("status_credenciamento") || "Pendente"
  ).trim();

  const observacoes = String(formData.get("observacoes") || "").trim();

  const { error } = await supabase
    .from("credenciamentos_gestao")
    .update({
      departamento_solicitante: departamento_solicitante || null,
      empresa_solicitante: empresa_solicitante || null,
      movimentacao_financeira_mensal: Number.isFinite(
        movimentacao_financeira_mensal
      )
        ? movimentacao_financeira_mensal
        : 0,
      apto_transacionar,
      esta_movimentando,
      status_credenciamento: status_credenciamento || "Pendente",
      observacoes: observacoes || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/credenciamentos/${id}`);
  revalidatePath("/credenciamentos");
  revalidatePath("/");
  revalidatePath("/dashboard");
}
