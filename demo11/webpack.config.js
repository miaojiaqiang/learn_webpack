const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            //压缩html
            minify:{
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true,
            }
        }),
        new CleanWebpackPlugin()
    ],
    // 生产环境自动压缩js代码
    mode: 'production'
}