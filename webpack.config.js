const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const components = require('./components.json')
const package = require('./package.json')
const entry = {}
Object.keys(components).forEach(item => {
    entry[item] = components[item]
})
const {
    dependencies
} = package
const externals = {}
Object.keys(dependencies).forEach(item => {
    externals[item] = {
        commonjs: item,
        commonjs2: item,
        amd: item
    }
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
                test: /\.css$/,
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
    externals
}