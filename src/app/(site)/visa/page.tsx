import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { listVisas } from "@/lib/catalog";
import { amount } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Visa assistance", description: "Tourist and visit visas for Pakistani passport holders: UAE, Saudi Arabia, Azerbaijan, Türkiye, Malaysia and more." };

export default async function VisaPage() {
  const visas = await listVisas();
  return (
    <>
      <PageHead
        crumbs={[["Visa"]]}
        eyebrow="Visa assistance"
        title={<>Visas, <span className="serif-it">without the queues</span></>}
        sub="For Pakistani passport holders. We check your documents, file the application and follow it up until the visa is in your hands."
      />
      <section className="blk" style={{ paddingTop: 30 }}>
        <div className="wrap">
          <div className="visa-grid">
            {visas.map((v) => (
              <article className="visa glass" key={v.id} id={v.country}>
                <div className="top">
                  <span className="flag" aria-hidden="true">{v.flag}</span>
                  <span><b>{v.country}</b><br /><small>{v.type}{v.evisa ? " · e-visa" : ""}</small></span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {v.stayDays && <span className="chip">Up to {v.stayDays} days</span>}
                  <span className="chip">{v.entry === "multiple" ? "Multiple entry" : "Single entry"}</span>
                </div>
                <ul className="bullets" style={{ fontSize: 13.5 }}>
                  {v.requirements.map((r) => <li key={r}><Icon name="spark" size={14} />{r}</li>)}
                </ul>
                <div className="meta">
                  <span><small>Processing</small><br /><b style={{ fontSize: 14 }}>{v.processing}</b></span>
                  <span style={{ textAlign: "right" }}>
                    <small>Service from</small><br />
                    <strong className="tabular">{v.price ? `PKR ${amount(v.price)}` : "Included"}</strong>
                  </span>
                </div>
              </article>
            ))}
          </div>
          <p style={{ color: "var(--dim)", fontSize: 13, marginTop: 14 }}>Fees and requirements change often. We confirm the latest rules before you apply.</p>
        </div>
      </section>
      <section className="blk">
        <div className="wrap detail-grid" style={{ marginTop: 0 }}>
          <div className="panel glass">
            <h2>How it works</h2>
            <ul className="bullets">
              <li><Icon name="chat" size={16} />Tell us where you&apos;re going and when.</li>
              <li><Icon name="passport" size={16} />We send a checklist for your passport, photos and bank documents.</li>
              <li><Icon name="send" size={16} />We review everything and submit the application or book your appointment.</li>
              <li><Icon name="shield" size={16} />We track it and send the visa to you as soon as it&apos;s issued.</li>
            </ul>
          </div>
          <div className="panel glass">
            <h2>Start your visa</h2>
            <EnquiryForm service="visa" lockService cta="Start my application" />
          </div>
        </div>
      </section>
    </>
  );
}
