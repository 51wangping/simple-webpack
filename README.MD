# 简易版webpack

项目主要是阅读 webpack 源码后对webpack进行简易模仿实现的简易版本webpack

其中主要使用了 babylon 对代码进行解析， 并且形成 AST

使用babel-traverse 对代码中文件依赖分析

通过 babel-core 对 AST 进行转化为目标代码

### 整体流程

源码转化为 AST =>  AST 转化为目标代码 => 遍历依赖 => 进行字符串拼接 => 写入文件