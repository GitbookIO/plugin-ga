require(["gitbook"], function(gitbook) {
    var cfg;

    var trackScroll = function() {
        var scrollCfg = cfg.scroll;
        var gaSend = (scrollCfg.debug ? function() {
            console.log(arguments);
        } : window.ga);
        jQuery(function($) {
            var startTime = new Date();

            var bookBody = $('.book-body');
            var bookBodyInner = $('.book-body .body-inner');
            var bookBodyPage = $('.book-body .body-inner .page-wrapper');
            var content = $('.page-inner section').last();
            var foldPos = 0, contentBottomPos = 0, contentMiddlePos = 0, pageBottomPos = 0;

            var hasPassedFold = false, hasPassedContentMiddle = false, hasPassedContentBottom = false, hasPassedPageBottom = false;
            var lastScrollPos = -1;
            var getTimeSinceLoadInSeconds = function() {
                return Math.round((new Date() - startTime) * 0.001);
            };
            var trackScrollImpl = function() {
                //must track both book body and book body inner because chrome and firefox scroll different ones amongst these two
                //in firefox the scrollbar is on inner, but in chrome the scrollbar is on outer
                var scrollPos = foldPos + bookBody.scrollTop() + bookBodyInner.scrollTop();
                if (scrollPos === lastScrollPos) {
                    return;
                }
                lastScrollPos = scrollPos;
                if (scrollCfg.debug) {
                    console.log('scrollPos', scrollPos);
                }
                if (!hasPassedPageBottom && scrollPos >= pageBottomPos) {
                    hasPassedPageBottom = true;
                    gaSend('send', 'event', 'scroll', 'pastPageBottom', document.location.href, getTimeSinceLoadInSeconds());
                    //clear intervals - we no longer need them
                    window.clearInterval(trackScrollImplInterval);
                    window.clearInterval(trackScrollUpdateSizesInterval);
                }
                else if (!hasPassedContentBottom && scrollPos >= contentBottomPos) {
                    hasPassedContentBottom = true;
                    gaSend('send', 'event', 'scroll', 'pastContentBottom', document.location.href, getTimeSinceLoadInSeconds());
                }
                else if (!hasPassedContentMiddle && scrollPos > contentMiddlePos) {
                    hasPassedContentMiddle = true;
                    gaSend('send', 'event', 'scroll', 'pastContentMiddle', document.location.href, getTimeSinceLoadInSeconds());
                }
                else if (!hasPassedFold && scrollPos > foldPos) {
                    hasPassedFold = true;
                    gaSend('send', 'event', 'scroll', 'pastFold', document.location.href, getTimeSinceLoadInSeconds());
                }
            };
            var trackScrollUpdateSizes = function() {
                foldPos = $(window).height() - $('.book-header').height(); // bookBodyInner.height();
                contentBottomPos = content.scrollTop() + content.innerHeight();
                contentMiddlePos = (foldPos + contentBottomPos) * 0.5;
                pageBottomPos = content.scrollTop() + bookBodyPage.innerHeight();
                if (scrollCfg.debug) {
                    console.log('positions', [foldPos, contentMiddlePos, contentBottomPos, pageBottomPos]);
                }
            };
            trackScrollUpdateSizes();
            var trackScrollImplInterval = window.setInterval(trackScrollImpl, (scrollCfg.interval || 150));
            var trackScrollUpdateSizesInterval = window.setInterval(trackScrollUpdateSizes, (scrollCfg.interval * 33 || 5000));
        });
    };

    var initTrackScroll = function() {
        if (cfg && cfg.scroll) {
            if (typeof window.jQuery === 'function') {
                trackScroll(cfg.scroll);
            }
            else {
                console.log('Need jQuery to track scrolling');
            }
        }
    };

    gitbook.events.bind("start", function(e, config) {
        config.ga = config.ga || {};
        cfg = config.ga;
        initTrackScroll();
    });

    gitbook.events.bind("page.change", function() {
        ga('send', 'pageview');
        initTrackScroll();
    });

    gitbook.events.bind("exercise.submit", function(e, data) {

    });
});
