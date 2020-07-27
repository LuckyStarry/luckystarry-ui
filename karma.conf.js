const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: ['test/**/*.spec.ts'],
    exclude: ['*.vue'],
    preprocessors: {
      '**/*.spec.ts': ['webpack']
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
            test: /\.[t|j]s(x?)$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true }
            },
            enforce: 'post',
            exclude: [/node_modules/, /\.spec\.ts$/, /component\.ts/]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: ['babel-loader']
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
    reporters: ['coverage-istanbul'],
    coverageIstanbulReporter: {
      dir: './coverage',
      reports: ['lcov', 'text', 'text-summary'],
      includeAllSources: true,
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false
    }
  })
}
