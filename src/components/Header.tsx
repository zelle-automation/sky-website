"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/hotels", label: "Hotels" },
  { href: "/excursions", label: "Excursions" },
  { href: "/packages", label: "Packages" },
  { href: "/umrah", label: "Umrah" },
  { href: "/visa", label: "Visa" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const isOn = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <header className="nav">
      <div className="wrap">
        <div className="bar glass">
          <Logo />
          <nav className="links" aria-label="Main">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={isOn(l.href) ? "on" : undefined}>{l.label}</Link>
            ))}
          </nav>
          <div className="acts">
            <Link className="iconbtn" href="/hotels" aria-label="Search hotels"><Icon name="search" /></Link>
            <Link className="iconbtn" href="/contact" aria-label="Talk to an advisor"><Icon name="user" /></Link>
            <Link className="btn btn-gold" href="/contact?service=packages"><Icon name="plane" /><span>Plan my trip</span></Link>
            <button className="iconbtn menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
        <nav className={`mobile-menu glass${open ? " open" : ""}`} aria-label="Main mobile" onClick={() => setOpen(false)}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isOn(l.href) ? "on" : undefined}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

