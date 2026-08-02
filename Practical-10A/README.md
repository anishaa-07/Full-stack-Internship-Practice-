# Practical 10A — Animated Landing Page

## Objective
Build a landing page with meaningful, **accessible** CSS animations: a staggered
`fadeInUp` hero, hover colour/transform transitions, a pure-CSS loading spinner —
and a `prefers-reduced-motion` block that disables all of it for users who need
that. No JavaScript anywhere.

---

## Folder Structure
```
Practical-10A/
├── index.html      → nav, hero, feature cards, spinner section, footer
├── style.css       → all @keyframes, transitions, transforms, and the
│                       reduced-motion override live here
└── README.md        → this file
```

---

## Page Architecture (Visual Overview)

```
┌───────────────────────────────────────────────────────┐
│  NAVBAR   Home   Features   Loading                       │  ← Req 47: colour
│                                                             transition on hover
├───────────────────────────────────────────────────────┤
│                                                             │
│              Motion Makes Interfaces Feel Alive             │  ← Req 46: fadeInUp
│         (fades + slides up @ 0.1s delay)                    │     staggered
│                                                             │
│    Every element on this page animates in with pure CSS…    │  ← fadeInUp @ 0.3s
│                                                             │
│                  [ Explore Features ]                       │  ← fadeInUp @ 0.5s
│                                                             │
├───────────────────────────────────────────────────────┤
│                        Features                              │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│   │  ⚡ Fast  │    │  🎯Precise│    │ ♿Accessible│              │  ← Req 48: hover =
│   └─────────┘    └─────────┘    └─────────┘              │     translateY(-8px)
│       ↑ hover lifts card + deepens shadow                    │     + shadow
├───────────────────────────────────────────────────────┤
│                     Loading State                            │
│                        ⟳                                   │  ← Req 49: pure-CSS
│                  (spinning circle)                            │     spinner
├───────────────────────────────────────────────────────┤
│                       FOOTER                                  │
└───────────────────────────────────────────────────────┘

@media (prefers-reduced-motion: reduce) sits at the BOTTOM of the
stylesheet and overrides every animation/transition above (Req 50).
```

---

## Component Tree

```
body
│
├── nav.navbar
│   ├── div.navbar__logo
│   └── ul.navbar__links              [a:hover → transition: color 0.2s ease]
│       └── a × 3
│
├── header#hero.hero
│   ├── h1.hero__title                [animation: fadeInUp, delay 0.1s]
│   ├── p.hero__subtitle              [animation: fadeInUp, delay 0.3s]
│   └── a.hero__cta                   [animation: fadeInUp, delay 0.5s]
│
├── main
│   ├── section#features.features
│   │   ├── h2.section-title
│   │   └── div.features__grid
│   │       └── article.feature-card × 3   [hover → translateY(-8px) + shadow]
│   │
│   └── section#loading.loading
│       ├── h2.section-title
│       ├── p.loading__caption
│       └── div.spinner                 [animation: spin 0.8s linear infinite]
│
└── footer.page-footer
```

---

## Diagram 1 — Staggered `fadeInUp` (Requirement 46)

```
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0);    }
}

TIMELINE (seconds since page load):
0.0s        0.1s              0.3s                0.5s              0.7s
 │           │                 │                   │                 │
 │           ├─ h1 starts ────►│                   │                 │
 │           │  (animation-     0.7s total          │                 │
 │           │   delay: 0.1s)  (0.1s delay          │                 │
 │           │                  + 0.6s duration)     │                 │
 │           │                 ├─ p starts ────────►│                 │
 │           │                 │  (animation-        0.9s total       │
 │           │                 │   delay: 0.3s)                       │
 │           │                 │                   ├─ a starts ──────►│
 │           │                 │                   │  (animation-      1.1s total
 │           │                 │                   │   delay: 0.5s)
```

