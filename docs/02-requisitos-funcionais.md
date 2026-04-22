# Requisitos Funcionais

## RF001 - Cadastro de empresas clientes
O sistema deve permitir cadastrar a empresa cliente que irá movimentar a rede.

Campos mínimos:
- razão social
- nome fantasia
- CNPJ
- cidade
- estado
- consultor responsável
- equipe responsável
- previsão de movimentação
- quantidade estimada de colaboradores
- status

## RF002 - Consulta de empresas clientes
O sistema deve permitir pesquisar empresas por:
- CNPJ
- razão social
- nome fantasia
- cidade
- status

## RF003 - Abertura de solicitação
O sistema deve permitir abrir uma solicitação de credenciamento vinculada a uma empresa cliente.

Campos mínimos:
- empresa cliente
- solicitante
- equipe solicitante
- data da solicitação
- cidade alvo
- estado alvo
- quantidade estimada
- segmento prioritário
- justificativa
- prioridade
- prazo
- status

## RF004 - Controle de status da solicitação
O sistema deve permitir alterar o status para:
- aberta
- em andamento
- parcial
- concluída
- cancelada

## RF005 - Cadastro de credenciamentos
O sistema deve permitir cadastrar estabelecimentos credenciados vinculados a:
- empresa cliente
- solicitação
- consultor responsável

Campos mínimos:
- CNPJ do estabelecimento
- nome fantasia
- data de cadastro
- cidade
- estado
- segmento
- taxa
- meio de captura
- comissão
- status de ativação

## RF006 - Bloqueio de duplicidade
O sistema deve impedir duplicidade de estabelecimento por CNPJ.

## RF007 - Registro de movimentação
O sistema deve permitir registrar movimentações vinculadas ao estabelecimento credenciado.

Campos mínimos:
- credenciamento
- empresa cliente
- data da movimentação
- valor
- quantidade de transações
- competência

## RF008 - Dashboard executivo
O sistema deve apresentar:
- total de empresas ativas
- total de solicitações abertas
- total de credenciamentos por período
- total de comissão prevista
- total de movimentação
- ranking por consultor

## RF009 - Mapa de calor
O sistema deve exibir concentração de credenciamentos por cidade e estado.

## RF010 - Filtros
O sistema deve permitir filtrar por:
- empresa cliente
- solicitação
- consultor
- cidade
- estado
- período
- status da solicitação
- status de ativação

## RF011 - Relatório de ativação
O sistema deve mostrar:
- estabelecimentos credenciados
- estabelecimentos que movimentaram
- data da primeira movimentação
- tempo até ativação

## RF012 - Relatório de comissão
O sistema deve gerar resumo por consultor e período com:
- quantidade de credenciamentos
- valor total de comissão
- detalhamento por estabelecimento

