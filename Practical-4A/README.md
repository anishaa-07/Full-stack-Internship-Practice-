# Practical 4A — Registration Form

> Module 4: HTML Forms & Input | Full-Stack Internship Practicals

## Objective

Build a complete, multi-section registration form demonstrating semantic form
structure, all common input types, and native browser validation — **no
JavaScript required**.

## Live Requirements Checklist

- [x] `<form method="POST">` with two `<fieldset>` sections — *Personal Info* & *Account Info*
- [x] Personal: `name` (required, `minlength=2`), `dob` (date), `phone` (tel, `pattern="[0-9]{10}"`), `gender` (radio group)
- [x] Account: `email` (required), `password` (required, `minlength=8`), `country` (select), `profile-pic` (file)
- [x] Every input has a proper `<label for>` (or grouped under a nested `<fieldset>`/`<legend>` for radios)
- [x] Submit + Reset buttons
- [x] Verified invalid submissions trigger native browser validation messages

## Folder Structure

```
practical-4a/
├── index.html      # Form markup — semantic, accessible
├── style.css       # Darkroom theme — custom properties, CSS Grid
└── README.md        # This file
```

## Architecture Diagram

```
index.html
│
├── <header class="page-header">
│     └── Eyebrow + Title + Subtitle
│
├── <main class="page-main">
│     └── <form class="reg-form" method="POST" novalidate>
│           │
│           ├── <fieldset class="reg-form__section">  (01 · Personal Info)
│           │     └── .form-grid
│           │           ├── Full Name       (text, required)
│           │           ├── Date of Birth   (date)
│           │           ├── Phone Number    (tel, pattern)
│           │           └── Gender          (nested fieldset → radio group)
│           │
│           ├── <fieldset class="reg-form__section">  (02 · Account Info)
│           │     └── .form-grid
│           │           ├── Email           (email, required)
│           │           ├── Password        (password, required)
│           │           ├── Country         (select)
│           │           └── Profile Picture (file)
│           │
│           └── .reg-form__actions → Reset / Submit buttons
│
└── <footer class="page-footer">
```

## Component Tree (CSS)

```
:root                         → design tokens (colour, spacing, radius, shadow)
body                           → flex column, min-height: 100vh
.page-header                   → intro copy
.reg-form                      → card container (grid gap)
  .reg-form__section           → fieldset wrapper (bordered)
    .reg-form__legend          → numbered section title
    .form-grid                 → auto-fit responsive field grid
      .form-field              → label + input + hint
      .form-field--radio-group → nested fieldset, spans full width
        .radio-row              → flex row of .radio-option
  .reg-form__actions           → button row
.page-footer                   → closing credit line
```

## Design Decisions

1. **Darkroom theme continuity** — reused the CSS custom-property palette
   from Practical 3A (`--color-bg`, `--color-accent`, etc.) so the whole
   practicals series feels like one coherent design system rather than
   disconnected exercises.

2. **`novalidate` + native validation left intact** — the `<form>` uses
   `novalidate` only to suppress the browser's default error-bubble
   *styling*, not the validation itself. `required`, `minlength`, and
   `pattern` still block submission and the browser still reports invalid
   fields — this satisfies the practical's requirement to *observe* native
   validation messages while keeping visual control via `:invalid`/`:valid`
   CSS states.

3. **`:not(:placeholder-shown):invalid`** — validity colours (red/green
   borders) only appear *after* the user has typed something, not on page
   load. This avoids the common beginner mistake of every empty required
   field showing red immediately.

4. **Nested `<fieldset>` for the radio group** — gender radios are wrapped
   in their own `<fieldset><legend>` inside the Personal Info fieldset.
   This is the semantically correct way to group related radio inputs and
   is what screen readers announce as a set.

5. **CSS Grid `auto-fit, minmax(240px, 1fr)`** — the field grid
   automatically reflows from 2 columns on desktop to 1 column on narrow
   screens with zero media queries needed.

6. **`::file-selector-button`** — the native file input button is
   restyled to match the theme's accent colour instead of leaving the
   default OS-styled grey button.

7. **No JavaScript** — every interactive/validation behaviour (required
   fields, pattern matching, min length, native error bubbles) is achieved
   purely through HTML5 attributes + CSS, per the practical's scope.

## How to Test

1. Open `index.html` in Chrome.
2. Click **Create Account** with everything empty → browser highlights
   `Full Name`, `Email`, and `Password` as required.
3. Type a 9-digit phone number → pattern mismatch message appears.
4. Type a 6-character password → `minlength` message appears.
5. Fill correctly → form would `POST` to `action="#"` (no backend wired up
   in this practical).

## Practical Checklist (from course sheet)

- [x] `<form method='POST'>` with two `<fieldset>` sections
- [x] Personal: name (required, minlength=2), dob (date), phone (tel, pattern), gender (radio)
- [x] Account: email (required), password (required, minlength=8), country (select), profile-pic (file)
- [x] `<label for>` on every input
- [x] Submit button
- [x] Tested invalid submission → observed native browser error messages