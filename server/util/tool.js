let fs = require("fs");
let path = require("path");

/**
 * 自动 require 指定目录的所有文件
 * 1、先读取文件夹，获取文件的所有文件
 * 2、对获取的文件进行遍历，用fs.stat 获得文件状态，
 * 3、通过状态中的stat.isFile()判断是否是一个文件，是文件直接输出文件名，不是文件就继续递归。
 * @param url 读取的目录
 */
function recursionRequireFile(url, array) {
  fs.readdir(url, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      //拼接获取绝对路径，fs.stat(绝对路径,回调函数)
      let fPath = path.join(url, file);
      fs.stat(fPath, (err, stat) => {
        if (stat.isFile()) {
          require(url + "/" + file);
        } else {
          recursionRequireFile(fPath, array);
        }
      });
    });
  });
}

export { recursionRequireFile };
