"use client";

import { useMemo, useState } from "react";
import type { Card } from "@/lib/catalog";
import { Collection, ViewToggle, type View } from "./Collection";

type Sort = "rec" | "lo" | "hi" | "rate";

/** Filter chips by destination, sort and list/spotlight for the Hotels, Excursions and Packages pages. */
export default function CatalogBrowser({ items, noun, initialCity = "all" }: { items: Card[]; noun: string; initialCity?: string }) {
  const [city, setCity] = useState(initialCity);
  const [sort, setSort] = useState<Sort>("rec");
  const [view, setView] = useState<View>("list");
  const cities = useMemo(() => ["all", ...new Set(items.map((x) => x.city).filter(Boolean))], [items]);
  const shown = useMemo(() => {
    const list = items.filter((x) => city === "all" || x.city === city);
    if (sort === "lo") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "hi") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "rate") return [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  }, [items, city, sort]);

  return (
    <>
      <div className="cat-bar">
        <div className="filters" role="group" aria-label="Filter by destination" style={{ justifyContent: "flex-start", margin: 0 }}>
          {cities.map((c) => (
            <button key={c} aria-pressed={c === city} onClick={() => setCity(c)}>{c === "all" ? "All destinations" : c}</button>
          ))}
        </div>
        <div className="ctrl">
          <span className="cat-count tabular">{shown.length} {noun}</span>
          <label className="sortsel glass">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort by">
              <option value="rec">Recommended</option>
              <option value="lo">Price: low to high</option>
              <option value="hi">Price: high to low</option>
              <option value="rate">Guest rating</option>
            </select>
          </label>
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>
      <Collection items={shown} view={view} />
    </>
  );
}
