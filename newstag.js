(function (root, factory) {
  if (typeof define == "function" && define.amd) define([], factory);
  else if (typeof module === "object" && module.exports)
      module.exports = factory();
  else root.Newstag = factory();
})(this, function () {

  var doc = parent.document || document;
  var kly = parent.kly || parent.kmklabs || {};
  var site = (kly.site || "").toLowerCase();
  var platform = (kly.platform || "").toLowerCase();

  function init(format, config) {
    config = config || {};
    var format = (format || "").toLowerCase();

    switch (format) {
      case "newstag":
        if (site === "kapanlagi") {
          newstagKapanlagi(config)
        }
        break;
      case "skinad":
        SkinAd(config);
        break;
    }
  }

  function newstagKapanlagi(config) {
    try {
      var textTag = config.textTag || "Newstag";
      var landingPage = config.landingPage || "#";
      var position = Number.isInteger(config.position) ? config.position : 0;
      var targetSelector = config.targetSelector || ".header25-trending__list";
      var count = 0;

      const interval = setInterval(function () {
        var target = doc.querySelector(targetSelector);
        if (!target) {
          if (++count > 1000) clearInterval(interval);
          return;
        }

        var tag = target.childNodes[position];
        tag = tag.cloneNode(true);
        tag.classList.add("tag-ads");
        tag.setAttribute("href", landingPage);
        tag.setAttribute("target", "_blank");
        tag.querySelector(".header25-trending__item__title").textContent = textTag;

        var tagItem = target.querySelectorAll("a.header25-trending__item")[position];
        if (tagItem) {
          tagItem.insertAdjacentElement("beforebegin", tag);
          clearInterval(interval);
        }
      },100)
    } catch (e) {
      console.warn("[Newstag] Error:", e)
    }
  }
  return { init };
});
