# UX / Design Documentation

## Design System Overview

**System**: Hybrid — Tailwind CSS 3.4 + Sass modules (`.scss`)
**Theme Mode**: Light / Dark (system-aware)
**Design Tokens**: CSS variables (`tailwind.config.ts`)

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                           │
│  [Logo] [Project Name] [Share] [Export]          [User Avatar]     │
├──────────┬──────────────────────────────────────────────────────────┤
│  SIDEBAR │  MAIN CANVAS                                               │
│          │                                                             │
│  Tools   │  ┌─────────────────────────────────────────────────────┐ │
│  [Rect]  │  │                                                     │ │
│  [Circ]  │  │            Fabric.js Canvas (#canvas-board)        │ │
│  [Line]  │  │                                                     │ │
│  [Text]  │  │  • Interactive objects                             │ │
│          │  │  • Multi-selection                                  │ │
│  Colors  │  │  • Reactions (floating emoji)                      │ │
│  [Palette]│  │  • Thread comments (Portal.Root)                   │ │
│          │  │                                                     │ │
│  Layers  │  └─────────────────────────────────────────────────────┘ │
│  [Layers]│                                                             │
└──────────┴──────────────────────────────────────────────────────────┘
```

---

## Component Catalog

| Component | Directory | Purpose | Key Pattern |
|-----------|-----------|---------|-------------|
| `LiveCanvas` | `components/live/live.component.tsx` | Main canvas entry | Hook orchestration |
| `LiveCanvas` | `components/live/` | Canvas + sidebar layout | Flex grid |
| `Navbar` | `components/navigation/` | Top bar with actions | Radix DropdownMenu |
| `Sidebar` | `components/sidebar/` | Tool palette + layers | Collapsible |
| `CanvasBoard` | `components/canvas/` | Fabric.js wrapper | Ref forwarding |
| `ShapesMenu` | `components/shapes/menu/` | Shape selection dropdown | Radix + SVG icons |
| `NewThreadCursor` | `components/thread/thread-cursor/` | Comment anchor | Absolute positioning |
| `ThreadComposer` | `components/thread/composer/` | Comment input | Portal.Root |
| `FloatingReaction` | `components/reaction/floating/` | Emoji animations | CSS animation modules |
| `PresenceCursor` | `components/cursor/` | Remote user cursors | Presence sync |

---

## Design Tokens (Tailwind Config)

```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',  // ⚠️ DEAD — remove
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme variables (via CSS vars in layout.tsx)
        canvas: { DEFAULT: '#f8f9fa', dark: '#1a1a2e' },
        sidebar: { DEFAULT: '#ffffff', dark: '#16213e' },
        primary: { DEFAULT: '#3b82f6', dark: '#60a5fa' },
        // ... design token extensions
      },
      animation: {
        // Reaction animations
        'go-up': 'goUp 1.5s ease-in-out forwards',
        'left-right': 'leftRight 0.8s ease-in-out',
        'disappear': 'disappear 0.5s ease-out forwards',
      },
    },
  },
};
```

---

## Theming

### ThemeProvider

```typescript
// provider/theme/theme.provider.tsx
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('system');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeContext.Provider>
  );
}
```

### CSS Variables

```scss
// live/style.scss or CSS variables
:root {
  --canvas-bg: #f8f9fa;
  --sidebar-bg: #ffffff;
  --primary-color: #3b82f6;
  --text-primary: #1a1a2e;
  --border-color: #e5e7eb;
}

