(function (root, factory) {
  if (typeof define == "function" && define.amd) define([], factory);
  else if (typeof module === "object" && module.exports)
    module.exports = factory();
  else root.Newstag = factory();
})(this, function () {

  function initNewstag(textTag, landingPage, position) {
    var site, platform, pageType;
    try {
    site = parent.kly ? parent.kly.site : parent.kmklabs.site;
    platform = parent.kly ? parent.kly.platform : parent.kmklabs.platform;
    pageType = parent.kly ? parent.kly.pageType : parent.kmklabs.pageType;
    } catch (e) {
      return;
    }
    console.log(site.toLowerCase(), platform, pageType);

    switch (site.toLowerCase()) {
      case "liputan6":
        newstagLiputan6();
        break;
      case "kapanlagi":
        newstagKapanlagi();
        break;
    }
  }

  function newstagLiputan6() {
    var doc = parent.document;
    if (platform === "Desktop") {
      var tag = doc.querySelector(
        "#phenomenon-tags .tag-snippet, .trending--list .trending--list__item"
      );
      var list = doc.querySelector(
        "#phenomenon-tags .asides--trending-tags, .trending--list"
      );
      tag = tag.cloneNode(true);
      tag.querySelector(
        ".tag-snippet__text, .trending__item__title"
      ).textContent = textTag;
      tag.querySelector(".tag-snippet__link, .trending__item").href =
        landingPage;
      tag.querySelector(".tag-snippet__link, .trending__item").target =
        "_blank";
      tag.classList.add("tag-ads");
      list.insertBefore(tag, list.childNodes[position]);
    } else {
      var list = doc.querySelector(".trending-tags__list, .trending--list");
      var tag = doc.querySelector(
        ".trending-tags__list .trending-tags__item, .trending--list .trending--list__item"
      );
      tag = tag.cloneNode(true);
      tag.classList.add("tag-ads");
      tag.querySelector(
        ".trending-tags__item-link, .trending__item__title"
      ).textContent = textTag;
      tag.querySelector(".trending-tags__item-link, .trending__item").href = landingPage;
      tag.querySelector(".trending-tags__item-link, .trending__item").target = "_blank";
      list.insertBefore(tag, list.childNodes[position]);
    }
  }

  function newstagKapanlagi() {
    const doc = parent.document;
    if (platform == "Desktop") {
      var tag = doc.querySelector(".header25-trending__item");
      var parentList = doc.querySelector(".header25-trending__list");

      tag = tag.cloneNode(true);
      tag.querySelector(".header25-trending__item__title").textContent = textTag;
      tag.setAttribute("href", landingPage);
      tag.setAttribute("target", "_blank");
      tag.classList.add("tag-ads");

      const ref = parentList.children[position];
      if (ref) ref.insertAdjacentElement("beforebegin", tag);
      else parentList.insertAdjacentElement("beforeend", tag);
    } else {
      var parentList = doc.querySelector(".header25-trending__list");
      var tag = doc.querySelector(".header25-trending__item");

      tag = tag.cloneNode(true);
      tag.classList.add("tag-ads");
      tag.querySelector(".header25-trending__item__title").textContent = textTag;
      tag.setAttribute("href", landingPage);
      tag.setAttribute("target", "_blank");

      const ref = parentList.children[position];
      if (ref) ref.insertAdjacentElement("beforebegin", tag);
      else parentList.insertAdjacentElement("beforeend", tag);
    }
  }
  return { initNewstag };
});
