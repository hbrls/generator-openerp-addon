var ADDON_NAME = '<%= addon_name %>';
var ADDON_SHORT = '<%= addon_short %>';


var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var cssshrink = require('gulp-cssshrink');
var minifyCSS = require('gulp-minify-css');


gulp.task('jscopy', function () {
  return gulp.src([
      'node_modules/lodash/dist/lodash.min.js',
      'node_modules/stompjs/lib/stomp.min.js',
    ])
    .pipe(gulp.dest('<%= static_dir %>/js'));
});


gulp.task('csscopy', function () {
  return gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css'
    ])
    .pipe(gulp.dest('<%= static_dir %>/css'));
});


gulp.task('fontcopy', function () {
  return gulp.src([
      'node_modules/bootstrap/dist/fonts/*',
      'node_modules/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('<%= static_dir %>/fonts'));
});


function complie_css(app_name) {
  return function () {
    return gulp
      .src('<%= static_dir %>/sass/' + app_name + '/style.scss')
      .pipe(sass({
        style: 'expanded',
        'sourcemap=none': true,
        noCache: true
      }))
        .on('error', function (err) { console.log(err.message); })
        .pipe(rename(app_name + '.css'))
        .pipe(gulp.dest('<%= static_dir %>/css'))
      .pipe(cssshrink())
      .pipe(minifyCSS({ keepBreaks: true }))
        .pipe(rename(app_name + '.min.css'))
        .pipe(gulp.dest('<%= static_dir %>/css'));
  };
}


gulp.task('css:example', complie_css('example'));


gulp.task('css', ['css:example']);


gulp.task('jscs', shell.task(['npm run jscs -s'], { quiet: true, errorMessage: '\nERROR_TEMPLATE' }));

gulp.task('jsxhint', ['jscs'], shell.task(['npm run jsxhint -s'], { quiet: true, errorMessage: '\nERROR_TEMPLATE' }));

gulp.task('js', ['jsxhint'], shell.task(['npm run browserify -s', 'npm run uglify -s'], { quiet: true, errorMessage: '\nERROR_TEMPLATE' }));

gulp.task('build', ['jsxhint'], shell.task(['npm run buildjs -s'], { quiet: true, errorMessage: '\nERROR_TEMPLATE' }));
