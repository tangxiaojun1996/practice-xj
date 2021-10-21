/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */

const { ConcatSource } = require("webpack-sources");

class MyPlugins {
  constructor(options) {
    this.comment = `/* ${options.comment} */`;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("MyCommentPlugin", (compilation) => {
      compilation.hooks.optimizeChunkAssets.tap("MyCommentPlugin", (chunks) => {
        for (const chunk of chunks) {
          for (const file of chunk.files) {
            compilation.updateAsset(
              file,
              (old) => new ConcatSource(this.comment, "\n", old)
            );
          }
        }
      });
    });
  }
}

module.exports = MyPlugins;
