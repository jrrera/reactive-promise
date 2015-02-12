var env = require('system').env;
var url = env.ROOT_URL;

describe("Reactive-Promise", function() {
  before(function() {
    casper.start(url);
    casper.on('remote.message', function(message) {
      // this.echo(message);
    });
  });
  it("should be an exported object", function() {
    casper.then(function () {
      var evalResult = casper.evaluate(function() {
        return {
          "isExported": ( ReactivePromise && typeof ReactivePromise === "object" ),
          "hasWait": ( _.has(ReactivePromise, "when") ),
          "hasGetHandle": ( _.has(ReactivePromise, "getHandle") ),
          "hasReady": ( _.has(ReactivePromise, "ready") ),
        }
      });
      evalResult.isExported.should.equal(true);
      evalResult.hasWait.should.equal(true);
      evalResult.hasGetHandle.should.equal(true);
      evalResult.hasReady.should.equal(true);
    });
  });
  it("should display ready status", function() {
    casper.then(function () {
      this.waitForText("Ready!", function() {
        var msg = this.fetchText("#test");
        msg.should.equal("Ready!");
      });
    });
  });
});