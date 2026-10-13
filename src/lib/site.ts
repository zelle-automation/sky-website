// Business details and homepage content edited in the dashboard (Settings → Business,
// Homepage). Falls back to the launch copy when the API has nothing or is unreachable.
import { cache } from "react";
import { api } from "./api";

export type SectionKey = "destinations" | "hotels" | "excursions" | "deals" | "umrah" | "visa" | "services" | "stories" | "newsletter";
export type SearchTab = "flights" | "hotels" | "packages" | "excursions" | "umrah" | "visa" | "cars" | "transfers";

export type Site = {
  business: {
    company_name: string; slogan: string; phone: string; whatsapp: string; email: string; address: string;
    social: Partial<Record<"facebook" | "instagram" | "x" | "tiktok" | "youtube" | "linkedin", string>>;
  };
  homepage: {
    hero: {
      eyebrow: string; headline: string; sub: string; cta_label: string; cta_link: string; cta2_label: string; cta2_link: string;
      image_day_url: string; image_night_url: string; search_default: SearchTab; search_tabs: Partial<Record<SearchTab, boolean>>;
    };
    offer: { enabled: boolean; badge: string; title: string; text: string; link: string; until: string };
    sections: { key: SectionKey; enabled: boolean }[];
  };
};

const DEFAULTS: Site = {
  business: {
    company_name: "Sky Holidays", slogan: "Experience the Exceptional", phone: "+92 311 11 33 020", whatsapp: "+92 311 11 33 020",
    email: "info@skyholidays.pk", address: "", social: {},
  },
  homepage: {
    hero: {
      eyebrow: "Sky Holidays · door to destination", headline: "Every journey, exceptional.",
      sub: "Flights, hotels, tours, visas and Umrah, planned end to end by one travel desk in Pakistan and looked after until you are home.",
      cta_label: "Explore destinations", cta_link: "/destinations", cta2_label: "View packages", cta2_link: "/packages",
      image_day_url: "/brand/hero-terrace.jpg", image_night_url: "", search_default: "hotels", search_tabs: {},
    },
    offer: { enabled: true, badge: "Seasonal offer", title: "Umrah 2026–27 departures", text: "Visa, flights, Haram-view hotels and Ziyarat transfers in one package.", link: "/umrah", until: "" },
    sections: (["destinations", "hotels", "excursions", "deals", "umrah", "visa", "services", "stories", "newsletter"] as SectionKey[]).map((key) => ({ key, enabled: true })),
  },
};

export const getSite = cache(async (): Promise<Site> => {
  try {
    const s = await api<Partial<Site>>("/api/site");
    const b = { ...DEFAULTS.business, ...s.business };
    const h = s.homepage ?? ({} as Partial<Site["homepage"]>);
    return {
      business: { ...b, phone: b.phone || DEFAULTS.business.phone, email: b.email || DEFAULTS.business.email, social: b.social ?? {} },
      homepage: {
        hero: { ...DEFAULTS.homepage.hero, ...h.hero },
        offer: { ...DEFAULTS.homepage.offer, ...h.offer },
        sections: h.sections?.length ? h.sections : DEFAULTS.homepage.sections,
      },
    };
  } catch {
    return DEFAULTS;
  }
});

/** "+92 311 11 33 020" → "+923111133020" for tel: links, "923111133020" for wa.me. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const waHref = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

/** True when the offer has no end date or it hasn't passed (dates are YYYY-MM-DD). */
export const offerLive = (o: Site["homepage"]["offer"]) => o.enabled && (!o.until || o.until >= new Date().toISOString().slice(0, 10));
