# Codebase Concerns

**Analysis Date:** 2026-04-30
**Project:** Theracorp Website (Next.js 14 App Router, TypeScript, Tailwind CSS)

---

## CRITICAL — Build-Blocking Errors

### 1. Broken JSX in site-footer.tsx — Build Fails Entirely

**Files:** `components/layout/site-footer.tsx`

**What happens:**
The file has two structural bugs confirmed by `npm run build` and `npx tsc --noEmit`:

1. **Missing closing div tag.** A `<div className="flex flex-col items-center gap-6">` opens on line 9 but is never closed. Only one `</div>` is present (line 50), which closes the outer wrapper from line 7. The JSX parser fails on the `<footer>` element.

2. **Image component used but not imported.** Line 15 renders `<Image src="/logo-theracorp.png" .../>` but `Image` from `next/image` is not imported. `site-header.tsx` has the correct import; the footer does not.

**Impact:** The entire application **fails to build**. `npm run build` exits with `Build failed because of webpack errors`. This is a site-wide outage in any deployment pipeline.

**Fix approach:**
- Add `import Image from 'next/image';` to the top of the file.
- Add the missing `</div>` to close the flex container after the closing `</nav>` (line 47) and before `<Disclaimer />`.

---

## HIGH — Functional Bugs

### 2. Forms Submit Without Effect — No Handler, No Action, No name Attributes

**Files:** `app/cadastro/page.tsx`, `app/login/page.tsx`

**What happens:**
Both forms are Server Components (no `'use client'` directive) with:
- No `action` attribute
- No `onSubmit` handler
- No `name` attribute on any `<input>` or `<select>` element
- No Next.js Server Action bound via `action={serverFn}`

Clicking submit causes the browser to issue a GET to the current URL with empty query string. No data is transmitted.

**Impact:** Both forms are completely non-functional. Registration and login — the two primary user flows — are broken.

**Fix approach:**
- Add `name` attributes to every input and select.
- Implement a Server Action (`action={serverFn}` on `<form>`) or add `'use client'` and wire `onSubmit` calling an API route.
- Add per-field validation feedback and success/failure states.

---

### 3. Skip Link Hidden Under Sticky Header When Focused

**Files:** `app/globals.css` (lines 86–92), `app/layout.tsx` (line 42)

**What happens:**
The skip link uses `position: absolute` (via `@apply absolute`). When focused it moves to `top: 8px`. The `<header>` uses `position: sticky; top: 0; z-index: 50`. Because the skip link is absolute (not fixed), it can render behind the sticky header depending on scroll position.

**Impact:** Keyboard users triggering the skip link may have it visually obscured by the sticky header, defeating its purpose (WCAG 2.4.1 — Bypass Blocks).

**Fix approach:**
Change `.tc-skip-link` from `@apply absolute ...` to `@apply fixed ...` in `app/globals.css` line 87.

---

## MEDIUM — Code Quality and SEO Issues

### 4. section Elements on Inner Pages Missing aria-labelledby

**Files:** `app/cadastro/page.tsx` (line 13), `app/login/page.tsx` (line 13), `app/sobre/page.tsx` (line 13), `app/planos/page.tsx` (line 32), `app/exames/page.tsx` (line 14), `app/emagrecimento/page.tsx` (line 14), `app/como-funciona/page.tsx` (line 14), `app/blog/page.tsx` (line 30), `app/app/page.tsx` (line 13)

**What happens:**
All 9 inner page routes render a root `<section>` with no `aria-labelledby` or `aria-label`. The home page components (`hero-section.tsx` line 6, `care-pillars.tsx` line 3) correctly use `aria-labelledby`.

**Impact:** Screen readers that enumerate landmark regions announce these sections as unlabeled, reducing navigation quality for assistive technology users.

**Fix approach:**
Add `aria-labelledby="[page-h1-id]"` to each page's root `<section>` and add a matching `id` to each page's `<h1>`. Follow the pattern in `hero-section.tsx` lines 6 and 12.

---

### 5. aria-hidden Written as Bare JSX Attribute

**Files:** `components/home/care-pillars.tsx` (lines 14, 24, 34), `components/home/hero-section.tsx` (line 32)

