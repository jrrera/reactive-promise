# Reactive-Promise

Make jQuery.Deferred promises reactive.

## About

Reactive-Promise allows you to use [jQuery.Deferred](http://api.jquery.com/jquery.deferred/) promises
as a reactive data source. Common use cases include:

- Allow an Iron Router route to wait on one or more asynchronous tasks
- Perform conditional rendering in a template based on asynchronous task completion
- Use ``Tracker.autorun`` to indirectly execute on promise completion

## Current Version

**v0.9.0**

## Usage

The [jQuery.Deferred](http://api.jquery.com/jquery.deferred/) object is very similar to the
traditional callback model, but provides some additional flexibility including the ability
to generate **promises** - tokens that can be passed around and monitored for task completion.

The following example shows how easily a traditional callback method (a Meteor method call)
can be converted to support a ``jQuery.Deferred``:

```js
var $dep = new $.Deferred();
Meteor.call("myMethod", function(err, result) {
  if (err) { $dep.reject(err); }
  $dep.resolve(result);
});

var promise = $dep.promise();
```

## Register a Task

To create a reactive data source for one or more promises, call
the ``ReactivePromise.when`` method providing a task name, and one or
more promises to monitor for completion.

> ReactivePromise.when(task, promise [, promise])
- **task**: provide a string identifier for the task to monitor
- **promise**: an array, or one or more individual promise objects as arguments

The method returns a handle object that contains the task name provided,
and a ``ready`` function that returns either ``true`` or ``false`` whether the
task promises have completed. The value returned from the ``ready`` function is reactive.

```js
var handle = ReactivePromise.when("myTask", promise);
var task = handle.task;
var isReady = handle.ready();
```

Alternatively, you retrieve a new handle object, or check the ready state directly
by using the ``task`` name originally provided with the ``getHandle`` function, or the
``ready`` function.

```js
var handle = ReactivePromise.getHandle("myTask");
var isReady = ReactivePromise.ready("myTask");
```

Once the task has been added, you can perform a number of use cases that utilize
the reactive support.

## Tracker.autorun

[Tracker.autorun](http://docs.meteor.com/#/full/tracker_autorun) provides the ability
to exucute a function one or more times when the value of a reactive data source changes.

In the following example, when the promise is resolved or rejected, the autorun
function will automatically execute.

```js
Tracker.autorun(function(c) {
  var taskReady = ReactivePromise.ready("myTask");
  if ( taskReady ) {
    c.stop();
    console.log("Task complete.");
  }
});

## Conditional Template Rendering

The library provides a ``isReactivePromiseReady`` template helper that can
be used for conditional rendering. The helper takes a single ``task`` argument that
should match the task identifier used with ``ReactivePromise.when``.

```html
<template name="myTemplate">
  {{#if isReactivePromiseReady 'myTask'}}
  <div>Ready</div>
  {{#else}}
  <div>Waiting...</div>
  {{#/if}}
</template>

## Iron Router waitOn

The ``ReactivePromise.when`` method returns a ``handle`` object that is compatible with the
[Iron Router](https://atmospherejs.com/iron/router) waitOn option. The following demonstrates
how to wait on one or more promises to complete before rendering a route.

```js
Router.route('/route', {
  "loadingTemplate": loading,
  "waitOn": function() {
    return ReactivePromise.when("myTask", $def1.promise(), $def2.promise());
  },
  "action": function() {
    this.render("myTemplate");
  }
});
```

If you have already added the task in an alternate location, you can retrieve it
a new handle using the ``getHandle`` method:

```js
Router.route('/route', {
  "loadingTemplate": loading,
  "waitOn": function() {
    return ReactivePromise.getHandle("myTask");
  },
  "action": function() {
    this.render("myTemplate");
  }
});
```

## License

[MIT](http://choosealicense.com/licenses/mit/) -
Copyright (c) 2015 [Ars Nebula](http://www.arsnebula.com)