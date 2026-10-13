import Link from "next/link";
import type { Card } from "@/lib/catalog";
import { amount, count } from "@/lib/format";
import { Icon } from "./Icon";
import { Pic } from "./Pic";
import EnquiryForm from "./EnquiryForm";
import { Collection } from "./Collection";

const LABEL = { hotels: "Hotels", excursions: "Excursions", packages: "Packages" } as const;
const REF = { hotels: "hotel", excursions: "excursion", packages: "package" } as const;

/** Detail page for one hotel, excursion or package, with a booking request form and related picks. */
export default function ItemDetail({ item, related }: { item: Card; related: Card[] }) {
  return (
    <section className="blk" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          <Link href={`/${item.type}`}>{LABEL[item.type]}</Link><span aria-hidden="true">/</span>
          <span style={{ color: "var(--text)" }}>{item.title}</span>
        </nav>
        <Pic pic={item.pic} className="detail-hero on-photo" label={item.title}>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="chip">{item.badge ?? item.kind}</span>
              {item.rating != null && <span className="chip"><span className="stars">★</span> {item.rating.toFixed(1)} · {count(item.reviews)} reviews</span>}
            </div>
            <h1 style={{ marginTop: 14 }}>{item.title}</h1>
            <div className="sub">{item.location}</div>
          </div>
        </Pic>
        <div className="detail-grid">
          <div className="panel glass">
            <h2>Overview</h2>
            <p>{item.summary}</p>
            <div className="facts">
              {item.detail && <div className="fact"><small>{item.type === "packages" ? "Includes" : item.type === "hotels" ? "Category" : "Duration"}</small><b>{item.detail}</b></div>}
              {item.city && <div className="fact"><small>Destination</small><b>{item.destinationSlug ? <Link href={`/destinations/${item.destinationSlug}`}>{item.city}</Link> : item.city}</b></div>}
              <div className="fact"><small>Price</small><b className="tabular">PKR {amount(item.price)} <span style={{ fontWeight: 500, color: "var(--muted)" }}>{item.unit}</span></b></div>
            </div>
            <h2 style={{ marginTop: 26, fontSize: 26 }}>{item.type === "hotels" ? "Amenities" : item.type === "packages" ? "What's included" : "Highlights"}</h2>
            <ul className="bullets">{item.features.map((f) => <li key={f}><Icon name="spark" size={16} />{f}</li>)}</ul>
          </div>
          <div className="panel glass">
            <small style={{ color: "var(--muted)" }}>from</small>
            <div className="price-big tabular">PKR {amount(item.price)}</div>
            <small style={{ color: "var(--muted)" }}>{item.unit}{item.priceWas != null && <> · <s>PKR {amount(item.priceWas)}</s></>}</small>
            <h2 style={{ marginTop: 18, fontSize: 26 }}>Request this {REF[item.type]}</h2>
            <p>We confirm availability and the final price by phone or WhatsApp before you pay anything.</p>
            <EnquiryForm service={item.type} refType={REF[item.type]} refId={item.id} subject={item.title} lockService cta="Request booking" />
          </div>
        </div>
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <div className="shead"><div><div className="eyebrow">You may also like</div><h2 style={{ marginTop: 8 }}>More <span className="serif-it">{LABEL[item.type].toLowerCase()}</span></h2></div></div>
            <Collection items={related} view="list" />
          </div>
        )}
      </div>
    </section>
  );
}
