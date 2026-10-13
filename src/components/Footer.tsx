import Link from "next/link";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { getSite, telHref, waHref } from "@/lib/site";

export default async function Footer() {
  const { business: b } = await getSite();
  return (
    <footer id="footer">
      <div className="wrap">
        <div className="fgrid">
          <div className="about">
            <Logo />
            <p style={{ marginTop: 14 }}>Flights, hotels, tours, visas and Umrah from one travel desk. Planned carefully, looked after personally.</p>
            <div className="soc">
              {b.social.facebook && <a href={b.social.facebook} aria-label="Facebook" rel="noopener"><Icon name="fb" /></a>}
              {b.social.instagram && <a href={b.social.instagram} aria-label="Instagram" rel="noopener"><Icon name="ig" /></a>}
              {b.whatsapp && <a href={waHref(b.whatsapp)} aria-label="WhatsApp" rel="noopener"><Icon name="chat" /></a>}
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/packages">Deals</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link href="/contact?service=flights">Flight reservations</Link></li>
              <li><Link href="/hotels">Hotel accommodation</Link></li>
              <li><Link href="/umrah">Umrah services</Link></li>
              <li><Link href="/visa">Visa assistance</Link></li>
              <li><Link href="/contact?service=cars">Car rental</Link></li>
            </ul>
          </div>
          <div>
            <h4>Top destinations</h4>
            <ul>
              <li><Link href="/destinations/dubai">Dubai</Link></li>
              <li><Link href="/destinations/istanbul">Istanbul</Link></li>
              <li><Link href="/destinations/baku">Baku</Link></li>
              <li><Link href="/destinations/hunza">Hunza</Link> &amp; <Link href="/destinations/skardu">Skardu</Link></li>
              <li><Link href="/destinations/makkah">Makkah</Link> &amp; <Link href="/destinations/madinah">Madinah</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><Icon name="phone" /><a className="tabular" href={telHref(b.phone)}>{b.phone}</a></li>
              <li><Icon name="mail" /><a href={`mailto:${b.email}`}>{b.email}</a></li>
              <li><Icon name="globe" />skyholidays.pk</li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span>© {new Date().getFullYear()} {b.company_name}. All rights reserved.</span>
          <div className="pay"><span>VISA</span><span>MASTERCARD</span><span>JAZZCASH</span><span>EASYPAISA</span><span>BANK TRANSFER</span></div>
        </div>
      </div>
    </footer>
  );
}
