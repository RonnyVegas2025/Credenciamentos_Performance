import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function EmpresasPage() {
  const { data, error } = await supabase
    .from("empresas_clientes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1>Empresas Clientes</h1>
          <p>Base das empresas que geram demanda para credenciamento.</p>
        </div>

        <Link href="/empresas/novo" style={primaryButtonStyle}>
          Nova empresa
        </Link>
      </div>

      {error ? (
        <div style={errorBoxStyle}>
          Erro ao carregar empresas: {error.message}
        </div>
      ) : !data || data.length === 0 ? (
        <div style={emptyBoxStyle}>Nenhuma empresa cadastrada ainda.</div>
      ) : (
        <div style={{ overflowX: "auto", background: "#fff", borderRadius: "12px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>CNPJ</th>
                <th style={thStyle}>Cidade</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Consultor</th>
                <th style={thStyle}>Equipe</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Previsão</th>
              </tr>
            </thead>
            <tbody>
              {data.map((empresa) => (
                <tr key={empresa.id}>
                  <td style={tdStyle}>
                    {empresa.nome_fantasia || empresa.razao_social}
                  </td>
                  <td style={tdStyle}>{empresa.cnpj}</td>
                  <td style={tdStyle}>{empresa.cidade || "-"}</td>
                  <td style={tdStyle}>{empresa.estado || "-"}</td>
                  <td style={tdStyle}>{empresa.consultor_responsavel || "-"}</td>
                  <td style={tdStyle}>{empresa.equipe_responsavel || "-"}</td>
                  <td style={tdStyle}>{empresa.status}</td>
                  <td style={tdStyle}>
                    {Number(empresa.previsao_movimentacao || 0).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

const thStyle = {
  borderBottom: "1px solid #e5e7eb",
  padding: "12px",
  textAlign: "left" as const,
  background: "#f9fafb",
  fontWeight: 700,
};

const tdStyle = {
  borderBottom: "1px solid #f0f0f0",
  padding: "12px",
};

const primaryButtonStyle = {
  textDecoration: "none",
  background: "#1d4ed8",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "8px",
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
