# Equinox Tinting — equinoxtinting.com

Redesign of the Equinox Tinting site (window tint & ceramic coating, Port St. Lucie, FL).

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI) · Motion · GSAP + ScrollTrigger · Lenis · Lucide

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

## Quote form

`src/app/actions/quote.ts` is a Server Action that validates input server-side (with a honeypot
spam trap), then forwards the request to [Formspree](https://formspree.io) as JSON. Formspree emails
it to the address configured on the form in your Formspree dashboard.

| Env var | Required | Notes |
| --- | --- | --- |
| `FORMSPREE_FORM_ID` | yes | From your form endpoint `https://formspree.io/f/<FORM_ID>` |
| `NEXT_PUBLIC_SITE_URL` | no | Defaults to `https://equinoxtinting.com` |

Submissions come from the server, not the visitor's browser. If Formspree rejects them (the server
log shows `[quote] Formspree responded …`), check the form's settings: a domain restriction or a
required CAPTCHA can block server-sent submissions.

**Until `FORMSPREE_FORM_ID` is set, the form does not pretend to submit** — visitors see a message
asking them to call or email, and the server logs an error.

## Where things live

```
src/
  app/                    routes, metadata, sitemap.ts, robots.ts, manifest.ts, icons
  app/actions/quote.ts    quote form server action
  lib/site.ts             business details (NAP, hours, socials, nav) — single source of truth
  lib/services.ts         services + film specs (copy from the original site)
  lib/photos.ts           all photography + alt text/captions
  lib/reviews.ts          customer reviews (empty — see below)
  lib/schema.tsx          JSON-LD (AutomotiveBusiness, Service, BreadcrumbList, ItemList)
  components/motion/      Lenis provider, text/image reveals, parallax, magnetic, page transition
  components/sections/    page sections (home/, contact, CTA band, page hero, …)
  components/tint/        tint shade selector + accessible before/after compare slider
  components/gallery/     gallery grid, tiles, lightbox
  components/ui/          shadcn/ui primitives
```

## Content rules

All business facts, service copy and film specifications come from the previous site. Do not add
pricing, warranties, certifications or reviews that the shop hasn't confirmed.

- **Reviews:** the old site had none, so `src/lib/reviews.ts` is empty and the Reviews section is
  hidden. Add real, attributable reviews there and it appears automatically.
- **Tint selector:** previews are explicitly labeled illustrative. The Florida VLT limits shown are a
  reference summary of F.S. §316.2953–316.2954 — verify if the law changes.

## Redirects

The old site was a single page with `#home`, `#services`, `#portfolio` and `#contact` anchors; the new
homepage keeps those IDs. Common guessed paths (`/portfolio`, `/tint`, `/ceramic-coating`, `/quote`,
…) 301/308 to their new pages — see `next.config.ts`.
