// Drawbridge Lending — New Orleans neighborhood pages.
// Unique local content per neighborhood — never a city-page find/replace.

export type Suburb = {
  slug: string;
  name: string;
  county: string;
  tagline: string;
  intro: string;
  landmarks: string[];
  industries: string[];
  sampleBusinesses: { name: string; type: string; useCase: string }[];
  zips: string[];
};

export const SUBURBS: Suburb[] = [
  {
    slug: "downtown-new-orleans",
    name: "Downtown New Orleans",
    county: "Orleans Parish",
    tagline: "CBD office towers, hospitality anchors and professional services along Poydras",
    intro:
      "Downtown New Orleans runs along Poydras Street and Canal from the Superdome to the river — a dense core of law firms, accounting practices, hotel flags, convention-adjacent hospitality and financial services. Drawbridge Lending works with Downtown operators on professional-services partner buy-ins, hotel PIPs, SBA acquisition deals and bridge structures sized to the convention calendar and the Superdome event cycle.",
    landmarks: ["Caesars Superdome", "Poydras Street corridor", "Harrah's New Orleans", "Canal Place", "World Trade Center"],
    industries: ["Legal & professional services", "Hospitality", "Financial services", "Convention-adjacent retail"],
    sampleBusinesses: [
      { name: "Poydras Street Legal Group", type: "Law firm", useCase: "SBA 7(a) for partner buy-in" },
      { name: "Canal Place Hotel Partners", type: "Boutique hotel", useCase: "PIP renovation financing" },
      { name: "CBD Accounting Associates", type: "CPA firm", useCase: "Unsecured working capital line" },
    ],
    zips: ["70112", "70113", "70130"],
  },
  {
    slug: "french-quarter",
    name: "French Quarter",
    county: "Orleans Parish",
    tagline: "Bourbon Street hospitality, Royal Street galleries and year-round tourism trade",
    intro:
      "The French Quarter is the city's historic core — Bourbon Street bars, Royal Street antique galleries, boutique hotels on Chartres, and the unbroken tourist trade that makes it one of the highest-revenue-per-square-foot retail corridors in the South. Drawbridge Lending routes Quarter financing around working capital lines that flex with festival seasons, SBA 7(a) for concept acquisitions and bridge loans when a long-running establishment changes hands.",
    landmarks: ["Bourbon Street", "Royal Street", "Jackson Square", "Café Du Monde", "Preservation Hall"],
    industries: ["Bars & restaurants", "Antique galleries", "Boutique hotels", "Specialty retail"],
    sampleBusinesses: [
      { name: "Royal Street Gallery Holdings", type: "Antique gallery", useCase: "Inventory line for estate purchase" },
      { name: "Chartres Street Inn", type: "Boutique hotel", useCase: "SBA 504 for building acquisition" },
      { name: "Bourbon Bar Group", type: "Bar & entertainment", useCase: "Working capital for Mardi Gras season" },
    ],
    zips: ["70116", "70130"],
  },
  {
    slug: "garden-district",
    name: "Garden District",
    county: "Orleans Parish",
    tagline: "Magazine Street boutiques, chef-driven restaurants and professional services",
    intro:
      "The Garden District stretches along St. Charles Avenue and Magazine Street — one of the city's most walkable retail corridors anchored by boutiques, chef-driven restaurants, design studios and professional offices. Operators here trend established and design-forward, with revenue patterns more consistent than the tourism-driven Quarter. Drawbridge Lending finances Garden District owners with SBA 7(a) acquisitions, equipment and working capital combos for restaurants, and revenue-based financing for design and creative firms.",
    landmarks: ["Magazine Street", "St. Charles Avenue streetcar", "Commander's Palace", "Lafayette Cemetery No. 1"],
    industries: ["Boutique retail", "Restaurants", "Design studios", "Professional services"],
    sampleBusinesses: [
      { name: "Magazine Street Bistro Co.", type: "Restaurant", useCase: "Working capital + equipment combo" },
      { name: "St. Charles Design Group", type: "Interior design studio", useCase: "Revenue-based financing" },
      { name: "Garden District Dental Partners", type: "Dental practice", useCase: "Practice acquisition financing" },
    ],
    zips: ["70115", "70130"],
  },
  {
    slug: "marigny",
    name: "Marigny",
    county: "Orleans Parish",
    tagline: "Frenchmen Street live music, creative studios and independent hospitality",
    intro:
      "The Marigny sits just downriver from the Quarter — Frenchmen Street's live music clubs, independent bars, boutique lodging and the creative-class residential base that supports them. Revenue patterns here spike around Jazz Fest, Mardi Gras and Halloween, then flatten between peaks. Drawbridge Lending finances Marigny operators with revolving working capital lines that absorb the seasonal swings, equipment financing for sound and production, and SBA 7(a) for concept acquisitions.",
    landmarks: ["Frenchmen Street", "Snug Harbor Jazz Bistro", "The Spotted Cat", "Washington Square Park"],
    industries: ["Live music venues", "Bars & restaurants", "Boutique lodging", "Creative studios"],
    sampleBusinesses: [
      { name: "Frenchmen Street Live Music LLC", type: "Music venue", useCase: "Equipment financing for sound system" },
      { name: "Marigny Inn Holdings", type: "Boutique guesthouse", useCase: "SBA 504 for building purchase" },
      { name: "Bywater Bar Group", type: "Bar collective", useCase: "Working capital for festival season" },
    ],
    zips: ["70117"],
  },
  {
    slug: "mid-city",
    name: "Mid-City",
    county: "Orleans Parish",
    tagline: "Canal Street corridor, City Park adjacency and family-owned trades",
    intro:
      "Mid-City runs along Canal Street and Carrollton from the cemeteries to City Park — a deep base of family-owned restaurants, medical offices, trades and neighborhood retail. Operators here trend long-tenured and locally rooted, with solid underwriting profiles built on consistent community revenue. Drawbridge Lending routes Mid-City financing across SBA 7(a) for family-business successions, equipment loans for trades and working capital lines for restaurants.",
    landmarks: ["City Park", "New Orleans Museum of Art", "Fair Grounds Race Course", "Mid-City Market"],
    industries: ["Restaurants", "Medical offices", "Trades", "Neighborhood retail"],
    sampleBusinesses: [
      { name: "Canal Street Family Medicine", type: "Medical practice", useCase: "SBA 7(a) for partner buy-in" },
      { name: "Mid-City Roofing & Construction", type: "Construction trade", useCase: "Equipment line for crew expansion" },
      { name: "Carrollton Café Group", type: "Restaurant", useCase: "Working capital + equipment combo" },
    ],
    zips: ["70119", "70121"],
  },
  {
    slug: "uptown",
    name: "Uptown",
    county: "Orleans Parish",
    tagline: "Tulane and Loyola corridor, Riverbend retail and upscale professional services",
    intro:
      "Uptown stretches along St. Charles and Magazine from the Garden District to the Riverbend — home to Tulane, Loyola, Audubon Park and a thick base of upscale retail, professional offices and chef-driven restaurants. Operators here tend to be highly credentialed with clean underwriting profiles and a high fit for unsecured working capital, SBA acquisition deals and revenue-based products. Drawbridge Lending routes Uptown financing toward growth capital — hiring ramps, second-location builds and partner buy-ins.",
    landmarks: ["Tulane University", "Loyola University", "Audubon Park", "Riverbend", "Maple Street"],
    industries: ["Professional services", "Restaurants", "Specialty retail", "Education-adjacent services"],
    sampleBusinesses: [
      { name: "Maple Street Law Partners", type: "Law firm", useCase: "Unsecured partner buy-in financing" },
      { name: "Riverbend Restaurant Group", type: "Restaurant group", useCase: "SBA 7(a) for second-location build" },
      { name: "Audubon Specialty Dental", type: "Dental practice", useCase: "Equipment + practice expansion" },
    ],
    zips: ["70115", "70118"],
  },
  {
    slug: "bywater",
    name: "Bywater",
    county: "Orleans Parish",
    tagline: "Arts district studios, independent restaurants and short-term rental operators",
    intro:
      "Bywater sits downriver from the Marigny — a fast-gentrifying arts district of converted warehouses, independent restaurants, galleries and short-term rental properties. Operators here skew younger and entrepreneurial, with newer businesses that may carry thinner underwriting profiles but strong revenue trajectories. Drawbridge Lending finances Bywater owners with revenue-based products, SBA Microloan programs for startups and working capital lines that grow with the business.",
    landmarks: ["Press Street Gardens", "Crescent Park riverfront", "Studio Be", "The Country Club"],
    industries: ["Art galleries", "Restaurants & bars", "Short-term rentals", "Creative studios"],
    sampleBusinesses: [
      { name: "Press Street Gallery Collective", type: "Art gallery", useCase: "Revenue-based financing for inventory" },
      { name: "Bywater Bistro Partners", type: "Restaurant", useCase: "SBA Microloan for buildout" },
      { name: "Crescent Park Rentals", type: "Short-term rental operator", useCase: "Working capital line" },
    ],
    zips: ["70117"],
  },
  {
    slug: "treme",
    name: "Tremé",
    county: "Orleans Parish",
    tagline: "America's oldest African American neighborhood — culture, music and community business",
    intro:
      "Tremé is the oldest African American neighborhood in the United States — the birthplace of jazz, home of Congo Square, and a deep base of community-rooted restaurants, music venues and cultural institutions. Operators here often carry long histories but may face access-to-capital gaps. Drawbridge Lending is committed to Tremé financing across SBA 7(a), SBA Microloans, community lender partnerships and unsecured working capital for established operators who have been underserved by traditional banks.",
    landmarks: ["Congo Square", "Armstrong Park", "St. Augustine Church", "Backstreet Cultural Museum"],
    industries: ["Music venues", "Community restaurants", "Cultural institutions", "Neighborhood retail"],
    sampleBusinesses: [
      { name: "Congo Square Catering Co.", type: "Catering & events", useCase: "Working capital for festival season" },
      { name: "Tremé Music House", type: "Music venue", useCase: "SBA Microloan for renovation" },
      { name: "Armstrong Park Grill", type: "Restaurant", useCase: "Equipment financing" },
    ],
    zips: ["70116", "70119"],
  },
  {
    slug: "metairie",
    name: "Metairie",
    county: "Jefferson Parish",
    tagline: "Jefferson Parish's commercial core — medical corridor, retail and professional services",
    intro:
      "Metairie is Jefferson Parish's largest commercial node — Veterans Memorial Boulevard's medical corridor, Causeway Boulevard office parks, Lakeside Shopping Center and a deep base of professional services, restaurants and specialty retail. Operators here trend established and professionally licensed, with clean underwriting profiles. Drawbridge Lending routes Metairie deals through unsecured working capital lines, SBA 7(a) for medical and dental practice acquisitions, and SBA 504 for owner-occupied office purchases.",
    landmarks: ["Veterans Memorial Boulevard", "Lakeside Shopping Center", "Causeway Boulevard", "Metairie Country Club"],
    industries: ["Medical & dental", "Professional services", "Specialty retail", "Corporate-adjacent services"],
    sampleBusinesses: [
      { name: "Veterans Blvd Medical Group", type: "Medical practice", useCase: "SBA 7(a) for partner buy-in" },
      { name: "Causeway Business Advisors", type: "Financial services", useCase: "Unsecured working capital" },
      { name: "Lakeside Specialty Dental", type: "Dental specialty", useCase: "Equipment + practice expansion" },
    ],
    zips: ["70001", "70002", "70003", "70005", "70006"],
  },
  {
    slug: "kenner",
    name: "Kenner",
    county: "Jefferson Parish",
    tagline: "Airport corridor, industrial operators and family-owned trades west of the city",
    intro:
      "Kenner sits west of Metairie along I-10, anchored by Louis Armstrong International Airport — a strong base of logistics operators, airport-adjacent hospitality, family-owned trades and light industrial businesses. Operators here are often asset-heavy and underbanked relative to their revenue, which creates a high fit for equipment financing, SBA 7(a) and factoring structures. Drawbridge Lending routes Kenner deals around airport logistics, hospitality and the industrial corridor along Williams Boulevard.",
    landmarks: ["Louis Armstrong New Orleans International Airport", "Williams Boulevard", "Laketown", "Rivertown Museums"],
    industries: ["Airport logistics", "Hospitality", "Light industrial", "Family-owned trades"],
    sampleBusinesses: [
      { name: "Armstrong Cargo Logistics", type: "Freight & logistics", useCase: "Invoice factoring for airport contracts" },
      { name: "Williams Blvd HVAC Services", type: "HVAC trade", useCase: "Equipment line for fleet refresh" },
      { name: "Kenner Airport Hotel Group", type: "Hospitality", useCase: "SBA 504 for property acquisition" },
    ],
    zips: ["70062", "70065"],
  },
];

export function getSuburb(slug: string): Suburb | undefined {
  return SUBURBS.find((s) => s.slug === slug);
}
