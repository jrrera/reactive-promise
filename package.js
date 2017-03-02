Package.describe({
  "name": "arsnebula:reactive-promise",
  "summary": "Make jQuery Deferred promises reactive",
  "version": "0.9.2",
  "git": "https://github.com/arsnebula/reactive-promise.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.2");
  api.use("reactive-var");
  api.use("underscore");
  api.use("jquery");
  api.use("check");
  api.addFiles("reactive-promise.js", ["client"]);
  api.export("ReactivePromise", ["client"]);
});
