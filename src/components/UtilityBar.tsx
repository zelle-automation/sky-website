import { Icon } from "./Icon";
import ThemeSwitch from "./ThemeSwitch";
import { getSite, telHref } from "@/lib/site";

export default async function UtilityBar() {
  const { business: b } = await getSite();
  return (
    <div className="util">
      <div className="wrap">
        <div className="grp">
          <span><Icon name="phone" /><a className="tabular" href={telHref(b.phone)}>{b.phone}</a></span>
          <span><Icon name="mail" /><a href={`mailto:${b.email}`}>{b.email}</a></span>
        </div>
        <div className="grp">
          <span className="hide-sm"><Icon name="shield" />Secure booking</span>
          <span className="hide-sm"><Icon name="headset" />24/7 travel desk</span>
          <ThemeSwitch />
          <span>PKR</span>
        </div>
      </div>
    </div>
  );
}
