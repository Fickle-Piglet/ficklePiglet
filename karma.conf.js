module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
        'src/test/*.spec.js'
    ],

    reporters: ['progress'],
    // plugins: ['karma-mocha', 'karma-chai', 'karma-sinon'],
    // port: 9876,
    // colors: true,
    autoWatch: false,
    singleRun: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // logLevel: config.LOG_INFO,

    browsers: ['PhantomJS']

  });
};