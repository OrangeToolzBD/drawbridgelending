import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { buildHead } from "@/lib/seo";
import { buildGraph, faqNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Banknote,
  Building2,
  Truck,
  Stethoscope,
  UtensilsCrossed,
  ShoppingBag,
  Factory,
  Briefcase,
  Star,
  PhoneCall,
  CheckCircle2,
  Lock,
  Users,
  FileText,
  HandCoins,
  CreditCard,
  Wrench,
  Receipt,
  LineChart,
  Sparkles,
  Menu,
  MapPin,
  HelpCircle,
  BookOpen,
  Hammer,
  Plane,
  Flame,
  Package,
  Shield,
  Anchor,
  ArrowUpRight,
  Compass,
  Target,
  TrendingUp,
  Zap,
  Award,
  ChevronRight,
} from "lucide-react";

const siteLogoUrl = "/drawbridgelogo.png";

type MegaItemProps = Readonly<{
  icon: LucideIcon;
  label: string;
  desc: string;
  href?: string;
  slug?: string;
  homeHash?: string;
}>;

const CITY = "New Orleans";
const CITY_STATE = `${CITY}, LA`;

const HOME_FAQS = [
  {
    q: `How quickly can I get funded in ${CITY}?`,
    a: `Many of our lending partners can fund qualified ${CITY} businesses within 24-72 hours of approval. Same-day funding is available for select products like merchant cash advances and short-term loans.`,
  },
  {
    q: "Will checking my options affect my credit score?",
    a: "No. We use a soft credit pull to pre-qualify you. It does not affect your personal or business credit score.",
  },
  {
    q: "What credit score is required?",
    a: "Most of our lenders work with scores starting at 550 FICO. SBA loans and the best lines of credit typically require 650+.",
  },
  {
    q: "Can Southeast Louisiana startups qualify?",
    a: "Yes. We work with lenders that fund businesses as young as 3 months, including SBA microloan programs designed for newer ventures.",
  },
  {
    q: "What documents are needed?",
    a: "Typically 3-6 months of business bank statements, basic business details and a valid ID. SBA loans may require tax returns and full financials.",
  },
  {
    q: "How much can I borrow?",
    a: "Funding ranges from $5,000 working capital advances up to $5,000,000 SBA and commercial real estate loans, depending on revenue and use of funds.",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => {
    const title = `Business Loans in ${CITY_STATE}`;
    const description = `Working capital, invoice factoring, accounts receivable financing, SBA loans and small business loans for ${CITY_STATE}. Pre-qualify in minutes with a soft credit pull and review real offers in 24 hours.`;
    return buildHead({
      title,
      description,
      path: "/",
      schema: buildGraph({
        title,
        description,
        path: "/",
        extraNodes: [faqNode({ path: "/", faqs: HOME_FAQS })],
      }),
    });
  },
  component: Index,
});

function Index() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <div aria-hidden className="h-20" />
        <Hero />
        <CapitalDesk />
        <WhyUs />
        <CityHubCTA />
        <HowItWorks />
        <Industries />
        <SuccessStories />
        <CityIntro />
        <Security />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Scroll Reveal ---------------- */
