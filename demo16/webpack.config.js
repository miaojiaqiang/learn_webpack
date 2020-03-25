const {resolve} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 在package.json中添加browseslist字段
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')
            ]
        }
    }
]

/**
 *  缓存
 *      babel缓存
 *          cacheDirectory：true
 *      文件资源缓存
 *          hash： 文件名附带hash值，来做缓存
 *             问题：如果重新打包，会导致所有缓存失效，（可能我只改动一个）
 *          chunkhash: 如果哦打包来源于同一个chunk，hash值就一样
 *              问题： js和css的hash还是一样的，
 *                  因为css是通过js引入的，所以属于同一个chunk
 *          contenthash: 根据文件内容生成hash，不同文件hash不一样
 */


/**
 * tree shaking: 去除无用代码，生产环境自动
 *  前提：1。必须使用es6模块化代码 2。开启production
 *  作用：减小代码体积
 *
 *  在package.json 中配置
 *      "sideEffects":false 所有代码都是没有副作用的代码
 *      问题：可能会把css / @babel/polyfill 文件干掉
 *      解决  "sideEffects":["*.css","*.less"]
 */

module.exports = {
    entry: './src/js/index.js',
    output: {
        // 文件名附带hash值，来做缓存
        // filename: 'js/built.[hash:10].js',
        // filename: 'js/built.[chunkhash:10].js',
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname,'build')
    },
    module: {
        rules:[
            /**
             * 正常来讲，一个文件智能被一个loader处理。
             * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
             * 先执行eslint再执行babel
             */
            {
                // 在package.json中eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
                // 以下loader只会匹配一个，不用匹配多次
                // 注意： 不能有两个配置处理一种文件
                oneOf: [
                    {
                        test: /\.css$/,
                        // 规则是从下往上加载的
                        use: [
                            ...commonCssLoader
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            ...commonCssLoader,
                            'less-loader'
                        ]
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: {version:3},
                                        targets: {
                                            chrome: '60',
                                            firefox: '50'
                                        }
                                    }
                                ]
                            ],
                            //开启babel缓存
                            // 第二次构建时，会读取之前的缓存
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.(jpg|png|gif)/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            outputPath:'images',
                            esModule: false
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        exclude: /\.(js|css|less|html|jpg|png|gif)/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 文件名附带hash值
            // filename: 'css/built.[hash:10].css'
            // filename: 'css/built.[chunkhash:10].css'
            filename: 'css/built.[contenthash:10].css'
        }),
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
    mode: 'production',
    devtool: 'source-map'
}