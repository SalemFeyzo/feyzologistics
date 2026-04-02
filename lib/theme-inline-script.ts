/** Key must match `THEME_STORAGE_KEY` in `@/components/theme-provider`. */
export const THEME_STORAGE_KEY = "theme";

/**
 * Blocking inline script: runs as the document parses so `html.dark` matches
 * localStorage / system preference before paint (no dependency on `next-themes`).
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)},d=document.documentElement,s=localStorage.getItem(k)||"system",r=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",e=s==="system"?r:s;if(e==="dark"){d.classList.add("dark");d.style.colorScheme="dark";}else{d.classList.remove("dark");d.style.colorScheme="light";}}catch(a){}})();`;
