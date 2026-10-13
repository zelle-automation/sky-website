"use client";

import { useState } from "react";

export default function Newsletter() {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <>
      <form
        className="nf"
        onSubmit={async (e) => {
          e.preventDefault();
          const email = new FormData(e.currentTarget).get("email");
          setBusy(true);
          const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
          setBusy(false);
          if (res?.ok) { setNote("Thanks. You'll get the next fare list in your inbox."); e.currentTarget?.reset(); }
          else setNote((await res?.json().catch(() => null))?.error ?? "That didn't go through. Please try again.");
        }}
      >
        <input id="nf-email" name="email" type="email" placeholder="Your email address" aria-label="Email address" required />
        <button className="btn btn-gold" type="submit" disabled={busy}>{busy ? "Subscribing…" : "Subscribe"}</button>
      </form>
      <div className="ok" aria-live="polite">{note}</div>
    </>
  );
}
