"use client";

import { MoonStars, SunDim } from "@phosphor-icons/react/dist/ssr";
import { useTheme } from "@/hooks/use-theme";

/** Cambia entre tema claro y oscuro. Es la única pieza de la cabecera que necesita JavaScript. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface text-ink transition duration-200 hover:bg-surface-2 active:scale-[0.98]"
    >
      {isDark ? <SunDim aria-hidden="true" focusable="false" size={22} /> : <MoonStars aria-hidden="true" focusable="false" size={22} />}
    </button>
  );
}
