# Development Guide

## Quick Start

```bash
# 1. Clone
cd figminha

# 2. Dependencies
npm install

# 3. Environment
cp .env.local.example .env.local
# Edit .env.local with Liveblocks keys

# 4. Start
npm run start:dev       # Next.js dev server
# Or with Docker:
npm run start:docker    # docker-compose up
```

---

## Project Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **Dev server** | `npm run start:dev` | Hot reload at `localhost:3000` |
| **Build** | `npm run build` | Production build (`.next/`) |
| **Clean build** | `npm run build:clean` | `code:ci` + build |
| **Lint** | `npm run lint` | ESLint (Next core rules) |
| **Format (verify)** | `npm run format:verify` | Prettier check |
| **Format (fix)** | `npm run format:fix` | Prettier write |
| **Test (all)** | `npm test` | Jest (pass with 0 failures) |
| **Test (watch)** | `npm run test:watch` | Watch mode |
| **Test (coverage)** | `npm run test:coverage` | Coverage report |
| **Quality (full)** | `npm run code:ci` | Format + lint + test:coverage |
| **Docker build** | `npm run build` + `docker-compose up` | Multi-stage container |

---

## Code Quality Workflow

```bash
# Before committing
npm run format:fix     # Auto-format staged files
npm run lint           # Check lint errors
npm run test:coverage  # Verify 80% coverage (manual — no CI)

# Pre-commit (automatic via Husky)
npm run lint:staged    # ESLint on staged files only
```

---

## Component Development Pattern

### Standard Component

```typescript
// components/custom/my-component.tsx
'use client';  // Required for interactive components

import { useState } from 'react';
import { cn } from '@/lib/utils/style';
import { cva } from 'class-variance-authority';

// Variant styles
const myComponentVariants = cva('base-styles', {
  variants: {
    variant: { primary: 'bg-blue-500', secondary: 'bg-gray-200' },
  },
  defaultVariants: { variant: 'primary' },
});

export function MyComponent({ variant }: { variant?: 'primary' | 'secondary' }) {
  return <div className={cn(myComponentVariants({ variant }))}>Content</div>;
}
```

---

## State Management Patterns

### Zustand Store

```typescript
// store/custom/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CustomState {
  value: string;
  setValue: (v: string) => void;
}

export const useCustomStore = createCustomState>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
}));
```

### With Persistence

```typescript
export const useThemeStore = create(
  persist(
    (set) => ({ theme: 'light', setTheme: (t) => set({ theme: t }) }),
    { name: 'theme-storage', getStorage: () => localStorage }
  )
);
```

---

## Dependency Injection (Inversify) — Current Pattern

> ⚠️ **Note**: Over-engineered for current use. See `docs/architecture.md` (ADR-004) for removal plan.

```typescript
// @modules/app.module.ts
import { Container, injectable } from 'inversify';
import 'reflect-metadata';

const APP_MODULE = new Container({ autoBindInjectable: true });
APP_MODULE.load(INFRA_MODULE);

export const APP_CONTAINER = APP_MODULE;

// Usage (current — only for static exports)
import { ENV } from '@modules/infra/config/const/env.config';
```

---

## Real-time Development (Liveblocks)

### Room Setup

```typescript
// provider/liveblocks/room.provider.tsx
import { RoomProvider, useStorage, useMutation } from '@liveblocks/react';

export function MyRoomProvider({ children, roomId }: Props) {
  return (
    <RoomProvider
      id={roomId}  // ⚠️ Currently hardcoded: "my-room"
      initialPresence={{ cursor: null, selection: null }}
      initialStorage={{ canvasObjects: new LiveMap() }}
    >
      {children}
    </RoomProvider>
  );
}
```

### Using Storage

```typescript
const canvasObjects = useStorage(root => root.canvasObjects);
```

### Mutations

```typescript
const updateObject = useMutation(({ storage }, objectId: string, updates: PartialCanvasObject>) => {
  const obj = storage.get('canvasObjects').get(objectId);
  storage.get('canvasObjects').set(objectId, { ...obj, ...updates });
}, []);
```

---

## Canvas Development (Fabric.js)

### Canvas Initialization

```typescript
// hook/canvas/useFabricCanvas.ts
import { fabric } from 'fabric';
import { useEffect } from 'react';

export function useFabricCanvas(canvasId: string) {
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasId, {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#f8f9fa',
    });

    // Event listeners
    canvas.on('object:added', (e) => {
      // Sync to Liveblocks
    });

    return () => canvas.dispose();
  }, [canvasId]);
}
```

### Adding Objects

```typescript
const rect = new fabric.Rect({
  left: 100,
  top: 100,
  width: 150,
  height: 100,
  fill: '#3b82f6',
  stroke: '#1e40af',
  strokeWidth: 2,
  selectable: true,
});

fabricRef.current?.add(rect);
```

---

## Styling Guidelines

### Hybrid Approach

| Use Case | Technology | Convention |
|----------|------------|------------|
| Layout, spacing, typography | Tailwind CSS | Utility classes |
| Component variants | `cva` + `clsx` | Structured variants |
| Theme colors, breakpoints | Tailwind config | `tailwind.config.ts` |
| Complex animations, keyframes | Sass (`.scss`) | `animation.module.scss` |
| Component-scoped styles | CSS Modules | `styles.module.scss` |

### CSS Module Example

```scss
// components/live/live.module.scss
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .sidebar {
    width: 240px;
    border-right: 1px solid var(--border-color);
  }

  .canvas {
    flex: 1;
    position: relative;
  }
}
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Module not found: @/store/canvas` | Path alias misconfigured | Check `tsconfig.json` + `jest.config.mjs` |
| Liveblocks connection fails | Key missing or invalid | Verify `.env.local` + rotate if needed |
| Canvas blank (white) | Fabric.js not initialized | Check `useFabricCanvas` hook + `fabricRef` |
| Theme not switching | CSS variables not loaded | Verify `ThemeProvider` + `tailwind.config.ts` |
| `next.config.mjs` import error | ESM vs CommonJS conflict | Use `.mjs` extension; check `package.json` module type |
| `Dockerfile.azure` build fails | Wrong config reference | Fix line 27: `COPY next.config.mjs .` |

---

## Development Environment Requirements

| Requirement | Version | Check |
|-------------|---------|-------|
| **Node.js** | 20.x | `node --version` |
| **npm** | 10.x+ | `npm --version` |
| **TypeScript** | 5.x | `npx tsc --version` |
| **Docker** | 24.x+ | `docker --version` |
| **Liveblocks Account** | Active | `https://liveblocks.io/dashboard` |

---

## References

- [Architecture](./architecture.md) — System design, ADRs, data flow
- [Security](./security.md) — Threat model, vulnerabilities, compliance
- [Deployment](./deployment.md) — Docker, Vercel, CI/CD, monitoring
- [UX Design](./ux-design.md) — Layout, tokens, accessibility
- [Testing](./testing.md) — Pyramid, configurations, gaps
- [MASTER_ANALYSIS_FIGMINHA.md](../figminha/MASTER_ANALYSIS_FIGMINHA.md) — Full automated analysis

---

*Generated by Avanade Method Supervisor — Development Guide*