function useScrollReveal() {
  useEffect(() => {
    if (globalThis.window === undefined) return;
    const sections = Array.from(document.querySelectorAll("main > section"));
    const targets: Element[] = [];
    sections.forEach((section) => {
      Array.from(section.children).forEach((child) => {
        const el = child as HTMLElement;
        if (el.classList.contains("pointer-events-none")) return;
        if (el.tagName === "SVG") return;
        const inner = Array.from(el.children).filter(
          (c) => !(c as HTMLElement).classList.contains("pointer-events-none"),
        ) as HTMLElement[];
        if (inner.length > 1 && inner.length <= 8) {
          inner.forEach((c, i) => {
            c.classList.add("reveal");
            if (i > 0 && i <= 5) c.classList.add(`reveal-delay-${i}`);
            targets.push(c);
          });
        } else {
          el.classList.add("reveal");
          targets.push(el);
        }
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
}

/* ---------------- Header ---------------- */

const LOAN_GROUPS: {
  heading: string;
  items: MegaItemProps[];
}[] = [
  {
    heading: "GBP Active Plays",
    items: [
      { icon: Receipt, label: "Accounts Receivable Financing", desc: "Borrow against open A/R", slug: "accounts-receivable-financing" },
      { icon: Receipt, label: "Invoice Factoring", desc: "Same-day cash on invoices", slug: "invoice-factoring" },
      { icon: LineChart, label: "Revenue Based Financing", desc: "Repay as a % of monthly revenue", slug: "revenue-based-financing" },
      { icon: HandCoins, label: "Small Business Loans", desc: "Compare every funding product", slug: "small-business-loans" },
      { icon: MapPin, label: "Small Business Loans Near Me", desc: "New Orleans-based loan advisors", slug: "small-business-loans-near-me" },
      { icon: FileText, label: "SBA Loans", desc: "Government-backed funding programs", slug: "sba-loans" },
    ],
  },
  {
    heading: "Working Capital & Credit",
    items: [
      { icon: CreditCard, label: "Business Line of Credit", desc: "Revolving credit when you need it", slug: "business-line-of-credit" },
      { icon: LineChart, label: "Working Capital Loans", desc: "Cover payroll & seasonal gaps", slug: "working-capital-loans" },
      { icon: Banknote, label: "Merchant Cash Advance", desc: "Capital based on future card sales", slug: "merchant-cash-advance" },
      { icon: ShieldCheck, label: "Unsecured Business Loans", desc: "No collateral required", slug: "unsecured-business-loans" },
      { icon: Sparkles, label: "Startup Business Loans", desc: "Funding for newer ventures", slug: "startup-business-loans" },
    ],
  },
  {
    heading: "SBA, Acquisition & Equipment",
    items: [
      { icon: FileText, label: "SBA 7(a) Loan", desc: "The SBA's flagship program", slug: "sba-7a-loan" },
      { icon: Briefcase, label: "Business Acquisition Loans", desc: "Buy an existing New Orleans business", slug: "business-acquisition-loans" },
      { icon: Wrench, label: "Equipment Financing", desc: "Machinery, vehicles & tools", slug: "equipment-financing" },
      { icon: Factory, label: "Manufacturing Equipment", desc: "CNC, robotics & production", slug: "manufacturing-equipment-financing" },
    ],
  },
];

const INDUSTRY_GROUPS: {
  heading: string;
  items: MegaItemProps[];
}[] = [
  {
    heading: "Healthcare & Professional",
    items: [
      { icon: Stethoscope, label: "Medical Practice Loans", desc: "Clinics & physician groups", slug: "medical-practice-loans" },
      { icon: Stethoscope, label: "Dental Practice Loans", desc: "Equipment, expansion, acquisition", slug: "dental-practice-loans" },
      { icon: Briefcase, label: "Professional Services", desc: "Law, accounting, consulting", href: "/industry/professional-services" },
    ],
  },
  {
    heading: "Hospitality & Retail",
    items: [
      { icon: UtensilsCrossed, label: "Restaurant Loans", desc: "Fit-out, expansion, equipment", slug: "restaurant-loans" },
      { icon: ShoppingBag, label: "Retail Business Loans", desc: "Inventory & storefront", slug: "retail-business-loans" },
      { icon: Building2, label: "Hotel Loans", desc: "Acquisition & PIP renovation", slug: "hotel-loans" },
    ],
  },
  {
    heading: "Trades, Logistics & Industrial",
    items: [
      { icon: Hammer, label: "Construction Business Loans", desc: "Ground-up & renovation", slug: "construction-business-loans" },
      { icon: Truck, label: "Trucking Business Loans", desc: "Owner-operators to fleets", slug: "trucking-business-loans" },
      { icon: Factory, label: "Manufacturing Equipment", desc: "CNC, robotics & production", slug: "manufacturing-equipment-financing" },
      { icon: Package, label: "Distribution & Logistics", desc: "AR financing & equipment", href: "/industry/distribution" },
    ],
  },
  {
    heading: "Louisiana & Gulf South",
    items: [
      { icon: Flame, label: "Manufacturing & Industrial", desc: "Production lines & equipment", slug: "oilfield-services-loans" },
      { icon: Plane, label: "Defense & Tech Corridor", desc: "NASA Michoud-adjacent operators", href: "/industry/defense-aerospace" },
      { icon: Shield, label: "Veteran Business Loans", desc: "SBA Express for veterans", slug: "veteran-business-loans" },
    ],
  },
];

const SERVICE_AREAS: { region: string; suburbs: { name: string; slug: string }[] }[] = [
  {
    region: "City of New Orleans",
    suburbs: [
      { name: "Downtown New Orleans", slug: "downtown-new-orleans" },
      { name: "French Quarter", slug: "french-quarter" },
      { name: "Garden District", slug: "garden-district" },
      { name: "Marigny", slug: "marigny" },
      { name: "Mid-City", slug: "mid-city" },
      { name: "Uptown", slug: "uptown" },
    ],
  },
  {
    region: "Orleans Parish",
    suburbs: [
      { name: "Bywater", slug: "bywater" },
      { name: "Tremé", slug: "treme" },
    ],
  },
  {
    region: "Metro Suburbs",
    suburbs: [
      { name: "Metairie", slug: "metairie" },
      { name: "Kenner", slug: "kenner" },
    ],
  },
];

function MegaItem({
  icon: Icon,
  label,
  desc,
  href,
  slug,
  homeHash,
}: MegaItemProps) {
  const itemClass = "group/item flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white";
  const inner = (
    <>
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[color:var(--primary)]/8 text-[color:var(--primary)] transition-colors group-hover/item:bg-[color:var(--brand-vermillion)]/15 group-hover/item:text-[color:var(--brand-vermillion)]">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground transition-colors group-hover/item:text-white">{label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground transition-colors group-hover/item:text-white/50">{desc}</span>
      </span>
    </>
  );
  if (homeHash) {
    return (
      <NavigationMenuLink asChild>
        <Link to="/" hash={homeHash} className={itemClass}>{inner}</Link>
      </NavigationMenuLink>
    );
  }
  if (slug) {
    return (
      <NavigationMenuLink asChild>
        <Link to="/pillar/$slug" params={{ slug }} className={itemClass}>{inner}</Link>
      </NavigationMenuLink>
    );
  }
  return (
    <NavigationMenuLink asChild>
      <a href={href ?? "#"} className={itemClass}>{inner}</a>
    </NavigationMenuLink>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[color:var(--brand-charcoal)] text-white backdrop-blur-xl supports-[backdrop-filter]:bg-[color:var(--brand-charcoal)]/95">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <a href="/" className="flex items-center font-semibold">
          <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="h-10 w-auto" />
          <span className="sr-only">{SITE_CONFIG.name}</span>
        </a>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-white hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent">Funding</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light bg-popover text-popover-foreground max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto">
                <div className="flex w-[960px]">
                  {/* Left: 3-col link grid */}
                  <div className="flex-1 p-6">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                      {LOAN_GROUPS.map((g) => (
                        <div key={g.heading}>
                          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                            {g.heading}
                          </div>
                          <div className="space-y-0.5">
                            {g.items.map((it) => (
                              <MegaItem key={it.label} {...it} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Right: dark sidebar CTA */}
                  <div className="flex w-52 shrink-0 flex-col justify-between border-l border-border/40 p-6" style={{ background: "linear-gradient(180deg, oklch(0.14 0.018 52), oklch(0.10 0.012 50))" }}>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">Quick match</div>
                      <p className="mt-3 text-sm leading-relaxed text-white/60">
                        Not sure which product fits? Tell us the brief and we'll shop 75+ lenders.
                      </p>
                      <ul className="mt-4 space-y-2 text-xs text-white/45">
                        {["Soft credit pull only", "No obligation", "24-hour offers"].map((t) => (
                          <li key={t} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 shrink-0 text-[color:var(--brand-vermillion)]/60" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to="/apply-now" className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-vermillion)] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[color:var(--brand-charcoal)] transition-opacity hover:opacity-90">
                      Start Application <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-white hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent">Locations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light bg-popover text-popover-foreground max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto">
                <div className="w-[680px] p-6">
                  <div className="mb-5 flex items-center gap-2 rounded-xl border border-[color:var(--brand-vermillion)]/15 bg-[color:var(--brand-vermillion)]/5 px-4 py-2.5 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4 text-[color:var(--brand-vermillion)]" />
                    Funding businesses across the greater {CITY_STATE} metro
                  </div>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-5">
                    {SERVICE_AREAS.map((sa) => (
                      <div key={sa.region}>
                        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                          {sa.region}
                        </div>
                        <div className="flex flex-col gap-1">
                          {sa.suburbs.map((s) => (
                            <NavigationMenuLink asChild key={s.slug}>
                              <Link
                                to="/new-orleans/$suburb"
                                params={{ suburb: s.slug }}
                                className="group/loc flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white"
                              >
                                <span className="h-1 w-1 shrink-0 rounded-full bg-[color:var(--brand-vermillion)]/40 transition-colors group-hover/loc:bg-[color:var(--brand-vermillion)]" />
                                {s.name}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <NavigationMenuLink asChild>
                      <Link to="/new-orleans" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-vermillion)] hover:underline">
                        View the full New Orleans Hub directory <ArrowRight className="h-4 w-4" />
                      </Link>
                    </NavigationMenuLink>
                    <span className="text-xs text-muted-foreground">10 neighborhoods + suburbs</span>
                  </div>
                </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-item rounded-none bg-transparent text-white hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light bg-popover text-popover-foreground">
                <div className="w-[240px] p-3">
                  <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">On this page</div>
                  <div className="space-y-0.5">
                    {[
                      { label: "How It Works", hash: "how", icon: Compass },
                      { label: "Success Stories", hash: "stories", icon: Star },
                      { label: "FAQs", hash: "faq", icon: HelpCircle },
                    ].map((l) => (
                      <NavigationMenuLink asChild key={l.label}>
                        <Link
                          to="/"
                          hash={l.hash}
                          className="group/res flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white"
                        >
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[color:var(--primary)]/8 text-[color:var(--primary)] transition-colors group-hover/res:bg-[color:var(--brand-vermillion)]/15 group-hover/res:text-[color:var(--brand-vermillion)]">
                            <l.icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-sm font-medium transition-colors group-hover/res:text-white">{l.label}</span>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/contact" className={`nav-item ${navigationMenuTriggerStyle()} rounded-none bg-transparent text-white hover:bg-transparent focus:bg-transparent`}>
                  Contact Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE_CONFIG.phoneHref}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/12 hover:border-white/25 transition-all"
          >
            <PhoneCall className="h-4 w-4 text-[color:var(--brand-bronze)]" />
            {SITE_CONFIG.phone}
          </a>
          <Link
            to="/apply-now"
            className="btn-primary whitespace-nowrap"
          >
            Get Funded
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] overflow-y-auto p-0">
              <SheetHeader className="border-b border-border px-5 py-4">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="h-10 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <div className="px-4 py-4">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="cap">
                    <AccordionTrigger className="px-2 text-base font-semibold">Funding</AccordionTrigger>
                    <AccordionContent>
                      {LOAN_GROUPS.map((g) => (
                        <div key={g.heading} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-vermillion)]">
                            {g.heading}
                          </div>
                          <ul className="mt-1">
                            {g.items.map((it) => (
                              <li key={it.label}>
                                <SheetClose asChild>
                                  {it.slug ? (
                                    <Link
                                      to="/pillar/$slug"
                                      params={{ slug: it.slug }}
                                      className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                                    >
                                      {it.label}
                                    </Link>
                                  ) : (
                                    <a href={it.href ?? "#"} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                      {it.label}
                                    </a>
                                  )}
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="areas">
                    <AccordionTrigger className="px-2 text-base font-semibold">Locations</AccordionTrigger>
                    <AccordionContent>
                      {SERVICE_AREAS.map((sa) => (
                        <div key={sa.region} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-vermillion)]">
                            {sa.region}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1.5 px-2">
                            {sa.suburbs.map((s) => (
                              <SheetClose asChild key={s.slug}>
                                <Link
                                  to="/new-orleans/$suburb"
                                  params={{ suburb: s.slug }}
                                  className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  {s.name}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="res">
                    <AccordionTrigger className="px-2 text-base font-semibold">Resources</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {[
                          { label: "How It Works", hash: "how" },
                          { label: "Success Stories", hash: "stories" },
                          { label: "FAQs", hash: "faq" },
                        ].map((l) => (
                          <li key={l.label}>
                            <SheetClose asChild>
                              <Link to="/" hash={l.hash} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                {l.label}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-4 space-y-2 border-t border-border px-2 pt-4">
                  <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-2 text-sm font-medium">
                    <PhoneCall className="h-4 w-4 text-[color:var(--brand-bronze)]" /> {SITE_CONFIG.phone}
                  </a>
                  <SheetClose asChild>
                    <a href={SITE_CONFIG.phoneHref} className="btn-primary w-full justify-center">
                      <PhoneCall className="h-4 w-4" />
                      Call {SITE_CONFIG.phone}
                    </a>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero — Full-bleed dark with glass deal panel ---------------- */
function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[color:var(--brand-charcoal)] text-white flex items-center">
      {/* Riverside bridge at dusk — thematic fit for Drawbridge Lending */}
      <img
        src="https://images.unsplash.com/photo-1569959220744-ff553533f492?w=1800&q=80&fit=crop&auto=format"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom"
        fetchPriority="high"
      />
      {/* Dark overlay — deep navy + slight warm tint for brand feel */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(160deg, oklch(0.13 0.018 55 / 0.90) 0%, oklch(0.10 0.012 52 / 0.93) 60%, oklch(0.08 0.010 50 / 0.96) 100%)" }} />
      {/* Subtle dot grid on top */}
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.04]" />
      {/* Gold glow top-right */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, oklch(0.75 0.13 85 / 0.10) 0%, transparent 65%)" }} />
      <div className="relative mx-auto w-full max-w-5xl px-6 py-28 lg:py-36 text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--brand-bronze)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--brand-bronze)]" />
            New Orleans, Louisiana - Business Capital
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4rem] xl:text-[4.75rem]">
            The capital desk for{" "}
            <span className="text-[color:var(--brand-bronze)]">New Orleans</span>{" "}
            operators.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
            Drawbridge Lending brokers invoice factoring, AR lines, SBA loans and working capital for Southeast Louisiana businesses. One soft-pull application, 75+ Louisiana-active lenders.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/apply-now" className="btn-primary text-base px-8 py-3.5">
              Get Funded
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={SITE_CONFIG.phoneHref} className="btn-ghost-dark text-base px-8 py-3.5">
              <PhoneCall className="h-4 w-4" />
              {SITE_CONFIG.phone}
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-white/40">
            <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> Soft pull only</span>
            <span>|</span>
            <span>No commitment required</span>
            <span>|</span>
            <span>Free consultation</span>
          </div>
      </div>
    </section>
  );
}

/* ---------------- Why Us — Differentiators with decorative icons ---------------- */
function WhyUs() {
  const stats = [
    {
      value: SITE_CONFIG.stats.businessesFunded,
      label: "Funded",
      title: "Businesses Served",
      desc: "From startups to established operators across Southeast Louisiana.",
      icon: Users,
    },
    {
      value: SITE_CONFIG.stats.loansFacilitated,
      label: "Deployed",
      title: "In Loans Facilitated",
      desc: "Across invoice factoring, SBA, working capital and equipment programs.",
      icon: Banknote,
    },
    {
      value: `${SITE_CONFIG.stats.reviewsRating}/5`,
      label: "Rating",
      title: "Verified Client Reviews",
      desc: `${SITE_CONFIG.stats.reviewsCount} reviews from New Orleans business owners across all programs.`,
      icon: Star,
    },
    {
      value: SITE_CONFIG.stats.fastestFundingHours,
      label: "Turnaround",
      title: "Fastest Funding",
      desc: "Select programs fund the same day. Most complete within 24-72 hours.",
      icon: Zap,
    },
  ];
  return (
    <section className="relative py-20 sm:py-28 bg-[color:var(--brand-cream)] overflow-hidden">
      {/* Decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute left-6 top-10 opacity-[0.07]" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" stroke="#d3b77e" strokeWidth="1.5"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-10 top-16 opacity-[0.06]" width="24" height="24" viewBox="0 0 24 24" fill="none"><line x1="12" y1="0" x2="12" y2="24" stroke="#d3b77e" strokeWidth="1.5"/><line x1="0" y1="12" x2="24" y2="12" stroke="#d3b77e" strokeWidth="1.5"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[42%] bottom-10 opacity-[0.05]" width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="1" y="1" width="30" height="30" rx="4" stroke="#d3b77e" strokeWidth="1.5" transform="rotate(18 16 16)"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-[8%] bottom-16 opacity-[0.06]" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" fill="#d3b77e"/></svg>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
            Why Drawbridge
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--brand-charcoal)] md:text-4xl">
            The New Orleans capital desk that moves fast
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Real numbers from real deals. We keep score so you can hold us to it.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label, title, desc, icon: Icon }) => (
            <div key={title} className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm">
              <Icon
                aria-hidden
                className="absolute -right-3 -top-3 text-[color:var(--primary)] opacity-[0.06]"
                style={{ width: 80, height: 80 }}
              />
              <div className="relative">
                <div className="text-3xl font-black text-[color:var(--primary)] md:text-4xl">{value}</div>
                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">{label}</div>
                <h3 className="mt-3 text-sm font-bold text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Capital Desk — 2-col image-topped cards ---------------- */
function CapitalDesk() {
  const programs = [
    {
      slug: "accounts-receivable-financing",
      title: "Accounts Receivable Financing",
      desc: "Revolving line secured by your open invoices without selling them. Advance up to 90% of eligible A/R.",
      category: "Working Capital",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=320&fit=crop&q=75",
    },
    {
      slug: "invoice-factoring",
      title: "Invoice Factoring",
      desc: "Same-day cash on freight, staffing or oilfield invoices. Funded in as little as 24 hours.",
      category: "Cash Flow",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=320&fit=crop&q=75",
    },
    {
      slug: "revenue-based-financing",
      title: "Revenue Based Financing",
      desc: "Repay as a fixed percentage of monthly revenue. No equity, no fixed payment schedule.",
      category: "Growth Capital",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=320&fit=crop&q=75",
    },
    {
      slug: "small-business-loans",
      title: "Small Business Loans",
      desc: "One soft-pull application covers every major loan product. 75+ Louisiana-active lenders compared side by side.",
      category: "Business Loans",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=320&fit=crop&q=75",
    },
    {
      slug: "sba-loans",
      title: "SBA Loans",
      desc: "SBA 7(a), 504 and Express programs through Louisiana-active Preferred Lenders. Rates from 8.25% APR.",
      category: "Government-Backed",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=320&fit=crop&q=75",
    },
    {
      slug: "equipment-financing",
      title: "Equipment Financing",
      desc: "Machinery, vehicles and tools financed with terms up to 7 years. Preserve cash flow on capital purchases.",
      category: "Asset Finance",
      image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=320&fit=crop&q=75",
    },
  ];
  return (
    <section id="capital" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute right-4 top-12 opacity-[0.05]" width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="27" stroke="#d3b77e" strokeWidth="1.5"/><circle cx="28" cy="28" r="18" stroke="#d3b77e" strokeWidth="1"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-8 bottom-12 opacity-[0.05]" width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="11" y1="0" x2="11" y2="22" stroke="#d3b77e" strokeWidth="1.5"/><line x1="0" y1="11" x2="22" y2="11" stroke="#d3b77e" strokeWidth="1.5"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[55%] top-8 opacity-[0.04]" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="#d3b77e" strokeWidth="1.5" transform="rotate(45 7 7)"/></svg>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Funding Programs
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--brand-charcoal)] md:text-4xl">
              The six programs New Orleans asks for most
            </h2>
          </div>
          <Link to="/new-orleans" className="btn-outline-light hidden sm:inline-flex py-2 px-5 text-[11px]">
            View New Orleans Hub <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {programs.map((p) => (
            <Link
              key={p.slug}
              to="/pillar/$slug"
              params={{ slug: p.slug }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[color:var(--primary)]/30"
            >
              {/* Image with gradient fade */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
                <span className="absolute bottom-3 left-4 rounded-full bg-[color:var(--primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-[color:var(--primary)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[color:var(--primary)]">
                  Learn more <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- City Hub CTA — bold dark banner ---------------- */
function CityHubCTA() {
  const highlights = [
    "10 neighborhoods & adjacent communities",
    "24 loan programs mapped locally",
    "60 dedicated neighborhood x program pages",
  ];
  return (
    <section className="relative overflow-hidden py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-3xl p-8 text-white sm:p-10 md:p-16"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-15" />
          {/* Decorative circles */}
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border border-white/10" />
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10" />

          <div className="relative grid items-center gap-12 md:grid-cols-[1.5fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/40 bg-[color:var(--brand-bronze)]/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">
                <MapPin className="h-3.5 w-3.5" /> Explore the New Orleans Hub
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem]">
                Every neighborhood.{" "}
                <span className="text-[color:var(--brand-bronze)]">Every loan program.</span>{" "}
                One directory.
              </h2>
              <p className="mt-4 max-w-lg text-white/70">
                Jump into the New Orleans city hub to browse every neighborhood we serve and the
                programs available in each.
              </p>
              <ul className="mt-6 space-y-2.5">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-sm text-white/85">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--brand-bronze)]" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/new-orleans" className="btn-primary w-full justify-center sm:w-auto text-base py-3.5 px-7" style={{ background: "#fff", color: "var(--brand-charcoal)", boxShadow: "0 6px 28px -6px oklch(0 0 0 / 0.25)" }}>
                  Visit the New Orleans Hub <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/apply-now" className="btn-ghost-dark w-full justify-center sm:w-auto text-base py-3.5 px-7">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Right stats card */}
            <div className="rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-sm">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Inside the hub</div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  { n: "10", l: "Neighborhoods" },
                  { n: "24", l: "Programs" },
                  { n: "60+", l: "Local Pages" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-white/10 p-4">
                    <div className="text-2xl font-bold">{s.n}</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/60">{s.l}</div>
                  </div>
                ))}
              </div>
              <Link to="/new-orleans" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[color:var(--brand-bronze)] transition-colors">
                Browse the full directory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How It Works — vertical timeline + right detail panel ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      time: "60 seconds",
      title: "Tell us the brief",
      desc: "How much, what for, how soon. No documents up front.",
      done: "Application submitted",
      icon: FileText,
    },
    {
      n: "02",
      time: "Same day",
      title: "We shop the bench",
      desc: "Pre-screen 75+ Louisiana-active lenders against your profile.",
      done: "Lenders matched",
      icon: Compass,
    },
    {
      n: "03",
      time: "Within 24 hours",
      title: "Compare real offers",
      desc: "Side-by-side rates, terms, fees and remit schedules. No spin.",
      done: "Offer selected",
      icon: TrendingUp,
    },
    {
      n: "04",
      time: "As fast as 24h",
      title: "Funded",
      desc: "Sign the docs and receive funds directly in your business account.",
      done: "Wire cleared",
      icon: Zap,
    },
  ];

  return (
    <section id="how" className="relative overflow-hidden bg-[color:var(--brand-cream)] py-20 sm:py-28">
      {/* Decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute right-[3%] top-10 opacity-[0.06]" width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 2 L38 20 L20 38 L2 20 Z" stroke="#d3b77e" strokeWidth="1.5"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[6%] bottom-14 opacity-[0.05]" width="52" height="52" viewBox="0 0 52 52" fill="none"><circle cx="26" cy="26" r="25" stroke="#d3b77e" strokeWidth="1.2"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[48%] bottom-8 opacity-[0.06]" width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="8" y1="0" x2="8" y2="16" stroke="#d3b77e" strokeWidth="1.5"/><line x1="0" y1="8" x2="16" y2="8" stroke="#d3b77e" strokeWidth="1.5"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-[18%] bottom-10 opacity-[0.05]" width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#d3b77e"/></svg>
      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-vermillion)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
              Process
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--brand-charcoal)] md:text-4xl">
              Four steps. Zero surprises.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              How {CITY} operators move from "we need capital" to "the wire cleared."
            </p>
          </div>
          <Link to="/apply-now" className="btn-primary shrink-0 self-start lg:self-auto">
            Start your application <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Steps grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div key={s.n} className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                {/* Connector dash between cards */}
                {!isLast && (
                  <div aria-hidden className="hidden lg:block absolute -right-2 top-10 z-10 h-px w-4 border-t border-dashed border-border" />
                )}

                {/* Sprite icon — 1×4 horizontal strip, each slot is 25% wide */}
                <div
                  aria-hidden
                  className="h-24 w-24 bg-no-repeat"
                  style={{
                    backgroundImage: "url(/procssicons.png)",
                    backgroundSize: "400% auto",
                    backgroundPosition: `${i * (100 / 3)}% center`,
                  }}
                />

                {/* Copy */}
                <h3 className="mt-2 text-base font-bold text-foreground">{s.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

                {/* Footer row */}
                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--brand-vermillion)]">
                    <Clock className="h-2.5 w-2.5" /> {s.time}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/60">
                    <CheckCircle2 className="h-3 w-3 text-[color:var(--brand-vermillion)]/50" /> {s.done}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ---------------- Industries — two-column list + featured panel ---------------- */
function Industries() {
  type Ind = { icon: LucideIcon; label: string; slug: string; blurb: string; la?: boolean };

  const inds: Ind[] = [
    { icon: Building2,      label: "Construction",       slug: "construction",          blurb: "GCs, specialty trades and ground-up developers." },
    { icon: Stethoscope,    label: "Healthcare",          slug: "healthcare",            blurb: "Ochsner, Tulane Medical and private practices." },
    { icon: UtensilsCrossed,label: "Hospitality",         slug: "hospitality",           blurb: "French Quarter, Garden District and event venues." },
    { icon: Truck,          label: "Transportation",      slug: "transportation",        blurb: "I-10 corridor freight, owner-operators and fleets." },
    { icon: ShoppingBag,    label: "Retail",              slug: "retail",                blurb: "Storefronts, e-commerce and inventory-heavy operators." },
    { icon: Factory,        label: "Manufacturing",       slug: "manufacturing",         blurb: "Port of New Orleans suppliers and production lines.", la: true },
    { icon: Briefcase,      label: "Professional",        slug: "professional-services", blurb: "Law firms, accounting practices and consultancies." },
    { icon: Flame,          label: "Oilfield Services",   slug: "oilfield-services",     blurb: "Gulf Coast energy, upstream and midstream services.", la: true },
    { icon: Plane,          label: "Defense & Aerospace", slug: "defense-aerospace",     blurb: "NASA Michoud corridor and port tenants.", la: true },
  ];

  return (
    <section id="industries" className="relative overflow-hidden bg-[color:var(--brand-cream)] py-20 sm:py-28">
      {/* Decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute left-4 top-14 opacity-[0.06]" width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="1" y="1" width="34" height="34" rx="6" stroke="#d3b77e" strokeWidth="1.5"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-6 top-8 opacity-[0.05]" width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="10" y1="0" x2="10" y2="20" stroke="#d3b77e" strokeWidth="1.5"/><line x1="0" y1="10" x2="20" y2="10" stroke="#d3b77e" strokeWidth="1.5"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-[12%] bottom-12 opacity-[0.06]" width="44" height="44" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="21" stroke="#d3b77e" strokeWidth="1.2"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[30%] bottom-6 opacity-[0.05]" width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="#d3b77e"/></svg>
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-vermillion)]/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
              Sector Ledger
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--brand-charcoal)] md:text-4xl">
              The sectors Drawbridge Lending underwrites first
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Louisiana-specific verticals are flagged{" "}
              <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[color:var(--brand-vermillion)]/10 text-[color:var(--brand-vermillion)]">LA</span>{" "}
              — deals we keep in-house rather than hand off to a generalist.
            </p>
          </div>
          <Link to="/new-orleans" className="btn-outline-light shrink-0 self-start md:self-auto">
            View all 24 programs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Body: list left, featured panel right */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Sector rows */}
          <div className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
            {inds.map((ind) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={ind.slug}
                  to="/industry/$slug"
                  params={{ slug: ind.slug }}
                  className="group flex items-center gap-5 px-6 py-4 transition-colors hover:bg-[color:var(--brand-charcoal)] hover:text-white"
                >
                  {/* Icon bubble */}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--primary)]/8 text-[color:var(--primary)] transition-colors group-hover:bg-white/10 group-hover:text-[color:var(--brand-vermillion)]">
                    <Icon className="h-4 w-4" />
                  </span>

                  {/* Label + blurb */}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{ind.label}</span>
                      {ind.la && (
                        <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[color:var(--brand-vermillion)]/10 text-[color:var(--brand-vermillion)] group-hover:bg-white/10 group-hover:text-[color:var(--brand-vermillion)]">
                          LA
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground group-hover:text-white/55">
                      {ind.blurb}
                    </span>
                  </span>

                  {/* Arrow */}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 text-[color:var(--brand-vermillion)] transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>

          {/* Featured panel */}
          <div className="flex flex-col gap-5">
            {/* Stat card */}
            <div
              className="relative overflow-hidden rounded-2xl p-7 text-white"
              style={{ background: "linear-gradient(145deg, var(--brand-charcoal), oklch(0.22 0.025 55))" }}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.07]" />
              <div className="relative">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
                  By the numbers
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    { n: "9", label: "Sectors covered" },
                    { n: "24", label: "Loan programs" },
                    { n: "75+", label: "Active lenders" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-baseline gap-3 border-b border-white/8 pb-4 last:border-0 last:pb-0">
                      <span className="text-3xl font-black text-[color:var(--brand-vermillion)]">{s.n}</span>
                      <span className="text-sm text-white/60">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-bold text-foreground">Don't see your sector?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                We fund most operating businesses in Southeast Louisiana. Tell us your situation and we'll find the right match.
              </p>
              <Link to="/apply-now" className="btn-primary mt-5 w-full justify-center text-sm">
                Get matched <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------------- Success Stories — editorial grid ---------------- */
function SuccessStories() {
  const stories = [
    {
      name: "Marigny Manufacturing Co.",
      amount: "$420,000",
      result: "Same-day cash on open invoices — they stopped chasing net-60 customers and started growing.",
      type: "Invoice Factoring",
      person: "Marco Delgado",
      role: "Owner & Operator",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face&q=80",
      featured: true,
    },
    {
      name: "Port District Distribution",
      amount: "$1,800,000",
      result: "Revolving AR line scaled with their big-box customer base.",
      type: "AR Financing",
      person: "Renee Calderon",
      role: "CFO",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "Uptown Dental Partners",
      amount: "$2,400,000",
      result: "SBA 7(a) for partner buy-in plus new CBCT scanner.",
      type: "SBA 7(a) Loan",
      person: "Dr. Priya Anand",
      role: "Managing Partner",
      photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "Garden District Kitchen Co.",
      amount: "$180,000",
      result: "Working capital line that flexes with event-driven sales.",
      type: "Working Capital",
      person: "Tomás Reyes",
      role: "Executive Chef & Co-Founder",
      photo: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "Metairie HVAC Services",
      amount: "$650,000",
      result: "Equipment line to refresh the service fleet ahead of peak season.",
      type: "Equipment Financing",
      person: "Jordan Whitfield",
      role: "President",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face&q=80",
    },
    {
      name: "French Quarter Hospitality",
      amount: "$1,100,000",
      result: "Bridge financing to acquire a second concept off Magazine St.",
      type: "Business Term Loan",
      person: "Camila Vargas",
      role: "Founder",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=face&q=80",
    },
  ];

  const [featured, ...rest] = stories;

  return (
    <section id="stories" className="relative overflow-hidden bg-[color:var(--brand-charcoal)] py-20 text-white sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-[0.04]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ background: "radial-gradient(circle, oklch(0.72 0.12 75 / 0.06) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-vermillion)]/30 bg-[color:var(--brand-vermillion)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-vermillion)]">
              Success Stories
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {CITY} businesses we have funded
            </h2>
            <p className="mt-3 max-w-lg text-sm text-white/50">
              Composite outcomes from real Southeast Louisiana deals. Names changed; structures unchanged.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-vermillion)]" />
            {stories.length} recent deals
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-4 lg:grid-cols-5">

          {/* Featured card — spans 2 cols on lg */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 lg:col-span-2" style={{ background: "linear-gradient(160deg, oklch(0.22 0.025 55), oklch(0.16 0.018 50))" }}>
            {/* Brass top bar */}
            <div className="h-[3px] w-full bg-[image:var(--gradient-cta)]" />
            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-md border border-[color:var(--brand-vermillion)]/30 bg-[color:var(--brand-vermillion)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--brand-vermillion)]">
                  {featured.type}
                </span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-[color:var(--brand-vermillion)] text-[color:var(--brand-vermillion)]" />
                  ))}
                </div>
              </div>

              <div className="mt-6 text-5xl font-black tracking-tight text-[color:var(--brand-vermillion)]">
                {featured.amount}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/35">funded</div>

              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-white/75">
                "{featured.result}"
              </blockquote>

              <div className="mt-8 flex items-center gap-3 border-t border-white/8 pt-5">
                <img src={featured.photo} alt={featured.person} className="h-11 w-11 rounded-full object-cover ring-2 ring-[color:var(--brand-vermillion)]/25" />
                <div>
                  <div className="text-sm font-bold text-white">{featured.person}</div>
                  <div className="text-xs text-white/40">{featured.role}</div>
                  <div className="text-xs text-white/30">{featured.name}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 2x3 compact cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {rest.map((s) => (
              <div key={s.name} className="group flex flex-col rounded-2xl border border-white/8 bg-white/[0.04] p-5 transition-all hover:border-[color:var(--brand-vermillion)]/20 hover:bg-white/[0.07]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--brand-vermillion)]/70">{s.type}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 fill-[color:var(--brand-vermillion)]/50 text-[color:var(--brand-vermillion)]/50" />
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-2xl font-black text-white">{s.amount}</div>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-white/50">{s.result}</p>
                <div className="mt-4 flex items-center gap-2.5 border-t border-white/8 pt-3">
                  <img src={s.photo} alt={s.person} className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10" />
                  <div>
                    <div className="text-xs font-semibold text-white/80">{s.person}</div>
                    <div className="text-[10px] text-white/35">{s.role}, {s.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------------- City Intro (SEO copy) ---------------- */
function CityIntro() {
  const neighborhoods = [
    "Downtown New Orleans", "French Quarter", "Garden District", "Bywater",
    "Marigny", "Tremé", "Mid-City", "Uptown", "Metairie", "Kenner",
  ];
  const uses = [
    { label: "Expansion", icon: TrendingUp },
    { label: "Payroll", icon: Users },
    { label: "Inventory", icon: Package },
    { label: "Equipment", icon: Wrench },
    { label: "Marketing", icon: Target },
    { label: "Cash Flow", icon: Banknote },
  ];
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute left-[2%] top-12 opacity-[0.05]" width="34" height="34" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="16" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-[5%] top-8 opacity-[0.045]" width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="11" y1="0" x2="11" y2="22" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--brand-bronze)]"/><line x1="0" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--brand-bronze)]"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[40%] bottom-6 opacity-[0.04]" width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]" transform="rotate(22 9 9)"/></svg>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Serving Southeast Louisiana
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--brand-charcoal)] md:text-4xl">
              Business Loans for {CITY} Companies
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Whether you operate in {neighborhoods.slice(0, 5).join(", ")} or anywhere across
              Orleans Parish and Southeast Louisiana, our lending bench helps local businesses secure the
              capital they need to grow.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From <strong className="font-semibold text-foreground">SBA 7(a) loans</strong> and{" "}
              <strong className="font-semibold text-foreground">business lines of credit</strong> to{" "}
              <strong className="font-semibold text-foreground">equipment financing</strong>,{" "}
              <strong className="font-semibold text-foreground">working capital loans</strong> and{" "}
              <strong className="font-semibold text-foreground">invoice factoring</strong>, we
              connect {CITY} owners with the right funding product, fast.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {neighborhoods.map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground hover:border-[color:var(--primary)]/30 hover:text-[color:var(--primary)] cursor-default transition-colors"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
            <h3 className="text-lg font-bold text-foreground">Common uses of funding</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              What {CITY} business owners typically finance with us.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {uses.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-all hover:border-[color:var(--primary)]/30 hover:bg-[color:var(--primary)]/5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[color:var(--primary)]/8 transition-colors group-hover:bg-[color:var(--primary)]/15">
                    <Icon className="h-4 w-4 text-[color:var(--primary)]" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <Link to="/apply-now" className="btn-primary w-full justify-center">
                Get pre-qualified
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Security — horizontal trust strip ---------------- */
function Security() {
  const items = [
    { icon: Lock, title: "SSL Secured", desc: "256-bit encryption" },
    { icon: ShieldCheck, title: "Bank-Level Encryption", desc: "Data protected in transit & at rest" },
    { icon: Users, title: "Privacy Protected", desc: "Never sold to third parties" },
    { icon: CheckCircle2, title: "Louisiana-Licensed Partners", desc: "Licensed lending advisors" },
  ];
  return (
    <section className="relative overflow-hidden border-y border-border bg-[color:var(--brand-cream)] py-14">
      {/* decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute right-[6%] top-4 opacity-[0.06]" width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="1" y="1" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]" transform="rotate(45 13 13)"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[3%] bottom-3 opacity-[0.055]" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--brand-bronze)]"/><circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1" className="text-[color:var(--brand-bronze)]"/></svg>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--primary)]/10">
                <Icon className="h-5 w-5 text-[color:var(--primary)]" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ — two-column layout ---------------- */
function FAQSection() {
  return (
    <section id="faq" className="relative overflow-hidden py-20 sm:py-28">
      {/* decorative shapes */}
      <svg aria-hidden className="pointer-events-none absolute right-[3%] top-16 opacity-[0.05]" width="30" height="30" viewBox="0 0 30 30" fill="none"><polygon points="15,2 28,27 2,27" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="text-[color:var(--primary)]"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[6%] bottom-12 opacity-[0.045]" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="1" y="1" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--brand-bronze)]" transform="rotate(15 12 12)"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-[25%] bottom-8 opacity-[0.04]" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" className="text-[color:var(--primary)]"/></svg>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          {/* Left sticky header */}
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--brand-charcoal)] md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything {CITY} business owners want to know before applying.
            </p>
            <div className="mt-8">
              <Link to="/apply-now" className="btn-primary w-full justify-center sm:w-auto text-base px-7 py-3.5">
                Apply Now - Soft Pull
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-xs text-muted-foreground">No commitment required. Free consultation.</p>
            </div>
          </div>

          {/* Right — accordion */}
          <Accordion type="single" collapsible className="w-full space-y-3">
            {HOME_FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-6 data-[state=open]:border-[color:var(--primary)]/25 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA — dramatic dark banner ---------------- */
function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-20 text-white sm:py-28"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 anchor-grid opacity-15" />
      {/* Decorative rings */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />
      {/* Small accent shapes */}
      <svg aria-hidden className="pointer-events-none absolute left-10 top-12 opacity-[0.15]" width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="11" y1="0" x2="11" y2="22" stroke="#d3b77e" strokeWidth="1.5"/><line x1="0" y1="11" x2="22" y2="11" stroke="#d3b77e" strokeWidth="1.5"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-12 bottom-14 opacity-[0.12]" width="38" height="38" viewBox="0 0 38 38" fill="none"><circle cx="19" cy="19" r="18" stroke="#d3b77e" strokeWidth="1.5"/></svg>
      <svg aria-hidden className="pointer-events-none absolute left-[20%] bottom-10 opacity-[0.10]" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1 L13 7 L7 13 L1 7 Z" stroke="#d3b77e" strokeWidth="1.5"/></svg>
      <svg aria-hidden className="pointer-events-none absolute right-[22%] top-10 opacity-[0.10]" width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="#d3b77e"/></svg>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-bronze)]/30 bg-[color:var(--brand-bronze)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--brand-bronze)]">
          Ready to move?
        </div>
        <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Ready to talk capital in {CITY}?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">
          Get matched with Louisiana-licensed lenders serving {CITY_STATE}. Soft credit pull, no obligation.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/apply-now" className="btn-primary text-base px-10 py-4">
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={SITE_CONFIG.phoneHref} className="btn-ghost-dark text-base px-10 py-4">
            <PhoneCall className="h-4 w-4" />
            {SITE_CONFIG.phone}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-[11px] text-white/40">
          <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> Soft pull only</span>
          <span>|</span>
          <span>No commitment required</span>
          <span>|</span>
          <span>Free consultation</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="relative bg-[color:var(--brand-charcoal)] text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="h-14 w-auto" />
            </div>
            <address className="mt-6 not-italic space-y-2 text-sm text-white/55">
              <div className="font-semibold text-white">{SITE_CONFIG.name}</div>
              {SITE_CONFIG.hasPublicOffice ? (
                <div>
                  {SITE_CONFIG.address.streetAddress}
                  <br />
                  {SITE_CONFIG.address.addressLocality}, {SITE_CONFIG.address.addressRegion}{" "}
                  {SITE_CONFIG.address.postalCode}
                </div>
              ) : (
                <div>Serving {SITE_CONFIG.areasServed.join(", ")}</div>
              )}
              <div>
                <a href={SITE_CONFIG.phoneHref} className="hover:text-[color:var(--brand-bronze)] transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </div>
              {SITE_CONFIG.license.state && SITE_CONFIG.license.licenseNumber && (
                <div className="pt-1 text-xs text-white/35">
                  {SITE_CONFIG.license.state} license #{SITE_CONFIG.license.licenseNumber}
                </div>
              )}
            </address>
          </div>

          <FooterCol title="Capital Programs">
            <FooterPillarLink slug="accounts-receivable-financing" label="AR Financing" />
            <FooterPillarLink slug="invoice-factoring" label="Invoice Factoring" />
            <FooterPillarLink slug="revenue-based-financing" label="Revenue Based Financing" />
            <FooterPillarLink slug="small-business-loans" label="Small Business Loans" />
            <FooterPillarLink slug="sba-loans" label="SBA Loans" />
            <FooterPillarLink slug="equipment-financing" label="Equipment Financing" />
          </FooterCol>

          <FooterCol title="Industries">
            <FooterIndustryLink slug="construction" label="Construction" />
            <FooterIndustryLink slug="healthcare" label="Healthcare" />
            <FooterIndustryLink slug="hospitality" label="Hospitality" />
            <FooterIndustryLink slug="transportation" label="Transportation" />
            <FooterIndustryLink slug="oilfield-services" label="Oilfield Services" />
            <FooterIndustryLink slug="defense-aerospace" label="Defense & Aerospace" />
          </FooterCol>

          <FooterCol title="Company">
            <li>
              <Link to="/contact" className="hover:text-[color:var(--brand-bronze)] transition-colors">Contact</Link>
            </li>
            <li>
              <Link to="/new-orleans" className="hover:text-[color:var(--brand-bronze)] transition-colors">New Orleans Hub</Link>
            </li>
            <li>
              <Link to="/" hash="how" className="hover:text-[color:var(--brand-bronze)] transition-colors">How It Works</Link>
            </li>
            <li>
              <Link to="/" hash="faq" className="hover:text-[color:var(--brand-bronze)] transition-colors">FAQs</Link>
            </li>
            <li>
              <Link to="/" hash="stories" className="hover:text-[color:var(--brand-bronze)] transition-colors">Success Stories</Link>
            </li>
            <li>
              <Link to="/apply-now" className="hover:text-[color:var(--brand-bronze)] transition-colors">Apply Now</Link>
            </li>
          </FooterCol>
        </div>
      </div>

      <div className="border-t border-white/8 bg-[oklch(0.13_0.012_30)]">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/40">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.name}, {CITY_STATE}. All rights reserved.</p>
            <p>
              Reviewed by{" "}
              <a
                href={SITE_CONFIG.author.profileUrl}
                rel="author"
                className="font-medium text-white/60 hover:text-white transition-colors"
              >
                {SITE_CONFIG.author.name}
              </a>
              , {SITE_CONFIG.author.title} ({SITE_CONFIG.author.credentials}).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-bronze)]">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-white/55">
        {children}
      </ul>
    </div>
  );
}

function FooterPillarLink({ slug, label }: Readonly<{ slug: string; label: string }>) {
  return (
    <li>
      <Link to="/pillar/$slug" params={{ slug }} className="hover:text-[color:var(--brand-bronze)] transition-colors">
        {label}
      </Link>
    </li>
  );
}

function FooterIndustryLink({ slug, label }: Readonly<{ slug: string; label: string }>) {
  return (
    <li>
      <Link to="/industry/$slug" params={{ slug }} className="hover:text-[color:var(--brand-bronze)] transition-colors">
        {label}
      </Link>
    </li>
  );
}
