# Security Documentation

## Threat Model

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ATTACK SURFACE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │   Client     │    │  Liveblocks  │    │  Application │         │
│  │  (Browser)   │◄───│   Cloud      │───►│   (Next.js)  │         │
│  └──────┬───────┘    └──────────────┘    └──────┬───────┘         │
│         │                                       │                  │
│         ▼                                       ▼                  │
│  ┌──────────────┐                      ┌──────────────┐           │
│  │ User Input   │                      │  Env Secrets │           │
│  │ (Canvas,     │                      │  (API Keys)  │           │
│  │  Comments)   │                      │              │           │
│  └──────────────┘                      └──────────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Assets to Protect

| Asset | Classification | Location | Threat |
|-------|----------------|----------|--------|
| Liveblocks API Keys | **Secret** | `.env.local`, CI/CD | Theft, misuse |
| User canvas data | **Confidential** | Liveblocks Storage | Unauthorized access |
| Comment threads | **Confidential** | Liveblocks Threads | Data leakage |
| User presence | **PII** | Liveblocks Presence | Tracking |
| Session tokens | **Secret** | Not implemented | Session hijacking |

---

## Vulnerability Assessment

### 🔴 Critical

#### SEC-001: Hardcoded Room ID — Global Workspace
| Field | Detail |
|-------|--------|
| **File** | `src/provider/liveblocks/room.provider.tsx:12` |
| **Code** | `id="my-room"` |
| **Impact** | All users share single workspace; no project isolation |
| **CVSS** | 9.1 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N) |
| **Remediation** | Dynamic room ID via route param `/project/[id]` |

```typescript
// FIX: Dynamic room from URL
// app/project/[projectId]/page.tsx
export default function ProjectPage({ params }: { params: { projectId: string } }) {
  return <RoomProvider id={params.projectId}><LiveCanvas /></RoomProvider>;
}
```

#### SEC-002: Production Liveblocks Key in `.env.local`
| Field | Detail |
|-------|--------|
| **File** | `.env.local` |
| **Key** | `NEXT_PUBLIC_LIVE_BLOCK_PUBLIC_API_KEY=pk_prod_...` |
| **Impact** | Key exposed in local dev; if committed, public access to Liveblocks project |
| **CVSS** | 7.5 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N) |
| **Remediation** | 1. Rotate key immediately 2. Use CI secrets 3. Never commit `.env.local` |

#### SEC-003: No Authentication / Authorization
| Field | Detail |
|-------|--------|
| **Gap** | No auth layer before `RoomProvider` |
| **Impact** | Anyone with URL joins room; no user identity; no permissions |
| **CVSS** | 9.8 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H) |
| **Remediation** | Add NextAuth.js or Clerk; validate session before room join |

```typescript
// FIX: Auth guard
// src/provider/liveblocks/room.provider.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function RoomProvider({ children, roomId }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');

  const userInfo = { name: session.user.name, avatar: session.user.image };
  return <LiveblocksRoomProvider id={roomId} user={userInfo}>{children}</LiveblocksRoomProvider>;
}
```

#### SEC-004: Client-Only Trust Model
| Field | Detail |
|-------|--------|
| **Gap** | No server API routes (`src/app/api/` absent) |
| **Impact** | All validation in client; malicious client can bypass checks |
| **CVSS** | 8.2 (AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:H/A:N) |
| **Remediation** | Create server API for room creation, user validation, audit logs |

---

### 🟠 High

#### SEC-005: No CI/CD Pipeline — Manual Quality Gates
| Field | Detail |
|-------|--------|
| **Gap** | No `.github/workflows/`; `npm run code:ci` manual |
| **Impact** | No automated security scans; broken code merges |
| **Remediation** | Add GitHub Actions with: SAST, dependency scan, secret scan |

#### SEC-006: Dockerfile.azure Config Mismatch
| Field | Detail |
|-------|--------|
| **File** | `Dockerfile.azure:27` |
| **Code** | `COPY next.config.ts .` |
| **Actual** | `next.config.mjs` exists |
| **Impact** | Azure build fails; deployment blocker |
| **Remediation** | Fix COPY to `next.config.mjs` |

#### SEC-007: Missing Security Headers
| Field | Detail |
|-------|--------|
| **Gap** | No `next.config.mjs` security headers |
| **Impact** | No CSP, HSTS, X-Frame-Options, Referrer-Policy |
| **Remediation** | Add headers in `next.config.mjs` |

```javascript
// next.config.mjs
const securityHeaders = [
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://liveblocks.io; connect-src 'self' https://liveblocks.io wss://liveblocks.io; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';" },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

export default { async headers() { return [{ source: '/:path*', headers: securityHeaders }]; } };
```

---

### 🟡 Medium

#### SEC-008: Inversify Over-Engineering
| Field | Detail |
|-------|--------|
| **Risk** | Unnecessary attack surface (decorators, metadata reflection) |
| **Remediation** | Remove; use static exports |

