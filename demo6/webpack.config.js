/**
 *  指令
 *  webpack 将打包结果输出到output所在文件夹
 *  mpx webpack-dev-server 热加载，打包在内存中，实时更新
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename:'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules:[
            // webpack 默认只处理js，json
            {
                // 处理less
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 处理css
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                // 处理样式中的图片资源
                test: /\.(jpg|png|gif|jpeg)$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    // 小于8k的使用base64显示
                    limit: 8 * 1024,
                    // 关闭es6模块化，因为html-loader使用commonjs引入的img
                    esModule: false,
                    // 输出到images目录
                    outputPath: 'images',
                }
            },
            {
                // 处理html img标签中的图片资源
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理其他资源 字体色什么的
                exclude: /\.(html|js|css|less|jpg|jpeg|png|gif)/,
                // 加载字体用file-loader，  file-loader在下载url-loader时默认下载了
                // test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media',

                }
            }
        ]
    },
    plugins: [
        // 处理html文件的打包
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 打包前清空打包文件夹
        new CleanWebpackPlugin()
    ],
    devServer: {
        // 热加载
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    },
    mode: 'development'
}