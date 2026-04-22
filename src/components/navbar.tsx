import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "16px",
        padding: "16px 24px",
        background: "#111827",
      }}
    >
      <Link href="/" style={linkStyle}>Início</Link>
      <Link href="/empresas" style={linkStyle}>Empresas</Link>
      <Link href="/solicitacoes" style={linkStyle}>Solicitações</Link>
      <Link href="/credenciamentos" style={linkStyle}>Credenciamentos</Link>
      <Link href="/importacoes/credenciamentos" style={linkStyle}>Importações</Link>
      <Link href="/dashboard" style={linkStyle}>Dashboard</Link>
      <Link href="/ativacao" style={linkStyle}>Ativação</Link>
    </nav>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: 600,
};
