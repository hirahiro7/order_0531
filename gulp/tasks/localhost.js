var gulp = require("gulp");
var browserSync = require('browser-sync');
var paths = require('../paths.js');

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('localhost', function () {
  browserSync({
    server: {
      baseDir: paths.root
    }
  });
});
gulp.task('localhost-watch', ['localhost'], function () {
  gulp.watch([paths.root + '**/*.html', paths.root + '**/**/*.css', paths.root + '**/*.js'], ['bs-reload']);
});