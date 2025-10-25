(function (root, factory) {
  if (typeof define == "function" && define.amd) define([], factory);
  else if (typeof module === "object" && module.exports)
    module.exports = factory();
  else root.adInventory = factory();
})(this, function () {

  var doc = parent.document || document;
  var kly = parent.kly || parent.kmklabs || {};
  var site = (kly.site || "").toLowerCase();
  if(site === "bola.com") site = "bolacom";
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
    bolacom: {
      desktop: {
        targetSelector: ".cycle-carousel-wrap",
        itemSelector: ".tags--box--item",
        titleSelector: ".tags--box--item__name",
        linkSelector: ".tags--box--item__link"
      }
    },
    bola: {
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
  };

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
        SkinAd(config);
        break;
    }
  }

  function Newstag(config, elements) {
    try {
      const textTag = config.textTag || "Newstag";
      const landingPage = config.landingPage || "#";
      const position = Number.isInteger(config.position) ? config.position : 0;
      let count = 0;
      const platformCheck = elements.mode ? (platform === "mobile" ? elements.mobile : elements.desktop) : elements;

      const interval = setInterval(() => {
        const wrap = doc.querySelector(platformCheck.target);
        if (!wrap) return (++count > 100 && clearInterval(interval));

        if (site === "bolacom") {
          const items = [...wrap.querySelectorAll(".tags--box--item.cycle-slide")];
          if (!items.length || items.some(i => i.textContent.trim() === textTag)) return;
          const active = wrap.querySelector(".cycle-slide-active");
          if (!active) return;
          const li = doc.createElement("li");
          li.className = "tags--box--item cycle-slide tag-ads";
          li.innerHTML = `<a href="${landingPage}" class="tags--box--item__link" title="${textTag}" target="_blank"><span class="tags--box--item__name">${textTag}</span><i class="tags--box--item__topic-icon i-checklist"></i><i class="tags--box--item__topic-icon-green i-checklist-green"></i></a>`;
          wrap.insertBefore(li, items[Math.min(items.indexOf(active) + position, items.length)] || null);
          return clearInterval(interval);
        }

        if (elements.mode === "swiper") {
          if (wrap.querySelector(".tag-ads")) return clearInterval(interval);
          const ref = wrap.children[position];
          if (!ref) return;
          const div = doc.createElement("div");
          div.className = platformCheck.item.replace(".", "") + " tag-ads";
          div.innerHTML = `<a href="${landingPage}" title="${textTag}" target="_blank">${textTag}</a>`;
          wrap.insertBefore(div, ref);
          if (platform !== "mobile") wrap.closest(".swiper-container")?.swiper?.update();
          return clearInterval(interval);
        }

        if (elements.mode === "replace") {
          const tagItem = wrap.querySelectorAll(platformCheck.item)[position];
          if (!tagItem) return;
          const link = tagItem.querySelector(platformCheck.link || "a");
          if (link) { link.textContent = textTag; link.href = landingPage; link.target = "_blank"; }
          tagItem.classList.add("tag-ads");
          return clearInterval(interval);
        }

        const tagItem = wrap.querySelectorAll(elements.item)[position];
        if (!tagItem || wrap.querySelector(".tag-ads")) return;
        const tag = tagItem.cloneNode(true);
        tag.classList.add("tag-ads");
        const title = tag.querySelector(elements.title);
        if (title) title.textContent = textTag;
        const link = tag.querySelector(elements.link || "a");
        if (link) { link.href = landingPage; link.target = "_blank"; }
        tagItem.insertAdjacentElement("beforebegin", tag);
        clearInterval(interval);

      }, 100);
    } catch (e) { console.warn("[Newstag] Error:", e); }
  }

  function SkinAd(config) {
    try {
      if (platform && platform !== "desktop") return;
      const { leftImage, rightImage, landingPage = "#", imageWidth = 300 } = config;
      if (!leftImage && !rightImage) return;

      const style = doc.createElement("style");
      style.textContent = `
        .skinad-side{position:fixed;top:0;bottom:0;display:flex;align-items:center;z-index:9999}
        .skinad-side img{max-width:${imageWidth}px;display:block;height:100%;object-fit:cover}
      `;
      doc.head.appendChild(style);

      const pageWidth = doc.documentElement.clientWidth;
      const contentWidth = doc.querySelector(".container")?.clientWidth || 1000;
      const offset = (pageWidth - contentWidth) / 2;

      if (leftImage) {
        const left = doc.createElement("a");
        left.href = landingPage; left.target = "_blank"; left.className = "skinad-side"; left.style.left = offset - imageWidth + "px";
        left.innerHTML = `<img src="${leftImage}">`; doc.body.appendChild(left);
      }
      if (rightImage) {
        const right = doc.createElement("a");
        right.href = landingPage; right.target = "_blank"; right.className = "skinad-side"; right.style.right = offset - imageWidth + "px";
        right.innerHTML = `<img src="${rightImage}">`; doc.body.appendChild(right);
      }

    } catch (e) { console.warn("[SkinAd] Error:", e); }
  }

  return { init };
});
