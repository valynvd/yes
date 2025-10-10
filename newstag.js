(function (root, factory) {
  if (typeof define == "function" && define.amd) define([], factory);
  else if (typeof module === "object" && module.exports)
    module.exports = factory();
  else root.Newstag = factory();
})(this, function () {

  function initNewstag(textTag, landingPage, position) {
    var site = window.NewstagEnv.site;
    var platform = window.NewstagEnv.platform;
    var pageType = window.NewstagEnv.pageType;

    console.log(site.toLowerCase(), platform, pageType);

    switch (site.toLowerCase()) {
      case "kapanlagi":
        newstagKapanlagi(textTag, landingPage, position);
        break;
    }
  }

  function newstagKapanlagi(textTag, landingPage, position) {
    if (platform == "Desktop") {
      var tag = document.querySelector(".header25-trending__item");
      var parentList = document.querySelector(".header25-trending__list");

      tag = tag.cloneNode(true);
      tag.querySelector(".header25-trending__item__title").textContent = textTag;
      tag.setAttribute("href", landingPage);
      tag.setAttribute("target", "_blank");
      tag.classList.add("tag-ads");

      parentList.insertBefore(tag, parentList.children[position]);
    } else {
      var parentList = document.querySelector(".header25-trending__list");
      var tag = document.querySelector(".header25-trending__item");

      tag = tag.cloneNode(true);
      tag.classList.add("tag-ads");
      tag.querySelector(".header25-trending__item__title").textContent = textTag;
      tag.setAttribute("href", landingPage);
      tag.setAttribute("target", "_blank");

      parentList.insertBefore(tag, parentList.children[position]);
    }
  }
  return { initNewstag };
});
