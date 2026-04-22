create or replace view public.vw_resumo_solicitacoes as
select
  s.id,
  s.empresa_cliente_id,
  e.nome_fantasia as empresa_cliente,
  s.solicitante_nome,
  s.cidade_alvo,
  s.estado_alvo,
  s.quantidade_estimada,
  s.status,
  s.prazo,
  count(c.id) as quantidade_credenciada
from public.solicitacoes_credenciamento s
join public.empresas_clientes e on e.id = s.empresa_cliente_id
left join public.credenciamentos c on c.solicitacao_id = s.id
group by s.id, e.nome_fantasia;

create or replace view public.vw_comissao_por_consultor as
select
  consultor,
  date_trunc('month', data_cadastro)::date as competencia,
  count(*) as total_credenciamentos,
  sum(comissao) as total_comissao
from public.credenciamentos
group by consultor, date_trunc('month', data_cadastro)::date;

create or replace view public.vw_ativacao_credenciamentos as
select
  c.id,
  c.nome_fantasia,
  c.cnpj,
  c.consultor,
  c.cidade,
  c.estado,
  c.data_cadastro,
  min(m.data_movimentacao) as primeira_movimentacao,
  sum(coalesce(m.valor, 0)) as valor_total_movimentado,
  case
    when min(m.data_movimentacao) is not null then 'Ativado'
    else 'Sem Movimento'
  end as status_real_ativacao
from public.credenciamentos c
left join public.movimentacoes m on m.credenciamento_id = c.id
group by c.id;