**What happens:**
Four elements use bare `aria-hidden` (without `={true}`). React serializes this correctly as `aria-hidden="true"` in the DOM, so there is no runtime bug. However, the bare form is non-idiomatic TypeScript JSX.

**Impact:** No accessibility issue. May trigger lint warnings under stricter rules; inconsistent with idiomatic React.

**Fix approach:**
Replace all four instances of bare `aria-hidden` with `aria-hidden={true}`.

---

### 6. Blog Post Articles Have No Links to Post Detail Pages

**Files:** `app/blog/page.tsx` (lines 38–43)

**What happens:**
Each `<article>` in the blog listing renders a title and excerpt with no `<Link>` or `<a>`. The posts array has `id` fields implying sub-routes, but no route files exist under `app/blog/[slug]/`.

**Impact:** Blog section is a dead-end UI. Users cannot navigate to individual posts. If post routes are added later, they will be unreachable from the listing.

**Fix approach:**
Wrap each article title in `<Link href={`/blog/${post.id}`}>` or remove the `id` field until individual post routes are implemented.

---

### 7. OG Image Declared Dimensions Do Not Match Actual File

**Files:** `lib/metadata.ts` (lines 26–32)

**What happens:**
`buildMetadata` declares the OG image as `width: 1200, height: 630`. The actual file `public/logo-theracorp.png` is 843x596 px (confirmed via `file` command). This applies to all pages using `buildMetadata`.

**Impact:** Social media crawlers receive incorrect dimension metadata, causing cropping, distortion, or image rejection. The standard 1200x630 social card format is not met.

**Fix approach:**
Option A — Create a proper 1200x630 OG banner (`public/og-banner.png`) and update `buildMetadata`.
Option B — Correct `width` and `height` in `buildMetadata` to 843 and 596 to match the actual file.

---

### 8. sitemap.ts Reports Every Page as Modified on Every Request

**Files:** `app/sitemap.ts` (line 6)

**What happens:**
`lastModified: now` (`now = new Date()`) is set at request time, so every sitemap fetch reports every page as freshly modified.

**Impact:** Dilutes recrawl priority signals for search engines; inaccurate for a static marketing site.

**Fix approach:**
Use hardcoded ISO date strings per route reflecting actual change dates, or derive from Git commit metadata at build time.

---

### 9. Duplicate Font Directory Outside public/ — Dead Assets

**Files:** `css/fonts/` (repository root, not served), `public/css/fonts/` (served)

**What happens:**
Two font directories exist:
- `public/css/fonts/` — served correctly. Contains the three .otf files referenced by `globals.css`, plus `SofiaProRegular.ttf` and `sofia-pro-bold.woff2`.
- `css/fonts/` — at the repo root, NOT inside `public/`, NOT served to browsers. Contains duplicates plus `SofiaProRegular-english.woff` and `SofiaProRegular-english.woff2` (more efficient formats) that are never loaded.

**Impact:** Developer confusion about which directory is authoritative. More efficient woff2 format exists but is never loaded; all active fonts are the heavier .otf format.

**Fix approach:**
Delete the root `css/fonts/` directory. Move `SofiaProRegular-english.woff2` to `public/css/fonts/` and add it as the preferred format in the `@font-face` declarations.

---

### 10. Unused Font Files Served in public/css/fonts/

**Files:** `public/css/fonts/SofiaProRegular.ttf`, `public/css/fonts/sofia-pro-bold.woff2`

**What happens:**
`app/globals.css` `@font-face` declarations only reference .otf files. `SofiaProRegular.ttf` and `sofia-pro-bold.woff2` in `public/css/fonts/` are never referenced by any CSS rule and are never requested.

**Impact:** Dead static assets increase deployed bundle size. The woff2 file in particular is a higher-quality format that is unused despite being present.

**Fix approach:**
Add `sofia-pro-bold.woff2` to the SofiaProBold `@font-face` rule as the preferred format, or delete both unused files.

---

### 11. Unused CSS Component Classes in globals.css

**Files:** `app/globals.css`

**What happens:**
The following `@layer components` classes are defined but never referenced in any `app/`, `components/`, or `lib/` file (verified by grep):

