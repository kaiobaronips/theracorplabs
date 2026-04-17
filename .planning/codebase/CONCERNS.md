# Codebase Concerns

**Analysis Date:** 2026-04-17
**Scope:** `app/`, `components/`, `lib/`, key config files

---

## HIGH Severity

---

### Forms have no submission handler

- **Issue:** Both the cadastro and login forms are static HTML with `type="submit"` buttons but no `action`, `onSubmit`, or Server Action. Submitting either form causes a full-page reload with no data processing, no error feedback, and no success state.
- **Files:** `app/cadastro/page.tsx` (line 20), `app/login/page.tsx` (line 18)
- **Impact:** Core user flows (registration and login) are completely non-functional. Users clicking "Começar avaliação clínica" or "Entrar no portal" get no response.
- **Fix approach:** Add a Next.js Server Action (`action={serverActionFn}`) or convert to a `'use client'` component with `onSubmit` that calls an API route. Add validation feedback (error messages per field, success redirect).

---

### Missing `error.tsx` — no error boundary for the app

- **Issue:** The App Router provides a built-in error boundary mechanism via `app/error.tsx`. This file does not exist. Any unhandled runtime error in any route will crash to a blank or framework-default error screen with no recovery UI.
- **Files:** `app/` (file missing)
- **Impact:** All pages are unprotected. A rendering error in any page component surfaces as a full application crash to the user.
- **Fix approach:** Create `app/error.tsx` (must be a `'use client'` component) with a `reset` button. Optionally add nested `error.tsx` files per route segment for granular recovery.

---

### Missing `not-found.tsx` — no custom 404 page

- **Issue:** Next.js App Router serves a generic 404 for unmatched routes. `app/not-found.tsx` does not exist.
- **Files:** `app/` (file missing)
- **Impact:** Users who land on a broken or mistyped URL see a default Next.js 404 that is completely unstyled and has no navigation back into the site.
- **Fix approach:** Create `app/not-found.tsx` with the standard site layout (header/footer are not auto-included for 404), a clear message, and a link back to `/`.

---

### OG image dimensions incorrect

- **Issue:** `buildMetadata` in `lib/metadata.ts` uses `logo-theracorp.png` as the Open Graph image with declared dimensions of `1200x630`. The actual image is `843x596` pixels (PNG, 13 KB).
- **Files:** `lib/metadata.ts` (lines 27–32), `public/logo-theracorp.png`
- **Impact:** Social media cards (Facebook, LinkedIn, Twitter/X) will render the wrong crop or display aspect-ratio distortion. Some platforms reject images that don't meet their minimum size requirements and fall back to no image.
- **Fix approach:** Either (a) create a proper 1200×630 OG image in `public/og-image.png` and update `buildMetadata` to reference it, or (b) correct the declared width/height to match the actual logo dimensions (`width: 843, height: 596`) and accept the sub-optimal social preview.

---

## MEDIUM Severity

---

### `Plus Jakarta Sans` font never loaded

- **Issue:** `globals.css` (line 35) and `tailwind.config.ts` (line 25) declare `Plus Jakarta Sans` as the primary font, but there is no mechanism loading it. There is no `next/font/google` import in `app/layout.tsx`, no `<link>` tag to Google Fonts, and no self-hosted font files in `public/`.
- **Files:** `app/globals.css` (line 35), `tailwind.config.ts` (line 25), `app/layout.tsx`
- **Impact:** The browser falls back to `Helvetica Neue` or `Arial`. The designed typographic system is never actually used in production.
- **Fix approach:** Add `import { Plus_Jakarta_Sans } from 'next/font/google'` in `app/layout.tsx`, configure the font variable, and apply it to the `<html>` element. This also improves performance via automatic font optimization.

---

### `Button` component contains a no-op destructure

- **Issue:** In `components/ui/button.tsx` (line 39), the else branch executes `const { ...rest } = props as ButtonAsButton;`. This is a redundant intermediate destructure — `rest` is identical to `props` with no properties removed. It adds cognitive noise without effect.
- **Files:** `components/ui/button.tsx` (line 39)
- **Impact:** No runtime bug, but the pattern suggests incomplete refactoring (likely a `href` was being destructured here before) and could cause confusion for future maintainers.
- **Fix approach:** Replace `const { ...rest } = props as ButtonAsButton; return <button className={cls} {...rest} />` with `return <button className={cls} {...(props as ButtonAsButton)} />`.

---

### `SiteHeader` applies `bg-white` to two nested elements

- **Issue:** In `components/layout/site-header.tsx` (lines 7–8), both the `<header>` element and the inner `<div>` carry `bg-white`. The inner class is redundant since the header already sets the background.
- **Files:** `components/layout/site-header.tsx` (lines 7–8)
- **Impact:** No visual bug (the duplicate class is harmless), but it generates an unnecessary Tailwind class in the HTML output and adds maintenance confusion.
- **Fix approach:** Remove `bg-white` from the inner `<div>` (line 8).

---

### `next/image` width/height props do not match actual logo dimensions

- **Issue:** `SiteHeader` renders the logo with `width={120} height={44}`, but the actual image is 843×596 px. While the CSS override `className="h-11 w-auto"` controls visual size correctly, the incorrect intrinsic dimensions in the `width`/`height` props affect the layout hints the browser uses before CSS loads (CLS).
- **Files:** `components/layout/site-header.tsx` (line 14)
- **Impact:** Minor Cumulative Layout Shift risk. The browser reserves a 120×44 space, then the image renders at a different intrinsic ratio before CSS is applied.
- **Fix approach:** Set `width={843} height={596}` to match the actual image, keeping `className="h-11 w-auto"` for visual sizing. Or better: export the logo as an SVG or at the correct rendered size.

