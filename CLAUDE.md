# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands

```bash
npm run dev      # Next.js dev server at http://localhost:3000
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint
```

No test framework is configured.

## Tech Stack

- **Next.js 16.1.1** with App Router (React 19, TypeScript 5, strict mode)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Framer Motion 12** for animations (spring physics, scroll effects, AnimatePresence)
- **Lucide React** for icons
- Path alias: `@/*` → `./src/*`

## Architecture

### Routing

All routes are under `src/app/` using Next.js App Router with file-based routing:

- `/ders/[kategori]/[slug]` — Dynamic course detail pages
- `/egitmenler/[slug]` — Dynamic instructor profile pages
- Static pages: `/egitimler`, `/etkinlikler`, `/danismanlik`, `/destek`, `/hakkimizda`, `/iletisim`

### Data Layer

**No API or database.** All data is static TypeScript modules in `src/data/`:

- `courses.ts` — Full course catalog with `getCourseBySlug(categorySlug, slug)` lookup function. Contains course metadata, chapters, testimonials, pricing, instructor info, and related courses.
- `instructors.ts` — Instructor profiles with bios, works bibliography, social links.

### Component Organization

- `src/components/layout/` — Header, FloatingHeader (sticky with dropdown menus), Footer
- `src/components/sections/` — Large page sections (ImmersiveHero, BentoGrid, TestimonialMarquee, CTASection)
- `src/components/course/` — Course page components (CourseHero, CourseCurriculum, CourseSidebar, CourseFAQ, CourseTestimonials, InstructorSection, RelatedCourses)
- `src/components/effects/` — Visual effects (AnimatedBackground with canvas particle system)
- `src/context/ThemeContext.tsx` — Dark/light theme via React Context with localStorage persistence

### Theme System

Dual theme (dark/light) controlled via CSS variables and `data-theme` attribute on `<html>`. Brand colors are always available (`--flu-yellow: #FFBC0B`, `--flu-purple: #5E55FF`, `--flu-deep-purple: #240A49`, `--flu-dark-navy: #05111E`). Theme-specific variables (backgrounds, text, borders, accent) switch between dark navy and flu-yellow palettes.

### Fonts

- **Poppins** — Primary font (weights 300–700)
- **Montserrat** — Display font (weight 900)

Both loaded via `next/font/google` in root layout.

## Key Patterns

- Almost all components use `"use client"` for interactivity; root layout is a Server Component.
- Course pages use a 2-column layout: left (2/3) for content, right (1/3) for purchase sidebar.
- Animations use Framer Motion with spring physics, stagger, and mouse-tracking parallax.
- The platform language is **Turkish** (`lang="tr"`). All UI text and content is in Turkish.
- `suppressHydrationWarning` is set on `<html>` for theme hydration mismatch.

## Course Data Structure

Each course has: `id`, `categorySlug`, `slug`, `title`, `price`, `originalPrice`, `discount`, `duration`, `chapters` (with optional `subChapters`), `testimonials`, `relatedCourses`, `instructor`, `seriesLessons`, `insights`, `coverImage`, and optional `videoSrc` and `bundledCourses`.

Category colors are mapped in the courses data file (e.g., Mitoloji → yellow, Felsefe → emerald, Psikoloji → purple).
