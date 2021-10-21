const loaderUtils = require("loader-utils");
// 接收options配置
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  // console.log("source", source);
  const newSource = source.replace(/TODO/g, options.name);
  return `module.exports = ${JSON.stringify(newSource)}`;
};
