# Shopping List App – Setup & Run Guide

This repository contains 3 projects:
- **client** – React UI
- **server-node** – Node.js Orders API (writes orders to Elasticsearch)
- **server-dotNet** – .NET Catalog API (serves catalog data)

---

## 0) Prerequisites

Install:
- **Git**
- **Node.js** (v18+ recommended) + npm
- **.NET 8 SDK**
- **Docker Desktop** (and make sure Docker Engine is running)

> Windows tip: use **CMD** or **PowerShell**.

---

## 1) Download the project

### Option A – Clone with Git
```bash
git clone <https://github.com/miriam-altman/shopping-list-app.git>
cd shopping-list-app
```

### Option B – Download ZIP
1. Download ZIP from GitHub
2. Extract it
3. Open a terminal inside the extracted folder:
```bash
cd path\to\shopping-list-app
```

---

## 2) Environment variables (create local .env files)

### 2.1 Client env
Create:
- `client/.env` (NOT committed to Git)

Content:
```env
REACT_APP_ORDERS_API=http://localhost:4000/api/orders
REACT_APP_CATALOG_API=http://localhost:5000/api/catalog
```

### 2.2 Node server env
Create:
- `server-node/.env` (NOT committed to Git)

Content:
```env
PORT=4000
ELASTIC_NODE=http://localhost:9200
ORDERS_INDEX=orders
```

> If your .NET server uses different port/routes, update `REACT_APP_CATALOG_API` accordingly.

---

## 3) Start Elasticsearch (Docker)

### 3.1 First time (creates container)
```bash
docker run -d --name elastic -p 9200:9200 -e discovery.type=single-node -e xpack.security.enabled=false elasticsearch:8.11.1
```

### 3.2 Next times (starts existing container)
```bash
docker start elastic
```

### 3.3 Verify Elasticsearch is running
Open in browser:
```
http://localhost:9200
```

---

## 4) Create the `orders` index (mapping)

From the repository root:
```bash
cd server-node
curl -X PUT http://localhost:9200/orders -H "Content-Type: application/json" -d @orders-mapping.json
```

(Optional) Verify index:
```bash
curl http://localhost:9200/orders
```

---

## 5) Run the servers

### 5.1 Run Node Orders API (port 4000)
```bash
cd server-node
npm install
npm start
```

API endpoint:
- `POST http://localhost:4000/api/orders`

### 5.2 Run .NET Catalog API (typically port 5000)
```bash
cd ..\server-dotNet
dotnet restore
dotnet run
```

Catalog endpoint (example):
- `GET http://localhost:5000/api/catalog`

---

## 6) Run the React client

```bash
cd ..\client
npm install
npm start
```

Client runs at:
- `http://localhost:3000`

---

## 7) Quick end-to-end test

### 7.1 Send an order (no Postman needed)
```bash
curl -X POST http://localhost:4000/api/orders -H "Content-Type: application/json" -d "{\"fullName\":\"Test User\",\"address\":\"Tel Aviv\",\"email\":\"test@test.com\",\"cart\":[{\"productId\":\"p1\",\"name\":\"Apple\",\"quantity\":2}]}"
```

Expected response:
```json
{ "message": "Order saved", "id": "..." }
```

### 7.2 Verify order exists in Elasticsearch
```bash
curl http://localhost:9200/orders/_search
```

---

## Notes
- `.env` files are **local only** and should not be committed.
- Use `.env.example` files (if included) as templates.