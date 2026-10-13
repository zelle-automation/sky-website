"use client";

import Link from "next/link";
import { useState } from "react";
import type { Card } from "@/lib/catalog";
import { Collection, ViewToggle, type View } from "./Collection";
import { Icon } from "./Icon";

type Key = "hotels" | "excursions" | "packages";
const TABS: { key: Key; label: string; icon: "bed" | "compass" | "suitcase" }[] = [
  { key: "hotels", label: "Hotels", icon: "bed" },
  { key: "excursions", label: "Excursions", icon: "compass" },
  { key: "packages", label: "Packages", icon: "suitcase" },
];

export default function HomeCollections({ data }: { data: Record<Key, Card[]> }) {
  const [key, setKey] = useState<Key>("hotels");
  const [view, setView] = useState<View>("list");
  return (
    <>
      <div className="shead">
        <div>
          <div className="eyebrow">Handpicked by our travel desk</div>
          <h2 style={{ marginTop: 8 }}>Stays, <span className="serif-it">experiences</span> and packages</h2>
        </div>
        <div className="ctrl">
          <div className="seg glass gold" role="group" aria-label="Collection">
            {TABS.map((t) => (
              <button key={t.key} aria-pressed={key === t.key} onClick={() => setKey(t.key)}><Icon name={t.icon} />{t.label}</button>
            ))}
          </div>
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>
      <Collection items={data[key].slice(0, 5)} view={view} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 22 }}>
        <Link className="btn btn-ghost" href={`/${key}`}>View all {key} <Icon name="arrow" /></Link>
      </div>
    </>
  );
}
