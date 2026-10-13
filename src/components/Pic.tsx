import type { CSSProperties, ReactNode } from "react";
import type { Pic as PicT } from "@/lib/catalog";

/** A background picture that shows the daytime image in the light theme and the evening one in dark. */
export function picStyle(p: PicT, extra?: CSSProperties): CSSProperties {
  return { ["--img-d" as string]: `url("${p.day}")`, ["--img-n" as string]: `url("${p.night}")`, ...extra };
}

export function Pic({
  pic, className = "", children, label, ...rest
}: { pic: PicT; className?: string; children?: ReactNode; label?: string } & Omit<React.HTMLAttributes<HTMLDivElement>, "className">) {
  return (
    <div className={`pic ${className}`} style={picStyle(pic)} role={label ? "img" : undefined} aria-label={label} {...rest}>
      {children}
    </div>
  );
}
