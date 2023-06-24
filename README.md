# 实现一个简单的webpack
教程文档参考此：https://juejin.cn/post/6854573217336541192

webpack构建过程大致分为以下几步：
1. 读取及合并所有配置参数
2. 加载各种插件
3. 根据entry配置找到入口文件，通过babel翻译为抽象语法树AST
4. 遍历AST，收集依赖，得到依赖：该文件的绝对地址为key、该文件所有依赖相对地址及绝对地址、通过AST转化为ES5的低版本代码
5. 递归对所有依赖进行转化生成依赖树
6. 实现require及exports方法结合依赖树构成一个chunk，将其写入对应的文件中
7. 在html中引入对应打包的入口文件

一个chunk的结构大致如下：
其是一个自执行函数，上下文相当于是依赖树，我们默认require入口文件，根据require中入口文件的地址在依赖树中找到对应的ES5的代码进行自执行，执行的过程中传入require方法及exports对象进行递归其他依赖
``` javascript
const bundle = (file) => {
  const depsGraph = JSON.stringify(parseModule(file));
  return `(function (graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`;
}; 
```
