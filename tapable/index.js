const tapable = require("tapable");

const { SyncHook, AsyncParallelHook } = tapable;

class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(["newSpeed"]),
      brake: new SyncHook(["p1", "p2"]),
      calculateRoutes: new AsyncParallelHook([
        "source",
        "target",
        "routesList",
      ]),
    };
  }

  /* ... */
}

const myCar = new Car();

// Use the tap method to add a consument
myCar.hooks.brake.tap("WarningLampPlugin", (params, qwe1) => {
  console.log("enter WarningLampPlugin", params, qwe1);
});

myCar.hooks.calculateRoutes.tapPromise(
  "GoogleMapsPlugin",
  (source, target, routesList) => {
    // return a promise
    console.log("source, target, routesList", source, target, routesList);
    return Promise.resolve("enter GoogleMapsPlugin");
  }
);

myCar.hooks.calculateRoutes.tapAsync(
  "BingMapsPlugin",
  (source, target, routesList, callback) => {
    console.log(
      "source, target, routesList, callback",
      source,
      target,
      routesList,
      callback
    );
    return Promise.resolve("enter BingMapsPlugin");
  }
);

myCar.hooks.brake.call("qweqwe", "123");
myCar.hooks.calculateRoutes.callAsync("s", "t", "r", () => {});
