"use client";

import Link from "next/link";
import { useState } from "react";
import type { Card } from "@/lib/catalog";
import { amount, count } from "@/lib/format";
import { Icon } from "./Icon";
import { Pic, picStyle } from "./Pic";

const CTA: Record<Card["type"], string> = { hotels: "View rooms", excursions: "View tour", packages: "View package" };
const NAME: Record<Card["type"], string> = { hotels: "hotels", excursions: "excursions", packages: "packages" };

export type View = "list" | "spot";

function ListView({ items }: { items: Card[] }) {
  return (
    <div className="list fade-in">
      {items.map((h) => (
        <article className="row glass" key={h.id}>
          <Pic pic={h.pic} className="ph on-photo"><span className="chip">{h.badge ?? h.kind}</span></Pic>
          <div className="bd">
            <h3><Link href={h.href}>{h.title}</Link></h3>
            <div className="loc"><Icon name="pin" />{h.location}{h.detail ? ` · ${h.detail}` : ""}</div>
            <p>{h.summary}</p>
            <div className="feats">{h.features.map((f) => <span className="chip" key={f}>{f}</span>)}</div>
          </div>
          <div className="pr">
            {h.rating != null && <div className="rate"><span>{count(h.reviews)} reviews</span><em>{h.rating.toFixed(1)}</em></div>}
            <div>
              {h.priceWas != null && <s className="tabular">PKR {amount(h.priceWas)}</s>}
              <b className="tabular" style={{ display: "block" }}>PKR {amount(h.price)}</b>
              <small>{h.unit}</small>
            </div>
            <Link className="btn btn-gold" href={h.href} style={{ padding: "10px 18px" }}>{CTA[h.type]}</Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function SpotlightView({ items }: { items: Card[] }) {
  const [idx, setIdx] = useState(0);
  const h = items[Math.min(idx, items.length - 1)];
  return (
    <div className="spot glass fade-in">
      <div className="side">
        <button className="on" aria-label="Overview"><Icon name="home" /></button>
        <Link href="/destinations" aria-label="Destinations"><Icon name="map" /></Link>
        <Link href="/contact" aria-label="Talk to an advisor"><Icon name="bookmark" /></Link>
        <Link href="/packages" aria-label="Packages"><Icon name="ticket" /></Link>
      </div>
      <div className="feat on-photo pic" style={picStyle(h.pic)}>
        <div>
          <div className="kind">
            <span className="chip">{h.badge ?? h.kind}</span>
            {h.rating != null && <span className="chip"><span className="stars">★</span> {h.rating.toFixed(1)} · {count(h.reviews)} reviews</span>}
          </div>
          <h3>{h.title}</h3>
          <div className="sub">{h.location}</div>
          <p>{h.summary}</p>
          <div className="meta">
            {h.detail && <span><Icon name="sun" />{h.detail}</span>}
            {h.features[0] && <span><Icon name="tag" />{h.features[0]}</span>}
          </div>
        </div>
        <div className="dock">
          <div className="pin">
            <span className="circ"><Icon name="pin" /></span>
            <span><b>{h.city || h.location}</b><small>from <span className="gold tabular">PKR {amount(h.price)}</span> {h.unit}</small></span>
          </div>
          <div className="bt">
            <Link className="circ" href={`/contact?service=${h.type}`} aria-label="Ask an advisor"><Icon name="chat" /></Link>
            <Link className="btn btn-gold" href={h.href}>Book now <Icon name="send" /></Link>
          </div>
        </div>
      </div>
      <div className="mlist">
        <div className="mh"><h3>Must-see {NAME[h.type]}</h3><span className="chip">{items.length} picks</span></div>
        <div className="mitems">
          {items.map((x, i) => (
            <button className="mi" key={x.id} aria-current={x.id === h.id} onClick={() => setIdx(i)}>
              <Pic pic={x.pic} className="th" />
              <span style={{ minWidth: 0 }}>
                <b>{x.title}</b>
                <small>{x.badge ?? x.kind}</small>
                <span className="lc"><Icon name="pin" />{x.location}</span>
              </span>
              <span className="go"><Icon name={x.id === h.id ? "bookmark" : "right"} /></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Collection({ items, view }: { items: Card[]; view: View }) {
  if (!items.length) {
    return (
      <div className="glass" style={{ borderRadius: "var(--r-md)", padding: 28, textAlign: "center", color: "var(--muted)" }}>
        Nothing matches this filter yet. Our travel desk can arrange it on request.
      </div>
    );
  }
  // Keyed so the spotlight resets to the first pick when the list changes.
  return view === "list" ? <ListView items={items} /> : <SpotlightView key={items.map((i) => i.id).join()} items={items} />;
}

export function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  return (
    <div className="seg glass" role="group" aria-label="View">
      <button aria-pressed={view === "list"} onClick={() => onChange("list")}><Icon name="list" />List</button>
      <button aria-pressed={view === "spot"} onClick={() => onChange("spot")}><Icon name="panel" />Spotlight</button>
    </div>
  );
}
