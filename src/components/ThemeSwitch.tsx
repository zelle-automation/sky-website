"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

type Theme = "system" | "light" | "dark";
const KEY = "sky-theme";

/** Runs before paint (from layout.tsx) so a pinned theme never flashes the other one. */
export const themeInitScript = `try{var t=localStorage.getItem("${KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
  try {
    if (theme === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, theme);
  } catch {}
}

const OPTIONS: { value: Theme; label: string; icon: "monitor" | "sun" | "moon" }[] = [
  { value: "system", label: "Use device theme", icon: "monitor" },
  { value: "light", label: "Light theme", icon: "sun" },
  { value: "dark", label: "Dark theme", icon: "moon" },
];

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    // Reading the theme pinned before hydration; this is the one place it can be known.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (t === "light" || t === "dark") setTheme(t);
  }, []);

  return (
    <span className="theme-sw" role="group" aria-label="Theme">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-label={o.label}
          title={o.label}
          aria-pressed={theme === o.value}
          onClick={() => { setTheme(o.value); apply(o.value); }}
        >
          <Icon name={o.icon} />
        </button>
      ))}
    </span>
  );
}
