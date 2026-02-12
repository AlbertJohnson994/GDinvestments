# Deploying GD Investimentos to Vercel

This project contains a React frontend in the `frontend` directory and a Java Spring Boot backend in the root directory. Vercel is designed primarily for frontend applications.

To deploy the frontend to Vercel, follow these steps:

## Option 1: Vercel Dashboard Configuration (Recommended)

1.  **Import the Project**: In the Vercel dashboard, import your GitHub repository.
2.  **Configure Project Settings**:
    *   **Framework Preset**: Select **Vite**.
    *   **Root Directory**: Click "Edit" and select the `frontend` directory.
3.  **Build Command**: Vercel should automatically detect `npm run build` inside the `frontend` folder.
    *   If not, override it to: `npm run build`
4.  **Output Directory**: Vercel should automatically detect `dist`.
    *   If not, override it to: `dist`
5.  **Environment Variables**:
    *   Add a new environment variable named `VITE_API_URL`.
    *   Set its value to the URL of your deployed backend API (e.g., `https://your-backend-app.onrender.com/api` or `https://your-backend.herokuapp.com/api`).
    *   **Note**: Without this variable, the frontend will try to connect to `http://localhost:8080/api`, which will not work in production.

## Option 2: CLI Deployment

If you are using the Vercel CLI, run the deploy command from the `frontend` directory:

```bash
cd frontend
vercel
```

## Troubleshooting

-   **404 on refresh**: Ensure the `vercel.json` file exists in the `frontend` directory with the following content (already added):
    ```json
    {
      "rewrites": [
        {
          "source": "/(.*)",
          "destination": "/index.html"
        }
      ]
    }
    ```
-   **Build Fails**: Check the build logs. Ensure `npm install` runs successfully.
