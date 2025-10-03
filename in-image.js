/* ============ IN-IMAGE ============ */
    inImageAdsInject: function() {
        let inImageArticleItems = document.querySelectorAll(".infinite-paging-item .page-item");
        let inImageTargetWrapper, inImageTargetImageWrapper;

        for (let i = 0; i < inImageArticleItems.length; i++) {
            inImageTargetWrapper = inImageArticleItems[i];
            inImageTargetImageWrapper = inImageTargetWrapper?.querySelector("p.text-center");
            if (inImageTargetImageWrapper) {
                break;
            }
        }

        let inImageTargetTitle = inImageTargetWrapper?.querySelector(".pages-img-desc");
        let inImageTargetImage = inImageTargetWrapper?.querySelector(".image_pagging_on");
        let checks = [inImageTargetWrapper, inImageTargetImageWrapper, inImageTargetImage];
        
        if (checks.some(check => check == null))
            return;

        let inImageElement = document.createElement("div")
        let inImageStyle = document.createElement("style")
        inImageElement.setAttribute("id", "in-image-ads")
        inImageElement.innerHTML = `<div class="banner-wrapper-in-image"><div class="in-image-ads-close"><img src="https://cdns.klimg.com/d.kapanlaginetwork.com/banner/preview/2019/08/20/close.png"></div><div id='div-gpt-ad-kapanlagi-inimage' style='height:auto; width:320px;' data-info='ad'></div></div>`
        if (kly.site.toLowerCase() === "kapanlagi") {
            inImageStyle.textContent = `p.text-center { position: relative; } div#in-image-ads { position: absolute; width: inherit; height: auto; left: 0; bottom: 0; background: transparent; transition: all .5s ease; overflow: hidden; aspect-ratio: ${inImageTargetImage.clientWidth} / ${inImageTargetImage.clientHeight}; z-index: 10; } div#in-image-ads.in-image { overflow: hidden; } div#in-image-ads::after { content: ""; width: 100%; height: auto; position: absolute; aspect-ratio: ${inImageTargetImage.clientWidth} / ${inImageTargetImage.clientHeight}; z-index: -1; bottom: 0; opacity: 0; background: linear-gradient(0deg, black, transparent); transition: all .5s ease 2.2s; } div#in-image-ads.active::after {opacity: 1;} div#in-image-ads.lr div#div-gpt-ad-kapanlagi-inimage { transform: scale(${(inImageTargetImage.clientHeight / 280 > 1) ? 1 : inImageTargetImage.clientHeight / 280}); transform-origin: bottom; width: 100% !important;} div#in-image-ads.active { animation: dimOverlay 2.5s ease forwards; } @keyframes dimOverlay { 0% { background: transparent; } 70% { background: #00000099; } 100% { background: transparent; } } .banner-wrapper-in-image { width: inherit; height: auto; position: absolute; bottom: -150%; transition: all 2s ease; display: flex; justify-content: center; } div#in-image-ads.active .banner-wrapper-in-image { bottom: 0px; } div#in-image-ads .banner-wrapper-in-image .in-image-ads-close img { width: 100%; } div#in-image-ads.active .banner-wrapper-in-image .in-image-ads-close { opacity: 1; } div#in-image-ads .banner-wrapper-in-image .in-image-ads-close { opacity: 0; position: absolute; left: 50%; top: -25px; width: 25px; height: 25px; transform: translateX(147.5px); } div#in-image-ads.lr .in-image-ads-close { display: none; }`;
            inImageTargetImageWrapper.appendChild(inImageElement);
            inImageTargetImageWrapper.appendChild(inImageStyle);
        } else {
            inImageStyle.textContent = `div#in-image-ads { position: absolute; width: inherit; height: auto; top: ${ inImageTargetImageWrapper.offsetTop + 11 }px; background: transparent; transition: all .5s ease; overflow: hidden; aspect-ratio: ${inImageTargetImage.clientWidth} / ${inImageTargetImage.clientHeight}; z-index: 10; } div#in-image-ads.in-image { overflow: hidden; } div#in-image-ads::after { content: ""; width: 100%; height: auto; position: absolute; aspect-ratio: ${inImageTargetImage.clientWidth} / ${inImageTargetImage.clientHeight}; z-index: -1; bottom: 0; opacity: 0; background: linear-gradient(0deg, black, transparent); transition: all .5s ease 2.2s; } div#in-image-ads.active::after {opacity: 1;} div#in-image-ads.lr div#div-gpt-ad-kapanlagi-inimage { transform: scale(${(inImageTargetImage.clientHeight / 280 > 1) ? 1 : inImageTargetImage.clientHeight / 280}); transform-origin: bottom; width: 100% !important;} div#in-image-ads.active { animation: dimOverlay 2.5s ease forwards; } @keyframes dimOverlay { 0% { background: transparent; } 70% { background: #00000099; } 100% { background: transparent; } } .banner-wrapper-in-image { width: inherit; height: auto; position: absolute; bottom: -150%; transition: all 2s ease; display: flex; justify-content: center; } div#in-image-ads.active .banner-wrapper-in-image { bottom: 0px; } div#in-image-ads .banner-wrapper-in-image .in-image-ads-close img { width: 100%; } div#in-image-ads.active .banner-wrapper-in-image .in-image-ads-close { opacity: 1; } div#in-image-ads .banner-wrapper-in-image .in-image-ads-close { opacity: 0; position: absolute; left: 50%; top: -25px; width: 25px; height: 25px; transform: translateX(147.5px); } div#in-image-ads.lr .in-image-ads-close { display: none; }`;
            inImageTargetImageWrapper.insertAdjacentElement('afterend', inImageElement);
            inImageTargetImageWrapper.insertAdjacentElement('afterend', inImageStyle);
        }
    },
