require(["gitbook"], function(gitbook) {
    gitbook.events.bind("start", function(e, config) {
        config.ga = config.ga || {};
    });

    gitbook.events.bind("page.change", function() {
        ga('send', 'pageview', window.location.pathname);
    });

    gitbook.events.bind("exercise.submit", function(e, data) {

    });
});
