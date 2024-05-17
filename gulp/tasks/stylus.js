var gulp = require("gulp");
var paths = require('../paths.js');
var gulpStylus = require('gulp-stylus');
var postcss = require("gulp-postcss");
var postcssGapProperties = require("postcss-gap-properties");
var autoprefixer = require("autoprefixer");
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var replace = require("gulp-replace");

// stylusコンパイル
gulp.task("stylus", function () {
  gulp.src(paths.src.stylus)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    // stylus
    .pipe(gulpStylus())
    //プレフィックス
    .pipe(postcss([
      postcssGapProperties(),
      autoprefixer({
        cascade: false,
        grid: true,
        browsers: [
          "last 2 versions",
          "ie >= 11",
          "Android >= 4"
        ]
      })
    ]))
    // backgroundのpath直す
    .pipe(gulp.dest(paths.dest.local.css));
});
gulp.task('stylus-watch', ['stylus'], function () {
  // _**.stylもwatch対象
  var watcher = gulp.watch('../src/pc/stylus/**/*.styl', ['stylus']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

// stylusコンパイル:SP
gulp.task("stylus:sp", function () {
  gulp.src(paths.srcsp.stylus)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    // stylus
    .pipe(gulpStylus())
    //プレフィックス
    .pipe(postcss([
      postcssGapProperties(),
      autoprefixer({
        cascade: false,
        grid: true,
      })
    ]))
    // backgroundのpath直す
    .pipe(replace('url("../../../_img/pc/', 'url("../../_img/pc/'))
    .pipe(replace('url("../../../_img/sp/', 'url("../../_img/sp/'))
    .pipe(replace('url("../../../../_img/pc/', 'url("../../_img/pc/'))
    .pipe(replace('url("../../../../_img/sp/', 'url("../../_img/sp/'))
    .pipe(gulp.dest(paths.destsp.local.css));
});
gulp.task('stylus:sp-watch', ['stylus:sp'], function () {
  // _**.stylもwatch対象
  var watcher = gulp.watch('../src/sp/stylus/**/*.styl', ['stylus:sp']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});