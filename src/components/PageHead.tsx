import Link from "next/link";
import type { ReactNode } from "react";

export function PageHead({
  eyebrow, title, sub, crumbs, center = false, children,
}: { eyebrow: string; title: ReactNode; sub?: string; crumbs?: [string, string?][]; center?: boolean; children?: ReactNode }) {
  return (
    <section className="page-head">
      <div className="wrap" style={center ? { textAlign: "center" } : undefined}>
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb" style={center ? { justifyContent: "center" } : undefined}>
            <Link href="/">Home</Link>
            {crumbs.map(([label, href]) => (
              <span key={label} style={{ display: "contents" }}>
                <span aria-hidden="true">/</span>
                {href ? <Link href={href}>{label}</Link> : <span style={{ color: "var(--text)" }}>{label}</span>}
              </span>
            ))}
          </nav>
        )}
        <div className="eyebrow">{eyebrow}</div>
        <h1 style={{ marginTop: 10, fontSize: "clamp(40px,5.4vw,66px)", lineHeight: 1 }}>{title}</h1>
        {sub && <p style={center ? { marginInline: "auto" } : undefined}>{sub}</p>}
        {children}
      </div>
    </section>
  );
}
