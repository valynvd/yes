const _KLY_ = parent.window.kmklabs || parent.window.kly;
const _SITE_ = _KLY_.site.toLowerCase();
const _PLATFORM_ = _KLY_.platform.toLowerCase();
const _PAGETYPE_ = _KLY_.pageType.match(/readpage/ig) ? 'readpage' : _KLY_.pageType.toLowerCase();
const _SPECIAL_CONTENT_PAGE_ = parent.document.querySelector(".special-content-layout, .aside--special") || "specialpage" === _PAGETYPE_ ? 'special_content_page' : (_PAGETYPE_ == 'channelpage' ? 'homepage' : _PAGETYPE_ );
const gamTopframeDMPCat = ``.replace(/(\n|\s+)/ig, '').split(/\s*,\s*/); // optional input
const gamMacro = '{"lineitemId":"0", "advertiserId":"0", "orderId":"0", "creativeId":"138527382699", "adunitId":"35505050"}';
console.log("_SPECIAL_CONTENT_PAGE_ : ", _SPECIAL_CONTENT_PAGE_);
const SETTING = {
    'image' : {
        'square': 'https://tpc.googlesyndication.com/simgad/7726342611955087685?',
        'horizontal' : 'https://tpc.googlesyndication.com/simgad/1316853850041931405?',
        'vertical' : 'https://tpc.googlesyndication.com/simgad/5608346320589013248?',
        'headline_desktop' : 'https://tpc.googlesyndication.com/simgad/2888358620555006838?',
        'headline_mobile' : 'https://tpc.googlesyndication.com/simgad/9458325314572575322?',
    },
    'special_content_page' : {
        'mobile' : [
            {
                'target' : {
                    'kapanlagi': '.specialAside',
                    'liputan6': '.special-content__header__cover',
                    'bola.com': '.special-content__header__cover',
                    'merdeka.com' : '.aside--special .special',
                    'fimela':'.special-content__header__cover',
                },
                'bg_attribute' : {
                    'kapanlagi': '--special-bg-image',
                    'liputan6': 'background-image',
                    'bola.com': 'background-image',
                    'merdeka.com' : '--special-image',
                    'fimela':'background-image',
                },
                'image' : {
                'kapanlagi': 'vertical',
                'liputan6' : 'vertical',
                'bola.com' : 'vertical',
                'merdeka.com' : 'vertical',
                'fimela':'vertical',
                },
                'selengkapnya':{
                'kapanlagi': 'a.special-inner-box-button',
                'liputan6' : 'a.special-content-inner-box-button',
                'bola.com' : 'vertical',
                'merdeka.com' : 'vertical', 
                'fimela':'a.special-content-inner-box-button',
                }
            },
            {
                'target' : {
                    'kapanlagi': '.specialHead',
                    'liputan6': '.special_content_video__wrapper',
                    'bola.com': '.special_content_video__wrapper',
                    'merdeka.com' : '.section .section--live > .box .box-live',
                    'fimela': '.special_content_video__wrapper'
                },
                'bg_attribute' : {
                    'kapanlagi': '--special-bg-image',
                    'liputan6': '--bg-sc',
                    'bola.com': '--bg-sc',
                    'merdeka.com' : '.aside--special .special',
                    'fimela': '--bg-sc',
                },
                'image' :  {
                    'kapanlagi': 'headline_mobile',
                    'liputan6' : 'headline_mobile',
                    'bola.com' : 'headline_mobile',
                    'merdeka.com' : 'headline_mobile',
                    'fimela' : 'headline_mobile',
                },
                'selengkapnya':{
                    'kapanlagi': 'a.special-inner-box-button',
                    'liputan6' : 'a.special-content-inner-box-button',
                    'bola.com' : 'vertical',
                    'merdeka.com' : 'vertical', 
                    'fimela' : 'a.special-content-inner-box-button',
                }
            }
        ],
        'desktop' : [
            {
                'target' : {
                    'kapanlagi': '.specialAside',
                    'liputan6' :'.special-content__cover',
                    'bola.com' :'.special-content__cover',
                    'merdeka.com' : '.aside--special .special',
                    'fimela' :'.special-content__cover',
                },
                'bg_attribute' : {
                    'kapanlagi': '--special-bg-image',
                    'liputan6' : 'background-image',
                    'bola.com' : 'background-image',
                    'merdeka.com' : '--special-image',
                    'fimela' :'background-image',
                },
                'image' :  {
                'kapanlagi': 'vertical',
                'liputan6' : 'vertical',
                'bola.com' : 'vertical',
                'merdeka.com' : 'vertical',
                'fimela' :'vertical',
                },
                'selengkapnya':{
                'kapanlagi': 'a.special-inner-box-button',
                'liputan6' : 'a.special-content-inner-box-button',
                'bola.com' : 'vertical',
                'merdeka.com' : 'vertical', 
                'fimela' :'a.special-content-inner-box-button',
                }
            },
            {
                'target' : {
                    'kapanlagi': '.specialHead',
                    'liputan6': '.special_content__video__container',
                    'bola.com': '.special_content__video__container',
                    'merdeka.com' : 'section.section--live > .box-live',
                    'fimela' :'.special_content__video__container',
                },
                'bg_attribute' : {
                    'kapanlagi': '--special-bg-image',
                    'liputan6': '--bg-sc',
                    'bola.com': '--bg-sc',
                    'merdeka.com' : '--special-image-desktop',
                    'fimela' :'--bg-sc',
                },
                'image' :{
                'kapanlagi': 'headline_desktop',
                'liputan6' : 'headline_desktop',
                'bola.com' : 'headline_desktop',
                'merdeka.com' : 'headline_desktop',
                'fimela' :'headline_desktop',
                },
                'selengkapnya':{
                'kapanlagi': 'a.special-inner-box-button',
                'liputan6' : 'a.special-content-inner-box-button',
                'bola.com' : 'vertical',
                'merdeka.com' : 'a.special-content-inner-box-button', 
                'fimela' :'a.special-content-inner-box-button', 
                }
            }
        ]
    },
    'homepage' : {
        'mobile' : {
            'target' : {
                'kapanlagi': 'section.section.section--special',
                'liputan6': '[data-component-name="neoliputan6:mobile:special-content:widget"],[data-component="mobile:special-content:widget"]',
                'bola.com': '[data-component="mobile:special-content:widget"]',
                'merdeka.com' : 'section.section.section--special-content > .wsc',
                'fimela': '[data-component-name="neoliputan6:mobile:special-content:widget"],[data-component="mobile:special-content:widget"]',
            },
            'bg_attribute' : {
                'kapanlagi': '--specialcontent-main-image',
                'liputan6': '--bg-wsc',
                'bola.com': '--bg-widget-special-content',
                'merdeka.com': '--wscMobile',
                'fimela': '--bg-widget-special-content',
            },
            'image' : {
                'kapanlagi': 'horizontal',
                'liputan6' : 'square',
                'bola.com' : 'horizontal',
                'merdeka.com' : 'horizontal',
                'fimela' : 'square',
            },
            'selengkapnya':{
                'kapanlagi': 'a.special-inner-box-button',
                'liputan6' : 'a.special-content-inner-box-button',
                'bola.com' : 'a.wsc-link',
                'merdeka.com' : 'a.wsc-link', 
                'fimela': 'a.special-content-inner-box-button'
            }
        },
        'desktop' : {
            'target' : {
                'kapanlagi': 'section.section.section--special',
                'liputan6': '[data-component-name="neoliputan6:desktop:special-content:widget"],[data-component-name="desktop:special-content:widget"] > .wsc-wrapper',
                'bola.com': '[data-component="desktop:special-content:widget"]',
                'merdeka.com' : 'section.section.section--special-content > .wsc',
                'fimela' : '[data-component-name="desktop:special-content:widget"] > .wsc-wrapper',
            },
            'bg_attribute' : {
                'kapanlagi': '--specialcontent-main-image',
                'liputan6': '--bg-wsc',
                'bola.com': '--bg-wsc',
                'merdeka.com': '--wscDesktop',
                'fimela': '--bg-wsc',

            },
            'image' : {
                'kapanlagi': 'horizontal',
                'liputan6' : 'square',
                'bola.com' : 'vertical',
                'merdeka.com' : 'vertical',
                'fimela': 'horizontal'
            },
            'selengkapnya':{
                'kapanlagi': 'a.special-inner-box-button',
                'liputan6' : 'a.special-content-inner-box-button',
                'bola.com' : '.wsc > a',
                'merdeka.com' : '.wsc > a', 
                'fimela': 'a.special-content-inner-box-button'
            }
        }
    },
    'readpage' : {
        'mobile' : {
            'target' : {
                'kapanlagi': 'section.section.section--special',
                'liputan6': '[data-component-name="neoliputan6:mobile:special-content:widget"],[data-component="mobile:special-content:widget"]',
                'bola.com': '[data-component="mobile:special-content:widget"]',
                'merdeka.com' : 'section.section.section--special-content .wsc',
                'fimela': '[data-component="mobile:special-content:widget"]'
            },
            'bg_attribute' : {
                'kapanlagi': '--specialcontent-main-image',
                'liputan6': '--bg-widget-special-content',
                'bola.com': '--bg-widget-special-content',
                'merdeka.com': '--wscMobile',
                'fimela': '--bg-widget-special-content'
            },
            'image' : {
                'kapanlagi': 'horizontal',
                'liputan6' : 'horizontal',
                'bola.com' : 'horizontal',
                'merdeka.com' : 'horizontal',
                'fimela' : 'vertical',
            }, 
            'selengkapnya':{
            'kapanlagi': 'a.special-inner-box-button',
            'liputan6' : 'a.widget-special-content-link',
            'bola.com' : 'vertical',
            'merdeka.com' : '.wsc > a',
            'fimela':'a.special-content-inner-box-button', 
            }
        },
        'desktop' : {
            'target' : {
                'kapanlagi': 'section.section.section--special',
                'liputan6': '[data-component-name="neoliputan6:desktop:special-content:widget"],[data-component-name="desktop:special-content:widget"] > .wsc-wrapper',
                'bola.com': '[data-component="desktop:special-content:widget"]',
                'merdeka.com' : 'section.section.section--special-content > .wsc',
                'fimela':'[data-component="desktop:special-content:widget"] > .wsc-wrapper',
            },
            'bg_attribute' : {
                'kapanlagi': '--specialcontent-main-image',
                'liputan6': '--bg-wsc',
                'bola.com': '--bg-wsc',
                'merdeka.com': '--wscDesktop',
                'fimela':'--bg-wsc',

            },
            'image' : {
                'kapanlagi': 'horizontal',
                'liputan6' : 'vertical',
                'bola.com' : 'vertical',
                'merdeka.com' : 'vertical',
                'fimela':'square',
                
            },
            'selengkapnya':{
                'kapanlagi': 'a.special-inner-box-button',
                'liputan6' : '.wsc > a.wsc-link',
                'bola.com' : 'vertical',
                'merdeka.com' : '.wsc > a',
                'fimela':'.wsc > a.wsc-link', 
            }
        }
    },
    'landingPage' : '%%CLICK_URL_UNESC%%https://www.merdeka.com/special-content/hari-kemerdekaan-24',
    'link_selengkapnya' : 'https://www.merdeka.com',
}