.dark {
  --canvas-bg: #1a1a2e;
  --sidebar-bg: #16213e;
  --primary-color: #60a5fa;
  --text-primary: #f1f5f9;
  --border-color: #334155;
}
```

---

## Accessibility (WCAG 2.1 AA)

| Requirement | Status | Evidence |
|-------------|--------|----------|
| **Perceivable** | ⚠️ Partial | Canvas not keyboard-navigable |
| **Operable** | ⚠️ Partial | No focus indicators on canvas objects |
| **Understandable** | ✅ Good | Clear labels, consistent navigation |
| **Robust** | ⚠️ Partial | No ARIA roles for canvas elements |

### Gaps & Recommendations

| Gap | File | Fix |
|-----|------|-----|
| Canvas objects not focusable | `canvas/` | Add `tabIndex={0}` + `onKeyDown` |
| No screen reader description for shapes | `shapes/` | Add `aria-label` with shape type + position |
| Low contrast in dark mode | `tailwind.config.ts` | Verify AA contrast ratios |
| No skip links | `layout.tsx` | Add `<a href="#main">Skip to content</a>` |
| Reaction animations may trigger vestibular disorders | `reaction/` | Add `prefers-reduced-motion` media query |

---

## Interaction Patterns

### Keyboard Shortcuts

```typescript
// @modules/infra/config/const/shortcuts.config.ts
export const SHORTCUTS = {
  // Tools
  'v': 'select',        // Select tool
  'r': 'rectangle',     // Rectangle
  'o': 'ellipse',       // Ellipse
  'l': 'line',          // Line
  't': 'text',          // Text
  // Actions
  'ctrl+d': 'duplicate',
  'ctrl+z': 'undo',
  'ctrl+shift+z': 'redo',
  'delete': 'remove',
};
```

### Real-time Presence

| Element | File | Behavior |
|---------|------|----------|
| **Cursor** | `cursor/` | Remote user cursors tracked via Liveblocks presence |
| **Selection** | `cursor/selection/` | Multi-user selection indicators |
| **Reaction** | `reaction/floating/` | Animated emoji reactions on click |
| **Comment** | `thread/` | Thread markers anchored to canvas position |

---

## Animation Design

| Animation | Component | Duration | Easing | Trigger |
|-----------|-----------|----------|--------|---------|
| `goUp` | `FloatingReaction` | 1.5s | ease-in-out | Reaction created |
| `leftRight` | `FloatingReaction` | 0.8s | ease-in-out | Reaction hovered |
| `disappear` | `FloatingReaction` | 0.5s | ease-out | Reaction aged |
| `fadeIn` | `LiveCanvas` | 0.3s | ease | Page mount |

---

## Responsive Design

**Status**: Desktop-first. No mobile breakpoints configured.

| Breakpoint | Status | Notes |
|------------|--------|-------|
| `sm: 640px` | ❌ Not configured | No mobile layout |
| `md: 768px` | ❌ Not configured | No tablet layout |
| `lg: 1024px` | ⚠️ Default | Desktop-only design |
| `xl: 1280px` | ⚠️ Default | Large screens |

---

## Component Patterns

### Button Pattern

```typescript
// Standard button (Radix + CVA)
import { cva } from 'class-variance-authority';

const buttonVariants = cva('rounded-md px-4 py-2', {
  variants: {
    variant: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      ghost: 'hover:bg-gray-100',
    },
    size: {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
      lg: 'h-12 text-lg',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});
```

### Portal Pattern (Comments)

```typescript
// ThreadComposer uses Radix Portal
import { Portal } from '@radix-ui/react-portal';

export function ThreadComposer() {
  return (
    <Portal.Root container={document.body}>
      <div className="fixed z-50" style={{ top: y, left: x }}>
        {/* Composer content */}
      </div>
    </Portal.Root>
  );
}
```

---

## Design Quality Metrics

| Metric | Target | Status | Tool |
|--------|--------|--------|------|
| **Color Contrast** | AA (4.5:1) | ⚠️ Unverified | WebAIM Contrast Checker |
| **Touch Targets** | 44px min | ⚠️ Unverified | Manual audit |
| **Animation Duration** | < 1s for micro-interactions | ✅ Most < 1.5s | CSS inspection |
| **Font Loading** | System + Geist (Next font) | ✅ Optimized | `next/font` |
| **Image Optimization** | `next/image` | ⚠️ Not configured | Lighthouse audit |

---

*Generated by Avanade Method Supervisor — UX Design Analysis*