(function (root, factory) {
  if (typeof define == "function" && define.amd) define([], factory);
  else if (typeof module === "object" && module.exports)
      module.exports = factory();
  else root.Newstag = factory();
})(this, function () {

  function init(format, config) {
    var kly = config.kly || parent.kly || {};
    var site = (kly.site || "").toLowerCase();
    var platform = (kly.platform || "").toLowerCase();

    switch (format) {
      case "newstag":
        if (site === "kapanlagi") {
          NewstagAd(config);
        }
        break;
    }
  }

  function NewstagAd(config) {
    var textTag = config.textTag || "Newstag";
    var landingPage = config.landingPage || "#";
    var position = Number.isInteger(config.position) ? config.position : 0;
    var targetSelector = config.targetSelector || ".header25-trending__list";
    var count = 0;

    const interval = setInterval(function () {
      try {
        var doc = parent.document;
        if (!doc) return;

        var target = doc.querySelector(targetSelector);
        if (!target) {
          if (++count > 1000) clearInterval(interval);
          return;
        }

        var tag = target.childNodes[position];
        if (!tag) return;

        tag = tag.cloneNode(true);
        tag.classList.add("tag-ads");
        tag.setAttribute("href", landingPage);
        tag.setAttribute("target", "_blank");

        var title = tag.querySelector(".header25-trending__item__title");
        if (title) title.textContent = textTag;

        var inject = target.querySelectorAll("a.header25-trending__item")[position];
        if (inject) {
          inject.insertAdjacentElement("beforebegin", tag);
          clearInterval(interval);
        }
      } catch (e) {
        clearInterval(interval);
      }
    }, 100);
  }

  return { init };
});
