(function (root, factory) {
    if (typeof define == "function" && define.amd) define([], factory);
    else if (typeof module === "object" && module.exports)
        module.exports = factory();
    else root.Newstag = factory();
})(this, function () {

    var site, platform, pageType;

    function initNewstag(target, textTag, landingPage, position, klyObj) {
        site = klyObj.site.toLowerCase();
        platform = klyObj.platform.toLowerCase();
        pageType = klyObj.pageType.toLowerCase();

        console.log(target, site, platform);

        switch (site) {
            case "kapanlagi":
                return newstagKapanlagi(target, textTag, landingPage, position);
                break;
        }
    }

    function newstagKapanlagi(target, textTag, landingPage, position) {
        if (platform == "desktop") {
            var tag = target.childNodes[position]; 

            tag = tag.cloneNode(true);
            tag.querySelector(".header25-trending__item__title").textContent = textTag;
            tag.setAttribute("href", landingPage);
            tag.setAttribute("target", "_blank");
            tag.classList.add("tag-ads");

            return tag;
        } else {
            var tag = target.childNodes[position];
            tag = tag.cloneNode(true);
            tag.classList.add("tag-ads");
            tag.querySelector(".header25-trending__item__title").textContent = textTag;
            tag.setAttribute("href", landingPage);
            tag.setAttribute("target", "_blank");

            return tag;
        }
    }

    function injectCreative(cfg) {
        var textTag = cfg.textTag || "Newstag";
        var landingPage = cfg.landingPage || "#";
        var position = Number.isInteger(cfg.position) ? cfg.position : 0;
        var targetSelector = cfg.targetSelector || ".header25-trending__list";
        var count = 0;

        var CHECK_TAG_ELEMENT = setInterval(function () {
            try {
                var P = parent.document;
                if (!P) return;

                var TARGET = P.querySelector(targetSelector);
                if (!TARGET) {
                    count++;
                    if (count > 1000) clearInterval(CHECK_TAG_ELEMENT);
                    return;
                }

                var tagItems = TARGET.querySelectorAll("a.header25-trending__item");
                var Pos = tagItems[position];
                var dupcheck = TARGET.querySelectorAll(".tag-ads");
                if (Pos && !dupcheck.length) {
                    var GAM_TAG = initNewstag(TARGET, textTag, landingPage, position, parent.kly);
                    Pos.insertAdjacentElement("beforebegin", GAM_TAG);
                    clearInterval(CHECK_TAG_ELEMENT);
                    return;
                } else if (Pos && dupcheck.length) {
                    clearInterval(CHECK_TAG_ELEMENT);
                    return;
                }
                count++;
                if (count > 1000) {
                    clearInterval(CHECK_TAG_ELEMENT)
                }
            } catch (e) {
                console.warn("Error", e)
                clearInterval(CHECK_TAG_ELEMENT);
            }
        }, 100)
    }
    return { initNewstag, injectCreative };

});
