"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Pic as PicT } from "@/lib/catalog";
import { amount } from "@/lib/format";
import { Icon, type IconName } from "./Icon";
import { Pic, picStyle } from "./Pic";

export type FlowItem = {
  key: string;
  title: string;
  sub: string;
  tagline: string;
  pic: PicT;
  description: string;
  facts: { icon: IconName; text: string }[];
  price: number | null;
  cta: string;
  href: string;
  group: string;
};

/**
 * 3D card carousel. It loops, so the centre card always has neighbours on both sides,
 * and it opens on the middle item (or `initialKey`) so three cards show left and right.
 */
export default function Coverflow({
  items, filters, initialFilter = "all", initialKey,
}: { items: FlowItem[]; filters: [string, string][]; initialFilter?: string; initialKey?: string }) {
  const [filter, setFilter] = useState(initialFilter);
  const shown = useMemo(() => items.filter((x) => filter === "all" || x.group === filter), [items, filter]);
  const start = (list: FlowItem[], key?: string) => {
    const k = key ? list.findIndex((x) => x.key === key) : -1;
    return k >= 0 ? k : Math.floor(list.length / 2);
  };
  const [idx, setIdx] = useState(() => start(shown, initialKey));
  const [narrow, setNarrow] = useState(false);
  const touch = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const n = shown.length;
  const go = (d: number) => n && setIdx((i) => (i + d + n) % n);
  const pick = (f: string) => {
    setFilter(f);
    setIdx(start(items.filter((x) => f === "all" || x.group === f)));
  };
  const cur = shown[idx];

  return (
    <>
      <div className="wrap">
        <div className="filters" role="group" aria-label="Filter">
          {filters.map(([k, l]) => <button key={k} aria-pressed={k === filter} onClick={() => pick(k)}>{l}</button>)}
        </div>
      </div>
      <div
        className="stage"
        tabIndex={0}
        aria-label="Use the left and right arrow keys to browse"
        onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <div className="ex-rail glass">
          <Link href="/contact" aria-label="Talk to an advisor"><Icon name="user" /></Link>
          <Link href="/visa" aria-label="Visa help"><Icon name="passport" /></Link>
          <Link href="/packages" aria-label="Packages"><Icon name="suitcase" /></Link>
        </div>
        <div className="floor" />
        {shown.map((x, i) => {
          const half = Math.floor(n / 2);
          const o = (((i - idx) % n) + n + half) % n - half;
          const a = Math.abs(o), sgn = Math.sign(o), gap = narrow ? 150 : 230;
          const centre = o === 0;
          const transform = centre
            ? "translateX(0) translateZ(60px) scale(1.06)"
            : `translateX(${sgn * (gap + (a - 1) * (narrow ? 60 : 120))}px) translateZ(${-a * 120}px) rotateY(${-sgn * 28}deg) scale(${1 - a * 0.08})`;
          return (
            <article
              key={x.key}
              className={`cf on-photo pic${centre ? " c" : ""}`}
              style={picStyle(x.pic, {
                transform, zIndex: 20 - a, opacity: a > 3 ? 0 : 1,
                filter: centre ? "none" : `brightness(${0.75 - a * 0.08})`, pointerEvents: a > 3 ? "none" : "auto",
              })}
              onClick={() => !centre && setIdx(i)}
              aria-hidden={a > 3}
            >
              <Link className="exp" href={x.href} tabIndex={centre ? 0 : -1}><Icon name="expand" size={14} /> Expand</Link>
              <div className="ct">
                <div className="short"><b>{x.title}</b><small>{x.sub}</small></div>
                <div className="full">
                  <div className="ttl"><h3>{x.title}</h3><span className="ct-n tabular">{i + 1} / {n}</span></div>
                  <p>{x.description}</p>
                  <div className="geo">{x.facts.map((f) => <span key={f.text}><Icon name={f.icon} />{f.text}</span>)}</div>
                  <div className="buy">
                    <span>
                      {x.price != null && <><small style={{ color: "var(--muted)", display: "block" }}>from</small><b className="tabular">PKR {amount(x.price)}</b></>}
                    </span>
                    <Link className="btn btn-gold" href={x.href} tabIndex={centre ? 0 : -1}>{x.cta}</Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {cur && (
        <div className="wrap">
          <div className="ex-dock glass">
            <button className="circ" aria-label="Previous" onClick={() => go(-1)}><Icon name="left" /></button>
            <Pic pic={cur.pic} className="th" />
            <div className="tx"><b>{cur.title}</b><small>{cur.sub} · {cur.tagline}</small></div>
            <Link className="circ" href={cur.href} aria-label={`Open ${cur.title}`}><Icon name="arrow" /></Link>
            <button className="circ" aria-label="Next" onClick={() => go(1)}><Icon name="right" /></button>
          </div>
          <div className="dots">
            {shown.map((x, i) => <button key={x.key} aria-label={`Go to ${x.title}`} aria-current={i === idx} onClick={() => setIdx(i)} />)}
          </div>
        </div>
      )}
    </>
  );
}
