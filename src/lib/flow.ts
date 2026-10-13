import type { Card, Destination } from "./catalog";
import type { FlowItem } from "@/components/Coverflow";

const GROUP: Record<string, string> = { international: "intl", domestic: "dom", umrah: "umrah" };

export function destinationFlow(d: Destination): FlowItem {
  const facts: FlowItem["facts"] = [{ icon: "pin", text: d.countryName }];
  if (d.lat != null && d.lng != null) {
    facts.push({ icon: "globe", text: `${Math.abs(d.lat).toFixed(4)}° ${d.lat >= 0 ? "N" : "S"}, ${Math.abs(d.lng).toFixed(4)}° ${d.lng >= 0 ? "E" : "W"}` });
  }
  if (d.bestTime) facts.push({ icon: "sun", text: `Best time: ${d.bestTime}` });
  if (d.flightNote) facts.push({ icon: "plane", text: `Flight: ${d.flightNote}` });
  return {
    key: d.slug, title: d.name, sub: d.countryName, tagline: d.tagline ?? "", pic: d.pic, description: d.description ?? "",
    facts, price: d.priceFrom, cta: "Plan this trip", href: `/destinations/${d.slug}`, group: GROUP[d.category] ?? d.category,
  };
}

export function packageFlow(p: Card): FlowItem {
  return {
    key: p.slug, title: p.title, sub: p.location, tagline: p.badge ?? p.kind, pic: p.pic, description: p.summary,
    facts: [{ icon: "clock", text: p.location }, { icon: "suitcase", text: p.detail }].filter((f) => f.text) as FlowItem["facts"],
    price: p.price, cta: "View package", href: p.href, group: p.category ?? "",
  };
}