---

### `sitemap.ts` uses `new Date()` for `lastModified` on every page

- **Issue:** `app/sitemap.ts` (line 6) sets `lastModified: now` (current request time) for every URL on every request. Search engines cache sitemaps and use `lastModified` to decide recrawl priority.
- **Files:** `app/sitemap.ts` (line 6)
- **Impact:** Every sitemap fetch reports every page as "just updated," which dilutes the signal and may cause unnecessary recrawl churn. For a static marketing site this is misleading to crawlers.
- **Fix approach:** Use hardcoded ISO date strings per route, or derive dates from Git commit metadata at build time. For now, a static date per page is more accurate than `new Date()` at runtime.

---

### Home page `<section>` is missing `id` referenced by its own `aria-labelledby`

- **Issue:** `app/page.tsx` (line 11) uses `aria-labelledby="planos-titulo"` on the section, and the `<h2>` correctly has `id="planos-titulo"`. This is actually correct. *(Self-check: confirmed no bug here.)*

---

### `CarePillars` section ID conflicts with the `/como-funciona` page heading

- **Issue:** `components/home/care-pillars.tsx` (line 4) uses `aria-labelledby="como-funciona-titulo"` and the `<h2>` inside has `id="como-funciona-titulo"`. The text of the heading is "Como funciona" — identical to the page title on `/como-funciona/page.tsx`. While not a duplicate-ID bug (they're on different pages), the home page component mirrors the branding and wording of a separate full page, which will cause confusion for screen reader users on the home page who hear "Como funciona" as both a section heading and a nav link leading to a separate page with the same heading structure.
- **Files:** `components/home/care-pillars.tsx`, `app/como-funciona/page.tsx`
- **Impact:** Accessibility confusion; users may not realize the home section is a summary and the nav link leads somewhere distinct.
- **Fix approach:** Differentiate the home section heading (e.g., "Fluxo clínico em 3 etapas") or update the `aria-label` on the section to clarify its scope.

---

## LOW Severity

---

### `Badge` and `Button` components are defined but unused in the application

- **Issue:** `components/ui/badge.tsx` and `components/ui/button.tsx` exist as reusable components, but no page or component in `app/` or `components/` currently imports them. All CTAs use the raw `tc-btn-primary` CSS class directly on `<Link>` elements.
- **Files:** `components/ui/badge.tsx`, `components/ui/button.tsx`
- **Impact:** Dead code. Increases cognitive overhead for new developers who may not know whether to use the component or the raw class. Inconsistency risk: future developers may use either pattern.
- **Fix approach:** Either adopt the `Button` component site-wide (replacing raw class usage on CTAs) or delete both files if the design system components are considered premature.

---

### `tc-card-hover` utility class defined but never used

- **Issue:** `app/globals.css` (line 116) defines `.tc-card-hover` as a hover-shadow variant of `.tc-card`. No component or page in the codebase references this class.
- **Files:** `app/globals.css` (line 116–118)
- **Impact:** Dead CSS. Plan cards on `/planos`, blog posts on `/blog`, and care pillar cards on the home page could all benefit from hover states but use plain `.tc-card` with no hover effect.
- **Fix approach:** Apply `tc-card-hover` to interactive cards (plan cards, blog post cards) to improve affordance, or remove the class if not intended for use.

---

### `tc-section-label`, `tc-section-title`, `tc-section-desc` utilities defined but not used

- **Issue:** `app/globals.css` (lines 52–65) defines three semantic section-level utility classes. No component or page uses them — all headings and descriptions instead use raw Tailwind classes with duplicated typography values.
- **Files:** `app/globals.css` (lines 52–65)
- **Impact:** The design system classes go unused while page-level components duplicate the same typography values inline (e.g., `text-3xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-4xl` is repeated verbatim across at least 6 files).
- **Fix approach:** Replace the repeated inline classes with `tc-section-title`, `tc-section-desc`, and `tc-section-label` across all pages. This is the primary DRY improvement opportunity in the codebase.

---

### `scopedRoutes` in `lib/site.ts` is unused beyond `sitemap.ts`

- **Issue:** `lib/site.ts` exports `scopedRoutes` as a `const` array of all public routes. It is only consumed by `app/sitemap.ts`. It is not used for navigation, middleware guards, or any route validation.
- **Files:** `lib/site.ts` (lines 17–28), `app/sitemap.ts`
- **Impact:** Low. The constant serves its current purpose, but its name implies broader reuse (e.g., middleware allowlisting) that does not exist.
- **Fix approach:** No action required until auth/middleware is introduced. At that point, `scopedRoutes` should be used as the canonical allowed-routes list.

---

### `next.config.mjs` has no image domain/remote pattern configuration

- **Issue:** `next.config.mjs` only sets `reactStrictMode: true`. There is no `images.remotePatterns` or `images.domains` configuration.
- **Files:** `next.config.mjs`
- **Impact:** Currently not a bug (all images are local). If any future feature loads images from an external URL (e.g., blog CMS, avatar service), `next/image` will throw at runtime without this configuration.
- **Fix approach:** Preemptively add an `images: { remotePatterns: [] }` block as a placeholder, or document the omission as intentional.

---

### No `loading.tsx` for any route

- **Issue:** No `loading.tsx` file exists in `app/` or any route segment. Next.js App Router uses these to show instant loading UI via React Suspense while a page's data fetches.
- **Files:** `app/` (files missing)
- **Impact:** Currently low impact because all pages are static with no async data fetching. If async Server Components or data fetching are added, users will see no intermediate loading state.
- **Fix approach:** Not urgent for the current all-static implementation. Add `loading.tsx` files when async data fetching is introduced.

---

*Concerns audit: 2026-04-17*
