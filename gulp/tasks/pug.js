var gulp = require('gulp');
var pug = require('gulp-pug');
var fdata = require('gulp-data');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var paths = require('../paths.js');
var jsoncombine = require("gulp-jsoncombine");

var pugOptions = {
  pretty: true
};

// pugコンパイル
gulp.task('pug', function () {
  // json結合
  gulp
    .src([paths.src.data, paths.datacommon])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(jsoncombine("result.js", function (data, meta) {
      // pugコンパイル
      gulp
        .src(paths.src.pug)
        .pipe(
          plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
        )
        .pipe(fdata(function (file) {
          return { json: data }
        }))
        .pipe(pug(pugOptions))
        .pipe(gulp.dest(paths.dest.local.html));
    }));
});
gulp.task('pug-watch', ['pug'], function () {
  var watcher = gulp.watch([paths.src.data, paths.datacommon, '../src/pc/**/*.pug'], ['pug']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

// pugコンパイル(SP)
gulp.task('pug:sp', function () {
  // json結合
  gulp
    .src([paths.srcsp.data, paths.datacommon])
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(jsoncombine("result.js", function (data, meta) {
      // pugコンパイル
      gulp
        .src(paths.srcsp.pug)
        .pipe(
          plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
        )
        .pipe(fdata(function (file) {
          return { json: data }
        }))
        .pipe(pug(pugOptions))
        .pipe(gulp.dest(paths.destsp.local.html));
    }));
});
gulp.task('pug:sp-watch', ['pug:sp'], function () {
  var watcher = gulp.watch([paths.srcsp.data, paths.datacommon, '../src/sp/**/*.pug'], ['pug:sp']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
