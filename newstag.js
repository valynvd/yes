(function (root, factory) {
  if (typeof define == "function" && define.amd) define([], factory);
  else if (typeof module === "object" && module.exports)
    module.exports = factory();
  else root.Newstag = factory();
})(this, function () {

  var site, platform, pageType;

  function initNewstag(target, textTag, landingPage, position, klyObj) {
    site = klyObj.site.toLowerCase();
    platform = klyObj.site.toLowerCase();
    pageType = klyObj.site.toLowerCase();

    console.log(target, site, platform);

    switch (site) {
      case "kapanlagi":
        return newstagKapanlagi(target, textTag, landingPage, position);
        break;
    }
  }

  function newstagKapanlagi(textTag, landingPage, position) {
    if (platform == "desktop") {
      var tag = target.childNodes[position];

      tag = tag.cloneNode(true);
      tag.querySelector(".header25-trending__item__title").textContent = textTag;
      tag.setAttribute("href", landingPage);
      tag.setAttribute("target", "_blank");
      tag.classList.add("tag-ads");

      return tag;
    } else {
      var tag = document.childNodes[position];

      tag = tag.cloneNode(true);
      tag.classList.add("tag-ads");
      tag.querySelector(".header25-trending__item__title").textContent = textTag;
      tag.setAttribute("href", landingPage);
      tag.setAttribute("target", "_blank");

      return tag;
    }
  }
  return { initNewstag };
});
