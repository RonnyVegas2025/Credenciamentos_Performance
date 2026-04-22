import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type CredenciamentoGestao = {
  id: string;
  nome_fantasia: string | null;
  cnpj: string | null;
  cidade: string | null;
  estado: string | null;
  consultor: string | null;
  departamento_solicitante: string | null;
  empresa_solicitante: string | null;
  apto_transacionar: boolean | null;
  esta_movimentando: boolean | null;
  status_credenciamento: string | null;
};

export default async function CredenciamentosPage() {
  const { data, error } = await supabase
    .from("credenciamentos_gestao")
    .select(
      "id, nome_fantasia, cnpj, cidade, estado, consultor, departamento_solicitante, empresa_solicitante, apto_transacionar, esta_movimentando, status_credenciamento"
    )
    .order("nome_fantasia", { ascending: true });

  const credenciamentos: CredenciamentoGestao[] = data || [];

  if (error) {
    return (
      <main style={mainStyle}>
        <h1 style={titleStyle}>Gestão de Credenciamentos</h1>
        <div style={errorBoxStyle}>Erro ao carregar dados: {error.message}</div>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Gestão de Credenciamentos</h1>
          <p style={subtitleStyle}>
            Consulta administrativa dos comércios credenciados.
          </p>
        </div>

        <Link href="/" style={backButtonStyle}>
          Voltar ao painel
        </Link>
      </div>

      {/* Bloco visual de busca/filtros */}
      <section style={filterCardStyle}>
        <h2 style={sectionTitleStyle}>Busca e Filtros</h2>

        <div style={filtersGridStyle}>
          <div>
            <label style={labelStyle}>Buscar por nome ou CNPJ</label>
            <input
              type="text"
              placeholder="Ex: Mercado Central ou 12345678000199"
              style={inputStyle}
              disabled
            />
          </div>

          <div>
            <label style={labelStyle}>Departamento solicitante</label>
            <select style={inputStyle} disabled defaultValue="">
              <option value="">Todos</option>
              <option value="Pós-Vendas">Pós-Vendas</option>
              <option value="Venda Nova">Venda Nova</option>
              <option value="Inside">Inside</option>
              <option value="Canal de Vendas">Canal de Vendas</option>
              <option value="Cliente Vegas">Cliente Vegas</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Status operacional</label>
            <select style={inputStyle} disabled defaultValue="">
              <option value="">Todos</option>
              <option value="Apto">Apto</option>
              <option value="Não Apto">Não Apto</option>
              <option value="Movimentando">Movimentando</option>
              <option value="Sem Movimento">Sem Movimento</option>
            </select>
          </div>
        </div>

        <p style={hintStyle}>
          Esses filtros estão desenhados na tela e no próximo passo vamos
          deixá-los funcionais de verdade.
        </p>
      </section>

      {/* Resumo */}
      <section style={cardsGridStyle}>
        <SummaryCard
          title="Total de Comércios"
          value={String(credenciamentos.length)}
        />
        <SummaryCard
          title="Aptos para Transacionar"
          value={String(
            credenciamentos.filter((item) => item.apto_transacionar).length
          )}
        />
        <SummaryCard
          title="Com Movimento"
          value={String(
            credenciamentos.filter((item) => item.esta_movimentando).length
          )}
        />
        <SummaryCard
          title="Sem Movimento"
          value={String(
            credenciamentos.filter((item) => !item.esta_movimentando).length
          )}
        />
      </section>

      {/* Tabela */}
      <section style={sectionBlockStyle}>
        <h2 style={sectionTitleStyle}>Lista de Comércios Credenciados</h2>

        {credenciamentos.length === 0 ? (
          <div style={emptyBoxStyle}>Nenhum comércio encontrado.</div>
        ) : (
          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Comércio</th>
                  <th style={thStyle}>CNPJ</th>
                  <th style={thStyle}>Cidade</th>
                  <th style={thStyle}>UF</th>
                  <th style={thStyle}>Consultor</th>
                  <th style={thStyle}>Departamento</th>
                  <th style={thStyle}>Empresa</th>
                  <th style={thStyle}>Apto</th>
                  <th style={thStyle}>Movimentando</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {credenciamentos.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>
                      <Link
                        href={`/credenciamentos/${item.id}`}
                        style={linkStyle}
                      >
                        {item.nome_fantasia || "Sem nome"}
                      </Link>
                    </td>
                    <td style={tdStyle}>{item.cnpj || "-"}</td>
                    <td style={tdStyle}>{item.cidade || "-"}</td>
                    <td style={tdStyle}>{item.estado || "-"}</td>
                    <td style={tdStyle}>{item.consultor || "-"}</td>
                    <td style={tdStyle}>
                      {item.departamento_solicitante || "-"}
                    </td>
                    <td style={tdStyle}>{item.empresa_solicitante || "-"}</td>
                    <td style={tdStyle}>
                      <StatusBadge
                        text={item.apto_transacionar ? "Sim" : "Não"}
                        type={item.apto_transacionar ? "success" : "neutral"}
                      />
                    </td>
                    <td style={tdStyle}>
                      <StatusBadge
                        text={item.esta_movimentando ? "Sim" : "Não"}
                        type={item.esta_movimentando ? "success" : "warning"}
                      />
                    </td>
                    <td style={tdStyle}>
                      <StatusBadge
                        text={item.status_credenciamento || "Pendente"}
                        type="neutral"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div style={summaryCardStyle}>
      <div style={summaryTitleStyle}>{title}</div>
      <div style={summaryValueStyle}>{value}</div>
    </div>
  );
}

function StatusBadge({
  text,
  type,
}: {
  text: string;
  type: "success" | "warning" | "neutral";
}) {
  const background =
    type === "success"
      ? "#dcfce7"
      : type === "warning"
      ? "#fef3c7"
      : "#e5e7eb";

  const color =
    type === "success"
      ? "#166534"
      : type === "warning"
      ? "#92400e"
      : "#374151";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 10px",
        borderRadius: "999px",
        background,
        color,
        fontSize: "12px",
        fontWeight: 700,
      }}
    >
      {text}
    </span>
  );
}

const mainStyle = {
  padding: "24px",
  maxWidth: "1440px",
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

const filterCardStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const sectionTitleStyle = {
  fontSize: "24px",
  fontWeight: 800,
  marginBottom: "16px",
};

const filtersGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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
  background: "#f9fafb",
};

const hintStyle = {
  marginTop: "12px",
  color: "#6b7280",
  fontSize: "14px",
};

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  marginTop: "24px",
};

const summaryCardStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const summaryTitleStyle = {
  color: "#4b5563",
  fontWeight: 700,
  marginBottom: "10px",
};

const summaryValueStyle = {
  fontSize: "32px",
  fontWeight: 800,
};

const sectionBlockStyle = {
  marginTop: "32px",
};

const tableWrapperStyle = {
  overflowX: "auto" as const,
  background: "#fff",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const thStyle = {
  textAlign: "left" as const,
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
  background: "#f9fafb",
  fontWeight: 700,
  whiteSpace: "nowrap" as const,
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #f0f0f0",
  whiteSpace: "nowrap" as const,
};

const linkStyle = {
  textDecoration: "none",
  color: "#1d4ed8",
  fontWeight: 700,
};

const emptyBoxStyle = {
  background: "#fff",
  border: "1px dashed #d1d5db",
  padding: "24px",
  borderRadius: "12px",
};

const errorBoxStyle = {
  background: "#fef2f2",
  color: "#991b1b",
  border: "1px solid #fecaca",
  padding: "16px",
  borderRadius: "12px",
};
