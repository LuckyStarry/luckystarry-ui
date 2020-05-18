const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const components = require('./components.json')
const entry = {}
Object.keys(components).forEach(item => {
    entry[item] = components[item]
})

module.exports = {
    entry,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'lib'),
        library: 'LuckystarryUI',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: ['babel-loader', 'ts-loader'],
                        scss: ['css-loader', 'sass-loader']
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '/theme/[name].css'
        })
    ],
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        },
        vuex: {
            root: 'Vuex',
            commonjs: 'vuex',
            commonjs2: 'vuex',
            amd: 'vuex'
        },
        ['luckystarry-ui-utils']: {
            root: 'lsui',
            commonjs: 'luckystarry-ui-utils',
            commonjs2: 'luckystarry-ui-utils',
            amd: 'luckystarry-ui-utils'
        },
        ['vue-class-component']: {
            commonjs: 'vue-class-component',
            commonjs2: 'vue-class-component',
            amd: 'vue-class-component'
        },
        ['screenfull']: {
            commonjs: 'screenfull',
            commonjs2: 'screenfull',
            amd: 'screenfull'
        }
    },
}