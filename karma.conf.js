const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: ['test/**/*.spec.ts'],
    preprocessors: {
      '**/*.spec.ts': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'lib')
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
            use: ['css-loader', 'sass-loader']
          },
          {
            test: /\.css$/,
            use: ['css-loader', 'sass-loader']
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js', '.vue']
      },
      plugins: [new VueLoaderPlugin()]
    },
    browsers: ['ChromeHeadless'],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [{ type: 'lcovonly' }, { type: 'text-summary' }]
    }
  })
}
