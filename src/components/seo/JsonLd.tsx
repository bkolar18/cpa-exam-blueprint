"use client";

interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
}

export function OrganizationJsonLd({
  name = "Meridian CPA Review",
  url = "https://meridiancpareview.com",
  logo = "https://meridiancpareview.com/logo.png",
  description = "Affordable CPA exam prep with 6,000+ practice questions, 500+ task-based simulations, adaptive progress tracking, and unlimited access with no expiration.",
}: OrganizationJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@meridiancpareview.com",
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebsiteJsonLdProps {
  name?: string;
  url?: string;
  description?: string;
}

export function WebsiteJsonLd({
  name = "Meridian CPA Review",
  url = "https://meridiancpareview.com",
  description = "Affordable CPA exam prep with 6,000+ practice questions, 500+ task-based simulations, adaptive progress tracking, and unlimited access with no expiration.",
}: WebsiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageJsonLdProps {
  faqs: FAQItem[];
}

export function FAQPageJsonLd({ faqs }: FAQPageJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ProductJsonLdProps {
  name?: string;
  description?: string;
  price?: string;
  priceCurrency?: string;
  url?: string;
}

export function ProductJsonLd({
  name = "Meridian CPA Review - Full Access",
  description = "Complete CPA exam preparation with 6,000+ practice questions, 500+ task-based simulations, and unlimited access.",
  price = "49",
  priceCurrency = "USD",
  url = "https://meridiancpareview.com/pricing",
}: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: {
      "@type": "Brand",
      name: "Meridian CPA Review",
    },
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
      availability: "https://schema.org/InStock",
      url,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
