# Sistema de Acompanhamento Comercial - Credenciamentos

Repositório inicial para estruturar o sistema de acompanhamento comercial com foco em:
- cadastro de empresas clientes
- solicitações de credenciamento
- credenciamentos executados
- movimentação gerada
- dashboard executivo
- acompanhamento de comissão

## Stack sugerida
- Frontend: Next.js
- Backend/Banco: Supabase (PostgreSQL)
- Hospedagem: Vercel
- Versionamento: GitHub

## Estrutura inicial
- `docs/` documentação funcional e técnica
- `database/` modelo de banco e queries iniciais
- `supabase/` instruções para ambiente

## Fluxo do negócio
1. Cadastro da empresa cliente
2. Abertura da solicitação de credenciamento
3. Execução dos credenciamentos
4. Registro da movimentação
5. Acompanhamento de ativação, comissão e performance

## MVP recomendado
- cadastro de empresa cliente
- abertura de solicitação
- cadastro de credenciamentos
- listagem com filtros
- dashboard simples
- apuração de comissão prevista

## Próximos passos
1. Criar projeto no Supabase
2. Rodar o arquivo `database/schema.sql`
3. Configurar o frontend
4. Subir o projeto na Vercel
