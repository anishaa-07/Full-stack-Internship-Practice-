# Practical 9A — Responsive Portfolio Layout (Mobile-First)

## Objective
Build a fully responsive portfolio page written **mobile-first**: base CSS targets
the smallest screen with no media query at all, then `min-width` media queries
progressively enhance the layout upward at 768px and 1024px. Includes a
`prefers-color-scheme: dark` theme via CSS custom properties.

---

## Folder Structure
```
Practical-9A/
├── index.html      → header/nav, hero, projects, skills, contact, sidebar, footer
├── style.css       → mobile-first base styles + 2 min-width breakpoints + dark theme
└── README.md        → this file
```

---

## The Mobile-First Philosophy (why the CSS is ordered this way)

```
DESKTOP-FIRST (the OLD way)           MOBILE-FIRST (this practical)
──────────────────────────           ──────────────────────────
.grid { 3 columns }        ← base    .grid { 1 column }        ← base
                                       (no media query needed
@media (max-width:1023px)              for the smallest screens
  .grid { 2 columns }                  at all -- it's just the
                                       default!)
@media (max-width:767px)
  .grid { 1 column }                  @media (min-width:768px)
                                        .grid { 2 columns }
  ↑ browser must download &
    override desktop styles           @media (min-width:1024px)
    even on the phone that              .grid { 3 columns }
    never needed them
                                       ↑ phones download ONLY the
                                         base rules -- no wasted
                                         overrides to undo
```

Mobile devices — often on slower connections — parse only the lightweight base
rules by default. Overrides are added, not undone, as the viewport grows. This is
the reasoning behind writing every rule in this stylesheet mobile-first, with
`min-width` queries only ever adding capability, never removing it.

---

## Page Architecture Across Breakpoints

```
< 768px (MOBILE — Requirement 41)          >= 768px (TABLET — Requirement 42)
┌─────────────────────┐                   ┌─────────────────────────────┐
│ logo                  │                   │ logo         Home Projects... │ ← nav
│ Home                   │  ← nav stacked    ├─────────────────────────────┤    now horizontal
│ Projects               │    vertically     │ Hero text                     │
│ Skills                 │                   ├─────────────────────────────┤
│ Contact                │                   │ ┌─────────┐ ┌─────────┐        │
├─────────────────────┤                   │ │  card    │ │  card    │        │ ← 2 columns
│ Hero text              │                   │ └─────────┘ └─────────┘        │
├─────────────────────┤                   │ ┌─────────┐ ┌─────────┐        │
│ ┌───────────────────┐│                   │ │  card    │ │  card    │        │
│ │       card           ││  ← 1 column      │ └─────────┘ └─────────┘        │
│ └───────────────────┘│    project grid   │ ...                            │
│ ┌───────────────────┐│                   └─────────────────────────────┘
│ │       card           ││                   (no sidebar yet)
│ └───────────────────┘│
│ ...                    │
└─────────────────────┘
(no sidebar at all)

>= 1024px (DESKTOP — Requirement 43)
┌───────────────────────────────────────────────┐
│ logo                        Home  Projects  Skills  Contact │
├───────────────────────────────────┬───────────────┤
│ Hero text                            │  SIDEBAR       │
├───────────────────────────────────┤  (appears here  │
│ ┌────────┐ ┌────────┐ ┌────────┐    │  for the first  │
│ │  card   │ │  card   │ │  card   │    │  time)          │
│ └────────┘ └────────┘ └────────┘    │  Quick Facts    │
│ ┌────────┐ ┌────────┐ ┌────────┐    │  Connect        │
│ │  card   │ │  card   │ │  card   │    │  (sticky)       │
│ └────────┘ └────────┘ └────────┘    │                 │
│         ↑ 3-column project grid       │                 │
└───────────────────────────────────┴───────────────┘
```

---

## Component Tree

```
body
│
├── header.site-header
│   ├── div.site-header__bar
│   │   └── a.logo
│   └── nav.nav                        [flex-direction: column → row @768px]
│       └── a × 4
│
├── div.layout                          [1 column → grid: 1fr 280px @1024px]
│   │
│   ├── main.content
│   │   ├── section#home.hero
│   │   ├── section#projects.projects
│   │   │   └── div.projects__grid       [1col → 2col @768px → 3col @1024px]
│   │   │       └── article.project-card × 6
│   │   ├── section#skills.skills
│   │   │   └── ul.skills__list
│   │   └── section#contact.contact
│   │       └── a.contact__cta
│   │
│   └── aside.sidebar                   [display:none → block @1024px]
│       ├── h3 + ul (Quick Facts)
│       └── h3 + ul (Connect)
│
└── footer.site-footer
```

---

## Diagram — Breakpoint Timeline (Requirement 41, 42, 43)

```
0px          480px        768px              1024px            1280px+
 │             │             │                    │                 │
 ├─ BASE (mobile) ─────────►│                    │                 │
 │  • nav: column            │                    │                 │
 │  • grid: 1 column          │                    │                 │
 │  • sidebar: none            │                    │                 │
 │             │             ├─ @media(min-width:768px) ───────────►│
 │             │             │  • nav: row                          │
 │             │             │  • grid: 2 columns                    │
 │             │             │  • sidebar: still none                 │
 │             │             │                    ├─ @media(min-width:1024px) ──►
 │             │             │                    │  • grid: 3 columns
 │             │             │                    │  • sidebar: block, sticky
 │             │             │                    │
 test point:  │             375px               768px              1280px
 (Requirement 45 -- Chrome DevTools Device Toolbar checkpoints)
```

