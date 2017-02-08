const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const is_production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        app: [
            './src/main.js',
        ],
        vendor: [
            'vue',
            'vue-router',
            'vuex',
            'vue-material',
            'axios'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
        filename: 'js/[name].js'
    },
    module: {
        noParse: /node_modules\/(jquey|moment|chart\.js)/,
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: 'vue-style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap',
                        scss: 'vue-style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap',
                    }
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader?sourceMap!postcss-loader?sourceMap!resolve-url-loader!sass-loader?sourceMap',
                    fallback: 'style-loader?sourceMap'
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=8192',
                options: {
                    name: 'images/[name]-[hash:5].[ext]',
                    publicPath: '../'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '../'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.min.js',
            'vue-router': 'vue-router/dist/vue-router.min.js',
            'vuex': 'vuex/dist/vuex.min.js',
            'axios': 'axios/dist/axios.min.js',
        },
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    plugins: [
        // new webpack.LoaderOptionsPlugin({}),
        // new webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
        // "window.jQuery": 'jquery',
        // }),
        new ExtractTextPlugin('css/app.css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        //new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new HtmlWebpackPlugin({
            title: 'vue2',
            template: './src/index.html',
            filename: './index.html',
            inject: true,
            //favicon: 'client/assets/logo.png'
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            },
            hash: true
        })
    ],
    externals: {//扩展 window 对象
        // 'AMap': 'AMap'
    },
    performance: {
        hints: false, //关闭警告
    },
    devtool: '#cheap-module-eval-source-map',//cheap-module-eval-source-map | cheap-module-source-map | eval | eval-source-map
    devServer: {
        // https: true,
        historyApiFallback: true,
        noInfo: true,
        compress: true,
        contentBase: "./dist/",
        host: '0.0.0.0',
        port: 3000, //Math.floor(Math.random() * (65535 - 1024)) + 1024,
    },
};

if (is_production) {
    // module.exports.devtool = '#source-map';
    // module.exports.devtool = '#cheap-module-source-map';
    module.exports.devtool = false;
    //http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
