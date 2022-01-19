const { getAST, getDependencies, transform } = require('./parse')
const path = require('path');
const fs = require('fs');
const { filename } = require('babel-core/lib/transformation/file/options/config');


module.exports = class Complier {

  constructor(options){
    const {entry, output} = options;

    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  run() {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);

    // 遍历依赖，解析依赖的模块
    this.modules.forEach(_module => {
      _module.dependencies.map(dep => {
        this.modules.push(this.buildModule(dep));
      })
    })
    this.emitFiles();
  }

  buildModule( filename, isEntry) {
    let ast 
    if(isEntry) {
      ast = getAST(filename);
    } else {
      const absolutePath = path.join(process.cwd(), './src', filename); // 获取绝对路径
      ast = getAST(absolutePath);
    }

    return {
      filename, // 文件名
      dependencies: getDependencies(ast),  // 依赖
      source: transform(ast), // 源码
    }
  }

  // 文件写入
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);

    let modules = '';

    this.modules.forEach(_module => { 
      modules += `'${_module.filename}': function(require, module, exports) {${_module.source}},`;
     })
     // 模块拼接 形成 key value 形式 
    // {
    //   key: filename,
    //   value: function(require, module, exports) {
    //     // 源码
    //   }
    // }

    const bundle = `(
      function (modules) {
        function require(filename) {
          var fn = modules[filename];
          var module = { exports: {} };

          fn(require, module, module.exports);
          return module.exports;
        }
        require('${this.entry}');
      }
    )({${modules}})`

    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
}