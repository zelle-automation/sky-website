import Link from "next/link";
import { Icon, type IconName } from "./Icon";

export const SERVICES: [IconName, string, string, string][] = [
  ["plane", "Flight reservations", "Domestic and international fares on all major airlines, with seat and baggage help.", "/contact?service=flights"],
  ["bed", "Hotel accommodation", "From city hotels to resorts, booked at our negotiated rates.", "/hotels"],
  ["mountain", "Domestic tours", "Hunza, Skardu, Swat, Naran and Kashmir with trusted drivers and guides.", "/packages?category=domestic"],
  ["globe", "International tours", "Dubai, Türkiye, Azerbaijan, Malaysia, Thailand, Maldives and more.", "/packages?category=international"],
  ["passport", "Visa assistance", "Documents, appointments and follow-up for tourist and visit visas.", "/visa"],
  ["car", "Airport transfers", "Meet-and-greet pickups so you never wait at arrivals.", "/contact?service=transfers"],
  ["suitcase", "Land packages", "Hotels, transfers and tours without flights, for travellers who fly on miles.", "/packages"],
  ["moon", "Umrah services", "Visa, flights, Haram-near hotels, transport and Ziyarat in one package.", "/umrah"],
  ["bus", "Car rental services", "Self-drive or chauffeured cars in Pakistan and abroad.", "/contact?service=cars"],
];

export function ServiceGrid() {
  return (
    <div className="svc">
      {SERVICES.map(([ic, t, d, href]) => (
        <Link className="sv glass" key={t} href={href}>
          <span className="ic"><Icon name={ic} /></span>
          <span><b>{t}</b><p>{d}</p></span>
        </Link>
      ))}
    </div>
  );
}

export function WhyStrip() {
  const items: [IconName, string, string][] = [
    ["tag", "Best price", "Match on like-for-like"], ["headset", "24/7 support", "Before, during and after"],
    ["shield", "Secure booking", "Encrypted payments"], ["refresh", "Flexible changes", "On eligible fares"],
    ["award", "Handpicked hotels", "Inspected by our team"],
  ];
  return (
    <div className="why glass">
      {items.map(([ic, b, s]) => <div key={b}><Icon name={ic} /><span><b>{b}</b><small>{s}</small></span></div>)}
    </div>
  );
}