Each element uses the **same** `fadeInUp` keyframes and the **same** 0.6s duration —
only `animation-delay` differs (0.1s / 0.3s / 0.5s). That's the entire staggering
technique: identical animation, offset start times, so the hero reveals itself
top-to-bottom instead of all elements popping in simultaneously. The `both` keyword
in `animation: fadeInUp 0.6s ease-out both` keeps each element at its `from` state
(`opacity:0`) during its delay, instead of flashing visible before the animation
actually starts.

## Diagram 2 — Nav Link Hover Transition (Requirement 47)

```
.navbar__links a { transition: color 0.2s ease; }

REST STATE                  HOVER STATE
color: var(--color-muted)   color: var(--color-primary)
   (grey)                       (blue)

   grey ───────0.2s ease-curve──────► blue
        ▲
        smoothly interpolated, not an instant snap --
        this is the entire job `transition` does: animate
        the GAP between two states of the same property.
```

Only `color` is listed in the `transition` property (not `all`), which is a small
but important choice — it keeps the browser from having to watch every property on
the element for changes, and makes the intent of the code explicit.

## Diagram 3 — Feature Card Hover: `transform` + `box-shadow` (Requirement 48)

```
REST:                          HOVER:
┌─────────────┐               ┌─────────────┐
│              │               │              │  ← card physically moves
│   ⚡ Fast     │               │   ⚡ Fast     │     UP by 8px
│              │               │              │
└─────────────┘               └─────────────┘
   flat shadow                  ░░░░░░░░░░░░░   ← shadow grows larger/
                                 ░░░░░░░░░░░       softer underneath,
                                                    reinforcing the sense
transform: translateY(-8px);                       of the card lifting
box-shadow: 0 16px 32px rgba(...);                  off the page
```

`transform: translateY()` (not `top`/`margin-top`) is used specifically because
transforms run on the GPU compositor thread — they don't trigger layout recalculation
(reflow) the way changing `top` or `margin` would, so the hover stays smooth even on
a page with many cards animating independently.

## Diagram 4 — Pure-CSS Spinner (Requirement 49)

```
.spinner {
  border: 5px solid var(--color-surface);   ← full ring, background colour
  border-top-color: var(--color-primary);    ← ONE side recoloured differently
  border-radius: 50%;                        ← ring becomes a circle
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

    ╭──────╮        ╭──────╮        ╭──────╮
   ╱ ●      ╲      ╱      ● ╲      ╱   ●    ╲     ← the differently-
  │          │ ──► │          │ ──► │          │       coloured top
   ╲        ╱      ╲        ╱      ╲        ╱        border segment
    ╰──────╯        ╰──────╯        ╰──────╯        visually "orbits"
    0°               120°              240°           as the WHOLE
                                                       element rotates
```

The trick behind every pure-CSS spinner: it isn't actually drawing a moving arc —
it's a complete circular border where **one segment (`border-top-color`) is a
different colour**, and the entire element just rotates 360° forever
(`linear infinite`). `linear` (not `ease`) is essential here — an eased spin would
visibly speed up and slow down each rotation, which reads as broken rather than
loading.

## Diagram 5 — `prefers-reduced-motion` Override (Requirement 50)

```
Without the override:                 With the override active:
┌─────────────────────┐              ┌─────────────────────┐
│  Hero fades/slides up  │              │  Hero fully visible    │
│  over 0.6s per element  │              │  IMMEDIATELY, no        │
│                          │   becomes    │  motion at all           │
│  Cards lift on hover     │   ──────►    │                          │
│                          │              │  Cards do NOT lift on   │
│  Spinner rotates          │              │  hover                   │
│  continuously             │              │                          │
│                          │              │  Spinner: same visual,  │
│                          │              │  loops once near-       │
│                          │              │  instantly (still        │
│                          │              │  communicates "loading") │
└─────────────────────┘              └─────────────────────┘

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  .hero__title, .hero__subtitle, .hero__cta { opacity: 1; transform: none; }
}
```

