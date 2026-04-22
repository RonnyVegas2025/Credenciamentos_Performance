import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { atualizarCredenciamento } from "./actions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CredenciamentoDetalhePage({ params }: PageProps) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("credenciamentos_gestao")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <main style={mainStyle}>
        <div style={headerStyle}>
          <div>
            <h1 style={titleStyle}>Credenciamento</h1>
            <p style={subtitleStyle}>Registro não encontrado.</p>
          </div>

          <Link href="/credenciamentos" style={backButtonStyle}>
            Voltar
          </Link>
        </div>

        <div style={errorBoxStyle}>Registro não encontrado.</div>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>{data.nome_fantasia}</h1>
          <p style={subtitleStyle}>
            Ficha administrativa do comércio credenciado.
          </p>
        </div>

        <Link href="/credenciamentos" style={backButtonStyle}>
          Voltar para lista
        </Link>
      </div>

      <div style={gridStyle}>
        {/* Coluna esquerda - informações fixas */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Dados do Credenciamento</h2>

          <InfoRow label="CNPJ" value={data.cnpj} />
          <InfoRow
            label="Data de Cadastro"
            value={
              data.data_cadastro
                ? new Date(data.data_cadastro).toLocaleDateString("pt-BR")
                : "-"
            }
          />
          <InfoRow label="Cidade" value={data.cidade} />
          <InfoRow label="Estado" value={data.estado} />
          <InfoRow label="Consultor" value={data.consultor} />
          <InfoRow label="Captação" value={data.captacao} />
          <InfoRow label="Meio de Captura" value={data.meio_captura} />
          <InfoRow
            label="Taxa"
            value={data.taxa != null ? String(data.taxa) : "-"}
          />
          <InfoRow
            label="Comissão"
            value={
              data.comissao != null
                ? Number(data.comissao).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "-"
            }
          />
        </section>

        {/* Coluna direita - formulário de gestão */}
        <section style={cardStyle}>
          <h2 style={sectionTitleStyle}>Gestão Administrativa</h2>

          <form action={atualizarCredenciamento}>
            <input type="hidden" name="id" value={data.id} />

            <div style={formGridStyle}>
              <div>
                <label style={labelStyle}>Departamento Solicitante</label>
                <select
                  name="departamento_solicitante"
                  defaultValue={data.departamento_solicitante || ""}
                  style={inputStyle}
                >
                  <option value="">Selecione</option>
                  <option value="Pós-Vendas">Pós-Vendas</option>
                  <option value="Venda Nova">Venda Nova</option>
                  <option value="Inside">Inside</option>
                  <option value="Canal de Vendas">Canal de Vendas</option>
                  <option value="Cliente Vegas">Cliente Vegas</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Empresa Solicitante</label>
                <input
                  name="empresa_solicitante"
                  defaultValue={data.empresa_solicitante || ""}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Mov. Financeira Mensal</label>
                <input
                  name="movimentacao_financeira_mensal"
                  type="number"
                  step="0.01"
                  defaultValue={data.movimentacao_financeira_mensal ?? 0}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Status do Credenciamento</label>
                <select
                  name="status_credenciamento"
                  defaultValue={data.status_credenciamento || "Pendente"}
                  style={inputStyle}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Bloqueado">Bloqueado</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Apto para Transacionar</label>
                <select
                  name="apto_transacionar"
                  defaultValue={String(data.apto_transacionar ?? false)}
                  style={inputStyle}
                >
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Está Movimentando</label>
                <select
                  name="esta_movimentando"
                  defaultValue={String(data.esta_movimentando ?? false)}
                  style={inputStyle}
                >
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: "18px" }}>
              <label style={labelStyle}>Observações</label>
              <textarea
                name="observacoes"
                defaultValue={data.observacoes || ""}
                rows={6}
                style={textareaStyle}
              />
            </div>

            <div style={buttonRowStyle}>
              <button type="submit" style={saveButtonStyle}>
                Salvar alterações
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={infoLabelStyle}>{label}</div>
      <div style={infoValueStyle}>{value || "-"}</div>
    </div>
  );
}

const mainStyle = {
  padding: "24px",
  maxWidth: "1400px",
  margin: "0 auto",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  marginBottom: "24px",
};

const titleStyle = {
  fontSize: "40px",
  fontWeight: 800,
  marginBottom: "8px",
};

const subtitleStyle = {
  fontSize: "18px",
  color: "#4b5563",
};

const backButtonStyle = {
  textDecoration: "none",
  background: "#111827",
  color: "#fff",
  padding: "10px 14px",
  borderRadius: "10px",
  fontWeight: 700,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1.3fr",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const sectionTitleStyle = {
  fontSize: "24px",
  fontWeight: 800,
  marginBottom: "18px",
};

const infoLabelStyle = {
  fontWeight: 700,
  marginBottom: "4px",
};

const infoValueStyle = {
  color: "#374151",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "16px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: 700,
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  background: "#fff",
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  background: "#fff",
  resize: "vertical" as const,
};

const buttonRowStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
};

const saveButtonStyle = {
  background: "#1d4ed8",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  fontWeight: 700,
  cursor: "pointer",
};

const errorBoxStyle = {
  background: "#fef2f2",
  color: "#991b1b",
  border: "1px solid #fecaca",
  padding: "16px",
  borderRadius: "12px",
  marginTop: "20px",
};
