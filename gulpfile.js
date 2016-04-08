/* Modules import */
var gulp = require('gulp'),
  less = require('gulp-less'),
  path = require('path'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  data = require('gulp-data'),
  gulpCopy = require('gulp-copy'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

var paths = {
  stylesheets: ['./less/**/*.less'],
  lib: [
    './public/lib/jquery.js',
    './public/lib/bootstrap.js',
    './public/lib/angular.js',
    './public/lib/angular-cookies.js',
    './public/lib/angular-notifications.js',
    './public/lib/angular-slider.js'
  ],
  js: [
    './public/js/**/*.js',
  ]
};

/* Gulp plugins */
var LessPluginCleanCSS = require('less-plugin-clean-css'),
  cleancss = new LessPluginCleanCSS({
    'advanced': true
  });

/* Complie Less files */
gulp.task('less', function() {
  gulp.src(['./less/bootstrap/bootstrap.less', './less/bootstrap/theme.less', './less/style.less'])
    .pipe(less({
      plugins: [cleancss]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('build-bundle', function() {
  return gulp.src(paths.js)
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('build-vendors', function() {
  return gulp.src(paths.lib)
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/assets'));
});

/* Watch files */
gulp.task('watch', function() {
  gulp.watch(paths.stylesheets, ['less']);
  gulp.watch(paths.js, ['build-bundle']);
});

gulp.task('default', ['less']);
