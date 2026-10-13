import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { getSite, telHref, waHref } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Call, WhatsApp or email the Sky Holidays travel desk." };

const SERVICES = ["hotels", "excursions", "packages", "umrah", "visa", "flights", "cars", "transfers", "general"] as const;
type S = (typeof SERVICES)[number];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string; message?: string }> }) {
  const [sp, { business: b }] = await Promise.all([searchParams, getSite()]);
  const service = (SERVICES as readonly string[]).includes(sp.service ?? "") ? (sp.service as S) : "general";
  return (
    <>
      <PageHead
        crumbs={[["Contact"]]}
        eyebrow="Talk to a travel advisor"
        title={<>Let&apos;s plan your <span className="serif-it">next trip</span></>}
        sub="Send us a message and an advisor will call or WhatsApp you, usually within the hour during working days."
      />
      <section className="blk" style={{ paddingTop: 30 }}>
        <div className="wrap detail-grid" style={{ marginTop: 0 }}>
          <div className="panel glass">
            <h2>Send a request</h2>
            <EnquiryForm service={service} message={sp.message ?? ""} />
          </div>
          <div className="contact-cards">
            <a className="sv glass" href={telHref(b.phone)}><span className="ic"><Icon name="phone" /></span><span><b>Call us</b><p className="tabular">{b.phone}</p></span></a>
            <a className="sv glass" href={waHref(b.whatsapp || b.phone)}><span className="ic"><Icon name="chat" /></span><span><b>WhatsApp</b><p className="tabular">{b.whatsapp || b.phone}</p></span></a>
            <a className="sv glass" href={`mailto:${b.email}`}><span className="ic"><Icon name="mail" /></span><span><b>Email</b><p>{b.email}</p></span></a>
            <div className="sv glass"><span className="ic"><Icon name="clock" /></span><span><b>Travel desk hours</b><p>Monday to Saturday, 10 am to 8 pm PKT. Emergency line for travellers abroad 24/7.</p></span></div>
          </div>
        </div>
      </section>
    </>
  );
}
