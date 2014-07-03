// A node/http implementation of `Boneless.request'

var http = require('http'),
    url = require('url'),
    Boneless = require('./boneless');

Boneless.ajax = function (options) {

  var parsed = url.parse(options.url);

  var headers = {
    'Accept': 'application/json'
  };

  // TODO: support query string
  var req = http.request({
    method: options.method,
    path: parsed.pathname,
    hostname: parsed.hostname,
    headers: headers
  }, function (res) {
    var resp = '';
    res.on('data', function (chunk) {
      resp += chunk;
    });

    res.on('end', function () {
      // Check status, etc.

    });
  });

  req.on('error', function (err) {
    if (options.error) {
      options.error('WTF');
    }
  });

  req.write(options.data);
  req.end();
/*
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
  */
};
