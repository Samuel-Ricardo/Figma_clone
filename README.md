# Figma Clone — Collaborative Design Tool

> A real-time, multi-user Figma-like design application built with Next.js 14, Liveblocks, and Fabric.js.

---

## Overview

**figminha** is a production-grade collaborative design tool enabling real-time multi-user editing on a shared canvas. Features include live cursors, commenting threads, emoji reactions, shape tools, and persistent canvas state — all synchronized via Liveblocks.

| Metric | Value |
|--------|-------|
| **Framework** | Next.js 14.1.0 (App Router) |
| **Runtime** | React 18, TypeScript 5 |
| **Real-time** | Liveblocks v1.9.7 (presence, storage, threads, reactions) |
| **Canvas** | Fabric.js 5.3.0 |
| **State** | Zustand 5.0.1 (9 granular stores) |
| **DI** | Inversify 6.1.4 (enterprise pattern) |
| **Styling** | Tailwind CSS 3.4 + Sass (hybrid) |
| **UI Primitives** | Radix UI (collapsible, context-menu, dropdown-menu, label, select, slot, tooltip) |
| **Icons** | Lucide React |
| **Testing** | Jest 29 + Cypress 15 |
| **Deploy** | Docker multi-stage, Vercel-ready |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                         │
├─────────────────────────────────────────────────────────────────┤
│  App Router (src/app/)                                          │
│  ├── layout.tsx  → ThemeProvider, LiveblocksProvider, Tooltip  │
│  ├── page.tsx    → Navbar, Sidebar, LiveCanvas                 │
│  └── components/live/                                          │
│       └── live.component.tsx  → Canvas orchestration           │
├─────────────────────────────────────────────────────────────────┤
│  State Layer                                                    │
│  ├── Zustand Stores (9): canvas, fabric, shape, theme,         │
│  │   comment, cursor, pointer, reaction, composer              │
│  └── Inversify Container: ENV, CONST modules (config only)     │
├─────────────────────────────────────────────────────────────────┤
│  Real-time Sync (Liveblocks)                                    │
│  ├── RoomProvider (id="my-room" ⚠️ hardcoded)                  │
│  ├── LiveMap<canvasObjects>  → Fabric.js objects               │
│  ├── Presence (cursors, selection)                             │
│  ├── Threads (comments)                                        │
│  └── Reactions (emoji)                                         │
├─────────────────────────────────────────────────────────────────┤
│  Canvas (Fabric.js)                                             │
│  ├── <canvas id="canvas-board">                                │
│  ├── Shape tools: rectangle, ellipse, line, arrow, text        │
│  └── Export: PDF (jspdf), Image                                │
└─────────────────────────────────────────────────────────────────┘
```

**Key Patterns**

| Pattern | Implementation | Assessment |
|---------|----------------|------------|
| **App Router** | `src/app/` only, no `pages/` | ✅ Correct |
| **Client Components** | All interactive UI (`'use client'`) | ✅ Required for Liveblocks |
| **Server Components** | None used | ⚠️ Missed SSR opportunity |
| **DI Container** | Inversify for static config | ⚠️ Over-engineered |
| **State Sync** | Zustand ↔ LiveMap (no adapter) | ❌ Risk of divergence |
| **API Routes** | None (`src/app/api/` absent) | ❌ No server validation |

---

## Installation

```bash
# Clone & enter
cd figminha

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
# Edit .env.local with your Liveblocks keys

# Development
npm run start:dev          # http://localhost:3000

# Production build
npm run build:clean        # lint + test + build

# Docker
npm run start:docker       # build + start in container
```

---

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `LIVE_BLOCK_PUBLIC_API_KEY` | Yes | Server-side Liveblocks secret key | `sk_prod_...` |
| `NEXT_PUBLIC_LIVE_BLOCK_PUBLIC_API_KEY` | Yes | Client-side Liveblocks public key | `pk_prod_...` |
| `NEXT_PUBLIC_APP_URL` | Yes | App base URL | `http://localhost:3000` |

> ⚠️ **Security**: `.env.local` contains a production Liveblocks key (`pk_prod_...`). Rotate immediately. Never commit `.env.local`.

---

## Docker Deployment

### Local Development
```bash
docker-compose up --build
```

