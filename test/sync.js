(function() {

  var Library = Boneless.Collection.extend({
    url : function() { return '/library'; }
  });
  var library;

  var attrs = {
    title  : "The Tempest",
    author : "Bill Shakespeare",
    length : 123
  };

  module("Boneless.sync", {
    setup : function() {
      library = new Library;
      library.create(attrs, {wait: false});
    }
  });

  test("read", 3, function() {
    library.fetch();
    equal(this.ajaxSettings.url, '/library');
    equal(this.ajaxSettings.type, 'GET');
    ok(_.isEmpty(this.ajaxSettings.data));
  });

  test("passing data", 3, function() {
    library.fetch({data: {a: 'a', one: 1}});
    equal(this.ajaxSettings.url, '/library');
    equal(this.ajaxSettings.data.a, 'a');
    equal(this.ajaxSettings.data.one, 1);
  });

  test("create", 5, function() {
    equal(this.ajaxSettings.url, '/library');
    equal(this.ajaxSettings.type, 'POST');
    var data = JSON.parse(this.ajaxSettings.data);
    equal(data.title, 'The Tempest');
    equal(data.author, 'Bill Shakespeare');
    equal(data.length, 123);
  });

  test("update", 6, function() {
    library.first().save({id: '1-the-tempest', author: 'William Shakespeare'});
    equal(this.ajaxSettings.url, '/library/1-the-tempest');
    equal(this.ajaxSettings.type, 'PUT');
    var data = JSON.parse(this.ajaxSettings.data);
    equal(data.id, '1-the-tempest');
    equal(data.title, 'The Tempest');
    equal(data.author, 'William Shakespeare');
    equal(data.length, 123);
  });

  test("read model", 3, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    library.first().fetch();
    equal(this.ajaxSettings.url, '/library/2-the-tempest');
    equal(this.ajaxSettings.type, 'GET');
    ok(_.isEmpty(this.ajaxSettings.data));
  });

  test("destroy", 3, function() {
    library.first().save({id: '2-the-tempest', author: 'Tim Shakespeare'});
    library.first().destroy({wait: true});
    equal(this.ajaxSettings.url, '/library/2-the-tempest');
    equal(this.ajaxSettings.type, 'DELETE');
    equal(this.ajaxSettings.data, null);
  });

  test("urlError", 2, function() {
    var model = new Boneless.Model();
    raises(function() {
      model.fetch();
    });
    model.fetch({url: '/one/two'});
    equal(this.ajaxSettings.url, '/one/two');
  });

  test("#1052 - `options` is optional.", 0, function() {
    var model = new Boneless.Model();
    model.url = '/test';
    Boneless.sync('create', model);
  });

  test("Boneless.ajax", 1, function() {
    Boneless.ajax = function(settings){
      strictEqual(settings.url, '/test');
    };
    var model = new Boneless.Model();
    model.url = '/test';
    Boneless.sync('create', model);
  });

  test("Call provided error callback on error.", 1, function() {
    var model = new Boneless.Model;
    model.url = '/test';
    Boneless.sync('read', model, {
      error: function() { ok(true); }
    });
    this.ajaxSettings.error();
  });

  test('#2928 - Pass along `textStatus`.', 1, function() {
    var model = new Boneless.Model;
    model.url = '/test';
    model.on('error', function(model, xhr, options) {
      strictEqual(options.textStatus, 'textStatus');
    });
    model.fetch();
    this.ajaxSettings.error({}, 'textStatus');
  });

})();
