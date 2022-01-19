(
      function (modules) {
        function require(filename) {
          var fn = modules[filename];
          var module = { exports: {} };

          fn(require, module, module.exports);
          return module.exports;
        }
        require('/Users/bruce/Desktop/react-demo/simplepack/src/index.js');
      }
    )({'/Users/bruce/Desktop/react-demo/simplepack/src/index.js': function(require, module, exports) {"use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)('Dylan'));},'./greeting.js': function(require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var greeting = exports.greeting = function greeting(name) {
  return "hello " + name;
};},})