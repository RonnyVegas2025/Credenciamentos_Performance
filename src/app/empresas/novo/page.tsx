import Link from "next/link";
import { criarEmpresa } from "../actions";

export default function NovaEmpresaPage() {
  return (
    <main style={{ padding: "24px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1>Nova Empresa Cliente</h1>
        <p>Cadastre a empresa que irá gerar demanda de credenciamento.</p>
      </div>

      <form action={criarEmpresa} style={formStyle}>
        <div style={gridStyle}>
          <div>
            <label style={labelStyle}>Razão Social *</label>
            <input name="razao_social" required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Nome Fantasia</label>
            <input name="nome_fantasia" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>CNPJ *</label>
            <input name="cnpj" required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Cidade</label>
            <input name="cidade" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Estado</label>
            <input
              name="estado"
              maxLength={2}
              placeholder="SP"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Consultor Responsável</label>
            <input name="consultor_responsavel" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Equipe Responsável</label>
            <input
              name="equipe_responsavel"
              placeholder="Novas Vendas / Parcerias / Pos-venda"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" defaultValue="Ativa" style={inputStyle}>
              <option value="Ativa">Ativa</option>
              <option value="Implantacao">Implantação</option>
              <option value="Prospeccao">Prospecção</option>
              <option value="Inativa">Inativa</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Previsão de Movimentação</label>
            <input
              name="previsao_movimentacao"
              type="number"
              step="0.01"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Quantidade de Colaboradores</label>
            <input
              name="qtde_colaboradores"
              type="number"
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: "16px" }}>
          <label style={labelStyle}>Observações</label>
          <textarea
            name="observacoes"
            rows={5}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={actionsStyle}>
          <Link href="/empresas" style={secondaryButtonStyle}>
            Voltar
          </Link>
          <button type="submit" style={primaryButtonStyle}>
            Salvar empresa
          </button>
        </div>
      </form>
    </main>
  );
}

const formStyle = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  border: "1px solid #e5e5e5",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "16px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d0d0d0",
  borderRadius: "8px",
  background: "#fff",
};

const actionsStyle = {
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  marginTop: "20px",
};

const primaryButtonStyle = {
  background: "#1d4ed8",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  display: "inline-block",
  textDecoration: "none",
  background: "#f3f4f6",
  color: "#111827",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
};
