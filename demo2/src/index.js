/*
    index.js: webpacl入口文件
    1. 运行指令
        开发环境 webpack ./src/index.js -o ./build/built.js --mode=development
        生产环境 webpack ./src/index.js -o ./build/built.js --mode=production
    结论
        1。webpack 能处理js，json资源，不能处理css/img资源
        2。生产环境和开发环境将es6模块化编译成浏览器可识别的模块化
        3。生产环境多一个压缩js代码的功能
*/
/**
 * 引入json
 */
import name from './index.json'
console.log(name)

/**
 * 引入css
 */
import './index.css';
/*
引入less
 */
import './index.less';

function add(x,y) {
    return x + y;
}
console.log(add(1,2))

