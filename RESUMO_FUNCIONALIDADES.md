# 🚀 Resumo do Projeto GD Investimentos - Fase 1

Este documento detalha as funcionalidades implementadas e a estrutura do projeto **GD Investimentos**, uma plataforma completa para gestão de portfólio de ativos financeiros.

---

## 🏛️ Visão Geral da Arquitetura

O projeto adota uma arquitetura moderna baseada em **Microsserviços** (containerizados) e **SPA (Single Page Application)**, garantindo separação de responsabilidades, escalabilidade e facilidade de manutenção.

### Componentes Principais:
1.  **Backend (API Rest)**: Desenvolvido em Java/Spring Boot.
2.  **Frontend (Client)**: Desenvolvido em React/TypeScript.
3.  **Banco de Dados**: PostgreSQL para persistência segura.
4.  **Infraestrutura**: Docker Compose para orquestração de todos os serviços.

---

## 💻 Backend (API Spring Boot)

O coração da aplicação, responsável por toda a regra de negócio, validações e persistência de dados.

### Funcionalidades:

#### 1. Gestão de Investimentos (CRUD)
*   **Criação de Ativos**: Endpoint para registrar novos investimentos com validação de campos (Tipo, Símbolo, Quantidade, Preço, Data).
*   **Leitura/Listagem**: Listagem completa de ativos com suporte a filtragem por tipo (Ações, Cripto, Fundos, Renda Fixa).
*   **Atualização**: Permite corrigir dados de compra ou quantidade de um ativo existente.
*   **Remoção**: Exclusão segura de registros de investimento.

#### 2. Inteligência Financeira
*   **Cálculo de Rentabilidade**: Algoritmo que compara o *Preço Médio de Compra* vs. *Preço Atual de Mercado* para calcular o Lucro/Prejuízo (P/L) em valor monetário e porcentagem.
*   **Consolidação de Carteira**: Endpoint `/summary` que agrega todos os ativos para fornecer:
    *   Patrimônio Total Investido.
    *   Patrimônio Atual (Valor de Mercado).
    *   Lucro/Prejuízo Total da Carteira.
    *   Distribuição de valor por categoria de ativo.

#### 3. Dados de Mercado
*   **Atualização de Preços**: Funcionalidade (`PATCH`) para atualizar o preço de mercado atual de um ativo, refletindo instantaneamente nos cálculos de rentabilidade do dashboard.

#### 4. Documentação e Utilitários
*   **Swagger UI**: Interface interativa (`/swagger-ui.html`) para testar e visualizar todos os endpoints da API.
*   **Tratamento de Erros**: Sistema global de exceções para garantir respostas HTTP consistentes (404, 400, 500).

---

## 🎨 Frontend (Interface React)

Uma interface moderna e responsiva, focada na experiência do usuário (UX) e visualização de dados.

### Funcionalidades:

#### 1. Dashboard Interativo
*   **Resumo Financeiro**: Cards ("Glassmorphism") destacando Total Investido, Valor Atual e Resultado (com indicadores de cor Verde/Vermelho).
*   **Gráficos**: Visualização intuitiva da alocação de ativos (ex: Quanto % da carteira está em Cripto vs. Ações).

#### 2. Gestão Visual de Ativos
*   **Listagem em Cards**: Visualização dos investimentos em formato de grid/cards detalhados.
*   **Filtros Dinâmicos**: Barra de ferramentas para filtrar ativos por categoria instantaneamente.
*   **Busca Rápida**: Campo de pesquisa para encontrar ativos por nome ou símbolo (ticker).

#### 3. Formulários e Interações
*   **Modais Intuitivos**: Criação e edição de investimentos sem sair da página principal (UX fluida).
*   **Feedback Visual**: Animações e notificações (Toasts) para confirmar ações de sucesso ou erro.

---

## 🏗️ Infraestrutura (Docker)

O projeto é "Cloud-Ready", totalmente containerizado para garantir que funcione idêntico em qualquer ambiente.

### Serviços Conteinerizados:
1.  **`app-backend`**: Imagem Java 17 otimizada rodando o Spring Boot.
2.  **`app-frontend`**: Servidor Nginx servindo os arquivos estáticos do React buildado.
3.  **`postgres-db`**: Banco de dados PostgreSQL 15 com persistência em volume Docker.
4.  **`pgadmin`**: Interface web administrativa para acesso direto ao banco de dados, facilitando debug e manutenção.

---

## 🔄 Fluxo de Dados

1.  O **Usuário** interage com a interface **React**.
2.  O Frontend envia requisições **HTTP (Axios)** para a API (ex: `GET /investments`).
3.  O **Backend** processa a requisição, aplica as regras de negócio e consulta o **PostgreSQL**.
4.  Os dados retornam tratados (DTOs) para o Frontend, que atualiza o **Estado (State)** e renderiza as alterações na tela.
