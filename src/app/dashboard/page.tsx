import { supabase } from "@/lib/supabaseClient";

type CredenciamentoItem = {
  consultor: string | null;
  cidade: string | null;
  estado: string | null;
  comissao: number | string | null;
  cnpj?: string | null;
  data_cadastro?: string | null;
};

export default async function DashboardPage() {
  // 🔹 BUSCA DADOS DE CREDENCIAMENTOS IMPORTADOS
  const { data, error } = await supabase
    .from("credenciamentos_importados")
    .select("consultor, cidade, estado, comissao, cnpj, data_cadastro")
    .order("data_cadastro", { ascending: false });

  const credenciamentos: CredenciamentoItem[] = data || [];

  // 🔹 MÉTRICAS PRINCIPAIS
  const totalCred = credenciamentos.length;

  const totalComissao = credenciamentos.reduce((acc, item) => {
    return acc + Number(item.comissao || 0);
  }, 0);

  // 🔹 RANKING DE CONSULTORES
  const rankingConsultores = Object.values(
    credenciamentos.reduce((acc: Record<string, { consultor: string; total: number; comissao: number }>, item) => {
      const nomeConsultor = item.consultor || "Não informado";

      if (!acc[nomeConsultor]) {
        acc[nomeConsultor] = {
          consultor: nomeConsultor,
          total: 0,
          comissao: 0,
        };
      }

      acc[nomeConsultor].total += 1;
      acc[nomeConsultor].comissao += Number(item.comissao || 0);

      return acc;
    }, {})
  ).sort((a, b) => b.total - a.total);

  // 🔹 AGRUPAMENTO POR CIDADE
  const rankingCidades = Object.values(
    credenciamentos.reduce((acc: Record<string, { cidade: string; estado: string; total: number }>, item) => {
      const cidade = item.cidade || "Não informada";
      const estado = item.estado || "-";
      const chave = `${cidade}-${estado}`;

      if (!acc[chave]) {
        acc[chave] = {
          cidade,
          estado,
          total: 0,
        };
      }

      acc[chave].total += 1;

      return acc;
    }, {})
  ).sort((a, b) => b.total - a.total);

  // 🔹 BASE PREPARADA PARA CRUZAMENTO FUTURO
  // Quando você importar as movimentações/vendas, este bloco será substituído pela lógica real.
  const cruzamentoResumo = {
    credenciados: totalCred,
    comMovimento: 0,
    semMovimento: totalCred,
    percentualAtivacao: 0,
  };

  if (error) {
    return (
      <main style={{ padding: "24px" }}>
        <h1>Dashboard</h1>
        <div style={errorBoxStyle}>
          Erro ao carregar dados do dashboard: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "24px" }}>
      <h1>Dashboard</h1>

      {/* 🔹 CARDS PRINCIPAIS */}
      <div style={cardsGridStyle}>
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

        <Card title="Com Movimento">
          <h2>{cruzamentoResumo.comMovimento}</h2>
        </Card>

        <Card title="Sem Movimento">
          <h2>{cruzamentoResumo.semMovimento}</h2>
        </Card>
      </div>

      {/* 🔹 BLOCO DE CRUZAMENTO */}
      <section style={{ marginTop: "40px" }}>
        <h2>Cruzamento Credenciamento x Movimentação</h2>
        <div style={infoBoxStyle}>
          <p style={{ marginBottom: "8px" }}>
            Esta área já está preparada para o cruzamento com vendas/movimentações.
          </p>
          <p style={{ marginBottom: "8px" }}>
            Assim que você importar a base de movimentação, vamos calcular:
          </p>
          <ul style={{ paddingLeft: "20px" }}>
            <li>quantos credenciados realmente movimentaram</li>
            <li>quantos ficaram sem movimento</li>
            <li>percentual de ativação</li>
            <li>tempo entre credenciamento e primeira movimentação</li>
          </ul>
          <p style={{ marginTop: "12px", fontWeight: 600 }}>
            Ativação atual: {cruzamentoResumo.percentualAtivacao.toFixed(2)}%
          </p>
        </div>
      </section>

      {/* 🔹 RANKING DE CONSULTORES */}
      <section style={{ marginTop: "40px" }}>
        <h2>Ranking de Consultores</h2>

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Consultor</th>
                <th style={thStyle}>Credenciamentos</th>
                <th style={thStyle}>Comissão</th>
              </tr>
            </thead>
            <tbody>
              {rankingConsultores.map((item) => (
                <tr key={item.consultor}>
                  <td style={tdStyle}>{item.consultor}</td>
                  <td style={tdStyle}>{item.total}</td>
                  <td style={tdStyle}>
                    {item.comissao.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 🔹 RANKING POR CIDADE */}
      <section style={{ marginTop: "40px" }}>
        <h2>Credenciamentos por Cidade</h2>

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Cidade</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Total</th>
              </tr>
            </thead>
            <tbody>
              {rankingCidades.map((item) => (
                <tr key={`${item.cidade}-${item.estado}`}>
                  <td style={tdStyle}>{item.cidade}</td>
                  <td style={tdStyle}>{item.estado}</td>
                  <td style={tdStyle}>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

// 🔹 COMPONENTE CARD
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={cardStyle}>
      <h4 style={{ marginBottom: "10px" }}>{title}</h4>
      {children}
    </div>
  );
}

// 🔹 ESTILOS
const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #ddd",
};

const tableWrapperStyle = {
  overflowX: "auto" as const,
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  marginTop: "10px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const thStyle = {
  textAlign: "left" as const,
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  background: "#f9fafb",
  fontWeight: 700,
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #f0f0f0",
};

const infoBoxStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "20px",
  marginTop: "10px",
};

const errorBoxStyle = {
  background: "#fef2f2",
  color: "#991b1b",
  border: "1px solid #fecaca",
  padding: "16px",
  borderRadius: "12px",
  marginTop: "20px",
};