The blanket `0.01ms !important` rule is the standard, widely-used pattern for
"effectively disable every animation and transition on the page" — `0` itself can
cause some browsers to skip `animationend` events entirely, so a **near-zero**
duration is used instead. The extra rule forcing `.hero__title` etc. to
`opacity: 1; transform: none;` is necessary because those elements' *rest state* is
defined by the keyframes' `from` values (invisible, offset) — without this override,
a reduced-motion user would see the hero permanently stuck at `opacity: 0` once the
animation duration is squashed to nothing.

---

## Requirements Checklist

| # | Requirement | Implementation |
|---|---|---|
| 46 | Hero: `fadeInUp` on `h1`/`p` with staggered delays | `.hero__title` (0.1s), `.hero__subtitle` (0.3s), `.hero__cta` (0.5s) |
| 47 | Nav links: colour transition on hover, 0.2s ease | `.navbar__links a { transition: color 0.2s ease; }` |
| 48 | Feature cards: `translateY(-8px)` + box-shadow on hover | `.feature-card:hover` |
| 49 | Pure-CSS spinner, no JavaScript | `.spinner` + `@keyframes spin` |
| 50 | `prefers-reduced-motion: reduce` disables all animation | final `@media` block, overrides everything above |

---

## Architecture / Design Decisions

### 1. Why `transform`/`opacity` for animated properties (not `top`/`width`/etc.)
Every animation and transition in this page only ever touches `transform` and
`opacity` — never layout-triggering properties like `top`, `left`, `width`, or
`margin`. Both `transform` and `opacity` can be handled entirely by the GPU
compositor without forcing the browser to recalculate page layout on every frame,
which is what keeps the hero's staggered entrance and the spinner's continuous
rotation smooth even on modest hardware.

### 2. `animation: ... both` on the hero elements
The `both` fill-mode value was chosen specifically so each hero element stays in
its `from` state (invisible, offset) during its `animation-delay`, and stays in its
`to` state (visible, in place) after the animation finishes. Without `both`, the
elements would flash visible during their delay window before the animation had
actually started.

### 3. `linear` timing for the spinner, `ease`/`ease-out` for everything else
The spinner deliberately uses `linear` because a loading indicator needs a
perfectly constant rotation speed to read as "still working" — any easing curve
would make it visibly speed up and slow down each loop, which looks like a stutter
or a bug. Every other animation on the page (`fadeInUp`, hover transitions) uses
`ease` or `ease-out`, since those benefit from a more natural, decelerating motion.

### 4. `prefers-reduced-motion` placed last, and made comprehensive
The reduced-motion block sits at the very bottom of the stylesheet so its
`!important` overrides win regardless of specificity elsewhere. It's also written
broadly — targeting the universal selector — rather than only touching the hero,
because hover transforms on the feature cards and CTA button are motion too, and
a reduced-motion user shouldn't get lifting cards even though that particular
motion wasn't explicitly called out as an "animation."

### 5. No JavaScript, anywhere
Every effect on this page — the staggered entrance, hover transitions, and the
spinner — is achieved with `@keyframes`, `transition`, and `:hover`/`:focus-visible`
alone, matching the practical's explicit scope: motion driven entirely by CSS.

---

## How to Test

1. Open `index.html` in a browser and reload the page — watch the hero heading,
   paragraph, and button fade/slide in one after another, not all at once.
2. Hover over each nav link — colour shifts smoothly over ~0.2s rather than
   snapping instantly.
3. Hover over each feature card — it lifts up 8px and its shadow deepens, then
   returns to rest when you move away.
4. Scroll to the "Loading State" section — confirm the spinner rotates at a
   constant, unchanging speed.
5. In Chrome DevTools: `Cmd/Ctrl+Shift+P` → "Rendering" → set
   "Emulate CSS media feature prefers-reduced-motion" to **reduce**, then reload.
   Confirm the hero appears instantly with no fade/slide, and hovering feature
   cards no longer lifts them (spinner may still loop, just without any
   perceptible easing change).

---

## Author
Anisha — Full-Stack Internship
GitHub: [anishaa-07/Full-stack-Internship-Practice-](https://github.com/anishaa-07/Full-stack-Internship-Practice-)