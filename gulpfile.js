var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var KarmaServer = require('karma').Server;

// Lint Task
gulp.task('lint', function() {
    return gulp.src('client/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/styles.css'],
  test: ['specs/**/*.js']
};

gulp.task('start', ['serve'], function () {
  sync({
    notify: true,
    // address for server,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:5050'
  });
});

gulp.task('karma', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('serve', function () {
  nodemon({
    script: './server/server.js',
    ignore: 'node_modules/**/*.js'
  });
});

gulp.task('default', ['start']);