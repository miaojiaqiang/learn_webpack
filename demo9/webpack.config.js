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
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
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