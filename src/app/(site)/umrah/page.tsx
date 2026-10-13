import type { Metadata } from "next";
import { Collection } from "@/components/Collection";
import EnquiryForm from "@/components/EnquiryForm";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { excursionCards, hotelCards, listVisas, packageCards } from "@/lib/catalog";
import { amount } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Umrah", description: "Umrah packages with visa, flights, Haram-near hotels, transport and Ziyarat in Makkah and Madinah." };

const STEPS: [string, string][] = [
  ["Choose your package", "Pick dates, nights in Makkah and Madinah, and room sharing."],
  ["Send your documents", "Passport, photo and vaccination card. We file the Umrah visa for you."],
  ["Fly with your group", "Return flights from Karachi, Lahore or Islamabad with a group leader."],
  ["Stay near the Haram", "Hotels a short walk from Masjid al-Haram and Masjid an-Nabawi, with Ziyarat included."],
];

export default async function UmrahPage() {
  const [packages, hotels, ziyarat, visas] = await Promise.all([
    packageCards({ category: "umrah" }), hotelCards(), excursionCards(), listVisas(),
  ]);
  const haramHotels = hotels.filter((h) => h.city === "Makkah" || h.city === "Madinah");
  const tours = ziyarat.filter((e) => e.city === "Makkah" || e.city === "Madinah");
  const visa = visas.find((v) => v.countryIso2 === "SA" && v.type.toLowerCase().includes("umrah"));
  return (
    <>
      <PageHead
        crumbs={[["Umrah"]]}
        eyebrow="Umrah services"
        title={<>Umrah, <span className="serif-it">taken care of</span></>}
        sub="Visa, flights, hotels near the Haram, transport and Ziyarat in one package, with a group leader from departure to return."
      />
      <section className="blk" style={{ paddingTop: 30 }}>
        <div className="wrap">
          <div className="svc four">
            {STEPS.map(([t, s], i) => (
              <div className="sv glass" key={t}>
                <span className="ic tabular" style={{ fontFamily: "var(--display)", fontSize: 24 }}>{i + 1}</span>
                <span><b>{t}</b><p>{s}</p></span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="blk">
        <div className="wrap">
          <div className="shead"><div><div className="eyebrow">Departures 2026–27</div><h2 style={{ marginTop: 8 }}>Umrah <span className="serif-it">packages</span></h2></div></div>
          <Collection items={packages} view="list" />
        </div>
      </section>
      {haramHotels.length > 0 && (
        <section className="blk">
          <div className="wrap">
            <div className="shead"><div><div className="eyebrow">Book hotels only</div><h2 style={{ marginTop: 8 }}>Hotels near the <span className="serif-it">Haram</span></h2></div></div>
            <Collection items={haramHotels} view="spot" />
          </div>
        </section>
      )}
      <section className="blk">
        <div className="wrap detail-grid" style={{ marginTop: 0 }}>
          <div className="panel glass">
            <h2>Umrah visa</h2>
            {visa ? (
              <>
                <p>{visa.processing} processing. Stay up to {visa.stayDays} days.{visa.price ? ` From PKR ${amount(visa.price)}.` : " Included with every Umrah package."}</p>
                <ul className="bullets">{visa.requirements.map((r) => <li key={r}><Icon name="spark" size={16} />{r}</li>)}</ul>
              </>
            ) : <p>We file the Umrah visa with every package.</p>}
            {tours.length > 0 && (
              <>
                <h2 style={{ marginTop: 24, fontSize: 26 }}>Ziyarat tours</h2>
                <ul className="bullets">{tours.map((t) => <li key={t.id}><Icon name="compass" size={16} /><a href={t.href}>{t.title}</a>, PKR {amount(t.price)} {t.unit}</li>)}</ul>
              </>
            )}
          </div>
          <div className="panel glass">
            <h2>Ask about Umrah</h2>
            <p>Tell us your city, month and how many people are going. We&apos;ll send dates and prices.</p>
            <EnquiryForm service="umrah" lockService cta="Get Umrah prices" />
          </div>
        </div>
      </section>
    </>
  );
}
