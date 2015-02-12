if (Meteor.isClient) {

  var $dep1 = new $.Deferred();
  var $dep2 = new $.Deferred();
  var task1Handle = ReactivePromise.when("myTask1", $dep1.promise(), $dep2.promise() );

  var $dep3 = new $.Deferred();
  var $dep4 = new $.Deferred();
  var task2Handle = ReactivePromise.when("myTask2", [$dep3.promise(), $dep4.promise()] );

  Router.route('/', {
    loadingTemplate: 'loading',
    waitOn: function () {
      return ReactivePromise.getHandle("myTask1");
    },
    action: function () {
      this.render('test');
    }
  });

  // test with tracker
  Tracker.autorun(function(c) {
    var taskReady = ReactivePromise.ready("myTask1");
    if ( taskReady ) {
      c.stop();
      console.log("Tracker.autorun completed for Task1");
    }
  });

  // test with tracker
  Tracker.autorun(function(c) {
    var taskReady = ReactivePromise.ready("myTask2");
    if ( taskReady ) {
      c.stop();
      console.log("Tracker.autorun completed for Task2");
    }
  });

  Meteor.startup(function () {

    Meteor.setTimeout(function() {
      console.log("$dep1 resolved");
      $dep1.resolve();
    }, 3000);

    Meteor.setTimeout(function() {
      console.log("$dep2 resolved");
      $dep2.resolve();
    }, 6000);

    Meteor.setTimeout(function() {
      console.log("$dep3 resolved");
      $dep3.resolve();
    }, 9000);

    Meteor.setTimeout(function() {
      console.log("$dep4 resolved");
      $dep4.resolve();
    }, 12000);

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
