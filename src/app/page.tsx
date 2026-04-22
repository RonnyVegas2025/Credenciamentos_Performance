import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type CredenciamentoItem = {
  consultor: string | null;
  cidade: string | null;
  estado: string | null;
  comissao: number | string | null;
  cnpj?: string | null;
  data_cadastro?: string | null;
};

type RankingConsultor = {
  consultor: string;
  total: number;
  comissao: number;
};

type RankingCidade = {
  cidade: string;
  estado: string;
  total: number;
};

export default async function HomePage() {
  const { data, error } = await supabase
    .from("credenciamentos_importados")
    .select("consultor, cidade, estado, comissao, cnpj, data_cadastro")
    .order("data_cadastro", { ascending: false });

  const credenciamentos: CredenciamentoItem[] = data || [];

  const totalCred = credenciamentos.length;

  const totalComissao = credenciamentos.reduce((acc, item) => {
    return acc + Number(item.comissao || 0);
  }, 0);

  const rankingConsultores: RankingConsultor[] = Object.values(
    credenciamentos.reduce(
      (
        acc: Record<string, RankingConsultor>,
        item: CredenciamentoItem
      ) => {
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
      },
      {}
    )
  ).sort((a, b) => b.total - a.total);

  const rankingCidades: RankingCidade[] = Object.values(
    credenciamentos.reduce(
      (acc: Record<string, RankingCidade>, item: CredenciamentoItem) => {
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
      },
      {}
    )
  ).sort((a, b) => b.total - a.total);

  const liderConsultor = rankingConsultores[0] || null;
  const liderCidade = rankingCidades[0] || null;
  const top10Cidades = rankingCidades.slice(0, 10);

  if (error) {
    return (
      <main style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        <h1>Painel de Credenciamentos</h1>
        <div style={errorBoxStyle}>
          Erro ao carregar dados: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Painel de Credenciamentos</h1>
        <p style={subtitleStyle}>
          Visão geral administrativa e comercial dos credenciamentos.
        </p>
      </div>

      <section style={menuGridStyle}>
        <MenuCard
          title="Gestão de Credenciamentos"
          description="Consultar comércios, abrir ficha completa e acompanhar status."
          href="/credenciamentos"
        />
        <MenuCard
          title="Importações"
          description="Visualizar base importada do Supabase."
          href="/importacoes/credenciamentos"
        />
        <MenuCard
          title="Dashboard"
          description="Abrir a página separada do dashboard, se quiser manter."
          href="/dashboard"
        />
      </section>

      <section style={cardsGridStyle}>
        <Card title="Total Credenciamentos">
          <MetricValue>{totalCred}</MetricValue>
        </Card>

        <Card title="Comissão Total">
          <MetricValue>
            {totalComissao.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </MetricValue>
        </Card>

        <Card title="Consultor Líder">
          <MetricValueSmall>
            {liderConsultor ? liderConsultor.consultor : "-"}
          </MetricValueSmall>
          <MetricLabel>
            {liderConsultor ? `${liderConsultor.total} credenciamentos` : ""}
          </MetricLabel>
        </Card>

        <Card title="Cidade Líder">
          <MetricValueSmall>
            {liderCidade
              ? `${liderCidade.cidade} - ${liderCidade.estado}`
              : "-"}
          </MetricValueSmall>
          <MetricLabel>
            {liderCidade ? `${liderCidade.total} credenciamentos` : ""}
          </MetricLabel>
        </Card>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Ranking de Consultores</h2>

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

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Top 10 Cidades por Credenciamento</h2>

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
              {top10Cidades.map((item) => (
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

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Leitura Estratégica</h2>
        <div style={infoBoxStyle}>
          <p style={paragraphStyle}>
            Esta página inicial já funciona como painel principal do sistema.
          </p>
          <p style={paragraphStyle}>
            O próximo passo é integrar a ficha administrativa do credenciado com
            campos como departamento solicitante, empresa vinculada, apto para
            transacionar e status de movimentação.
          </p>
        </div>
      </section>
    </main>
  );
}

function MenuCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} style={menuCardStyle}>
      <div style={menuCardTitleStyle}>{title}</div>
      <div style={menuCardDescriptionStyle}>{description}</div>
    </Link>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={cardStyle}>
      <h4 style={cardTitleStyle}>{title}</h4>
      {children}
    </div>
  );
}

function MetricValue({ children }: { children: React.ReactNode }) {
  return <div style={metricValueStyle}>{children}</div>;
}

function MetricValueSmall({ children }: { children: React.ReactNode }) {
  return <div style={metricValueSmallStyle}>{children}</div>;
}

function MetricLabel({ children }: { children: React.ReactNode }) {
  return <div style={metricLabelStyle}>{children}</div>;
}

const mainStyle = {
  padding: "24px",
  maxWidth: "1400px",
  margin: "0 auto",
};

const headerStyle = {
  marginBottom: "24px",
};

const titleStyle = {
  fontSize: "42px",
  fontWeight: 800,
  marginBottom: "8px",
};

const subtitleStyle = {
  fontSize: "20px",
  color: "#374151",
};

const menuGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "16px",
  marginBottom: "24px",
};

const menuCardStyle = {
  display: "block",
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "20px",
  textDecoration: "none",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const menuCardTitleStyle = {
  fontSize: "18px",
  fontWeight: 800,
  color: "#111827",
  marginBottom: "8px",
};

const menuCardDescriptionStyle = {
  color: "#4b5563",
  lineHeight: 1.5,
};

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const cardTitleStyle = {
  marginBottom: "12px",
  fontSize: "18px",
  fontWeight: 700,
};

const metricValueStyle = {
  fontSize: "38px",
  fontWeight: 800,
};

const metricValueSmallStyle = {
  fontSize: "24px",
  fontWeight: 800,
  lineHeight: 1.3,
};

const metricLabelStyle = {
  marginTop: "8px",
  color: "#4b5563",
  fontSize: "14px",
};

const sectionStyle = {
  marginTop: "40px",
};

const sectionTitleStyle = {
  fontSize: "30px",
  fontWeight: 800,
  marginBottom: "14px",
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
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #f0f0f0",
};

const infoBoxStyle = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const paragraphStyle = {
  marginBottom: "10px",
  lineHeight: 1.6,
  color: "#374151",
};

const errorBoxStyle = {
  background: "#fef2f2",
  color: "#991b1b",
  border: "1px solid #fecaca",
  padding: "16px",
  borderRadius: "12px",
  marginTop: "20px",
};
