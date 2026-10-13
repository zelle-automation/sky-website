import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Sky Holidays home">
      <Image src="/brand/icon.png" alt="" width={44} height={44} priority />
      <span className="wm">
        <b><span>SKY</span> HOLIDAYS</b>
        <small>EXPERIENCE THE EXCEPTIONAL</small>
      </span>
    </Link>
  );
}
