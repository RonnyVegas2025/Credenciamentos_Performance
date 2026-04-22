import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function CredenciamentosPage() {
  const { data, error } = await supabase
    .from("credenciamentos_gestao")
    .select("id, nome_fantasia, cnpj, cidade, estado, consultor, departamento_solicitante, apto_transacionar, esta_movimentando")
    .order("nome_fantasia", { ascending: true });

  return (
    <main style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "40px", fontWeight: 800, marginBottom: "8px" }}>
        Gestão de Credenciamentos
      </h1>
      <p style={{ marginBottom: "24px", color: "#4b5563" }}>
        Lista de comércios credenciados para acompanhamento administrativo.
      </p>

      {error ? (
        <div style={errorBoxStyle}>Erro ao carregar dados: {error.message}</div>
      ) : !data || data.length === 0 ? (
        <div style={emptyBoxStyle}>Nenhum comércio encontrado.</div>
      ) : (
        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Nome Fantasia</th>
                <th style={thStyle}>CNPJ</th>
                <th style={thStyle}>Cidade</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Consultor</th>
                <th style={thStyle}>Departamento</th>
                <th style={thStyle}>Apto</th>
                <th style={thStyle}>Movimentando</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td style={tdStyle}>
                    <Link
                      href={`/credenciamentos/${item.id}`}
                      style={{ color: "#1d4ed8", textDecoration: "none", fontWeight: 600 }}
                    >
                      {item.nome_fantasia}
                    </Link>
                  </td>
                  <td style={tdStyle}>{item.cnpj}</td>
                  <td style={tdStyle}>{item.cidade || "-"}</td>
                  <td style={tdStyle}>{item.estado || "-"}</td>
                  <td style={tdStyle}>{item.consultor || "-"}</td>
                  <td style={tdStyle}>{item.departamento_solicitante || "-"}</td>
                  <td style={tdStyle}>{item.apto_transacionar ? "Sim" : "Não"}</td>
                  <td style={tdStyle}>{item.esta_movimentando ? "Sim" : "Não"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

const tableWrapperStyle = {
  overflowX: "auto" as const,
  background: "#fff",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
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
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #f0f0f0",
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
