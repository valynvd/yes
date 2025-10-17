(function (root, factory) {
  if (typeof define == "function" && define.amd) define([], factory);
  else if (typeof module === "object" && module.exports)
      module.exports = factory();
  else root.adInventory = factory();
})(this, function () {

  var doc = parent.document || document;
  var kly = parent.kly || parent.kmklabs || {};
  var site = (kly.site || "").toLowerCase();
  var platform = (kly.platform || "").toLowerCase();

  var newstagElement = {
    kapanlagi: {
      targetSelector: ".header25-trending__list",
      itemSelector: "a.header25-trending__item",
      titleSelector: ".header25-trending__item__title"
    },
    liputan6: {
      targetSelector: ".trending--list",
      itemSelector: ".trending--list__item",
      titleSelector: ".trending__item__title"
    },
  }
 
  function init(format, config) {
    config = config || {};
    var format = (format || "").toLowerCase();

    switch (format) {
      case "newstag":
        if (newstagElement[site]) {
          Newstag(config, newstagElement[site]);
        } else {
          console.warn("[Newstag] Unsupported site:", site);
        }
        break;
      case "skinad":
        SkinAd_Inject(config);
        break;
    }
  }

  function Newstag(config, elements) {
    try {
      var textTag = config.textTag || "Newstag";
      var landingPage = config.landingPage || "#";
      var position = Number.isInteger(config.position) ? config.position : 0;
      var count = 0;

      const interval = setInterval(function () {
        var target = doc.querySelector(elements.targetSelector);
        if (!target) {
          if (++count > 100) clearInterval(interval);
          return;
        }

        if (target.querySelector(".tag-ads")) {
          clearInterval(interval);
          return;
        }

        var tagItem = target.querySelectorAll(elements.itemSelector)[position];
        if (!tagItem) return;

        var tag = target.childNodes[position];
        tag = tag.cloneNode(true);
        tag.classList.add("tag-ads");
        tag.setAttribute("href", landingPage);
        tag.setAttribute("target", "_blank");
        tag.querySelector(elements.titleSelector).textContent = textTag;

        tagItem.insertAdjacentElement("beforebegin", tag);
        clearInterval(interval);
        
      },100)
    } catch (e) {
      console.warn("[Newstag] Error:", e)
    }
  }

  function SkinAd_Inject(config) {
    try {
      if (platform !== "" && platform !== "desktop") return ;

      var leftImg = config.leftImage || "";
      var rightImg = config.rightImage || "";
      var clickUrl = config.clickUrl || config.landingPage || "#";
      var imgWidth = config.imageWidth || 300;

      if (!leftImg && !rightImg) return;

      var style = doc.createElement("style");
      style.innerHTML = `
        .skinad-side {
        position: fixed;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        z-index: 9999;
      }
      .skinad-side img {
        max-width: ${imgWidth}px;
        display: block;
        height: 100%;
        object-fit: cover;
      }
      `; 
      doc.head.appendChild(style);

      var pageWidth = doc.documentElement.clientWidth;
      var contentWidth = doc.querySelector(".container")?.clientWidth || 1000;
      var sideOffset = (pageWidth - contentWidth) / 2;

      if (leftImg) {
        var left = doc.createElement("a");
        left.href = clickUrl;
        left.target = "_blank";
        left.className = "skinad-side";
        left.style.left = sideOffset - imgWidth + "px";
        left.innerHTML = `<img src="${leftImg}">`;
        doc.body.appendChild(left)
      }
      if (rightImg) {
        var right = doc.createElement("a");
        right.href = clickUrl;
        right.target = "_blank";
        right.className = "skinad-side";
        right.style.right = sideOffset - imgWidth + "px";
        right.innerHTML = `<img src="${rightImg}">`;
        doc.body.appendChild(right);
      }
    } catch (e) {
      console.warn("[SkinAd ERROR]:", e);
    }
  }

  return { init };
});
