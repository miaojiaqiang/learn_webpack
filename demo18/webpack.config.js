const {resolve} = require('path')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

/**
 * 方案1 使用多入口        缺点，不够灵活
 * 方案2 通过 optimization 选项      缺点，只能用多入口文件，才能打包成多个js文件
 * 方案3 通过js代码实现，    见index.js
 */

module.exports = {
    // 单入口
    entry: './src/js/index.js',

    // entry: {
    //     // 多入口
    //     main: './src/js/index.js',
    //     test: './src/js/test.js'
    // },
    output: {
        // 文件名附带hash值，来做缓存
        // filename: 'js/built.[hash:10].js',
        // filename: 'js/built.[chunkhash:10].js',
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname,'build')
    },
    module: {

    },
    plugins: [

        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        /*
        1。将node_modules中代码单独打包到一个chunk最终输出
        2。多入口文件如果有公共依赖，会打包成一个单独的chunk
         */
        splitChunks: {
            chunks: 'all'
        }
    },
    mode: 'production',
}