/**
 *  指令
 *  webpack 将打包结果输出到output所在文件夹
 *  mpx webpack-dev-server 热加载，打包在内存中，实时更新
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    // 入口加入 html文件， 当devServer hot为true后可以热更新
    entry: ['./src/js/index.js','./src/index.html'],
    output: {
        filename:'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules:[
            {
                // 以下loader只会匹配一个，不用匹配多次
                // 注意： 不能有两个配置处理一种文件
                oneOf: [
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
        open: true,
        /**
         *  HMR：hot module replacement 热模块替换/模块热替换
         *  作用： 一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
         *      极大提升构建所读
         *
         *      样式文件：可以使用HMR功能：因为style-loader内部实现了
         *
         *      js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码 module.hot.accept
         *          HMR功能：只能处理非入口文件的其他文件
         *      html文件：默认不能使用HMR功能，同时html文件不能热更新了
         *          解决： 修改entry入口，将html文件引入
         */
        // 开启HMR功能
        hot: true
    },
    mode: 'development',
    /**
     * source-map
     * 源代码到构建后代码的映射技术，可以快速将错误定位到源代码
     *  inline-source-map ：内联source-map 只生成一个source-map
     *  hidden-source-map ：外联
     *  eval-source-map ：内联 每个文件都生成一个source-map
     *  nosources-souorce-map ：外部
     *  cheap-source-map：外部
     *  cheap-module-source-map 外部
     *
     *
     *  内联和外联的区别：1。外联生成新文件，内联没有2。内联速度快
     *
     *  开发环境：速度快，调试更友好
     *      速度快 ：eval>inline>cheap
     *          eval-cheap-source-map
     *          eval-source-map
     *
     *      一般使用 eval-source-map
     *   生产环境 : 不用内联，因为体积太大
     *      一般使用 source-map / cheap-module-source-map
     */
    devtool: 'eval-source-map'
}
