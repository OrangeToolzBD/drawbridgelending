// Single source of truth for SITE_URL and business facts.
// Mock/placeholder values OK while INDEXABLE=false. Before flipping
// VITE_INDEXABLE=true, replace every mock value with the real owner data.

const RAW_SITE_URL =
  (import.meta.env?.VITE_SITE_URL as string | undefined) ??
  "https://drawbridgelending.com";

export const SITE_URL: string = RAW_SITE_URL.replace(/\/+$/, "");

export const INDEXABLE: boolean =
  (import.meta.env?.VITE_INDEXABLE as string | undefined) !== "false";

export const SITE_CONFIG = {
  url: SITE_URL,
  indexable: INDEXABLE,

  name: "Drawbridge Lending",
  legalName: "Drawbridge Lending, LLC",
  tagline: "Crescent City capital for New Orleans operators",
  defaultDescription:
    "Working capital, invoice factoring, AR financing, SBA loans and small business loans for New Orleans, LA. Pre-qualify with a soft credit pull and review offers in 24 hours.",

  phone: "(504) 506-4488",
  phoneHref: "tel:+15045064488",
  email: "",

  hasPublicOffice: true,
  address: {
    streetAddress: "601 Poydras St",
    addressLocality: "New Orleans",
    addressRegion: "LA",
    postalCode: "70130",
    addressCountry: "US",
  },
  geo: {
    latitude: 29.9511,
    longitude: -90.0715,
  },

  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    { dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
  ],

  license: {
    state: "LA",
    licenseNumber: "LA-CFL-204918",
  },

  areasServed: [
    "New Orleans, LA",
    "Orleans Parish",
    "Southeast Louisiana",
  ],

  social: {
    googleBusinessProfile: "https://www.google.com/maps/place/Drawbridge+Lending",
    linkedin: "https://www.linkedin.com/company/drawbridge-lending",
    facebook: "https://www.facebook.com/drawbridgelending",
    twitter: "https://twitter.com/DrawbridgeLend",
  },

  defaultOgImage: "/og-default.svg",

  stats: {
    reviewsCount: "1,340+",
    reviewsRating: "4.9",
    businessesFunded: "5,800+",
    loansFacilitated: "$325M+",
    fastestFundingHours: "24h",
  },

  trustBadges: ["Soft Pull · No Credit Impact"],

  author: {
    name: "Claire Fontenot",
    title: "Managing Director",
    credentials: "MBA, 17+ years SBA & commercial lending",
    profileUrl: "https://www.linkedin.com/in/claire-fontenot-dbl",
  },

  featuredStat: {
    value: "460,000",
    claim: "small businesses operating across Louisiana",
    sourceName: "SBA Office of Advocacy — Louisiana Profile",
    sourceUrl: "https://advocacy.sba.gov/",
  },

  ghl: {
    formId: "iILOP7GhpUNskBYRNuWk",
    formName: "Loan Application",
    formHeight: 876,
    embedScriptSrc: "https://link.msgsndr.com/js/form_embed.js",
  },
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (!path) return `${SITE_URL}/`;
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeading === "/" ? "/" : withLeading.replace(/\/+$/, "");
  return `${SITE_URL}${normalized}`;
}
