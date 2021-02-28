const program = require("commander");
const path = require("path");

const { version } = require("./utils/constants");
const { mapActions } = require("./utils/common");

// Reflect.ownKeys(）类似Object.keys()的功能，但它可以返回包含Symbol属性在内的自有属性
// 将指令action map到这里
Reflect.ownKeys(mapActions).forEach((action) => {
  program
    .command(action) //配置命令的名字
    .alias(mapActions[action].alias) // 命令的别名
    .description(mapActions[action].description) // 命令对应的描述
    .action(() => {
      if (action === "*") {
        //访问不到对应的命令 就打印找不到命令
        console.log(mapActions[action].description);
      } else {
        console.log("action", action);
        // 分解命令 到文件里 有多少文件 就有多少配置 create config
        // lee-cli create project-name ->[node,lee-cli,create,project-name]
        console.log("process.argv", process.argv);
        require(path.join(__dirname, action))(...process.argv.slice(3));
      }
    });
});

// process.argv就是用户在命令行中传入的参数
const params = program.version(version).parse(process.argv);
// console.log("params: ", params);

// 监听 --help 指令
program.on("--help", () => {
  console.log("\nExamples:");
  Reflect.ownKeys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((example) => {
      console.log(` ${example}`);
    });
  });
});
