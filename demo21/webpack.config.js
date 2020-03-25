/*
所有构建工具都是基于nodejs平台运行的
webpack配置文件 模块化采用commonjs 而不是es6语法
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },
    plugins: [
        // 打包前，删除指定目录文件
        new CleanWebpackPlugin(),
        // 创建一个空的html，自动引入打包后的所有资源（js/css)
        new HtmlWebpackPlugin({
            // 复制 './src/index.html'，代替空的html
            template:'./src/index.html'
        }),

        // 告诉webpack哪些库不参与打包
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),

        // 蒋某个文件打包输出去，并在html中自动引入
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
    ],
    mode: 'development'
}