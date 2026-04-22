import { supabase } from "@/lib/supabaseClient";

export default async function EmpresasPage() {
  const { data, error } = await supabase
    .from("empresas_clientes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main style={{ padding: "24px" }}>
        <h1>Empresas Clientes</h1>
        <p>Erro ao carregar empresas.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "24px" }}>
      <h1>Empresas Clientes</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          background: "#fff",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Nome Fantasia</th>
            <th style={thStyle}>CNPJ</th>
            <th style={thStyle}>Cidade</th>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Consultor</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((empresa) => (
            <tr key={empresa.id}>
              <td style={tdStyle}>{empresa.nome_fantasia || empresa.razao_social}</td>
              <td style={tdStyle}>{empresa.cnpj}</td>
              <td style={tdStyle}>{empresa.cidade}</td>
              <td style={tdStyle}>{empresa.estado}</td>
              <td style={tdStyle}>{empresa.consultor_responsavel}</td>
              <td style={tdStyle}>{empresa.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left" as const,
  background: "#f0f0f0",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};
