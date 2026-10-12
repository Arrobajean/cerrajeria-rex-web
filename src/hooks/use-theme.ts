"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import type { Theme } from "@/lib/types";

const CHANGE_EVENT = "cr:theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/** Tema efectivo: el que fija data-theme o, si no hay preferencia, el del sistema. */
function readResolvedTheme(): Theme {
  const attribute = document.documentElement.getAttribute("data-theme");
  if (attribute === "light" || attribute === "dark") return attribute;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(DARK_QUERY);
  window.addEventListener(CHANGE_EVENT, onChange);
  query.addEventListener("change", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    query.removeEventListener("change", onChange);
  };
}

/** Estado del tema con useSyncExternalStore: sin efectos y sin parpadeo entre servidor y cliente. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readResolvedTheme, (): Theme => "light");

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento (modo privado o bloqueado) el tema dura lo que dura la página.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const toggle = useCallback(() => {
    setTheme(readResolvedTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggle };
}
