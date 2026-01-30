# 📚 API Endpoints Documentation

**Base URL**: `http://localhost:8080/api`
**Host**: `localhost:8080`
**Protocol**: HTTP/1.1

---

## 💼 Investments (`/investments`)

### 1. Create Investment
Adiciona um novo ativo à carteira de investimentos.

- **Method**: `POST`
- **URL**: `/investments`
- **Body** (`application/json`):
    ```json
    {
      "type": "STOCK",          // Enum: STOCK, CRYPTO, FUND, FIXED_INCOME, OTHER
      "symbol": "BBAS3",        // Opcional para alguns tipos
      "name": "Banco do Brasil",
      "quantity": 100,          // Quantidade de ativos
      "purchasePrice": 56.80,   // Preço unitário de compra
      "purchaseDate": "2024-07-31" // Formato YYYY-MM-DD
    }
    ```
- **Responses**:
    - `201 Created`: Investimento criado com sucesso.
    - `400 Bad Request`: Erro de validação nos campos.

### 2. List All Investments
Retorna uma lista de todos os investimentos cadastrados.

- **Method**: `GET`
- **URL**: `/investments`
- **Query Parameters**:
    - `type` (Opcional): Filtra por tipo de ativo (ex: `STOCK`, `CRYPTO`).
- **Example**: `/investments?type=CRYPTO`
- **Responses**:
    - `200 OK`: Lista de investimentos (JSON Array).

### 3. Get Investment By ID
Busca os detalhes de um investimento específico.

- **Method**: `GET`
- **URL**: `/investments/{id}`
- **Path Parameters**:
    - `id`: ID do investimento (Long).
- **Responses**:
    - `200 OK`: Objeto do investimento.
    - `404 Not Found`: Investimento não encontrado.

### 4. Search Investments
Pesquisa investimentos por símbolo ou nome.

- **Method**: `GET`
- **URL**: `/investments/search`
- **Query Parameters**:
    - `symbol`: Símbolo do ativo (ex: `PETR`).
    - `name`: Nome do ativo (ex: `Petrobras`).
- **Example**: `/investments/search?symbol=PETR`
- **Responses**:
    - `200 OK`: Lista de investimentos compatíveis.

### 5. Update Investment
Atualiza os dados cadastrais de um investimento (não atualiza preço de mercado, apenas dados de compra).

- **Method**: `PUT`
- **URL**: `/investments/{id}`
- **Path Parameters**:
    - `id`: ID do investimento to update.
- **Body** (`application/json`):
    ```json
    {
      "type": "STOCK",
      "symbol": "PETR4",
      "name": "Petrobras PN Atualizado",
      "quantity": 150,
      "purchasePrice": 29.50,
      "purchaseDate": "2024-01-15"
    }
    ```
- **Responses**:
    - `200 OK`: Investimento atualizado.
    - `404 Not Found`: ID não encontrado.

### 6. Delete Investment
Remove permanentemente um investimento da carteira.

- **Method**: `DELETE`
- **URL**: `/investments/{id}`
- **Path Parameters**:
    - `id`: ID do investimento a ser removido.
- **Responses**:
    - `204 No Content`: Removido com sucesso.
    - `404 Not Found`: ID não encontrado.

---

## 📈 Market Data (`/investments`)

### 7. Get Portfolio Summary
Retorna um resumo financeiro consolidado de toda a carteira.

- **Method**: `GET`
- **URL**: `/investments/summary`
- **Responses**:
    - `200 OK`: Objeto de resumo.
    ```json
    {
      "totalInvested": 15000.00,
      "currentTotalValue": 16500.00,
      "totalProfitLoss": 1500.00,
      "totalProfitLossPercentage": 10.0,
      "totalByType": {
        "STOCK": 10000.00,
        "CRYPTO": 5000.00
      },
      "currentValueByType": { ... },
      "assetCount": 5
    }
    ```

### 8. Update Market Price
Atualiza o preço atual de mercado de um ativo específico para calcular rentabilidade.

- **Method**: `PATCH`
- **URL**: `/investments/{id}/market-price`
- **Path Parameters**:
    - `id`: ID do investimento.
- **Query Parameters**:
    - `currentPrice`: Novo preço de mercado (Decimal).
- **Example**: `/investments/1/market-price?currentPrice=32.75`
- **Responses**:
    - `200 OK`: Investimento com valores recalcualdos.

---

## 🔍 Health & Utils

### Health Check
Verifica o status da aplicação.
- **GET** `/actuator/health`

### Swagger UI
Interface interativa de documentação.
- **GET** `/swagger-ui.html`
