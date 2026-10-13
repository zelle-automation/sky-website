"use client";

import { useState } from "react";

type Service = "hotels" | "excursions" | "packages" | "umrah" | "visa" | "flights" | "cars" | "transfers" | "general";
const SERVICES: [Service, string][] = [
  ["general", "General question"], ["packages", "Holiday package"], ["umrah", "Umrah"], ["hotels", "Hotel booking"],
  ["excursions", "Excursion or tour"], ["visa", "Visa assistance"], ["flights", "Flight reservation"],
  ["transfers", "Airport transfer"], ["cars", "Car rental"],
];

/** Booking request / question form. Saves to travel.enquiries through /api/enquiries. */
export default function EnquiryForm({
  service = "general", refType, refId, subject, message = "", lockService = false, cta = "Send request",
}: {
  service?: Service; refType?: "hotel" | "excursion" | "package" | "destination" | "visa"; refId?: string;
  subject?: string; message?: string; lockService?: boolean; cta?: string;
}) {
  const [state, setState] = useState<{ kind: "idle" | "busy" | "ok" | "err"; text: string }>({ kind: "idle", text: "" });
  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const f = Object.fromEntries(new FormData(form)) as Record<string, string>;
        setState({ kind: "busy", text: "" });
        const body = {
          service: (f.service || service) as Service, refType, refId, name: f.name, phone: f.phone, email: f.email,
          travelDate: f.travelDate, travellers: f.travellers ? Number(f.travellers) : undefined,
          message: [subject ? `Re: ${subject}` : "", f.message].filter(Boolean).join("\n"),
        };
        const res = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
        if (res?.ok) {
          form.reset();
          setState({ kind: "ok", text: "Thank you. A Sky Holidays advisor will call or WhatsApp you shortly." });
        } else {
          const err = (await res?.json().catch(() => null))?.error;
          setState({ kind: "err", text: err ?? "That didn't go through. Please call +92 311 11 33 020." });
        }
      }}
    >
      {!lockService && (
        <div className="field">
          <label htmlFor="enq-service">What can we help with?</label>
          <select id="enq-service" name="service" defaultValue={service}>
            {SERVICES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      )}
      <div className="row2">
        <div className="field"><label htmlFor="enq-name">Full name</label><input id="enq-name" name="name" required minLength={2} autoComplete="name" /></div>
        <div className="field"><label htmlFor="enq-phone">Phone or WhatsApp</label><input id="enq-phone" name="phone" required minLength={7} inputMode="tel" autoComplete="tel" placeholder="+92 3xx xxxxxxx" /></div>
      </div>
      <div className="row2">
        <div className="field"><label htmlFor="enq-email">Email (optional)</label><input id="enq-email" name="email" type="email" autoComplete="email" /></div>
        <div className="field"><label htmlFor="enq-date">Travel date</label><input id="enq-date" name="travelDate" type="date" /></div>
      </div>
      <div className="field"><label htmlFor="enq-travellers">Travellers</label><input id="enq-travellers" name="travellers" type="number" min={1} max={50} defaultValue={2} /></div>
      <div className="field"><label htmlFor="enq-message">Anything we should know?</label><textarea id="enq-message" name="message" defaultValue={message} /></div>
      <button className="btn btn-gold" type="submit" disabled={state.kind === "busy"} style={{ justifySelf: "start" }}>
        {state.kind === "busy" ? "Sending…" : cta}
      </button>
      <div className={`note ${state.kind === "ok" ? "ok" : state.kind === "err" ? "err" : ""}`} aria-live="polite">{state.text}</div>
    </form>
  );
}
