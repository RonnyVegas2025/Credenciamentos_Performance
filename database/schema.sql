create extension if not exists "pgcrypto";

create table if not exists public.consultores (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  regiao text,
  equipe text,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.empresas_clientes (
  id uuid primary key default gen_random_uuid(),
  razao_social text not null,
  nome_fantasia text,
  cnpj varchar(20) not null unique,
  cidade text,
  estado varchar(2),
  consultor_responsavel text,
  equipe_responsavel text,
  status text not null default 'Ativa',
  previsao_movimentacao numeric(14,2) default 0,
  qtde_colaboradores integer default 0,
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.solicitacoes_credenciamento (
  id uuid primary key default gen_random_uuid(),
  empresa_cliente_id uuid not null references public.empresas_clientes(id) on delete restrict,
  solicitante_nome text not null,
  solicitante_equipe text,
  data_solicitacao date not null default current_date,
  cidade_alvo text,
  estado_alvo varchar(2),
  quantidade_estimada integer default 0,
  segmento_prioritario text,
  justificativa text,
  prioridade text not null default 'Media',
  prazo date,
  status text not null default 'Aberta',
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.credenciamentos (
  id uuid primary key default gen_random_uuid(),
  solicitacao_id uuid not null references public.solicitacoes_credenciamento(id) on delete restrict,
  empresa_cliente_id uuid not null references public.empresas_clientes(id) on delete restrict,
  cnpj varchar(20) not null unique,
  nome_fantasia text not null,
  data_cadastro date not null default current_date,
  cidade text,
  estado varchar(2),
  segmento text,
  taxa numeric(6,2),
  meio_captura text,
  consultor text not null,
  comissao numeric(10,2) not null default 0,
  status_ativacao text not null default 'Pendente',
  data_primeira_venda date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.movimentacoes (
  id uuid primary key default gen_random_uuid(),
  empresa_cliente_id uuid not null references public.empresas_clientes(id) on delete restrict,
  credenciamento_id uuid not null references public.credenciamentos(id) on delete cascade,
  cnpj varchar(20) not null,
  data_movimentacao date not null,
  valor numeric(14,2) not null default 0,
  quantidade_transacoes integer default 0,
  competencia varchar(7) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_empresas_clientes_cnpj on public.empresas_clientes(cnpj);
create index if not exists idx_solicitacoes_empresa on public.solicitacoes_credenciamento(empresa_cliente_id);
create index if not exists idx_credenciamentos_empresa on public.credenciamentos(empresa_cliente_id);
create index if not exists idx_credenciamentos_solicitacao on public.credenciamentos(solicitacao_id);
create index if not exists idx_credenciamentos_cidade_estado on public.credenciamentos(cidade, estado);
create index if not exists idx_movimentacoes_credenciamento on public.movimentacoes(credenciamento_id);
create index if not exists idx_movimentacoes_competencia on public.movimentacoes(competencia);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_consultores_updated_at on public.consultores;
create trigger trg_consultores_updated_at
before update on public.consultores
for each row execute function public.set_updated_at();

drop trigger if exists trg_empresas_clientes_updated_at on public.empresas_clientes;
create trigger trg_empresas_clientes_updated_at
before update on public.empresas_clientes
for each row execute function public.set_updated_at();

drop trigger if exists trg_solicitacoes_updated_at on public.solicitacoes_credenciamento;
create trigger trg_solicitacoes_updated_at
before update on public.solicitacoes_credenciamento
for each row execute function public.set_updated_at();

drop trigger if exists trg_credenciamentos_updated_at on public.credenciamentos;
create trigger trg_credenciamentos_updated_at
before update on public.credenciamentos
for each row execute function public.set_updated_at();

drop trigger if exists trg_movimentacoes_updated_at on public.movimentacoes;
create trigger trg_movimentacoes_updated_at
before update on public.movimentacoes
for each row execute function public.set_updated_at();

