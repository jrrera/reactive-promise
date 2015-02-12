Package.describe({
  "name": "arsnebula:reactive-promise",
  "summary": "Make jQuery Deferred promises reactive",
  "version": "0.9.0",
  "git": "https://github.com/arsnebula/reactive-promise.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.0");
  api.use("meteor-platform");
  api.use("reactive-var");

  api.addFiles("reactive-promise.js", ["client"]);

  api.export("ReactivePromise", ["client"]);

});