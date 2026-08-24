# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`pankaj-kumar-techie.github.io` — a static personal/portfolio site ("PANKAJ.AI") for an AI Agent Architect. Plain HTML5 + vanilla CSS + vanilla JS. No framework, no bundler, no `package.json`, no `node_modules`, no test suite.

## Commands

There is no build step. To preview locally, serve the directory with any static file server, e.g.:

```
python3 -m http.server 8000
```

then open `http://localhost:8000/index.html`. There is no lint or test command in this repo.

## Deployment

`.github/workflows/static.yml` deploys the entire repo as-is to GitHub Pages on every push to `main` (no build/compile step — the whole repo root is uploaded verbatim).

The workflow also runs `sed -i "s/__GEMINI_API_KEY__/${{ secrets.GEMINI_API_KEY }}/g" js/terminal.js` before upload. This is a leftover from an earlier architecture where the frontend called Gemini directly — `js/terminal.js` no longer contains that placeholder (chat now proxies through a separate Cloudflare Worker, see below), so this step is currently a no-op. Don't reintroduce a raw API key into `js/terminal.js`; if the sed step needs removing, that's a deliberate cleanup, not something to do incidentally.

## Pages

- `index.html` — homepage: hero, capabilities, featured missions (top 6, newest-first), GitHub activity panel, reviews, terminal-style lead-intake chat, contact.
- `missions.html` — full list of all projects, rendered from the same data source as the homepage.
- `portfolio.html` — single dynamic case-study template; the actual project is chosen via `?portfolio=<slug>` query param (e.g. `portfolio.html?portfolio=lead-qualification`) and rendered client-side.
- `404.html` — standalone error page (own `js/404.js` / `css/404.css`).

## Data-driven content — the two-file pattern

Project/mission content lives in **two parallel JS data files** that must be kept in sync when adding, removing, or reordering a mission:

- **`js/data.js`** — `PANKAJ_DB.projects[]`: the summary used by the homepage mission log and `missions.html` grid (id, code, name, tagline, short description, chips, `url`). Also `PANKAJ_DB.reviews[]`. `renderMissionLog()` here reverses the array to show newest projects first and slices to `HOME_FEATURED_PROJECTS` (6) for the homepage.
- **`js/portfolios-data.js`** — `PORTFOLIO_DATA{}`, keyed by the same slug used in `?portfolio=<slug>`: full case-study detail (brief, problem, solution, tech_stack, metrics, outcomes, cta, `theme`, and `prev_mission`/`next_mission` slugs forming a linked list for the prev/next navigation on the case-study page). `generatePortfolioContent()` at the bottom of this file turns each entry into a markdown string (`.content`), which `js/portfolio-loader.js` renders to HTML via `marked.js` (loaded from a CDN `<script>` tag, not bundled).

**To add a new mission:** add an entry to `PANKAJ_DB.projects` in `data.js` (matching `id`/slug), add a matching entry to `PORTFOLIO_DATA` in `portfolios-data.js` under the same slug, and re-point the previous last mission's `next_mission` and the new entry's `prev_mission` to keep the case-study nav chain unbroken. `missions.html` and `index.html` both read `PANKAJ_DB` directly and require no separate edits.

## Terminal chat widget

`js/terminal.js` implements a simulated terminal chat UI that boots on scroll-into-view (`IntersectionObserver`) and either free-chats or runs a 3-step lead-intake flow (name → email → problem). It talks to `WORKER_URL`, an external Cloudflare Worker (not part of this repo) for `/api/chat`, `/webhook/lead`, `/webhook/visit`, and `/webhook/session_end`. There is no backend code here — all AI/lead-capture logic lives in that separately-deployed Worker.

## GitHub activity panel

`js/github.js` fetches the public GitHub REST API client-side (unauthenticated, subject to GitHub's anonymous rate limit) for a hardcoded `GH_USER` to populate the "GitHub intelligence" panel on the homepage (profile stats, top languages, recent public events feed).

## CSS structure

- `css/core.css` — shared components used by `missions.html` and `portfolio.html` (loaded alongside a page-specific stylesheet).
- `css/index.css` — homepage-only; it is **self-contained** (defines its own `:root` variables) and is loaded standalone on `index.html` without `core.css`.
- `css/case-study.css` — case-study page styling; supports per-mission color themes via a body class `theme-{red|green|blue|amber}`, applied at runtime in `portfolio-loader.js` from each `PORTFOLIO_DATA` entry's `theme` field.
- `css/404.css` — 404 page only.

`js/core.js` is included on every page and provides cross-page chrome shared by all of them: custom cursor + trail, neural-network canvas background, scroll-progress bar, scroll-reveal animations, and animated stat counters (`[data-count]`).

## SEO files

`robots.txt` and `sitemap.xml` are hand-maintained (not generated). `sitemap.xml` only lists `index.html` and `missions.html` — individual `portfolio.html?portfolio=...` case studies are not separately listed since they share one URL path with query params.
