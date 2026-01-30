# Instruções para Executar o Frontend

## Pré-requisitos

- Node.js 18+ instalado
- Backend rodando em http://localhost:8080

## Passos para Executar

1. **Navegar para a pasta frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Executar em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acessar a aplicação:**
   - Abra o navegador em: http://localhost:3000

## Funcionalidades Disponíveis

### Dashboard
- Visualização do resumo da carteira
- Total investido vs. valor atual
- Lucro/Prejuízo total
- Rentabilidade percentual
- Distribuição por tipo de ativo

### Investimentos
- Listar todos os investimentos
- Filtrar por tipo de ativo
- Buscar por símbolo ou nome
- Criar novo investimento
- Editar investimento existente
- Excluir investimento
- Atualizar preço de mercado manualmente

## Estrutura de Componentes

- **Dashboard**: Exibe resumo da carteira
- **InvestmentList**: Lista e gerencia investimentos
- **InvestmentCard**: Card individual de investimento
- **InvestmentForm**: Formulário para criar/editar
- **FilterBar**: Barra de filtros e busca
- **SummaryCard**: Card de resumo

## Tecnologias Utilizadas

- React 18 com TypeScript
- Vite para build e desenvolvimento
- Axios para requisições HTTP
- CSS3 para estilização
