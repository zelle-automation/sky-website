import type { Metadata } from "next";
import Coverflow from "@/components/Coverflow";
import { PageHead } from "@/components/PageHead";
import { Icon } from "@/components/Icon";
import { listDestinations } from "@/lib/catalog";
import { destinationFlow } from "@/lib/flow";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Destinations", description: "Dubai, Istanbul, Baku, the Maldives, Hunza, Skardu, Makkah and more, with flights, hotels and visas arranged." };

export default async function DestinationsPage({ searchParams }: { searchParams: Promise<{ d?: string; category?: string }> }) {
  const { d, category } = await searchParams;
  const items = (await listDestinations()).map(destinationFlow);
  const filter = category === "domestic" ? "dom" : category === "international" ? "intl" : category === "umrah" ? "umrah" : "all";
  return (
    <div className="explorer">
      <PageHead
        center
        crumbs={[["Destinations"]]}
        eyebrow="Explore the world with Sky Holidays"
        title={<>Choose your <span className="serif-it">destination</span></>}
        sub="Swipe through the places our travellers love most. Each one comes with flights, hotels, transfers and visa support arranged for you."
      />
      <Coverflow
        items={items}
        initialKey={d}
        initialFilter={filter}
        filters={[["all", "All"], ["intl", "International"], ["dom", "Domestic"], ["umrah", "Umrah"]]}
      />
      <div className="wrap">
        <div className="ex-more">
          {([
            ["passport", "Visa support", "We check requirements and file applications for every destination here."],
            ["plane", "Flights from your city", "Departures from Karachi, Lahore, Islamabad, Peshawar and Multan."],
            ["headset", "A named advisor", "One person handles your trip from first call to return flight."],
          ] as const).map(([ic, t, s]) => (
            <div className="sv glass" key={t}><span className="ic"><Icon name={ic} /></span><span><b>{t}</b><p>{s}</p></span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
