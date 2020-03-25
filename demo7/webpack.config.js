

/**
 *  指令
 *  webpack 将打包结果输出到output所在文件夹
 *  mpx webpack-dev-server 热加载，打包在内存中，实时更新
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 提取css的插件
const MiniCssPlugin = require('mini-css-extract-plugin')

// 设置nodejs环境变量  ；如果不设置默认调用 browserslist：production的配置
// process.env.NODE_ENV = 'development'


module.exports = {
    entry: './src/js/index.js',
    output: {
        filename:'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules:[
            {
                // 处理css
                test: /\.css$/,
                use: [
                    // 创建style标签，将样式放入
                    // 'style-loader',

                    // 这个loader取代style-loader。提取js中css成单独文件
                    MiniCssPlugin.loader,
                    // 将css文件整合到js文件中
                    'css-loader',

                    // css 兼容性处理： postcss --> postcss-loader postcss-preset-env
                    // 作用：帮助 postcss找到package.json中 browserslist 里面的配置，通过配置加载指定的css兼容性样式
                    /**
                     * "browserslist": {
                     * //开发环境 --》 设置node环境变量： process.env.NODE_ENV = development
                        "development": [
                          "last 1 chrome version",
                          "last 1 firefox version",
                          "last 1 safari version"
                        ],
                        // 生产环境 默认就是生产环境
                        "production": [
                          ">0.1%",
                          "not dead",
                          "not op_mini all"
                        ]
                      }
                     */
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                //postcss 的插件
                                require('postcss-preset-env')
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 处理html文件的打包
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 打包前清空打包文件夹
        new CleanWebpackPlugin(),
        new MiniCssPlugin({
            filename: 'css/built.css'
        })
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