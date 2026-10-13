import Link from "next/link";
import { PageHead } from "@/components/PageHead";

export default function NotFound() {
  return (
    <PageHead eyebrow="Page not found" title={<>This page has <span className="serif-it">flown away</span></>} sub="The link may be old or mistyped.">
      <div style={{ display: "flex", gap: 10, marginTop: 20, paddingBottom: 40 }}>
        <Link className="btn btn-gold" href="/">Back to home</Link>
        <Link className="btn btn-ghost" href="/destinations">Explore destinations</Link>
      </div>
    </PageHead>
  );
}
