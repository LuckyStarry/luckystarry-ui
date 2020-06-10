const webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: ['test/**/*.spec.ts'],
    preprocessors: {
      '**/*.spec.ts': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    reporters: ['spec'],
    browsers: ['PhantomJS']
  })
}
