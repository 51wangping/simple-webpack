
const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');


module.exports = {
  // 通过路径获取文件内容 使用 babylon 解析
  getAST: (path) => {
    const content = fs.readFileSync(path, 'utf8');
    const ast = babylon.parse(content, {
      sourceType: 'module',
    });
    return ast;
  },
  // 依赖分析
  getDependencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({node}) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  },
  // 将 ast 解析成源码
  transform : (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['env'],
    });
    return code;
  }
}