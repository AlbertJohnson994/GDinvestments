# GD Investimentos - Frontend

Frontend React com TypeScript para gerenciamento de carteira de investimentos.

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:3000

## Build para produção

```bash
npm run build
```

## Funcionalidades

- 📊 Dashboard com resumo da carteira
- 📈 Lista de investimentos
- ➕ Criar novos investimentos
- ✏️ Editar investimentos existentes
- 🗑️ Excluir investimentos
- 🔍 Buscar e filtrar investimentos
- 💰 Atualizar preços de mercado
- 📱 Design responsivo e moderno

## Tecnologias

- React 18
- TypeScript
- Vite
- Axios
- CSS3

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/     # Componentes React
│   ├── services/       # Serviços de API
│   ├── types/          # Tipos TypeScript
│   ├── styles/         # Estilos CSS
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Ponto de entrada
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Configuração

Certifique-se de que o backend está rodando em `http://localhost:8080` antes de iniciar o frontend.
