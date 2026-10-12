import type { Theme } from "./types";

export const THEME_STORAGE_KEY = "cr:theme";

/** Lee la preferencia guardada. Cualquier otro valor cuenta como "sin preferencia". */
export function parseTheme(value: unknown): Theme | null {
  return value === "light" || value === "dark" ? value : null;
}

/** Se inserta en <head> para fijar data-theme antes de pintar y evitar un parpadeo. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;
