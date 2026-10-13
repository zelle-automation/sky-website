"use client";

import { useState } from "react";
import type { Card } from "@/lib/catalog";
import { Collection, ViewToggle, type View } from "./Collection";
import { Icon } from "./Icon";

type Key = "hotels" | "excursions" | "packages";

/** Hotels / excursions / packages for one destination, with list and spotlight views. Empty tabs are hidden. */
export default function CatalogTabs({ name, data }: { name: string; data: Record<Key, Card[]> }) {
  const tabs = (["hotels", "excursions", "packages"] as Key[]).filter((k) => data[k].length);
  const [key, setKey] = useState<Key | undefined>(tabs[0]);
  const [view, setView] = useState<View>("list");
  if (!key) return null;
  const icon = { hotels: "bed", excursions: "compass", packages: "suitcase" } as const;
  return (
    <>
      <div className="shead">
        <div><div className="eyebrow">In {name}</div><h2 style={{ marginTop: 8 }}>Stay, <span className="serif-it">explore</span>, book</h2></div>
        <div className="ctrl">
          <div className="seg glass gold" role="group" aria-label="Collection">
            {tabs.map((t) => (
              <button key={t} aria-pressed={key === t} onClick={() => setKey(t)}>
                <Icon name={icon[t]} />{t[0].toUpperCase() + t.slice(1)} <span style={{ opacity: 0.6 }}>{data[t].length}</span>
              </button>
            ))}
          </div>
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>
      <Collection items={data[key]} view={view} />
    </>
  );
}
