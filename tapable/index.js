/* eslint-disable quotes */
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
}

const myCar = new Car();

myCar.hooks.accelerate.tap("AcceleratePlugin", () => {
  console.log("enter AcceleratePlugin");
});

myCar.hooks.brake.tap("WarningLampPlugin", (params) => {
  console.log("enter WarningLampPlugin", params);
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

myCar.hooks.accelerate.call();
myCar.hooks.brake.call("braking");
myCar.hooks.calculateRoutes.callAsync("s", "t", "r", () => {});
