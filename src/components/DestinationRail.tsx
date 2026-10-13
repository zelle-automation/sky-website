"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Destination } from "@/lib/catalog";
import { amount } from "@/lib/format";
import { Icon } from "./Icon";
import { picStyle } from "./Pic";

export default function DestinationRail({ items }: { items: Destination[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const scroll = (d: number) => rail.current?.scrollBy({ left: rail.current.clientWidth * 0.8 * d, behavior: "smooth" });
  return (
    <div className="rail-wrap">
      <button className="rail-nav l glass" aria-label="Scroll left" onClick={() => scroll(-1)}><Icon name="left" /></button>
      <div className="rail" ref={rail}>
        {items.map((d) => (
          <Link key={d.slug} className="dcard on-photo pic" href={`/destinations?d=${d.slug}`} style={picStyle(d.pic)}>
            <span className="chip tag" style={{ background: "rgba(6,13,30,.45)", backdropFilter: "blur(8px)" }}>{d.tagline}</span>
            <button
              className="heart"
              aria-pressed={saved.has(d.slug)}
              aria-label={`Save ${d.name}`}
              onClick={(e) => {
                e.preventDefault();
                setSaved((s) => { const n = new Set(s); if (n.has(d.slug)) n.delete(d.slug); else n.add(d.slug); return n; });
              }}
            >
              <Icon name="heart" />
            </button>
            <span className="cap">
              <b>{d.name}</b>
              <span>{d.countryName}</span>
              {d.priceFrom != null && (
                <span className="from"><span style={{ color: "var(--muted)" }}>from</span><strong className="tabular">PKR {amount(d.priceFrom)}</strong></span>
              )}
            </span>
          </Link>
        ))}
      </div>
      <button className="rail-nav r glass" aria-label="Scroll right" onClick={() => scroll(1)}><Icon name="right" /></button>
    </div>
  );
}
