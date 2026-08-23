# Deployment Documentation

## Deployment Targets

| Target | Environment | Status | Config File |
|--------|-------------|--------|-------------|
| **Local Docker** | Development | ✅ Works | `docker-compose.yaml` |
| **Vercel** | Production | ✅ Ready | `next.config.mjs` |
| **Azure (AKS)** | Production | ❌ Broken | `Dockerfile.azure` (bug) |

---

## Docker

### Compose (Local)

```yaml
# docker-compose.yaml
version: '3.8'
services:
  figminha:
    build: .
    ports:
      - "3000:3000"
    environment:
      - LIVE_BLOCK_PUBLIC_API_KEY=${LIVE_BLOCK_PUBLIC_API_KEY}
      - NEXT_PUBLIC_LIVE_BLOCK_PUBLIC_API_KEY=${NEXT_PUBLIC_LIVE_BLOCK_PUBLIC_API_KEY}
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Build & Run

```bash
# Build image
npm run build          # creates optimized build
npm run start:docker   # docker-compose up --build

# Manual
 docker build -t figminha .
docker run -p 3000:3000 --env-file .env.local figminha
```

### Multi-stage Dockerfile (Correct)

```dockerfile
# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.mjs ./
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Azure Deployment (Broken — Fix Required)

### Issue: Config File Mismatch

```dockerfile
# Dockerfile.azure — LINE 27 (BROKEN)
COPY next.config.ts .    # ❌ File is next.config.mjs

# FIX
COPY next.config.mjs .   # ✅ Correct reference
```

### Azure Pipeline Template

```yaml
# .github/workflows/azure-deploy.yml (PROPOSED)
name: Deploy to Azure
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -f Dockerfile.azure -t figminha:${{ github.sha }} .
      - name: Push to ACR
        run: docker push ...
      - name: Deploy to AKS
        run: kubectl apply -f k8s/deployment.yaml
```

---

## Vercel Deployment

### Configuration

```javascript
// next.config.mjs (Vercel-ready)
export default {
  images: {
    domains: ['liveblocks.io'],
  },
  // Security headers (proposed — see docs/security.md)
};
```

### Auto-deploy

```bash
# Link repo to Vercel
vercel --prod --env-file .env.local
```

---

## CI/CD (Proposed)

### GitHub Actions Pipeline

```yaml
# .github/workflows/ci-cd.yml (PROPOSED — NOT IMPLEMENTED)
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run format:verify
      - run: npm run test:coverage -- --min-coverage=80
      - run: npm run build
      - run: npm run build --config next.config.mjs  # verify build config match

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Dependency audit
        run: npm audit --audit-level=high
      - name: Secret scan
        uses: trufflesecurity/trufflehog@main
      - name: SAST (Semgrep)
        uses: returntocorp/semgrep-action@v1
        with:
          config: .semgrep/config.yaml
```

---

## Monitoring & Observability

| Component | Tool | Metric | Alert Threshold |
|-----------|------|--------|-----------------|
| **App Health** | Health check endpoint | `GET /api/health` | 5xx rate > 1% |
| **Performance** | Lighthouse CI | LCP, TTI | LCP > 3s |
| **Liveblocks** | Liveblocks Dashboard | Room count, mutations/min | Mutation rate > 100/min |
| **Errors** | Sentry (proposed) | Error rate | Error rate > 5% |
| **Logs** | Vercel / Docker logs | Log volume | Error log spike > 2x |
| **Infrastructure** | Docker stats / K8s metrics | CPU, Memory | CPU > 80% for 5min |

---

## Environment Configuration

### Per Environment

| Variable | Local | Staging | Production | Source |
|----------|-------|---------|------------|--------|
| `LIVE_BLOCK_PUBLIC_API_KEY` | `.env.local` | CI Secret | CI Secret | Liveblocks Dashboard |
| `NEXT_PUBLIC_LIVE_BLOCK_PUBLIC_API_KEY` | `.env.local` | `.env.staging` | CI Secret | Liveblocks Dashboard |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://staging.figminha.app` | `https://figminha.app` | Config |
| `NODE_ENV` | `development` | `production` | `production` | Build config |

---

## Deployment Checklist

- [ ] `.env.local` not committed (`.gitignore` verified)
- [ ] `Dockerfile.azure` references `next.config.mjs` (not `.ts`)
- [ ] `npm run build` succeeds (`next build` exit 0)
- [ ] `npm run code:ci` passes (lint + format + test:coverage)
- [ ] `docker-compose up --build` starts without errors
- [ ] Health check responds (`GET /api/health`)
- [ ] Liveblocks room connects (`RoomProvider` no errors)
- [ ] Canvas loads (`fabric.Canvas` initialized)
- [ ] Real-time sync works (2 browsers, same room)
- [ ] Security headers present (CSP, X-Frame-Options, etc.)

---

*Generated by Avanade Method Supervisor — Deployment Analysis*