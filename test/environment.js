(function() {

  var sync = Boneless.sync;
  var ajax = Boneless.ajax;
  var emulateHTTP = Boneless.emulateHTTP;
  var emulateJSON = Boneless.emulateJSON;
  var history = window.history;
  var pushState = history.pushState;
  var replaceState = history.replaceState;

  QUnit.testStart(function() {
    var env = this.config.current.testEnvironment;

    // We never want to actually call these during tests.
    history.pushState = history.replaceState = function(){};

    // Capture ajax settings for comparison.
    Boneless.ajax = function(settings) {
      env.ajaxSettings = settings;
    };

    // Capture the arguments to Boneless.sync for comparison.
    Boneless.sync = function(method, model, options) {
      env.syncArgs = {
        method: method,
        model: model,
        options: options
      };
      sync.apply(this, arguments);
    };

  });

  QUnit.testDone(function() {
    Boneless.sync = sync;
    Boneless.ajax = ajax;
    Boneless.emulateHTTP = emulateHTTP;
    Boneless.emulateJSON = emulateJSON;
    history.pushState = pushState;
    history.replaceState = replaceState;
  });

})();