| Class | Lines in globals.css |
|---|---|
| `.tc-section-label` | 96–99 |
| `.tc-section-title` | 101–103 |
| `.tc-section-desc` | 106–108 |
| `.tc-btn-secondary` | 142–148 |
| `.tc-btn-ghost` | 151–153 |
| `.tc-card-hover` | 160–162 |
| `.tc-badge` | 187–190 |
| `.tc-badge-teal` | 191–194 |
| `.tc-divider` | 196–198 |

Meanwhile, pages repeat the same inline Tailwind typography values verbatim (e.g., `text-3xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-4xl` appears in 6+ files) instead of using the defined component classes.

**Impact:** Dead CSS shipped to users. Design system abstraction is defined but bypassed, causing significant inline duplication.

**Fix approach:**
Either remove the unused classes, or adopt them site-wide to eliminate inline repetition. `.tc-section-title`, `.tc-section-desc`, and `.tc-section-label` are the highest-value replacements given how often their equivalents are duplicated.

---

### 12. CI Workflow Configured for Non-Existent develop Branch; Tests Not Run in CI

**Files:** `.github/workflows/quality.yml` (lines 4–7)

**What happens:**
The CI workflow triggers on `main` and `develop`. Only `main` exists (confirmed via `git branch -a`). The pipeline runs lint, typecheck, and build — but not `playwright test`. With the current build-breaking bug in `site-footer.tsx`, the build step will fail on the next push to `main`.

**Fix approach:**
Remove the `develop` trigger. Add a `test` step (`npm run test`) once the build is fixed.

---

## LOW — Minor Issues

### 13. cadastro Route Missing from Header Navigation

**Files:** `lib/site.ts` (lines 6–14)

**What happens:**
`navLinks` (rendered in the header) does not include `/cadastro`. The footer links to it and `scopedRoutes` includes it, but the header has no direct path to the primary conversion page.

**Fix approach:**
Add `{ href: '/cadastro', label: 'Iniciar avaliação' }` to `navLinks` in `lib/site.ts`.

---

### 14. No Security Headers Configured

**Files:** `next.config.mjs`

**What happens:**
Only `reactStrictMode: true` is set. No `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy` headers are configured.

**Impact:** Standard web security hardening is absent. Critical for a healthtech site handling patient data.

**Fix approach:**
Add a `headers()` async function to `next.config.mjs` returning security headers for all routes.

---

### 15. Six Product Images in public/ Are Unreferenced

**Files:** `public/product_liraglutide.webp`, `public/product_mounjaro.webp`, `public/product_ozempic.webp`, `public/product_wegovy-pen.webp`, `public/product_wegovy-pill.webp`, `public/product_zepbound.webp`

**What happens:**
Six .webp product images exist in `public/` but are not referenced in any source file (confirmed by grep).

**Impact:** Dead assets increase deployed bundle size.

**Fix approach:**
Remove from `public/` or integrate into planned product pages.

---

### 16. robots.ts Does Not Disallow Auth Routes; Sitemap Includes Them

**Files:** `app/robots.ts`, `app/sitemap.ts`, `lib/site.ts` (lines 27–28)

**What happens:**
`robots.ts` allows all routes. The sitemap includes `/login` and `/cadastro`. These pages contain no indexable content value.

**Fix approach:**
Add `disallow: ['/login', '/cadastro']` to `robots.ts`. Exclude those paths from `scopedRoutes` or filter them in `sitemap.ts`.

---

### 17. next/image Width/Height Props Do Not Match Logo Aspect Ratio

**Files:** `components/layout/site-header.tsx` (line 15)

**What happens:**
The logo is declared as `width={120} height={44}` (ratio 2.72:1) but the actual image is 843x596 px (ratio 1.41:1). The CSS `className="h-11 w-auto"` corrects visual sizing, so there is no visible distortion. However, incorrect intrinsic dimensions affect the browser's layout reservation before CSS loads.

**Impact:** Minor Cumulative Layout Shift (CLS) risk.

**Fix approach:**
Set `width={843} height={596}` to match actual image dimensions while keeping `className="h-11 w-auto"`.

---

*Concerns audit: 2026-04-30*
