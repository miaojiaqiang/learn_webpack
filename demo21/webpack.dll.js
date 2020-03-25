/*
    使用 dll技术对某些库（jquery,react,vue）单独打包

    命令 webpack --config webpack.dll.js
 */

const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        //最终打包生成的[name] --> jquery
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]', // 打包的库里面向外暴露出的内容叫什么名字
    },
    plugins: [
        // 打包生成一个manifest.json文件 --》提供 jquery映射
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: resolve(__dirname,'dll/manifest.json')
        })
    ],
    mode: 'production'
}