BOOTADS();

function BOOTADS() {

    const SETTING_TARGET = SETTING[_SPECIAL_CONTENT_PAGE_][_PLATFORM_];
    console.log("SETTING_TARGET : ",SETTING_TARGET, SETTING_TARGET.length);
    if(!SETTING_TARGET.length){
        SETTING_ROLE(SETTING_TARGET);
    }else{
        SETTING_TARGET.forEach(function (TARGET,KEY) {
            console.log(`#${KEY}. TARGET : `, TARGET);
            SETTING_ROLE(TARGET);
        })
    }
}

function SETTING_ROLE(SETTING_TARGET){
    const IMAGE_SOURCE = SETTING['image'][SETTING_TARGET['image'][_SITE_]]
    console.log(SETTING_TARGET['target'][_SITE_])
    const _SPECIAL_CONTENT_ELEMENT_ = parent.document.querySelectorAll(SETTING_TARGET['target'][_SITE_]);
    console.log("SPECIAL_CONTENT_ELEMENT_ : ",SETTING_TARGET,SETTING_TARGET['target'][_SITE_],_SPECIAL_CONTENT_ELEMENT_);
    // const _TARGET_ELEMENT_ = (_PLATFORM_ == 'desktop' && _SPECIAL_CONTENT_PAGE_ == 'homepage' && _SITE_ != 'liputan6')  ? _SPECIAL_CONTENT_ELEMENT_[0] : _SPECIAL_CONTENT_ELEMENT_[0];
    const _TARGET_ELEMENT_ = _SPECIAL_CONTENT_ELEMENT_[0];
    //console.log("_TARGET_ELEMENT_ QuerySelector : "  , _SPECIAL_CONTENT_ELEMENT_[0].innerHTML);

    // const ANCHOR = !_TARGET_ELEMENT_.querySelector("a") ? (typeof _TARGET_ELEMENT_.innerHTML === "string" ? false : _TARGET_ELEMENT_.innerHTML.querySelector('a') ) : _TARGET_ELEMENT_.querySelector("a");
    
    const ANCHOR = _TARGET_ELEMENT_.querySelector("a");

    console.log("test : ", _TARGET_ELEMENT_ ,_TARGET_ELEMENT_.querySelector("div:not(.special_content_video__list), img:not(.special_content__video__slider-slide-thumbnail__image), img.special-content__cover__figure-image, .wsc-wrapper"));
    
    const IMAGE_COVER = _TARGET_ELEMENT_.querySelector("div:not(.special_content_video__list), img:not(.special_content__video__slider-slide-thumbnail__image), img.special-content__cover__figure-image, .wsc-wrapper, img.special-content-pict-figure-img, img.specialAside-pict-img");
    const LINK_SELENGKAPNYA =  _TARGET_ELEMENT_.parentElement.querySelector(SETTING_TARGET["selengkapnya"][_SITE_]);
    console.log("IMAGE_COVER : ", IMAGE_COVER);
    const _SPEL_ = _SPECIAL_CONTENT_ELEMENT_[0];

// console.log("SETTING_TARGET : ",SETTING_TARGET["selengkapnya"][_SITE_], parent.document.querySelector(SETTING_TARGET["selengkapnya"][_SITE_]))

    _SPEL_ && _SPEL_.dataset.cacheKey && ( _SPEL_.dataset.cacheKey = "google-ad-manager-special-content" );
    _SPEL_ && _SPEL_.dataset.cacheTtl && ( _SPEL_.dataset.cacheTtl = "0" );

    _TARGET_ELEMENT_.style.setProperty(`${SETTING_TARGET['bg_attribute'][_SITE_]}`,`url('${IMAGE_SOURCE}')`,'important');
    _TARGET_ELEMENT_.style.removeProperty("--special-pict-bg-color");
    
    const currentBgColor = getComputedStyle(_TARGET_ELEMENT_).getPropertyValue("--special-bg-color");

    if(_PLATFORM_ === "desktop" && _SITE_ === "kapanlagi" && _TARGET_ELEMENT_.classList.contains("specialAside")){
      _TARGET_ELEMENT_.style.setProperty("--special-bg-image","none","important");
      _TARGET_ELEMENT_.style.setProperty("--special-bg-color", currentBgColor,"important");
    } 
    
    
    if(IMAGE_COVER){

        const FIGURE_IMAGE =  IMAGE_COVER.querySelector("figure, img") 
        if( FIGURE_IMAGE ){ 
            FIGURE_IMAGE.src = IMAGE_SOURCE ;
            FIGURE_IMAGE.dataset.original = IMAGE_SOURCE;
        }

        IMAGE_COVER.src = IMAGE_SOURCE;
        IMAGE_COVER.dataset.src && ( IMAGE_COVER.dataset.src = IMAGE_SOURCE );
        IMAGE_COVER.dataset.original && ( IMAGE_COVER.dataset.original = IMAGE_SOURCE );
        
        if(_SPECIAL_CONTENT_PAGE_ == "special_content_page"){
            IMAGE_COVER.addEventListener("click", topframeGenerateDMPLP);
        }
    }

    if(ANCHOR){
        ANCHOR.href = SETTING['landingPage'];
        ANCHOR.setAttribute("target", "_blank");
    }

    if(LINK_SELENGKAPNYA){
        LINK_SELENGKAPNYA.href = SETTING['link_selengkapnya'] !== '' ? SETTING['link_selengkapnya'] : LINK_SELENGKAPNYA.href;
        LINK_SELENGKAPNYA.setAttribute("target", "_blank");
    }
}

function topframeGenerateDMPLP() {
    if (typeof parent.window.createDMPTracker === 'function') {
        parent.window.createDMPTracker(gamTopframeDMPCat, SETTING['landingPage'], gamMacro);
    } else {
        if (parent.window.GAMLibrary && typeof parent.window.GAMLibrary.createDMPTracker === 'function') {
            parent.window.GAMLibrary.createDMPTracker(gamTopframeDMPCat, SETTING['landingPage'], gamMacro);
        } else {
            parent.window.open(SETTING['landingPage'], '_blank');
        }
    }
}
