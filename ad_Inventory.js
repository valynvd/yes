(function (root, factory) {
  if (typeof define == "function" && define.amd) define([], factory);
  else if (typeof module === "object" && module.exports)
    module.exports = factory();
  else root.adInventory = factory();
})(this, function () {
  var doc = parent.document || document;
  var kly = parent.kly || parent.kmklabs || {};
  var site = (kly.site || "").toLowerCase();
  if (site === "bola.com") site = "bolacom";
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
      desktop: {
        mode: "replace",
        targetSelector: ".tags--box",
        itemSelector: ".tags--box--item",
        titleSelector: ".tags--box--item__name",
        linkSelector: ".tags--box--item__link"
      },
      mobile: {
        mode: "replace",
        targetSelector: ".selected-tags-homepage__list",
        itemSelector: ".selected-tags-homepage--item",
        titleSelector: ".selected-tags-homepage--item__link",
        linkSelector: ".selected-tags-homepage--item__link"
      }
    },
    bola: {
      desktop: {
        mode: "swiper",
        targetSelector: ".box-tag-swiper .swiper-wrapper",
        itemSelector: ".swiper-slide",
        linkSelector: "a"
      },
      mobile: {
        mode: "clone",
        targetSelector: ".box-tag-swiper",
        itemSelector: ".box-overflow-x-item",
        linkSelector: "a"
      }
    },
    bolacom: {
      desktop: {
        mode: "clone",
        targetSelector: ".tags--box--list",
        itemSelector: ".tags--box--item",
        linkSelector: ".tags--box--item__link"
      },
    },
  };

  function init(format, config) {
    config = config || {};
    format = (format || "").toLowerCase();

    if (format === "newstag" && newstagElement[site]) {
      Newstag(config, newstagElement[site]);
    } else if (format === "skinad") {
      SkinAd_Inject(config);
    } else {
      console.warn("[adInventory] Unsupported site or format:", site, format);
    }
  }

  function Newstag(config, elements) {
    try {
      var textTag = config.textTag || "Newstag";
      var landingPage = config.landingPage || "#";
      var position = Number.isInteger(config.position) ? config.position : 0;
      var count = 0;

      var platformCheck = elements.mode
        ? elements
        : platform === "mobile"
          ? elements.mobile
          : elements.desktop;

      const interval = setInterval(() => {
        switch (platformCheck.mode) {
          case "swiper":
            handleSwiper(platformCheck, textTag, landingPage, position, interval);
            break;
          case "replace":
            handleReplace(platformCheck, textTag, landingPage, position, interval);
            break;
          case "clone":
          default:
            handleClone(platformCheck, textTag, landingPage, position, interval);
            break;
        }
        if (++count > 100) clearInterval(interval);
      }, 100);
    } catch (e) {
      console.warn("[Newstag Error]:", e);
    }
  }

  // SWIPER
  function handleSwiper(cfg, textTag, landingPage, position, interval) {
    var wrapper = doc.querySelector(cfg.targetSelector);
    if (!wrapper) return;

    if (wrapper.querySelector(".tag-ads")) return clearInterval(interval);

    var refItem = wrapper.children[position];
    if (!refItem) return;

    var newItem = doc.createElement("div");
    newItem.className = cfg.itemSelector.replace(".", "") + " tag-ads";
    newItem.innerHTML = `<a href="${landingPage}" title="${textTag}" target="_blank">${textTag}</a>`;
    wrapper.insertBefore(newItem, refItem);

    wrapper.closest(".swiper-container")?.swiper?.update();
    clearInterval(interval);
  }

  // REPLACE 
  function handleReplace(cfg, textTag, landingPage, position, interval) {
    var target = doc.querySelector(cfg.targetSelector);
    if (!target) return;

    var tagItem = target.querySelectorAll(cfg.itemSelector)[position];
    if (!tagItem) return;

    var link = tagItem.querySelector(cfg.linkSelector || "a");
    if (link) {
      link.textContent = textTag;
      link.href = landingPage;
      link.target = "_blank";
    }

    tagItem.classList.add("tag-ads");
    clearInterval(interval);
  }

  // CLONE 
  function handleClone(cfg, textTag, landingPage, position, interval) {
    if (site === "bolacom") {
      const wrap = doc.querySelector(".cycle-carousel-wrap");
      if (!wrap) return;
      if (wrap.querySelector(".tag-ads")) return clearInterval(interval);

      const items = [...wrap.querySelectorAll(".tags--box--item.cycle-slide")];
      if (!items.length) return;

      const active = wrap.querySelector(".cycle-slide-active");
      if (!active) return;

      const li = doc.createElement("li");
      li.className = "tags--box--item cycle-slide tag-ads";
      li.innerHTML = `
      <a href="${landingPage}" class="tags--box--item__link" title="${textTag}" target="_blank">
        <span class="tags--box--item__name">${textTag}</span>
        <i class="tags--box--item__topic-icon i-checklist"></i>
        <i class="tags--box--item__topic-icon-green i-checklist-green"></i>
      </a>`;

      const index = Math.min(items.indexOf(active) + position, items.length);
      wrap.insertBefore(li, items[index] || null);
      clearInterval(interval);
      return;
    }

    var target = doc.querySelector(cfg.targetSelector);
    if (!target) return;

    if (target.querySelector(".tag-ads")) return clearInterval(interval);

    var tagItem = target.querySelectorAll(cfg.itemSelector)[position];
    if (!tagItem) return;

    var newTag = tagItem.cloneNode(true);
    newTag.classList.add("tag-ads");

    var link = newTag.querySelector(cfg.linkSelector || "a");
    if (link) {
      link.textContent = textTag;
      link.href = landingPage;
      link.target = "_blank";
    }

    tagItem.insertAdjacentElement("beforebegin", newTag);
    clearInterval(interval);
  }

  // SKINAD
  function SkinAd_Inject(config) {
    try {
      if (platform && platform !== "desktop") return;

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
          height: 100%;
          object-fit: cover;
        }
      `;
      doc.head.appendChild(style);

      var pageWidth = doc.documentElement.clientWidth;
      var contentWidth = doc.querySelector(".container")?.clientWidth || 1000;
      var sideOffset = (pageWidth - contentWidth) / 2;

      if (leftImg) createSkinAd("left", leftImg, clickUrl, imgWidth, sideOffset);
      if (rightImg) createSkinAd("right", rightImg, clickUrl, imgWidth, sideOffset);
    } catch (e) {
      console.warn("[SkinAd ERROR]:", e);
    }
  }

  function createSkinAd(side, imgSrc, clickUrl, imgWidth, offset) {
    var el = doc.createElement("a");
    el.href = clickUrl;
    el.target = "_blank";
    el.className = "skinad-side";
    el.style[side] = offset - imgWidth + "px";
    el.innerHTML = `<img src="${imgSrc}">`;
    doc.body.appendChild(el);
  }

  return { init };
});
