const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const externals = {
}

module.exports = {
  entry: { main: './demo/main' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue']
  },
  plugins: [new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: 'main.css'
  })],
  externals,
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {
    }
  }
}
