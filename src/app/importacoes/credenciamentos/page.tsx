import { supabase } from "@/lib/supabaseClient";

export default async function ImportacoesCredenciamentosPage() {
  const { data, error } = await supabase
    .from("credenciamentos_importados")
    .select("*")
    .order("data_cadastro", { ascending: false })
    .limit(200);

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
          <h1>Importação de Credenciamentos</h1>
          <p>Visualização dos registros importados no Supabase.</p>
        </div>
      </div>

      {error ? (
        <div style={errorBoxStyle}>
          Erro ao carregar importações: {error.message}
        </div>
      ) : !data || data.length === 0 ? (
        <div style={emptyBoxStyle}>Nenhum registro importado encontrado.</div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1400px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Contrato</th>
                <th style={thStyle}>CNPJ</th>
                <th style={thStyle}>Nome Fantasia</th>
                <th style={thStyle}>Data Cadastro</th>
                <th style={thStyle}>Cidade</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Taxa</th>
                <th style={thStyle}>Meio de Captura</th>
                <th style={thStyle}>Consultor</th>
                <th style={thStyle}>Comissão</th>
                <th style={thStyle}>Captação</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td style={tdStyle}>{item.contrato ?? "-"}</td>
                  <td style={tdStyle}>{item.cnpj ?? "-"}</td>
                  <td style={tdStyle}>{item.nome_fantasia ?? "-"}</td>
                  <td style={tdStyle}>
                    {item.data_cadastro
                      ? new Date(item.data_cadastro).toLocaleDateString("pt-BR")
                      : "-"}
                  </td>
                  <td style={tdStyle}>{item.cidade ?? "-"}</td>
                  <td style={tdStyle}>{item.estado ?? "-"}</td>
                  <td style={tdStyle}>
                    {item.taxa !== null && item.taxa !== undefined
                      ? Number(item.taxa).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "-"}
                  </td>
                  <td style={tdStyle}>{item.meio_captura ?? "-"}</td>
                  <td style={tdStyle}>{item.consultor ?? "-"}</td>
                  <td style={tdStyle}>
                    {item.comissao !== null && item.comissao !== undefined
                      ? Number(item.comissao).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : "-"}
                  </td>
                  <td style={tdStyle}>{item.captacao ?? "-"}</td>
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
  whiteSpace: "nowrap" as const,
};

const tdStyle = {
  borderBottom: "1px solid #f0f0f0",
  padding: "12px",
  whiteSpace: "nowrap" as const,
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
