import { supabase } from "@/lib/supabaseClient";

export default async function DashboardPage() {
  // 🔹 BUSCA DADOS
  const { data } = await supabase
    .from("credenciamentos_importados")
    .select("consultor, cidade, estado, comissao");

  // 🔹 MÉTRICAS
  const totalCred = data?.length || 0;

  const totalComissao =
    data?.reduce((acc, item) => acc + Number(item.comissao || 0), 0) || 0;

  // 🔹 RANKING CONSULTOR
  const ranking = Object.values(
    (data || []).reduce((acc: any, item: any) => {
      if (!acc[item.consultor]) {
        acc[item.consultor] = {
          consultor: item.consultor,
          total: 0,
          comissao: 0,
        };
      }

      acc[item.consultor].total += 1;
      acc[item.consultor].comissao += Number(item.comissao || 0);

      return acc;
    }, {})
  ).sort((a: any, b: any) => b.total - a.total);

  // 🔹 AGRUPAMENTO POR CIDADE (MAPA DE CALOR BASE)
  const cidades = Object.values(
    (data || []).reduce((acc: any, item: any) => {
      const key = `${item.cidade}-${item.estado}`;

      if (!acc[key]) {
        acc[key] = {
          cidade: item.cidade,
          estado: item.estado,
          total: 0,
        };
      }

      acc[key].total += 1;

      return acc;
    }, {})
  ).sort((a: any, b: any) => b.total - a.total);

  return (
    <main style={{ padding: "24px" }}>
      <h1>Dashboard</h1>

      {/* 🔹 CARDS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card title="Total Credenciamentos">
          <h2>{totalCred}</h2>
        </Card>

        <Card title="Comissão Total">
          <h2>
            {totalComissao.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h2>
        </Card>
      </div>

      {/* 🔹 RANKING CONSULTOR */}
      <h2 style={{ marginTop: "40px" }}>Ranking de Consultores</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Consultor</th>
            <th>Credenciamentos</th>
            <th>Comissão</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((r: any) => (
            <tr key={r.consultor}>
              <td>{r.consultor}</td>
              <td>{r.total}</td>
              <td>
                {r.comissao.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 CREDENCIAMENTOS POR CIDADE */}
      <h2 style={{ marginTop: "40px" }}>Credenciamentos por Cidade</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cidades.map((c: any) => (
            <tr key={c.cidade + c.estado}>
              <td>{c.cidade}</td>
              <td>{c.estado}</td>
              <td>{c.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

// 🔹 COMPONENTE CARD
function Card({ title, children }: any) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #ddd",
        minWidth: "200px",
      }}
    >
      <h4>{title}</h4>
      {children}
    </div>
  );
}

// 🔹 ESTILO TABELA
const tableStyle = {
  marginTop: "10px",
  width: "100%",
  borderCollapse: "collapse" as const,
};
