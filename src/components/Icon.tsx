import { ICON_SYMBOLS } from "./icon-symbols";

export type IconName =
  | "phone" | "mail" | "shield" | "headset" | "search" | "heart" | "user" | "plane" | "menu" | "arrow" | "left" | "right"
  | "spark" | "bed" | "suitcase" | "compass" | "moon" | "passport" | "car" | "list" | "panel" | "pin" | "cal" | "users"
  | "sun" | "clock" | "send" | "bookmark" | "home" | "map" | "ticket" | "tag" | "refresh" | "award" | "share" | "link"
  | "expand" | "dots" | "globe" | "swap" | "bus" | "mountain" | "fb" | "ig" | "chat" | "monitor";

export function Icon({ name, size, className = "i" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={className} style={size ? { width: size, height: size } : undefined} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** Rendered once in the root layout so every <Icon> can reference it. */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs dangerouslySetInnerHTML={{ __html: ICON_SYMBOLS }} />
    </svg>
  );
}
