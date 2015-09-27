/* Modules import */
var gulp = require('gulp'),
  less = require('gulp-less'),
  path = require('path');

var paths = {
  stylesheets: ['./less/**/*.less'],
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

/* Watch files */
gulp.task('watch', function() {
  gulp.watch(paths.stylesheets, ['less']);
});

gulp.task('default', ['less']);
