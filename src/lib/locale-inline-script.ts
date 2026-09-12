/** localStorage key for the user's explicit locale choice. */
export const PREFERRED_LOCALE_KEY = "preferred_locale";

/**
 * Blocking inline script: runs during document parse so visitors are routed to
 * the matching locale before paint. A stored `preferred_locale` always wins,
 * so manual language switches are never overridden by auto-detection.
 *
 * Detection: Arabic (`ar*`) → `/ar`, everything else → `/en`.
 */
export const LOCALE_REDIRECT_SCRIPT = `(function(){try{var k=${JSON.stringify(
  PREFERRED_LOCALE_KEY,
)},s=localStorage.getItem(k),t=(s==="ar"||s==="en")?s:null;if(!t){var l=(navigator.language||(navigator.languages&&navigator.languages[0])||"en").toLowerCase();t=l.indexOf("ar")===0?"ar":"en";}var p=location.pathname,c=null;if(p==="/ar"||p.indexOf("/ar/")===0){c="ar";}else if(p==="/en"||p.indexOf("/en/")===0){c="en";}if(c!==t){var r=c?p.substring(("/"+c).length):p;if(r===""){r="/";}var u="/"+t+(r==="/"?"":r)+location.search+location.hash;location.replace(u);}}catch(a){}})();`;
