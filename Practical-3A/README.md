# Practical 3A — Multimedia Gallery Page

A gallery page built to demonstrate HTML5 links, images, and embedded media — links, `<figure>` elements, an embedded YouTube video, and an audio player.

## 🎯 Objective

Create a gallery page that demonstrates:
- Different types of hyperlinks (absolute, relative, mailto, anchor)
- Semantic image markup using `<figure>` and `<figcaption>`
- Embedded third-party video content via `<iframe>`
- Native audio playback with `<audio>`

## 📁 Folder Structure

```
Practical-3A/
├── index.html      # Main HTML structure — nav, gallery, video, audio
├── style.css        # All styling — layout, theme, responsiveness
└── README.md        # This file
```

## 🏗️ Architecture

The page is a single static HTML document (`index.html`) styled by one external stylesheet (`style.css`). No JavaScript or build tools are used — pure HTML5 + CSS3.

```
index.html
│
├── <header class="site-header">
│   ├── .logo                     → site branding
│   └── <nav class="navbar">      → 4 <a> tags
│       ├── absolute link  (external site, target="_blank")
│       ├── relative link  (about.html)
│       ├── mailto link    (contact@wanderlens.com)
│       └── anchor link    (#video-section — jumps down page)
│
├── <section class="hero">        → page title + intro text
│
├── <main>
│   ├── <section class="gallery-section">
│   │   └── .gallery (CSS grid)
│   │       └── 6 × <figure>
│   │           ├── <img alt="...">
│   │           └── <figcaption>
│   │
│   ├── <section class="video-section" id="video-section">
│   │   └── .video-wrapper
│   │       └── <iframe>          → YouTube /embed/ URL
│   │
│   └── <section class="audio-section">
│       └── <audio controls>
│           └── <source>          → mp3 file
│
└── <footer class="site-footer">
```

### How it works

1. **Navigation** — the navbar tests four distinct link behaviors required by the practical: an absolute URL opening in a new tab, a relative path to a sibling page, a `mailto:` link that opens the user's email client, and an in-page `#anchor` that smooth-scrolls to the video section (`html { scroll-behavior: smooth; }` in CSS).
2. **Gallery** — implemented with CSS Grid (`repeat(auto-fit, minmax(260px, 1fr))`) so it reflows from 1 to 3+ columns depending on screen width, with no media queries needed for the grid itself.
3. **Video** — the `<iframe>` uses an `aspect-ratio: 16/9` wrapper so the embed stays proportional at any screen size, instead of a fixed pixel height.
4. **Audio** — a native `<audio controls>` element, no custom player JS — keeps the practical dependency-free.
5. **Styling** — a single design token system (`:root` CSS variables: `--ink`, `--paper`, `--amber`, etc.) drives colors across the whole page for consistency.

## ✅ Practical Checklist

- [x] Nav bar with 4 `<a>` tags (absolute, relative, mailto, anchor)
- [x] 6 `<figure>` elements, each with `<img>` + `<figcaption>`
- [x] Embedded YouTube video using `<iframe>` (`/embed/` URL)
- [x] `<audio>` element with `controls`
- [x] All images have descriptive `alt` text
- [x] Responsive layout (mobile → desktop)

## 🚀 How to Run

1. Clone or download this folder.
2. Open `index.html` directly in any browser (Chrome recommended).
3. Internet connection required — gallery images and video are loaded from external sources.

## 🛠️ Tech Used

- HTML5 (semantic elements)
- CSS3 (Grid, custom properties, `aspect-ratio`, media queries)
- No frameworks, no JavaScript