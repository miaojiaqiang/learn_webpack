/*
所有构建工具都是基于nodejs平台运行的
webpack配置文件 模块化采用commonjs 而不是es6语法
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [
            //         // node_modules如果本项目没有，会自动从上级目录查找
            //         // 创建style标签，将js中样式资源插入进去，添加到head中生效
            //         'style-loader',
            //         // 将css文件变成commonjs模块加载到js中，里面是字符串
            //         'css-loader'
            //     ]
            // },
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
            },
            {
                // 处理不了html中img图片
                test: /\.(jpg|png|jpeg|gif)$/,
                // 需要下载url-loader,和file-loader两个包
                loader: 'url-loader',
                options: {
                    // 图片小于8kb，就会被base64处理
                    limit: 8*1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                    // 解析img标签时会出现问题：【object Moudle]
                    // 解决：关闭url-loader中的es6模块化，使用commonjs解析
                    esModule: false,
                    // 图片重命名
                    // [hash:10]取图片hash前10位
                    name: '[hash:10].[ext]'
                    // name: '[name].[ext]'
                }
            },
            {
                test: /\.html$/,
                // 处理html文件中的img图片（负责引入img，从而能被url-loader处理）
                loader: 'html-loader'
            },
            {
                // 加载字体用file-loader，  file-loader在下载url-loader时默认下载了
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    },
    plugins: [
        // 打包前，删除指定目录文件
        new CleanWebpackPlugin(),
        // 创建一个空的html，自动引入打包后的所有资源（js/css)
        new HtmlWebpackPlugin({
            // 复制 './src/index.html'，代替空的html
            template:'./src/index.html'
        })
    ],
    mode: 'development'
}