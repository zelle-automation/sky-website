import type { Metadata } from "next";
import CatalogBrowser from "@/components/CatalogBrowser";
import Coverflow from "@/components/Coverflow";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { packageCards } from "@/lib/catalog";
import { packageFlow } from "@/lib/flow";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Packages", description: "Flights, hotels, transfers and tours bundled into one price, from Umrah to the Maldives." };

const FILTERS: [string, string][] = [["all", "All"], ["international", "International"], ["domestic", "Domestic"], ["umrah", "Umrah"], ["honeymoon", "Honeymoon"]];

export default async function PackagesPage({ searchParams }: { searchParams: Promise<{ category?: string; p?: string }> }) {
  const { category, p } = await searchParams;
  const packages = await packageCards();
  const filter = FILTERS.some(([k]) => k === category) ? category! : "all";
  return (
    <div className="explorer">
      <PageHead
        center
        crumbs={[["Packages"]]}
        eyebrow="All-inclusive journeys"
        title={<>Packages, <span className="serif-it">fully arranged</span></>}
        sub="Flights, hotels, transfers and tours bundled into one price. Pick a journey and an advisor will tailor the dates for you."
      />
      <Coverflow key={filter} items={packages.map(packageFlow)} filters={FILTERS} initialFilter={filter} initialKey={p} />
      <div className="wrap">
        <div className="ex-more">
          {([
            ["shield", "Price locked at booking", "No surcharges after you pay your deposit."],
            ["users", "Group or private", "Join a scheduled group or travel on your own dates."],
            ["refresh", "Flexible changes", "Change dates on eligible packages up to 21 days before travel."],
          ] as const).map(([ic, t, s]) => (
            <div className="sv glass" key={t}><span className="ic"><Icon name={ic} /></span><span><b>{t}</b><p>{s}</p></span></div>
          ))}
        </div>
        <div className="shead" style={{ marginTop: 56 }}>
          <div><div className="eyebrow">Every package</div><h2 style={{ marginTop: 8 }}>All <span className="serif-it">packages</span></h2></div>
        </div>
        <CatalogBrowser items={packages} noun="packages" />
      </div>
    </div>
  );
}
