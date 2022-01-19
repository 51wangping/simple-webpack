const Complier = require('./complier');
const options = require('../simplepack.config')

new Complier(options).run(); // 执行complier 实例


// webpack 执行步骤
// 1. 创建 complier 实例, 写入配置
// 2. 执行 complier.run()
// 3. 执行 complier.buildModule() 
// 3.1 执行 complier.buildModule() 解析 ast
// 3.2 执行 complier.buildModule() {
// 返回数据
// {
//   filename, // 文件名
//   dependencies: getDependencies(ast),  // 依赖
//   source: transform(ast), // 源码
// }
// 4. 执行 complier.emitFiles() 写入文件