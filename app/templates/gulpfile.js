var ADDON_NAME = '<%= addon_name %>';


var gulp = require('gulp');
var transform = require('vinyl-transform');
var rename = require('gulp-rename');
var del = require('del');
var sass = require('gulp-ruby-sass');
var cssshrink = require('gulp-cssshrink');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var uglify = require('gulp-uglify');


gulp.task('clean', function () {
  del([
    'web/css/**/*',
    'web/js/**/*'
  ]);
});


gulp.task('jscopy', function () {
  return gulp.src([
      'node_modules/angular/angular.js',
      'node_modules/angular/angular.min.js',
      'node_modules/angular/angular.min.js.map',
      'node_modules/lodash/dist/lodash.min.js'
    ])
    .pipe(gulp.dest('web/js'));
});


gulp.task('csscopy', function () {
  return gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css'
    ])
    .pipe(gulp.dest('web/css'));
});


gulp.task('fontcopy', function () {
  return gulp.src([
      'node_modules/bootstrap/dist/fonts/*',
      'node_modules/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('web/fonts'));
});


gulp.task('init', ['clean', 'jscopy', 'csscopy', 'fontcopy'], function () {});


gulp.task('jshint', function () {
  return gulp.src('web/src/**/*.js')
    .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});



gulp.task('js', ['jshint'], function () {
  var browserified = transform(function (filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src('web/src/*.js')
    .pipe(browserified)
    .pipe(rename(ADDON_NAME + '.js'))
      .pipe(gulp.dest('web/js'));
    // .pipe(uglify())
    //   .pipe(rename(ADDON_NAME + '.min.js'))
    //   .pipe(gulp.dest('web/js'));
});


gulp.task('default', [ 'jshint' ], function () {});
gulp.task('build', [ 'css', 'js' ], function () {});
