insert into public.empresas_clientes
  (razao_social, nome_fantasia, cnpj, cidade, estado, consultor_responsavel, equipe_responsavel, status, previsao_movimentacao, qtde_colaboradores)
values
  ('Empresa Exemplo SA', 'Empresa Exemplo', '00000000000191', 'Jundiaí', 'SP', 'Consultor Demo', 'Novas Vendas', 'Ativa', 150000.00, 500);

-- Depois de inserir a empresa acima, use o ID gerado para criar a solicitação:
-- insert into public.solicitacoes_credenciamento (...);

