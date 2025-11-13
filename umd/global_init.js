import { Newstag } from "./modules/Newstag.js";
import { SkinAd } from "./modules/SkinAd.js";

const doc = (typeof parent !== "undefined" && parent.document) ? parent.document : document;
const kly = (typeof parent !== "undefined" && (parent.kly || parent.kmklabs)) || {};
let site = (kly.site || "").toLowerCase();
if (site === "bola.com") site = "bolacom";
const platform = (kly.platform || "").toLowerCase();

function init(format, config) {
  config = config || {};
  format = (format || "").toLowerCase();
  switch (format) {
    case "newstag":
      Newstag(config, site, platform, doc);
      break;
    case "skinad":
      SkinAd(config, platform, doc);
      break;
    default:
      console.warn("Unknown format:", format);
  }
}

(function autoInit() {
  try {
    const currentScript =
      document.currentScript ||
      document.querySelector('script[src*="ad_Inventory"]') ||
      (function () {
        const scripts = document.getElementsByTagName("script");
        return scripts[scripts.length - 1];
      })();

    if (!currentScript || !currentScript.src) return;

    const src = new URL(currentScript.src, document.location.href);
    const creative = src.searchParams.get("creative");

    if (creative) {
      console.log(`[adInventory] Auto init creative: ${creative}`);
      init(creative);
    }
  } catch (e) {
    console.warn("[adInventory] Failed to auto init creative:", e);
  }
})();

export { init };
