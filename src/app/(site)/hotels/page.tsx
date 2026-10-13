import type { Metadata } from "next";
import CatalogBrowser from "@/components/CatalogBrowser";
import { PageHead } from "@/components/PageHead";
import SearchWidget from "@/components/SearchWidget";
import { hotelCards, listDestinations, listVisas } from "@/lib/catalog";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Hotels", description: "From Haram-view rooms in Makkah to lakeside chalets in Skardu. Every hotel here has been checked by our team, and our rates include taxes." };

export default async function HotelsPage({ searchParams }: { searchParams: Promise<{ destination?: string }> }) {
  const { destination } = await searchParams;
  const [items, destinations, visas] = await Promise.all([hotelCards(), listDestinations(), listVisas()]);
  const city = destinations.find((d) => d.slug === destination)?.name ?? "all";
  return (
    <>
      <PageHead crumbs={[["Hotels"]]} eyebrow="Handpicked stays" title={<>Hotels, <span className="serif-it">hand-chosen</span></>} sub="From Haram-view rooms in Makkah to lakeside chalets in Skardu. Every hotel here has been checked by our team, and our rates include taxes.">
        <div style={{ marginTop: 6 }}>
          <SearchWidget
            initialTab="hotels"
            destinations={destinations.map((d) => ({ slug: d.slug, name: d.name }))}
            visaCountries={[...new Set(visas.map((v) => v.country))]}
          />
        </div>
      </PageHead>
      <section className="blk" style={{ paddingTop: 34 }}>
        <div className="wrap">
          <CatalogBrowser key={city} items={items} noun="hotels" initialCity={city} />
        </div>
      </section>
    </>
  );
}
