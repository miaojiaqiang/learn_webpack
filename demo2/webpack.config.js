/*
所有构建工具都是基于nodejs平台运行的
webpack配置文件 模块化采用commonjs 而不是es6语法
 */
const { resolve } = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // node_modules如果本项目没有，会自动从上级目录查找
                    // 创建style标签，将js中样式资源插入进去，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载到js中，里面是字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // 创建style标签，将js中样式资源插入进去，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载到js中，里面是字符串
                    'css-loader',
                    // 需要下载less，less-loader两个包
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin()
    ],
    mode: 'development'
}