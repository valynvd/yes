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

    function injectCreative(config) {
        var textTag = config.textTag || "Newstag";
        var landingPage = config.landingPage || "#";
        var position = Number.isInteger(config.position) ? config.position : 0;
        var targetSelector = config.targetSelector || ".header25-trending__list";
        var count = 0;

        const CHECK_TAG_ELEMENT = setInterval(function () {
            try {
                const doc = parent.document;
                if (!doc) return;

                const target = doc.querySelector(targetSelector);
                if (!target) {
                    if (++count > 1000) clearInterval(CHECK_TAG_ELEMENT)
                    return;
                }

                if (target.querySelector(".tag-ads")) {
                    clearInterval(CHECK_TAG_ELEMENT);
                    return
                }

                var tagItem = target.querySelectorAll("a.header25-trending__item")[position];
                if (tagItem) {
                    var GAM_TAG = initNewstag(target, textTag, landingPage, position, parent.kly || {});
                    if (GAM_TAG) {
                        tagItem.insertAdjacentElement("beforebegin", GAM_TAG);
                        clearInterval(CHECK_TAG_ELEMENT);
                    }
                }
                if (++count > 1000) clearInterval(CHECK_TAG_ELEMENT);

            } catch (e) {
                console.warn("Error", e)
                clearInterval(CHECK_TAG_ELEMENT);
            }
        }, 100)
    }
    return { initNewstag, injectCreative };

});
