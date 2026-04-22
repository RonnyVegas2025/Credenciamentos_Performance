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

  // 🔹 PASSO 2 — CRIAR RANKING
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

      {/* 🔹 PASSO 3 — TABELA DE RANKING */}
      <h2 style={{ marginTop: "40px" }}>Ranking de Consultores</h2>

      <table style={{ marginTop: "10px", width: "100%" }}>
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
