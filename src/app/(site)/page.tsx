import Link from "next/link";
import { excursionCards, hotelCards, listDestinations, listVisas, packageCards } from "@/lib/catalog";
import { amount } from "@/lib/format";
import { Icon } from "@/components/Icon";
import { picStyle } from "@/components/Pic";
import SearchWidget from "@/components/SearchWidget";
import DestinationRail from "@/components/DestinationRail";
import HomeCollections from "@/components/HomeCollections";
import Newsletter from "@/components/Newsletter";
import { ServiceGrid, WhyStrip } from "@/components/Services";
import { getSite, offerLive } from "@/lib/site";

export const dynamic = "force-dynamic";

const STORIES = [
  { q: "Our Umrah was seamless. The hotel was a few minutes from the Haram and the transfers were always on time.", n: "Ayesha K.", s: "Umrah · Lahore", c: "#E6CB93", i: "AK" },
  { q: "They sorted the Azerbaijan e-visa, flights and a Gabala day trip in one call. Baku was beautiful.", n: "Saad R.", s: "Baku · Karachi", c: "#9DB8FF", i: "SR" },
  { q: "Hunza with the kids felt easy. The driver knew every viewpoint and the hotel upgrade was a lovely surprise.", n: "Maria H.", s: "Hunza · Islamabad", c: "#F2C59A", i: "MH" },
];

