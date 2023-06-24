(function (graph) {
  function require(file) {
    function absRequire(relPath) {
      return require(graph[file].deps[relPath]);
    }
    var exports = {};
    (function (require, exports, code) {
      eval(code);
    })(absRequire, exports, graph[file].code);
    return exports;
  }
  require("./src/index.js");
})({
  "./src/index.js": {
    deps: {
      "./add.js": "./src/add.js",
      "./minus.js": "./src/minus.js",
      "./demo/x.js": "./src/demo/x.js",
    },
    code: '"use strict";\n\nvar _add = _interopRequireDefault(require("./add.js"));\nvar _minus = require("./minus.js");\nvar _x = _interopRequireDefault(require("./demo/x.js"));\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\nvar sum = (0, _add["default"])(1, 2);\nvar sum2 = (0, _x["default"])(3, 4);\nvar division = (0, _minus.minus)(2, 1);\nconsole.log(sum);\nconsole.log(sum2);\nconsole.log(division);',
  },
  "./src/add.js": {
    deps: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\nvar _default = function _default(a, b) {\n  return a + b;\n};\nexports["default"] = _default;',
  },
  "./src/minus.js": {
    deps: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.minus = void 0;\nvar minus = function minus(a, b) {\n  return a - b;\n};\nexports.minus = minus;',
  },
  "./src/demo/x.js": {
    deps: { "../add.js": "./src/add.js" },
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\nvar _add = _interopRequireDefault(require("../add.js"));\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\nvar _default = _add["default"];\nexports["default"] = _default;',
  },
});
