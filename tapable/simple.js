/* eslint-disable quotes */
const tapable = require("tapable");

const { SyncHook } = tapable;

const hook = new SyncHook([]);

hook.tap("MyHook", () => {
  console.log("enter MyHook");
});

hook.tap("MyHook2", () => {
  console.log("enter MyHook2");
});

hook.call();
