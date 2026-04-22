import { supabase } from "@/lib/supabaseClient";

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
      <main style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1>Credenciamento</h1>
        <div style={errorBoxStyle}>Registro não encontrado.</div>
      </main>
    );
  }

  return (
    <main style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "40px", fontWeight: 800, marginBottom: "8px" }}>
        {data.nome_fantasia}
      </h1>
      <p style={{ marginBottom: "24px", color: "#4b5563" }}>
        Detalhes administrativos do credenciamento.
      </p>

      <div style={gridStyle}>
        <InfoCard title="Dados do Comércio">
          <InfoRow label="CNPJ" value={data.cnpj} />
          <InfoRow label="Cidade" value={data.cidade} />
          <InfoRow label="Estado" value={data.estado} />
          <InfoRow
            label="Data Cadastro"
            value={
              data.data_cadastro
                ? new Date(data.data_cadastro).toLocaleDateString("pt-BR")
                : "-"
            }
          />
          <InfoRow label="Consultor" value={data.consultor} />
          <InfoRow label="Captação" value={data.captacao} />
        </InfoCard>

        <InfoCard title="Informações Comerciais">
          <InfoRow label="Taxa" value={data.taxa != null ? String(data.taxa) : "-"} />
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
          <InfoRow label="Meio de Captura" value={data.meio_captura} />
          <InfoRow label="Departamento Solicitante" value={data.departamento_solicitante} />
          <InfoRow label="Empresa Solicitante" value={data.empresa_solicitante} />
          <InfoRow
            label="Mov. Financeira Mensal"
            value={
              data.movimentacao_financeira_mensal != null
                ? Number(data.movimentacao_financeira_mensal).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "R$ 0,00"
            }
          />
        </InfoCard>

        <InfoCard title="Status Operacional">
          <InfoRow
            label="Apto para Transacionar"
            value={data.apto_transacionar ? "Sim" : "Não"}
          />
          <InfoRow
            label="Está Movimentando"
            value={data.esta_movimentando ? "Sim" : "Não"}
          />
          <InfoRow label="Status do Credenciamento" value={data.status_credenciamento} />
        </InfoCard>

        <InfoCard title="Observações">
          <p style={{ lineHeight: 1.6, color: "#374151" }}>
            {data.observacoes || "Sem observações."}
          </p>
        </InfoCard>
      </div>
    </main>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={cardStyle}>
      <h3 style={{ marginBottom: "16px", fontSize: "22px", fontWeight: 700 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ fontWeight: 700, marginBottom: "4px" }}>{label}</div>
      <div style={{ color: "#374151" }}>{value || "-"}</div>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const errorBoxStyle = {
  background: "#fef2f2",
  color: "#991b1b",
  border: "1px solid #fecaca",
  padding: "16px",
  borderRadius: "12px",
  marginTop: "20px",
};
