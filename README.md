# Azure Web Application

A Node.js web application ready for deployment to Azure App Service.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

Open http://localhost:3000 in your browser.

## 📁 Project Structure

```
webapp/
├── server.js           # Express server
├── package.json        # Dependencies
├── web.config          # Azure IIS configuration
├── views/              # EJS templates
│   ├── index.ejs
│   ├── about.ejs
│   └── error.ejs
├── public/             # Static files
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── README.md
```

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Home page |
| `/about` | GET | About page |
| `/api/info` | GET | Application info |
| `/health` | GET | Health check |
| `/ready` | GET | Readiness check |
| `/api/contact` | POST | Contact form |

## ☁️ Deploy to Azure App Service

### Option 1: Azure CLI

```bash
# Login to Azure
az login

# Create Resource Group
az group create --name myResourceGroup --location eastus

# Create App Service Plan
az appservice plan create \
    --name myAppServicePlan \
    --resource-group myResourceGroup \
    --sku B1 \
    --is-linux

# Create Web App
az webapp create \
    --resource-group myResourceGroup \
    --plan myAppServicePlan \
    --name my-unique-app-name \
    --runtime "NODE:18-lts"

# Deploy code
az webapp deployment source config-local-git \
    --name my-unique-app-name \
    --resource-group myResourceGroup

# Or use ZIP deploy
az webapp deploy \
    --resource-group myResourceGroup \
    --name my-unique-app-name \
    --src-path webapp.zip \
    --type zip
```

### Option 2: VS Code Azure Extension

1. Install Azure App Service extension
2. Right-click on `webapp` folder
3. Select "Deploy to Web App..."
4. Follow the prompts

### Option 3: GitHub Actions

Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Deploy to Azure
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'my-unique-app-name'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

## ⚙️ Environment Variables

Set these in Azure App Service Configuration:

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment (production) |
| `PORT` | Port (set by Azure) |

## 📝 License

MIT
