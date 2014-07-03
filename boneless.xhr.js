Boneless.ajax = function (options) {

  var request = new XMLHttpRequest();

  var unbind = function (req) {
    req.removeEventListener('load', onLoad);
    req.removeEventListener('error', onError);
  };

  var onLoad = function (evt) {
    var data, req = evt.target;

    unbind(req);

    if (req.status >= 200 && req.status < 400) {
      try {
        data = JSON.parse(req.responseText);
      }
      catch (e) {
        if (options.error) {
          // TODO: more uniform JSON parsing
          return options.error(req, req.status, e.toString());
        }
      }

      if (options.success) {
        options.success(data, req.status, req);
      }
    }
    else {
      if (options.error) {
        // todo: fix `errorStatus` param
        options.error(req, req.status, req.responseText);
      }
    }
  };

  var onError = function () {
    var req = evt.target;
    unbind(req);
    if (options.error) {
      options.error(m, {}, req);
    }
  };

  request.addEventListener('load', onLoad);
  request.addEventListener('error', onError);

  if (options.type === 'GET') {
    // TODO: query paramize `options.data`
    request.open(options.type, options.url, true);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
  }
  else {
    request.open(options.type, options.url, true);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send(options.data);
  }
};
