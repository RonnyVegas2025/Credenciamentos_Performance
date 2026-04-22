import { supabase } from "@/lib/supabaseClient";

export default async function DashboardPage() {
  const { data } = await supabase
    .from("credenciamentos_importados")
    .select("consultor, cidade, estado, comissao");

  const totalCred = data?.length || 0;

  const totalComissao =
    data?.reduce((acc, item) => acc + Number(item.comissao || 0), 0) || 0;

  return (
    <main style={{ padding: "24px" }}>
      <h1>Dashboard</h1>

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
    </main>
  );
}

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
