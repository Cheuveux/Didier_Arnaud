# Render Deployment Instructions

## Configuration for Render Web Service

Follow these steps to deploy the React frontend on Render as a Web Service:

### 1. In Render Dashboard:
- Create a new **Web Service**
- Connect your GitHub repository
- Select the `main` (or `dev`) branch

### 2. Build and Start Commands:
- **Build Command**: `cd frontend && npm install && npm run build`
- **Start Command**: `cd frontend && npm run server`

### 3. Environment Variables:
- Set `REACT_APP_API_URL` to your Strapi backend URL (e.g., `https://your-strapi-backend.onrender.com`)

### 4. Root Directory (if needed):
- Leave blank (or set to `frontend` if your repo root is not the frontend folder)

### 5. Instance Type:
- Use at least the free tier (but paid recommended for production)

## How It Works:

- `npm run build` → Creates optimized production build in `/build`
- `npm run server` → Starts Express server that serves the build files
- All routes automatically redirect to `index.html` for React Router to handle client-side routing

## Local Testing:

To test the production setup locally:
```bash
npm run build
npm run server
```

Then visit `http://localhost:3000`

## Troubleshooting:

- Routes work on root but 404 on refresh? ✅ This setup fixes that!
- API calls failing? Check `REACT_APP_API_URL` environment variable
- Build failing? Make sure `npm install` works locally first
