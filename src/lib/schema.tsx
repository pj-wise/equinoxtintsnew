import { photos } from "@/lib/photos";
import { films, services } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * LocalBusiness (AutomotiveBusiness) structured data built only from verified
 * details. Intentionally omitted until supplied by the owner: geo coordinates,
 * aggregateRating/review (no reviews were published), priceRange.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.png`,
    image: [`${site.url}${photos.storefront.src.src}`, `${site.url}${photos.corvetteC7Black.src.src}`],
    description: site.description,
    telephone: site.phone.e164,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street} ${site.address.unit}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    sameAs: [site.social.instagram.href, site.social.facebook.href],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.summary, url: `${site.url}${s.href}` },
      })),
    },
  };
}

export function serviceJsonLd(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    provider: { "@id": `${site.url}/#business` },
  };
}

export function filmsItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Automotive window film options",
    itemListElement: films.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${f.name} Series — ${f.type}`,
      description: f.summary,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Render JSON-LD safely (escapes `<` so content can't break out of the script tag). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
