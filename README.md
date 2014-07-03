# Boneless.js

---

**WIP**: cut-and-paste Backbone, courtesy of `sed`. Legitimizing changes to
follow; but for now... just use Backbone.

---

Boneless distills [Backbone.js](http://github.com/jashkenas/backbone) to its
`Event`, `Model`, and `Collection` modules. It is intended:

  * to maintain Backbone's RESTful conventions
  * to provide a data layer for third-party UI libraries
  * to be as supportive as possible of both node and browser environments

And it owes everything to [Backbone.js](http://github.com/jashkenas/backbone),
[DocumentCloud](), [Jeremy Ashkenas](http://github.com/jashkenas), and all of
its other [contributors](http://github.com/jashkenas/backbone/contributors)

### API Compatibility

Boneless strives to maintain API compatibility with *all* of Backbone's `Event`,
`Model`, and `Collection` modules, but due to the removal of compatibility code
and the heavy reliance on ECMA5 extensions and the omission of `jQuery` it should
not be considered a drop-in replacement.

It ships with independent implementations of `Backbone.sync` for use in both
browser- and server-side environments.

## License

MIT

