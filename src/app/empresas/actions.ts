"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL nao configurada.");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY nao configurada.");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

export async function criarEmpresa(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const razao_social = String(formData.get("razao_social") || "").trim();
  const nome_fantasia = String(formData.get("nome_fantasia") || "").trim();
  const cnpj = String(formData.get("cnpj") || "").trim();
  const cidade = String(formData.get("cidade") || "").trim();
  const estado = String(formData.get("estado") || "").trim().toUpperCase();
  const consultor_responsavel = String(formData.get("consultor_responsavel") || "").trim();
  const equipe_responsavel = String(formData.get("equipe_responsavel") || "").trim();
  const status = String(formData.get("status") || "Ativa").trim();
  const previsao_movimentacao = Number(
    String(formData.get("previsao_movimentacao") || "0").replace(",", ".")
  );
  const qtde_colaboradores = Number(formData.get("qtde_colaboradores") || 0);
  const observacoes = String(formData.get("observacoes") || "").trim();

  if (!razao_social) {
    throw new Error("Razao social obrigatoria.");
  }

  if (!cnpj) {
    throw new Error("CNPJ obrigatorio.");
  }

  const { error } = await supabase.from("empresas_clientes").insert({
    razao_social,
    nome_fantasia: nome_fantasia || null,
    cnpj,
    cidade: cidade || null,
    estado: estado || null,
    consultor_responsavel: consultor_responsavel || null,
    equipe_responsavel: equipe_responsavel || null,
    status,
    previsao_movimentacao: Number.isFinite(previsao_movimentacao)
      ? previsao_movimentacao
      : 0,
    qtde_colaboradores: Number.isFinite(qtde_colaboradores)
      ? qtde_colaboradores
      : 0,
    observacoes: observacoes || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/empresas");
}
