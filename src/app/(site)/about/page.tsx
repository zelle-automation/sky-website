import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { ServiceGrid, WhyStrip } from "@/components/Services";

export const metadata: Metadata = { title: "About us", description: "Sky Holidays is a Pakistani travel company for flights, hotels, tours, visas and Umrah." };

export default function AboutPage() {
  return (
    <>
      <PageHead
        crumbs={[["About us"]]}
        eyebrow="About Sky Holidays"
        title={<>Experience the <span className="serif-it">exceptional</span></>}
        sub="Sky Holidays plans journeys for travellers from Pakistan: Umrah, family holidays, honeymoons and trips to the northern areas. One team handles your flights, hotels, visas and transfers, and stays with you until you're home."
      />
      <section className="blk" style={{ paddingTop: 30 }}>
        <div className="wrap">
          <ServiceGrid />
          <WhyStrip />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 26 }}>
            <Link className="btn btn-gold" href="/contact">Talk to an advisor <Icon name="arrow" /></Link>
            <Link className="btn btn-ghost" href="/destinations">Explore destinations</Link>
          </div>
        </div>
      </section>
    </>
  );
}
