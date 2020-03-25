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
        rules: [
            /**
             *  语法检查：eslint-loader eslint
             *  注意：只检查自己写的代码，第三方的库是不用检查的
             *  设置检查规则：
             *      package.json 中eslintConfig中设置
             *      airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
             *
             * 所以一共需要下载 eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
                }
            },

            /**
             * js兼容性处理：babel-loader @babel/core @babel/preset-env
             *
             * 1. 基本js兼容性处理 --》 @babel/present-env
             *      问题：只能转换基本语法，如promise不能转换
             * 2. 全部兼容性处理 --》 @babel/polyfill
             *      问题：我只要解决部分兼容性处理，但是将所有兼容性代码全部引入，梯级太大
             * 3. 需要兼容性处理的就做，按需加载 --》 core-js
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设：指示babel做怎么样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需下载
                                useBuiltIns: 'usage',
                                // 指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    mode: 'development'
}