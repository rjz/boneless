(function(t,e){if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,n){t.Backbone=e(t,n,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore");e(t,exports,i)}else{t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}})(this,function(t,e,i,r){var n=t.Backbone;var s=[];var a=s.slice;e.VERSION="1.1.2";e.$=r;e.noConflict=function(){t.Backbone=n;return this};e.emulateHTTP=false;e.emulateJSON=false;var o=e.Events={on:function(t,e,i){if(!h(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,r){if(!h(this,"once",t,[e,r])||!e)return this;var n=this;var s=i.once(function(){n.off(t,s);e.apply(this,arguments)});s._callback=e;return this.on(t,s,r)},off:function(t,e,r){if(!this._events||!h(this,"off",t,[e,r]))return this;if(!t&&!e&&!r){this._events=void 0;return this}var n=t?[t]:i.keys(this._events);for(var s=0,a=n.length;s<a;s++){t=n[s];var o=this._events[t];if(!o)continue;if(!e&&!r){delete this._events[t];continue}var u=[];for(var l=0,c=o.length;l<c;l++){var f=o[l];if(e&&e!==f.callback&&e!==f.callback._callback||r&&r!==f.context){u.push(f)}}if(u.length){this._events[t]=u}else{delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=a.call(arguments,1);if(!h(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)l(i,e);if(r)l(r,arguments);return this},stopListening:function(t,e,r){var n=this._listeningTo;if(!n)return this;var s=!e&&!r;if(!r&&typeof e==="object")r=this;if(t)(n={})[t._listenId]=t;for(var a in n){t=n[a];t.off(e,r,this);if(s||i.isEmpty(t._events))delete this._listeningTo[a]}return this}};var u=/\s+/;var h=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var n in i){t[e].apply(t,[n,i[n]].concat(r))}return false}if(u.test(i)){var s=i.split(u);for(var a=0,o=s.length;a<o;a++){t[e].apply(t,[s[a]].concat(r))}return false}return true};var l=function(t,e){var i,r=-1,n=t.length,s=e[0],a=e[1],o=e[2];switch(e.length){case 0:while(++r<n)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<n)(i=t[r]).callback.call(i.ctx,s);return;case 2:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a);return;case 3:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a,o);return;default:while(++r<n)(i=t[r]).callback.apply(i.ctx,e);return}};var c={listenTo:"on",listenToOnce:"once"};i.each(c,function(t,e){o[e]=function(e,r,n){var s=this._listeningTo||(this._listeningTo={});var a=e._listenId||(e._listenId=i.uniqueId("l"));s[a]=e;if(!n&&typeof r==="object")n=this;e[t](r,n,this);return this}});o.bind=o.on;o.unbind=o.off;i.extend(e,o);var f=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId("c");this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};r=i.defaults({},r,i.result(this,"defaults"));this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(f.prototype,o,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,r){var n,s,a,o,u,h,l,c;if(t==null)return this;if(typeof t==="object"){s=t;r=e}else{(s={})[t]=e}r||(r={});if(!this._validate(s,r))return false;a=r.unset;u=r.silent;o=[];h=this._changing;this._changing=true;if(!h){this._previousAttributes=i.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in s)this.id=s[this.idAttribute];for(n in s){e=s[n];if(!i.isEqual(c[n],e))o.push(n);if(!i.isEqual(l[n],e)){this.changed[n]=e}else{delete this.changed[n]}a?delete c[n]:c[n]=e}if(!u){if(o.length)this._pending=r;for(var f=0,d=o.length;f<d;f++){this.trigger("change:"+o[f],this,c[o[f]],r)}}if(h)return this;if(!u){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e,r=false;var n=this._changing?this._previousAttributes:this.attributes;for(var s in t){if(i.isEqual(n[s],e=t[s]))continue;(r||(r={}))[s]=e}return r},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var r=t.success;t.success=function(i){if(!e.set(e.parse(i,t),t))return false;if(r)r(e,i,t);e.trigger("sync",e,i,t)};w(this,t);return this.sync("read",this,t)},save:function(t,e,r){var n,s,a,o=this.attributes;if(t==null||typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r=i.extend({validate:true},r);if(n&&!r.wait){if(!this.set(n,r))return false}else{if(!this._validate(n,r))return false}if(n&&r.wait){this.attributes=i.extend({},o,n)}if(r.parse===void 0)r.parse=true;var u=this;var h=r.success;r.success=function(t){u.attributes=o;var e=u.parse(t,r);if(r.wait)e=i.extend(n||{},e);if(i.isObject(e)&&!u.set(e,r)){return false}if(h)h(u,t,r);u.trigger("sync",u,t,r)};w(this,r);s=this.isNew()?"create":r.patch?"patch":"update";if(s==="patch")r.attrs=n;a=this.sync(s,this,r);if(n&&r.wait)this.attributes=o;return a},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var n=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(t.wait||e.isNew())n();if(r)r(e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};if(this.isNew()){t.success();return false}w(this,t);var s=this.sync("delete",this,t);if(!t.wait)n();return s},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||x();if(this.isNew())return t;return t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var d=["keys","values","pairs","invert","pick","omit","chain"];i.each(d,function(t){if(!i[t])return;f.prototype[t]=function(){var e=a.call(arguments);e.unshift(this.attributes);return i[t].apply(i,e)}});var v=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var p={add:true,remove:true,merge:true};var g={add:true,remove:false};i.extend(v.prototype,o,{model:f,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,g))},remove:function(t,e){var r=!i.isArray(t);t=r?[t]:i.clone(t);e||(e={});for(var n=0,s=t.length;n<s;n++){var a=t[n]=this.get(t[n]);if(!a)continue;delete this._byId[a.id];delete this._byId[a.cid];var o=this.indexOf(a);this.models.splice(o,1);this.length--;if(!e.silent){e.index=o;a.trigger("remove",a,this,e)}this._removeReference(a,e)}return r?t[0]:t},set:function(t,e){e=i.defaults({},e,p);if(e.parse)t=this.parse(t,e);var r=!i.isArray(t);t=r?t?[t]:[]:t.slice();var n,s,a,o,u;var h=e.at;var l=this.comparator&&h==null&&e.sort!==false;var c=i.isString(this.comparator)?this.comparator:null;var f=[],d=[],v={};var g=e.add,m=e.merge,y=e.remove;var _=!l&&g&&y?[]:false;for(var b=0,x=t.length;b<x;b++){a=t[b]||{};if(this._isModel(a)){n=s=a}else{n=a[this.model.prototype.idAttribute||"id"]}if(o=this.get(n)){if(y)v[o.cid]=true;if(m){a=a===s?s.attributes:a;if(e.parse)a=o.parse(a,e);o.set(a,e);if(l&&!u&&o.hasChanged(c))u=true}t[b]=o}else if(g){s=t[b]=this._prepareModel(a,e);if(!s)continue;f.push(s);this._addReference(s,e)}s=o||s;if(!s)continue;if(_&&(s.isNew()||!v[s.id]))_.push(s);v[s.id]=true}if(y){for(var b=0,x=this.length;b<x;b++){if(!v[(s=this.models[b]).cid])d.push(s)}if(d.length)this.remove(d,e)}if(f.length||_&&_.length){if(l)u=true;this.length+=f.length;if(h!=null){for(var b=0,x=f.length;b<x;b++){this.models.splice(h+b,0,f[b])}}else{if(_)this.models.length=0;var w=_||f;for(var b=0,x=w.length;b<x;b++){this.models.push(w[b])}}}if(u)this.sort({silent:true});if(!e.silent){for(var b=0,x=f.length;b<x;b++){(s=f[b]).trigger("add",s,this,e)}if(u||_&&_.length)this.trigger("sort",this,e)}return r?t[0]:t},reset:function(t,e){e||(e={});for(var r=0,n=this.models.length;r<n;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return a.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(t,e){if(i.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(i.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(i.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var r=this;t.success=function(i){var n=t.reset?"reset":"set";r[n](i,t);if(e)e(r,i,t);r.trigger("sync",r,i,t)};w(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var r=this;var n=e.success;e.success=function(t,i){if(e.wait)r.add(t,e);if(n)n(t,i,e)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(this._isModel(t)){if(!t.collection)t.collection=this;return t}e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_isModel:function(t){return t instanceof f},_addReference:function(t,e){this._byId[t.cid]=t;if(t.id!=null)this._byId[t.id]=t;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var m=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"];i.each(m,function(t){if(!i[t])return;v.prototype[t]=function(){var e=a.call(arguments);e.unshift(this.models);return i[t].apply(i,e)}});var y=["groupBy","countBy","sortBy","indexBy"];i.each(y,function(t){if(!i[t])return;v.prototype[t]=function(e,r){var n=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,n,r)}});e.sync=function(t,r,n){var s=_[t];i.defaults(n||(n={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:s,dataType:"json"};if(!n.url){a.url=i.result(r,"url")||x()}if(n.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(n.attrs||r.toJSON(n))}if(n.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(n.emulateHTTP&&(s==="PUT"||s==="DELETE"||s==="PATCH")){a.type="POST";if(n.emulateJSON)a.data._method=s;var o=n.beforeSend;n.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",s);if(o)return o.apply(this,arguments)}}if(a.type!=="GET"&&!n.emulateJSON){a.processData=false}var u=n.error;n.error=function(t,e,i){n.textStatus=e;n.errorThrown=i;if(u)u.apply(this,arguments)};var h=n.xhr=e.ajax(i.extend(a,n));r.trigger("request",r,h,n);return h};var _={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var b=function(t,e){var r=this;var n;if(t&&i.has(t,"constructor")){n=t.constructor}else{n=function(){return r.apply(this,arguments)}}i.extend(n,r,e);var s=function(){this.constructor=n};s.prototype=r.prototype;n.prototype=new s;if(t)i.extend(n.prototype,t);n.__super__=r.prototype;return n};f.extend=v.extend=b;var x=function(){throw new Error('A "url" property or function must be specified')};var w=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}};return e});
//# sourceMappingURL=boneless-min.map