const axios = require("axios");
const inquirer = require("inquirer");

const { fnLoadingByOra, fetchReposList } = "./utils/common.js";

const url = "https://api.github.com/users/tangxiaojun1996/repos";

module.exports = async (projectName) => {
  console.log(`enter create.js, projectName: ${projectName}`);
  const repos = await fnLoadingByOra(
    fetchReposList,
    "正在获取git仓库的repo列表..."
  );

  const reposNameList = repos.map((i) => i.name);
  console.log("reposNameList: ", reposNameList);

  const selectedRepo = await inquirer.prompt([
    {
      type: "list",
      name: "repo",
      message: "请选择一个你要创建的项目",
      choices: reposNameList,
    },
    {
      type: "confirm",
      name: "confirm",
      message: "你确定使用这个吗?",
      default: true,
    },
  ]);
  console.log("selectedRepo", selectedRepo);
};
