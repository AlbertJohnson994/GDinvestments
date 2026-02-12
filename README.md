# 💰 GD Investimentos

GD Investimentos is a complete, modern web application for managing investment portfolios. It enables users to track assets such as Stocks, Cryptocurrencies, Investment Funds, and Fixed Income products in real-time, providing financial summaries, profitability tracking, and detailed management of operations.

The project features a robust **Spring Boot (Java 17)** backend with **PostgreSQL**, and a highly interactive, responsive **React (TypeScript + Vite)** frontend, all containerized with **Docker** for easy deployment.

---

## ✨ Key Features

### 📊 Interactive Dashboard
*   **Total Equity Summary**: Real-time view of total invested capital and current market value.
*   **Profitability Tracking**: Automatic calculation of Profit/Loss (Value & Percentage).
*   **Visual Distribution**: Intuitive breakdown of portfolio allocation by asset type.
*   **Performance Indicators**: Color-coded indicators for positive (green) and negative (red) performance.

### 💼 Investment Management
*   **CRUD Operations**: Full ability to Create, Read, Update, and Delete investment records.
*   **Advanced Filtering**: Filter investments by asset type (Stock, Crypto, Fund, Fixed Income).
*   **Smart Search**: Instant search functionality by asset symbol or name.
*   **Market Updates**: specific feature to patch/update current market prices for assets.

### 🎨 Premium User Experience
*   **Modern UI/UX**: Designed with a "Glassmorphism" aesthetic, smooth gradients, and rounded corners.
*   **Responsive Design**: Fully optimized for desktop, tablet, and mobile viewing.
*   **Interactive Elements**: Hover effects, smooth transitions, and intuitive modal forms.

---

## 🛠️ Technology Stack

### Backend (API)
*   **Language**: Java 17
*   **Framework**: Spring Boot 3.1.5
*   **Database**: PostgreSQL 15
*   **Documentation**: Swagger / OpenAPI 3 (`/api/swagger-ui.html`)
*   **Tools**: Lombok, ModelMapper, Maven
*   **Architecture**: RESTful API, Service Layer Pattern, DTO mapping

### Frontend (Client)
*   **Framework**: React 18
*   **Language**: TypeScript
*   **Build Tool**: Vite
*   **HTTP Client**: Axios
*   **Styling**: Modern CSS3 (Variables, Flexbox/Grid, Glassmorphism)
*   **Icons**: Lucide React

### DevOps & Infrastructure
*   **Docker**: Multi-stage builds for optimized images.
*   **Docker Compose**: Orchestration of Backend, Frontend, Database, and PGAdmin.
*   **Nginx**: Production-grade web server / reverse proxy for the frontend.

---

## 🚀 Getting Started

### Prerequisites
*   **Docker** and **Docker Compose** installed on your machine.
*   *(Optional - for local dev)*: Java 17 JDK and Node.js 18+.

### ▶️ Run with Docker (Recommended)

The easiest way to run the entire application is using Docker Compose.

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the Docker directory**:
    ```bash
    cd dockerInvest
    ```
3.  **Start the services**:
    ```bash
    docker-compose up -d --build
    ```
4.  **Access the application**:
    *   **Frontend**: [http://localhost:3000](http://localhost:3000)
    *   **Backend API**: `http://localhost:8080/api`
    *   **PGAdmin**: [http://localhost:5050](http://localhost:5050) (Login: `admin@fintech.com` / `admin123`)

5.  **Stop the services**:
    ```bash
    docker-compose down
    ```

### ▶️ Run Locally (Development Mode)

If you prefer to run services individually for development:

**1. Database (PostgreSQL)**
   Ensure you have a PostgreSQL instance running on port `5432` (or use the one from Docker):
   ```bash
   # Start only the database via Docker
   cd dockerInvest
   docker-compose up -d postgres
   ```

**2. Backend (Spring Boot)**
   ```bash
   cd C:\Projects\GDInvestementos
   ./mvnw.cmd spring-boot:run
   ```
   *The API will be available at `http://localhost:8080/api`*

**3. Frontend (React)**
   ```bash
   cd C:\Projects\GDInvestementos\frontend
   npm install
   npm run dev
   ```
   *The UI will be available at `http://localhost:3000`*

---

## 📚 API Documentation

The backend provides a full Swagger UI documentation.
When the application is running, access:

👉 **[http://localhost:8080/api/swagger-ui.html](http://localhost:8080/api/swagger-ui.html)**

### Key Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/investments` | List all investments (optional `?type=` filter) |
| `POST` | `/investments` | Create a new investment |
| `GET` | `/investments/summary` | Get portfolio financial summary |
| `PATCH` | `/investments/{id}/market-price` | Update current market price |
| `GET` | `/investments/search` | Search by name or symbol |

---

## 📂 Project Structure

```
GDInvestementos/
├── src/main/java          # Backend Source Code (Spring Boot)
├── frontend/              # Frontend Source Code (React)
│   ├── src/
│   │   ├── components/    # UI Components (Cards, Forms, Lists)
│   │   ├── services/      # API Integration (Axios)
│   │   ├── styles/        # Global Styles
│   │   ├── types/         # TypeScript Interfaces
│   └── public/            # Static assets
├── dockerInvest/          # Docker Configuration
│   ├── docker-compose.yml # Service definitions
│   └── Dockerfile         # Backend Dockerfile
├── requests.http          # HTTP Client requests for testing
└── pom.xml                # Maven Dependencies
```

---

## ☁️ Deployment

### Vercel (Frontend)
To deploy the frontend to Vercel, please refer to the detailed guide in [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md).
You will need to configure the **Root Directory** to `frontend` and set up the `VITE_API_URL` environment variable.

---

## 📝 License

This project is developed for educational and portfolio purposes.

**Developed by AJ Tech**
