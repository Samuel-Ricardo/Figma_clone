# Testing Documentation

## Testing Pyramid

```
         /\
        /E2E\          Cypress (Component + E2E)
       /────\         ~10% of test suite
      /  INT  \        Integration (Jest + MSW)
     /────────\
    /  UNIT    \      Jest + ts-jest
   /────────────\     ~80% of test suite
```

| Layer | Tool | Coverage Target | Current Status |
|-------|------|----------------|----------------|
| **Unit** | Jest + ts-jest | 80%+ | ✅ Configured |
| **Integration** | Jest (e2e.config) | Key flows | ⚠️ Configured |
| **E2E / Component** | Cypress 15 | Critical paths | ✅ Configured |
| **Visual / Accessibility** | Not configured | — | ❌ Missing |

---

## Jest Configuration

### Config (`jest.config.mjs`)

```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Scripts

| Command | Purpose |
|---------|---------|
| `npm test` | Run tests, pass with 0 failures |
| `npm run test:watch` | Watch mode |
| `npm run test:coverage` | Coverage report |
| `npm run test:staged` | Related to staged files |
| `npm run test:integration` | Integration tests (`jest-e2e.config.mjs`) |

---

## Cypress Configuration

### Config (`cypress.config.ts`)

```typescript
export default {
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    videoCompression: true,
  },
  component: {
    devServer: { framework: 'next', bundler: 'webpack' },
  },
};
```

### Issues

| Issue | File | Impact | Fix |
|-------|------|--------|-----|
| `video: true` without cleanup | `cypress.config.ts` | Storage bloat | Add `.gitignore` + `videoUploadOnPasses: false` |
| No accessibility testing | `cypress/` | WCAG gaps undetected | Add `cypress-axe` plugin |

---

## Test Coverage Analysis

### Current State

| Module | Files | Lines | Functions | Coverage | Status |
|--------|-------|-------|-----------|----------|--------|
| `store/*` | 9 files | ~300 | ~40 | Unknown | ⚠️ Not measured |
| `hook/*` | ~20 files | ~800 | ~60 | Unknown | ⚠️ Not measured |
| `components/*` | ~50 files | ~2000 | ~150 | Unknown | ⚠️ Not measured |
| `provider/*` | 4 files | ~200 | ~15 | Unknown | ⚠️ Not measured |

### Coverage Gaps

| Module | Why Important | Priority | Recommendation |
|--------|---------------|----------|----------------|
| `store/canvas/` | Core state mutations | 🔴 High | Unit tests for all mutations |
| `provider/liveblocks/` | Room sync, presence | 🔴 High | Integration tests with mock Liveblocks |
| `hook/canvas/` | Canvas lifecycle, events | 🟠 High | Component tests |
| `components/thread/` | Comment creation, reactions | 🟡 Medium | E2E tests |
| `components/reaction/` | Animation triggers, position | 🟡 Medium | Component tests |
| `components/shapes/` | Menu selection, tool activation | 🟡 Medium | Component tests |

---

## Recommended Test Strategy

### Unit Tests (Jest)

```typescript
// __tests__/store/canvas/index.test.ts
import { useCanvasStore } from '@/store/canvas';

describe('Canvas Store', () => {
  it('should initialize with empty canvas', () => {
    const { canvasRef } = useCanvasStore.getState();
    expect(canvasRef).toBeNull();
  });

  it('should set canvas reference', () => {
    const mockCanvas = {} as HTMLCanvasElement;
    useCanvasStore.getState().setCanvasRef(mockCanvas);
    expect(useCanvasStore.getState().canvasRef).toBe(mockCanvas);
  });
});
```

### Integration Tests (Liveblocks Mock)

```typescript
// __tests__/provider/liveblocks/room.integration.test.ts
import { renderHook } from '@testing-library/react';
import { RoomProvider, useRoom } from '@/provider/liveblocks/room.provider';

describe('Room Provider', () => {
  it('should connect to Liveblocks room', async () => {
    // Mock Liveblocks room
    const mockRoom = { id: 'test-room', presence: { update: jest.fn() } };
    // Render with mock
    const { result } = renderHook(() => useRoom(), {
      wrapper: ({ children }) => <RoomProvider id="test-room">{children}</RoomProvider>,
    });
    expect(result.current.room).toBeDefined();
  });
});
```

### E2E Tests (Cypress)

```typescript
// cypress/e2e/canvas.cy.ts
describe('Canvas Collaboration', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#canvas-board', { timeout: 10000 }).should('be.visible');
  });

  it('should draw a rectangle', () => {
    cy.get('[data-testid="shape-rectangle"]').click();
    cy.get('#canvas-board').trigger('mousedown', 100, 100);
    cy.get('#canvas-board').trigger('mousemove', 200, 200);
    cy.get('#canvas-board').trigger('mouseup');
    cy.get('canvas').should('contain', 'rect'); // Verify object added
  });

  it('should add a comment thread', () => {
    cy.get('#canvas-board').click(200, 150);
    cy.get('[data-testid="thread-composer"]').should('be.visible');
    cy.get('textarea').type('Test comment');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="thread-marker"]').should('exist');
  });
});
```

---

## Testing Gaps & Action Plan

### Critical (Block Release)

- [ ] Unit tests for all Zustand stores (`store/*`)
- [ ] Component tests for `LiveCanvas` initialization
- [ ] Integration test: Room connection + presence sync
- [ ] E2E: Basic canvas draw + save

### High (Next Sprint)

- [ ] Component tests: `ThreadComposer`, `FloatingReaction`
- [ ] Integration: Comment thread lifecycle
- [ ] E2E: Multi-user collaboration (2 browsers)
- [ ] Visual regression: Canvas state before/after mutation

### Medium (Backlog)

- [ ] Accessibility tests (`cypress-axe`)
- [ ] Performance tests (canvas FPS, mutation speed)
- [ ] Load tests (Liveblocks room with 50+ users)
- [ ] Security tests (XSS in comments, injection in mutations)

---

## Test Quality Metrics

| Metric | Target | Actual | Tool |
|--------|--------|--------|------|
| **Unit Coverage** | 80%+ | Unknown | `jest --coverage` |
| **E2E Coverage** | Critical paths | Partial | `cypress` |
| **Flaky Rate** | < 2% | Unknown | Manual tracking |
| **Test Duration** | < 5min | Unknown | `time npm test` |
| **Test Maintenance** | < 20% of dev time | Unknown | Sprint tracking |

---

*Generated by Avanade Method Supervisor — Testing Analysis*