#### SEC-009: Debug Logging in Production Code
| Field | Detail |
|-------|--------|
| **File** | `components/shapes/menu/ShapesMenuItemOptions.tsx` |
| **Code** | `console.log({ item })` |
| **Risk** | Information leakage in production console |
| **Remediation** | Remove or guard with `process.env.NODE_ENV === 'development'` |

#### SEC-010: No Rate Limiting on Liveblocks Mutations
| Field | Detail |
|-------|--------|
| **Risk** | Malicious client can spam canvas objects, comments, reactions |
| **Remediation** | Implement client-side debouncing; Liveblocks server-side limits |

---

### 🟢 Low

#### SEC-011: Tailwind Config Dead Code
| Field | Detail |
|-------|--------|
| **File** | `tailwind.config.ts:7` |
| **Code** | `content: ['./src/pages/**/*.{js,ts,jsx,tsx}']` |
| **Impact** | Misleading config; no Pages Router |

#### SEC-012: Cypress Artifacts Not Gitignored
| Field | Detail |
|-------|--------|
| **File** | `cypress.config.ts` |
| **Config** | `video: true`, `videoCompression: true` |
| **Risk** | Large video files committed accidentally |
| **Remediation** | Add `cypress/videos/`, `cypress/screenshots/` to `.gitignore` |

---

## OWASP Top 10 Coverage

| OWASP Category | Coverage | Gap |
|----------------|----------|-----|
| **A01: Broken Access Control** | ❌ None | No auth, no RBAC, hardcoded room |
| **A02: Cryptographic Failures** | ⚠️ Partial | HTTPS only; keys in env |
| **A03: Injection** | ✅ Low risk | No SQL; Liveblocks sanitizes |
| **A04: Insecure Design** | ❌ Critical | Client-only trust; no threat model |
| **A05: Security Misconfiguration** | ❌ Multiple | No headers, debug logs, dead config |
| **A06: Vulnerable Components** | ✅ Current | Dependencies up to date |
| **A07: Auth Failures** | ❌ None | No authentication implemented |
| **A08: Software Integrity** | ❌ None | No CI/CD, no supply chain verify |
| **A09: Logging Failures** | ⚠️ Partial | Console logs only; no audit trail |
| **A10: SSRF** | ✅ Low risk | No server-side fetch |

---

## Security Recommendations (Prioritized)

### Phase 1: Immediate (Week 1)
- [ ] Rotate Liveblocks production key
- [ ] Fix `Dockerfile.azure` config reference
- [ ] Remove `console.log` from `ShapesMenuItemOptions.tsx`
- [ ] Add `cypress/videos/` and `cypress/screenshots/` to `.gitignore`

### Phase 2: Authentication (Week 2-3)
- [ ] Integrate NextAuth.js or Clerk
- [ ] Protect `RoomProvider` with session validation
- [ ] Add user identity to Liveblocks presence
- [ ] Implement project-based room routing

### Phase 3: Server Validation (Week 3-4)
- [ ] Create `api/rooms` for room creation/validation
- [ ] Create `api/auth` for session verification
- [ ] Add audit logging for canvas mutations
- [ ] Implement rate limiting on mutations

### Phase 4: CI/CD & Hardening (Week 4-5)
- [ ] Add GitHub Actions workflow (lint, test, build, security scan)
- [ ] Configure Dependabot for dependency updates
- [ ] Add CodeQL or Semgrep for SAST
- [ ] Add secret scanning (TruffleHog/GitLeaks)
- [ ] Implement security headers in `next.config.mjs`

### Phase 5: Ongoing
- [ ] Quarterly dependency audit (`npm audit`)
- [ ] Annual penetration testing
- [ ] Liveblocks usage monitoring/alerts
- [ ] Security training for team

---

## Compliance Notes

| Standard | Status | Notes |
|----------|--------|-------|
| **GDPR** | ❌ Non-compliant | No user consent, no data export/delete, PII in presence |
| **SOC 2** | ❌ Non-compliant | No access controls, no audit logs, no encryption at rest config |
| **ISO 27001** | ❌ Non-compliant | No ISMS, no risk treatment, no incident response |

---

## Incident Response

| Phase | Action | Owner |
|-------|--------|-------|
| **Detect** | Liveblocks alerts, user reports, log anomalies | DevOps |
| **Contain** | Revoke API key, disable room, block IPs | Security |
| **Eradicate** | Rotate secrets, patch vuln, redeploy | Engineering |
| **Recover** | Restore from backup, verify integrity | DevOps |
| **Lessons** | Post-mortem, update threat model, improve monitoring | All |

**Contact**: `justsamuel.asm@gmail.com` (per SECURITY.md)

---

*Generated by Avanade Method Supervisor — Security Analysis*