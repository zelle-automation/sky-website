import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { excursionCards, getDestination, hotelCards, packageCards } from "@/lib/catalog";
import { amount } from "@/lib/format";
import { Icon } from "@/components/Icon";
import { Pic } from "@/components/Pic";
import CatalogTabs from "@/components/CatalogTabs";
import EnquiryForm from "@/components/EnquiryForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = await getDestination((await params).slug);
  return d ? { title: `${d.name}, ${d.countryName}`, description: d.description ?? undefined } : {};
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = await getDestination(slug);
  if (!d) notFound();
  const [hotels, excursions, packages] = await Promise.all([hotelCards(slug), excursionCards(slug), packageCards({ destination: slug })]);

  return (
    <section className="blk" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/destinations">Destinations</Link><span aria-hidden="true">/</span><span style={{ color: "var(--text)" }}>{d.name}</span>
        </nav>
        <Pic pic={d.pic} className="detail-hero on-photo" label={d.name}>
          <div>
            <span className="chip">{d.flag} {d.tagline}</span>
            <h1 style={{ marginTop: 14 }}>{d.name}</h1>
            <div className="sub">{d.countryName}</div>
          </div>
        </Pic>
        <div className="detail-grid">
          <div className="panel glass">
            <h2>About {d.name}</h2>
            <p>{d.description}</p>
            <div className="facts">
              {d.bestTime && <div className="fact"><small>Best time</small><b>{d.bestTime}</b></div>}
              {d.flightNote && <div className="fact"><small>Getting there</small><b>{d.flightNote}</b></div>}
              {d.priceFrom != null && <div className="fact"><small>Trips from</small><b className="tabular">PKR {amount(d.priceFrom)}</b></div>}
              {d.lat != null && d.lng != null && <div className="fact"><small>Coordinates</small><b className="tabular">{d.lat.toFixed(3)}, {d.lng.toFixed(3)}</b></div>}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
              <Link className="btn btn-ghost" href="/visa"><Icon name="passport" />Visa requirements</Link>
              <Link className="btn btn-ghost" href={`/hotels?destination=${d.slug}`}><Icon name="bed" />Hotels in {d.name}</Link>
            </div>
          </div>
          <div className="panel glass">
            <h2>Plan {d.name}</h2>
            <p>Tell us your dates and who&apos;s travelling. An advisor will send you a full quote.</p>
            <EnquiryForm service="packages" refType="destination" refId={d.id} subject={`Trip to ${d.name}`} lockService cta="Get my quote" />
          </div>
        </div>
        <div style={{ marginTop: 48 }}>
          <CatalogTabs name={d.name} data={{ hotels, excursions, packages }} />
        </div>
      </div>
    </section>
  );
}