export default async function Home() {
  const [destinations, hotels, excursions, packages, deals, visas, site] = await Promise.all([
    listDestinations(), hotelCards(), excursionCards(), packageCards(), packageCards({ deals: true }), listVisas(), getSite(),
  ]);
  const { hero, offer, sections } = site.homepage;
  const on = (k: string) => sections.find((x) => x.key === k)?.enabled ?? true;
  const order = (k: string) => { const i = sections.findIndex((x) => x.key === k); return i < 0 ? 99 : i; };
  // Offer price: the cheapest live package behind the offer link (e.g. /umrah → Umrah packages).
  const offerCat = offer.link.replace(/^\//, "").split(/[/?#]/)[0];
  const offerFrom = packages.filter((p) => p.category === offerCat || p.href === offer.link).sort((a, b) => (a.price ?? 1e12) - (b.price ?? 1e12))[0];
  // "Every journey, exceptional." → the part after the last comma is set in gold italics.
  const cut = hero.headline.lastIndexOf(", ");
  const [h1a, h1b] = cut > 0 ? [hero.headline.slice(0, cut + 1), hero.headline.slice(cut + 2)] : [hero.headline, ""];
  const tabs = hero.search_tabs ?? {};
  const heroBg = {
    "--hero-day": `url(${hero.image_day_url || "/brand/hero-terrace.jpg"})`,
    "--hero-night": `url(${hero.image_night_url || hero.image_day_url || "/brand/hero-terrace.jpg"})`,
  } as React.CSSProperties;

  return (
    <>
      <section className="hero on-photo">
        <div className="hero-bg" role="img" aria-label="Holiday destination photo" style={heroBg} />
        <div className="wrap hero-grid">
          <div>
            {hero.eyebrow && <div className="eyebrow">{hero.eyebrow}</div>}
            <h1 style={{ marginTop: 16 }}>{h1a} {h1b && <em>{h1b}</em>}</h1>
            {hero.sub && <p className="lede">{hero.sub}</p>}
            <div className="ctas">
              {hero.cta_label && <Link className="btn btn-gold" href={hero.cta_link || "/destinations"}>{hero.cta_label} <Icon name="arrow" /></Link>}
              {hero.cta2_label && <Link className="btn btn-ghost" href={hero.cta2_link || "/packages"}>{hero.cta2_label}</Link>}
            </div>
            <div className="trust">
              <div className="faces">{STORIES.map((s) => <i key={s.i} style={{ background: s.c }}>{s.i}</i>)}</div>
              <span><span className="stars">★★★★★</span> 4.9 from travellers who booked with us</span>
            </div>
          </div>
          {offerLive(offer) && (
            <Link className="offer glass" href={offer.link || "/contact"}>
              <div className="eyebrow"><Icon name="spark" size={14} />{offer.badge}</div>
              <h3>{offer.title.replace(/\s+\S+$/, "")} <span className="serif-it">{offer.title.match(/\S+$/)?.[0]}</span></h3>
              {offer.text && <p>{offer.text}</p>}
              {offerFrom?.price != null && <div className="price"><span>from<br /><span style={{ color: "var(--muted)" }}>per person</span></span><b className="tabular">PKR {amount(offerFrom.price)}</b></div>}
            </Link>
          )}
        </div>
        <div className="wrap">
          <SearchWidget
            destinations={destinations.map((d) => ({ slug: d.slug, name: d.name }))}
            visaCountries={[...new Set(visas.map((v) => v.country))]}
            initialTab={hero.search_default === "transfers" || tabs[hero.search_default] === false ? "hotels" : hero.search_default}
            hidden={Object.entries(tabs).filter(([, v]) => v === false).map(([k]) => k)}
          />
        </div>
      </section>

      <div className="home-flow">
      {on("destinations") && <section className="blk" style={{ order: order("destinations") }}>
        <div className="wrap">
          <div className="shead">
            <div><div className="eyebrow">Where to next</div><h2 style={{ marginTop: 8 }}>Popular <span className="serif-it">destinations</span></h2></div>
            <Link className="link-more" href="/destinations">View all destinations <Icon name="arrow" /></Link>
          </div>
          <DestinationRail items={destinations} />
        </div>
      </section>}

      {(on("hotels") || on("excursions")) && <section className="blk" id="collections" style={{ order: Math.min(order("hotels"), order("excursions")) }}>
        <div className="wrap">
          <HomeCollections data={{ hotels, excursions, packages }} />
        </div>
      </section>}

      {on("deals") && deals.length > 0 && <section className="blk" style={{ order: order("deals") }}>
        <div className="wrap">
          <div className="deals">
            <div className="dhero glass">
              <div>
                <div className="eyebrow">Limited seats</div>
                <h3 style={{ marginTop: 10 }}>This week&apos;s <span className="serif-it">best fares</span></h3>
                <p>Group fares we&apos;ve secured with airlines and hotels. Prices hold until seats sell out.</p>
              </div>
              <Link className="btn btn-gold" href="/packages">See all deals <Icon name="arrow" /></Link>
            </div>
            {deals.slice(0, 3).map((d) => (
              <article className="deal glass" key={d.id}>
                <div className="ph on-photo pic" style={picStyle(d.pic)}><span className="chip">{d.badge}</span></div>
                <div className="bd">
                  <b>{d.title}</b><small>{d.location}</small>
                  <div className="pp">{d.priceWas != null && <s className="tabular">PKR {amount(d.priceWas)}</s>}<strong className="tabular">PKR {amount(d.price)}</strong></div>
                  <Link href={d.href}>View details <Icon name="arrow" size={14} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>}

      {on("services") && <section className="blk" id="services" style={{ order: order("services") }}>
        <div className="wrap">
          <div className="shead">
            <div>
              <div className="eyebrow">One desk, every detail</div>
              <h2 style={{ marginTop: 8 }}>What we <span className="serif-it">arrange</span> for you</h2>
              <p>Book one piece or hand us the whole trip. Every booking comes with a named travel advisor.</p>
            </div>
          </div>
          <ServiceGrid />
          <WhyStrip />
        </div>
      </section>}

      {(on("stories") || on("newsletter")) && <section className="blk" style={{ order: Math.min(order("stories"), order("newsletter")) }}>
        <div className="wrap">
          {on("stories") && <div className="shead"><div><div className="eyebrow">Traveller stories</div><h2 style={{ marginTop: 8 }}>What our <span className="serif-it">travellers</span> say</h2></div></div>}
          <div className={on("stories") && on("newsletter") ? "tn" : undefined}>
            {on("stories") && <div className="tq">
              {STORIES.map((s) => (
                <figure className="t glass" style={{ margin: 0 }} key={s.n}>
                  <span className="stars">★★★★★</span>
                  <q>{s.q}</q>
                  <figcaption className="who"><i style={{ background: s.c }}>{s.i}</i><span><b>{s.n}</b><small>{s.s}</small></span></figcaption>
                </figure>
              ))}
            </div>}
            {on("newsletter") && <div className="news glass">
              <div className="eyebrow">Insider fares</div>
              <h3 style={{ margin: "10px 0 8px" }}>Get offers before they <span className="serif-it">go public</span></h3>
              <p>One email a fortnight with group fares, Umrah dates and visa updates.</p>
              <Newsletter />
            </div>}
          </div>
        </div>
      </section>}
      </div>
    </>
  );
}