Every rule inside a `min-width` query is *additive* — it only ever tightens or
rearranges something that already works at the base (mobile) level. Nothing is ever
"undone" going up the breakpoint chain, which is the defining trait of true
mobile-first CSS as opposed to `max-width`-based desktop-first overrides.

## Diagram — Dark Mode via Custom Properties (Requirement 44)

```
:root { --color-bg: #f8fafc; --color-text: #1e293b; ... }   ← light theme (default)

@media (prefers-color-scheme: dark) {
  :root { --color-bg: #0f172a; --color-text: #f1f5f9; ... }  ← dark theme
}

Every component references the VARIABLE, never a hard-coded colour:
  .site-header { background: var(--color-surface); }
  body          { color: var(--color-text); }

┌─────────────────────────┐        ┌─────────────────────────┐
│  LIGHT (OS: light mode)   │        │  DARK (OS: dark mode)      │
│  bg: #f8fafc               │  ⇄     │  bg: #0f172a                 │
│  text: #1e293b (dark)      │        │  text: #f1f5f9 (light)       │
│  surface: #ffffff           │        │  surface: #1e293b            │
└─────────────────────────┘        └─────────────────────────┘
        Same HTML. Same class names. Only the custom-property
        VALUES swap based on the user's OS-level preference —
        zero JavaScript, zero duplicate component CSS.
```

Because every color in this stylesheet is a `var(--color-*)` reference rather than a
literal hex value, the entire dark theme is achieved by redefining ~7 variables
inside one media query — no component-level CSS had to be duplicated or overridden.

---

## Requirements Checklist

| # | Requirement | Implementation |
|---|---|---|
| 41 | Mobile: single column, vertical nav | Base (no media query): `.nav { flex-direction: column }`, `.projects__grid { grid-template-columns: 1fr }` |
| 42 | 768px+: horizontal nav, 2-column project grid | `@media (min-width: 768px)` |
| 43 | 1024px+: 3-column project grid, sidebar appears | `@media (min-width: 1024px)` — `.sidebar { display: block }` |
| 44 | `prefers-color-scheme: dark` theme | `@media (prefers-color-scheme: dark)` redefines `:root` custom properties |
| 45 | Test at 375px / 768px / 1280px | See "How to Test" below |

---

## Architecture / Design Decisions

### 1. Why `min-width`, never `max-width`
Every media query in this stylesheet uses `min-width`. This is the defining
technical marker of mobile-first CSS: rules only ever get *added* as the viewport
grows, meaning a phone parsing this file never has to download rules meant for
desktop only to immediately override them — it just never sees them at all
(they're gated behind the `min-width` condition it doesn't meet).

### 2. Sidebar: `display: none` → `display: block`, not a layout hack
The sidebar isn't squeezed into a tiny column on mobile or hidden behind
`visibility` tricks — it's `display: none` in the base styles and simply doesn't
exist in the rendered layout below 1024px, then becomes a real sticky column at
1024px+. This keeps the DOM lightweight on mobile (the browser still parses the
markup, but it costs nothing in layout).

### 3. Sticky sidebar at desktop widths
`.sidebar { position: sticky; top: 1.5rem; }` at 1024px+ means the "Quick Facts" and
"Connect" panel tracks with scrolling instead of disappearing off-screen — a small
touch that only makes sense once there's enough vertical room for it to matter.

### 4. Why CSS custom properties (not two full stylesheets) for dark mode
Rather than writing a second, parallel `.dark-theme` class or duplicate CSS block,
every colour in this file is expressed as `var(--color-*)`. This means the entire
dark theme is just one media query redefining ~7 variables in `:root` — every
component automatically re-themes itself with zero additional code, since they all
already reference the shared variables.

### 5. `rem`/relative units throughout, no fixed `px` breakpoint traps
Font sizes and spacing use `rem` rather than `px` wherever practical, so the layout
still respects a user's browser-level zoom/accessibility settings even as it
responds to viewport width via the `min-width` breakpoints.

---

## How to Test

1. Open `index.html` in Chrome and open DevTools → Toggle Device Toolbar
   (`Ctrl+Shift+M` / `Cmd+Shift+M`).
2. **375px** — confirm: nav links stacked vertically, project cards in a single
   column, no sidebar visible at all.
3. **768px** — confirm: nav links now sit in a horizontal row, project cards form
   a 2-column grid, sidebar is still hidden.
4. **1280px** — confirm: project cards form a 3-column grid, and the sidebar
   ("Quick Facts" / "Connect") appears as a sticky right-hand column.
5. Toggle your OS or Chrome's rendered emulation to dark mode
   (DevTools → `Cmd/Ctrl+Shift+P` → "Rendering" → "Emulate CSS prefers-color-scheme")
   and confirm the whole page switches to the dark palette instantly.

---

## Author
Anisha — Full-Stack Internship
GitHub: [anishaa-07/Full-stack-Internship-Practice-](https://github.com/anishaa-07/Full-stack-Internship-Practice-)