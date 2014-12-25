var ADDON_NAME = '<%= addon_name %>';
var ADDON_SHORT = '<%= addon_short %>';


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
      'node_modules/lodash/dist/lodash.min.js',
      'node_modules/stompjs/lib/stomp.min.js',
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


function complie_css(app_name) {
  return function () {
    return gulp
      .src('web/sass/' + app_name + '/style.scss')
      .pipe(sass({
        style: 'expanded',
        'sourcemap=none': true,
        noCache: true
      }))
        .on('error', function (err) { console.log(err.message); })
        .pipe(rename(app_name + '.css'))
        .pipe(gulp.dest('web/css'))
      .pipe(cssshrink())
      .pipe(minifyCSS({ keepBreaks: true }))
        .pipe(rename(app_name + '.min.css'))
        .pipe(gulp.dest('web/css'));
  };
}


gulp.task('css:example', complie_css('example'));


gulp.task('css', ['css:example']);


function validate_js(app_name) {
  return function () {
    return gulp
      .src('web/src/' + app_name + '/**/*.js')
      .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
  };
}


gulp.task('jshint:example', validate_js('example'));


gulp.task('jshint', ['jshint:example']);


var browserified = transform(function (filename) {
  var b = browserify(filename);
  return b.bundle();
});


function compile_js(app_name) {
  return function () {
    return gulp
      .src('web/src/' + app_name + '*.js')
      .pipe(browserified)
      .pipe(rename(app_name + '.js'))
        .pipe(gulp.dest('web/js'));
      // 暂时没有做 sourcemap，不压缩
      // .pipe(uglify())
      //   .pipe(rename(app_name + '.min.js'))
      //   .pipe(gulp.dest('web/js'));
  };
}


gulp.task('js:example', ['jshint:example'], compile_js('example'));


gulp.task('js', ['js:example']);


gulp.task('default', ['jshint']);
gulp.task('build', ['css', 'js']);
gulp.task('init', ['clean', 'jscopy', 'csscopy', 'fontcopy', 'build']);
