"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export type Tab = "hotels" | "packages" | "excursions" | "umrah" | "visa" | "cars" | "flights";
const TABS: { key: Tab; label: string; icon: IconName }[] = [
  { key: "flights", label: "Flights", icon: "plane" },
  { key: "hotels", label: "Hotels", icon: "bed" },
  { key: "packages", label: "Packages", icon: "suitcase" },
  { key: "excursions", label: "Excursions", icon: "compass" },
  { key: "umrah", label: "Umrah", icon: "moon" },
  { key: "visa", label: "Visa", icon: "passport" },
  { key: "cars", label: "Car rental", icon: "car" },
];

function Field({ label, icon, children }: { label: string; icon: IconName; children: ReactNode }) {
  return (
    <label className="sf">
      <span style={{ display: "block", fontSize: 10.5, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--dim)", fontWeight: 600 }}>{label}</span>
      <span className="v"><Icon name={icon} />{children}</span>
    </label>
  );
}

const plusDays = (d: number) => new Date(Date.now() + d * 864e5).toISOString().slice(0, 10);

/** Hero search. Hotels, excursions, packages and Umrah open the matching page; the rest start an enquiry. */
export default function SearchWidget({
  destinations, visaCountries, initialTab = "hotels", hidden = [],
}: { destinations: { slug: string; name: string }[]; visaCountries: string[]; initialTab?: Tab; hidden?: string[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [dest, setDest] = useState("");
  const [visa, setVisa] = useState(visaCountries[0] ?? "");
  const [from, setFrom] = useState("Lahore");
  const [to, setTo] = useState("Dubai");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = dest ? `?destination=${dest}` : "";
    if (tab === "hotels" || tab === "excursions" || tab === "packages") router.push(`/${tab}${q}`);
    else if (tab === "umrah") router.push("/umrah");
    else if (tab === "visa") router.push(`/visa${visa ? `#${encodeURIComponent(visa)}` : ""}`);
    else router.push(`/contact?service=${tab}&message=${encodeURIComponent(tab === "flights" ? `Flight from ${from} to ${to}` : `Car rental in ${to}`)}`);
  };

  const destSelect = (label = "Destination") => (
    <Field label={label} icon="pin">
      <select value={dest} onChange={(e) => setDest(e.target.value)} aria-label={label}>
        <option value="">All destinations</option>
        {destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
      </select>
    </Field>
  );
  const date = (label: string, days: number) => (
    <Field label={label} icon="cal"><input type="date" defaultValue={plusDays(days)} aria-label={label} /></Field>
  );
  const people = (label = "Travellers", def = "2 adults") => (
    <Field label={label} icon="users">
      <select defaultValue={def} aria-label={label}>
        {["1 adult", "2 adults", "2 adults, 1 child", "2 adults, 2 children", "Group (5+)"].map((o) => <option key={o}>{o}</option>)}
      </select>
    </Field>
  );

  let fields: ReactNode;
  if (tab === "flights") {
    fields = <>
      <Field label="From" icon="plane"><input value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From" /></Field>
      <Field label="To" icon="pin"><input value={to} onChange={(e) => setTo(e.target.value)} aria-label="To" /></Field>
      {date("Depart", 30)}{date("Return", 37)}{people()}
    </>;
  } else if (tab === "hotels") fields = <>{destSelect()}{date("Check-in", 30)}{date("Check-out", 35)}{people("Guests")}</>;
  else if (tab === "packages") fields = <>{destSelect("Going to")}{date("Leaving", 30)}{people()}</>;
  else if (tab === "excursions") fields = <>{destSelect("Where")}{date("Date", 30)}{people("Guests")}</>;
  else if (tab === "umrah") fields = <>
    <Field label="Departure city" icon="plane">
      <select aria-label="Departure city">{["Karachi", "Lahore", "Islamabad", "Peshawar", "Multan"].map((c) => <option key={c}>{c}</option>)}</select>
    </Field>
    {date("Month", 45)}
    <Field label="Sharing" icon="users"><select aria-label="Sharing">{["Quad sharing", "Triple sharing", "Double sharing"].map((c) => <option key={c}>{c}</option>)}</select></Field>
  </>;
  else if (tab === "visa") fields = <>
    <Field label="Nationality" icon="passport"><input defaultValue="Pakistan" aria-label="Nationality" /></Field>
    <Field label="Visa for" icon="globe">
      <select value={visa} onChange={(e) => setVisa(e.target.value)} aria-label="Visa for">{visaCountries.map((c) => <option key={c}>{c}</option>)}</select>
    </Field>
    {people("Applicants", "2 adults")}
  </>;
  else fields = <>
    <Field label="Pick-up" icon="pin"><input value={to} onChange={(e) => setTo(e.target.value)} aria-label="Pick-up" /></Field>
    {date("Pick-up date", 30)}{date("Drop-off date", 37)}
  </>;

  return (
    <form className="search glass" id="search" onSubmit={submit}>
      <div className="stabs" role="tablist" aria-label="What are you booking">
        {TABS.filter((t) => !hidden.includes(t.key)).map((t) => (
          <button type="button" role="tab" key={t.key} aria-selected={tab === t.key} onClick={() => setTab(t.key)}>
            <Icon name={t.icon} />{t.label}
          </button>
        ))}
      </div>
      <div className="sfields">
        {fields}
        <div className="sgo"><button className="btn btn-gold" type="submit"><Icon name="search" /> Search</button></div>
      </div>
    </form>
  );
}
