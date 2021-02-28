const ora = require("ora");

// 根据我们想要实现的功能配置执行动作，遍历产生对应的命令
const mapActions = {
  create: {
    alias: "c", //别名
    description: "创建一个项目", // 描述
    examples: [
      //用法
      "xj-cli create <project-name>",
    ],
  },
  config: {
    //配置文件
    alias: "conf", //别名
    description: "config project variable", // 描述
    examples: [
      //用法
      "xj-cli config set <k> <v>",
      "xj-cli config get <k>",
    ],
  },
  "*": {
    alias: "", //别名
    description: "command not found", // 描述
    examples: [], //用法
  },
};

const fnLoadingByOra = async (fn, message) => {
  const spinner = ora(message);
  spinner.start();
  let result = await fn();
  spinner.succeed(); // 结束loading
  return result;
};

// 获取仓库列表
const fetchReposList = async () => {
  // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板
  const { data } = await axios.get(url);
  return data;
};

module.exports = {
  mapActions,
  fnLoadingByOra,
  fetchReposList,
};