### Production (Multi-stage)
```dockerfile
# Dockerfile (corrected)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Azure Deployment (Bug Fix Required)
```dockerfile
# Dockerfile.azure - LINE 27 FIX
# ❌ COPY next.config.ts .
# ✅ COPY next.config.mjs .
```

---

## Security Notes

| Issue | Severity | Status | Remediation |
|-------|----------|--------|-------------|
| Hardcoded `roomId="my-room"` | 🔴 Critical | Open | Dynamic room ID via URL/project |
| Production Liveblocks key in `.env.local` | 🔴 Critical | Open | Rotate key; use CI secrets |
| No authentication/authorization | 🔴 Critical | Open | Add auth (NextAuth, Clerk) before room join |
| No API routes for validation | 🟠 High | Open | Create `api/rooms`, `api/auth` |
| No CI/CD pipeline | 🟠 High | Open | Add GitHub Actions with quality gates |
| Dockerfile.azure config mismatch | 🟠 High | Open | Fix `next.config.mjs` reference |
| Client-only trust model | 🟡 Medium | Open | Server-side session validation |

**Security Policy**: See [SECURITY.md](../SECURITY.md) — responsible disclosure to `justsamuel.asm@gmail.com`.

---

## Quality Gates Status

| Gate | Target | Current | Status |
|------|--------|---------|--------|
| **Lint** | 0 errors | Manual only | ❌ No CI |
| **Format** | Prettier compliant | Manual only | ❌ No CI |
| **Type Check** | `tsc --noEmit` pass | Manual only | ❌ No CI |
| **Unit Tests** | ≥ 80% coverage | Jest configured | ⚠️ No CI enforcement |
| **E2E Tests** | Critical paths covered | Cypress configured | ⚠️ No CI enforcement |
| **Build** | `next build` success | Works locally | ✅ |
| **Docker Build** | Multi-stage success | Azure config broken | ❌ |

**Quality Script**: `npm run code:ci` (format + lint + test:coverage)

---

## Known Issues

| ID | Issue | Impact | Fix |
|----|-------|--------|-----|
| **ARCH-001** | Zustand ↔ LiveMap no sync adapter | State divergence across clients | Implement `useStorage` adapter |
| **ARCH-002** | Inversify over-engineering | Bundle size, complexity | Replace with static exports |
| **SEC-001** | Hardcoded room ID | Single global workspace | Dynamic room routing |
| **SEC-002** | Production key in `.env.local` | Credential exposure | Rotate; use CI secrets |
| **DEPLOY-001** | Dockerfile.azure wrong config | Azure build failure | Fix `next.config.mjs` reference |
| **DEPLOY-002** | No CI/CD pipeline | No automated quality gates | Add GitHub Actions |
| **UX-001** | `console.log` in ShapesMenu | Production log leak | Remove debug statement |
| **UX-002** | No cursor null fallback | Reactions break without cursor | Add position fallback |

---

## Project Structure

```
figminha/
├── .env.local                 # ⚠️ Contains prod key (gitignored)
├── .env.local.example         # Template
├── Dockerfile                 # Multi-stage (correct)
├── Dockerfile.azure           # ⚠️ Bug: references next.config.ts
├── docker-compose.yaml
├── next.config.mjs            # Actual config (ESM)
├── tailwind.config.ts         # ⚠️ Dead `pages/` content path
├── tsconfig.json
├── jest.config.mjs
├── cypress.config.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root providers
│   │   ├── page.tsx           # Page composition
│   │   └── components/
│   │       ├── live/          # Canvas components
│   │       ├── thread/        # Comments/threads
│   │       ├── shapes/        # Shape tools
│   │       ├── reaction/      # Emoji reactions
│   │       └── cursor/        # Presence cursors
│   ├── hook/                  # Granular hooks by domain
│   ├── store/                 # Zustand stores (9)
│   ├── provider/
│   │   ├── liveblocks/        # RoomProvider
│   │   └── theme/             # ThemeProvider
│   ├── @modules/              # Inversify DI modules
│   │   ├── app.module.ts      # Root container
│   │   └── infra/config/const/# ENV, COLORS, SHORTCUTS
│   ├── lib/utils/style/       # clsx, cva, animations
│   └── @types/                # TypeScript declarations
├── cypress/                   # E2E + component tests
└── public/                    # Static assets
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](./docs/architecture.md) | System design, patterns, ADRs, data flow |
| [Security](./docs/security.md) | Threat model, vulnerabilities, OWASP coverage |
| [Deployment](./docs/deployment.md) | Docker, Vercel, CI/CD, monitoring |
| [UX Design](./docs/ux-design.md) | Layout, tokens, components, accessibility |
| [Testing](./docs/testing.md) | Pyramid, configs, gaps, recommendations |
| [Development Guide](./docs/development-guide.md) | Quick start, scripts, patterns, troubleshooting |

---

## Contributing

1. Fork & clone
2. Create feature branch: `git checkout -b feat/your-feature`
3. Run quality gates: `npm run code:ci`
4. Commit with conventional messages: `feat: add shape tool`
5. Push & open PR

**Pre-commit**: Husky + lint-staged configured (format + lint on staged files).

---

## License

MIT — See [LICENSE](LICENSE) for details.

---

## Related

- [Liveblocks Documentation](https://liveblocks.io/docs)
- [Fabric.js Documentation](http://fabricjs.com/docs/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Avanade Method](https://avanade-method.internal) — Internal SDLC framework