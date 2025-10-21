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
    fimela: {
      mode: "replace",
      desktop: {
        targetSelector: ".tags--box",
        itemSelector: ".tags--box--item",
        titleSelector: ".tags--box--item__name",
        linkSelector: ".tags--box--item__link"
      },
      mobile: {
        targetSelector: ".selected-tags-homepage__list",
        itemSelector: ".selected-tags-homepage--item",
        titleSelector: ".selected-tags-homepage--item__link",
        linkSelector: ".selected-tags-homepage--item__link"
      }
    },
    bolanet: {
      mode: "swiper",
      desktop: {
        targetSelector: ".box-tag-swiper .swiper-wrapper",
        itemSelector: ".swiper-slide",
        linkSelector: "a"
      },
      mobile: {
        targetSelector: ".box-tag-swiper",
        itemSelector: ".box-overflow-x-item",
        linkSelector: "a"
      }
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

      var platformCheck = elements.mode ? ((platform === "mobile") ? elements.mobile : elements.desktop) : elements;

      const interval = setInterval(function () {
        // SWIPER
        if (elements.mode === "swiper") {
          var gam_wrapper = doc.querySelector(platformCheck.targetSelector);
          if (!gam_wrapper) return (count++ > 100 && clearInterval(interval));

          var refItem = gam_wrapper.children[position];
          if (!refItem) return;

          var newItem = doc.createElement("div");
          newItem.className = platformCheck.itemSelector.replace(".", "");
          newItem.innerHTML = `
            <a href="${landingPage}" title="${textTag}" target="_blank">${textTag}</a>
          `;

          gam_wrapper.insertBefore(newItem, refItem);

          setTimeout(() => {
            gam_wrapper.closest(".swiper-container")?.swiper?.update();
          }, 100);
          clearInterval(interval);
          return;
        };

        // REPLACE
        if (elements.mode === "replace") {
          var target = doc.querySelector(platformCheck.targetSelector);
          if (!target) return (count++ > 100 && clearInterval(interval));

          var tagItem = target.querySelectorAll(platformCheck.itemSelector)[position];
          if (!tagItem) return;

          var link = tagItem.querySelector(platformCheck.linkSelector || "a");
          if (link) {
            link.textContent = textTag;
            link.setAttribute("href", landingPage);
            link.setAttribute("target", "_blank");
          }
          tagItem.classList.add("tag-ads");
          clearInterval(interval);
          return;
        }

        // CLONE
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

        var tag = tagItem.cloneNode(true);
        tag.classList.add("tag-ads");

        var title = tag.querySelector(elements.titleSelector);
        if (title) title.textContent = textTag;

        var link = tag.querySelector(elements.linkSelector || "a");
        if (link) {
          link.setAttribute("href", landingPage);
          link.setAttribute("target", "_blank");
        }

        tagItem.insertAdjacentElement("beforebegin", tag);
        clearInterval(interval);

      }, 100)
    } catch (e) {
      console.warn("[Newstag] Error:", e)
    }
  }

  function SkinAd_Inject(config) {
    try {
      if (platform !== "" && platform !== "desktop") return;

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
