import type { Metadata } from "next";
import CatalogBrowser from "@/components/CatalogBrowser";
import { PageHead } from "@/components/PageHead";
import SearchWidget from "@/components/SearchWidget";
import { excursionCards, listDestinations, listVisas } from "@/lib/catalog";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Excursions", description: "Desert safaris, Bosphorus cruises, jeep trips across Deosai and Ziyarat with scholar guides. Add any of them to your trip." };

export default async function ExcursionsPage({ searchParams }: { searchParams: Promise<{ destination?: string }> }) {
  const { destination } = await searchParams;
  const [items, destinations, visas] = await Promise.all([excursionCards(), listDestinations(), listVisas()]);
  const city = destinations.find((d) => d.slug === destination)?.name ?? "all";
  return (
    <>
      <PageHead crumbs={[["Excursions"]]} eyebrow="Things to do" title={<>Excursions and <span className="serif-it">experiences</span></>} sub="Desert safaris, Bosphorus cruises, jeep trips across Deosai and Ziyarat with scholar guides. Add any of them to your trip.">
        <div style={{ marginTop: 6 }}>
          <SearchWidget
            initialTab="excursions"
            destinations={destinations.map((d) => ({ slug: d.slug, name: d.name }))}
            visaCountries={[...new Set(visas.map((v) => v.country))]}
          />
        </div>
      </PageHead>
      <section className="blk" style={{ paddingTop: 34 }}>
        <div className="wrap">
          <CatalogBrowser key={city} items={items} noun="excursions" initialCity={city} />
        </div>
      </section>
    </>
  );
}
