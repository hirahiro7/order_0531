var gulp = require("gulp");
var paths = require("../paths.js");

var replace = require("gulp-replace");

//htmlファイル作成
gulp.task("deststg", function () {
  gulp
    .src(paths.dest.local.html + "*html")
    // css,js,imgのパス変換
    .pipe(replace('/_img/pc/', paths.url.pc + 'img/'))
    .pipe(replace('/pc/css/', paths.url.pc + 'css/'))
    .pipe(replace('/pc/js/', paths.url.pc + 'js/'))
    // .pipe(replace('src="/sp/', 'src="' + paths.url.sp))
    .pipe(gulp.dest(paths.dest.stg.html));
});
gulp.task("deststg:sp", function () {
  gulp
    .src(paths.destsp.local.html + "*html")
    // css,js,imgのパス変換
    .pipe(replace('/_img/pc/', paths.url.pc + 'img/'))
    .pipe(replace('/_img/sp/', paths.url.sp + 'img/'))
    .pipe(replace('/sp/css/', paths.url.sp + 'css/'))
    .pipe(replace('/sp/js/', paths.url.sp + 'js/'))
    .pipe(gulp.dest(paths.destsp.stg.html));
});

//cssファイル作成
gulp.task("deststg-css", function () {
  gulp
    .src(paths.dest.local.css + "!(base*)")
    .pipe(replace('/_img/pc/', paths.url.pc + 'img/'))
    .pipe(replace('/_img/sp/', paths.url.sp + 'img/'))
    .pipe(gulp.dest(paths.dest.stg.css));
});

gulp.task("deststg-css:sp", function () {
  gulp
    .src(paths.destsp.local.css + "!(base*)")
    .pipe(replace('/_img/pc/', paths.url.pc + 'img/'))
    .pipe(replace('/_img/sp/', paths.url.sp + 'img/'))
    .pipe(gulp.dest(paths.destsp.stg.css));
});

// jsファイル作成
gulp.task("dest-js", function () {
  gulp.src(paths.src.js)
    .pipe(replace("/pc/", paths.url.pc))
    .pipe(gulp.dest(paths.dest.local.js));
});
gulp.task("dest-js-watch", ["dest-js"], function () {
  var watcher = gulp.watch(paths.src.js, ["dest-js"]);
  watcher.on("change", function (event) {
    console.log(
      "File " + event.path + " was " + event.type + ", running tasks..."
    );
  });
});
gulp.task("deststg-js", function () {
  gulp
    .src(paths.dest.local.js + "/*.js")
    .pipe(replace("/pc/", paths.url.pc))
    .pipe(gulp.dest(paths.dest.stg.js));
});

gulp.task("dest-js:sp", function () {
  gulp
    .src(paths.srcsp.js)
    .pipe(replace("/pc/", paths.url.pc))
    .pipe(replace("/sp/", paths.url.sp))
    .pipe(gulp.dest(paths.destsp.local.js));
});
gulp.task("dest-js:sp-watch", ["dest-js:sp"], function () {
  var watcher = gulp.watch(paths.srcsp.js, ["dest-js:sp"]);
  watcher.on("change", function (event) {
    console.log(
      "File " + event.path + " was " + event.type + ", running tasks..."
    );
  });
});
gulp.task("deststg-js:sp", function () {
  gulp.src(paths.destsp.local.js + "/*.js").pipe(gulp.dest(paths.destsp.stg.js));
});

//imgファイル作成(local)
gulp.task("dest-img", function () {
  gulp.src(paths.image + "*.*").pipe(gulp.dest(paths.dest.local.img));
});
gulp.task("dest-img-watch", ["dest-img"], function () {
  var watcher = gulp.watch(paths.image + "*.*", ["dest-img"]);
  watcher.on("change", function (event) {
    console.log(
      "File " + event.path + " was " + event.type + ", running tasks..."
    );
  });
});
gulp.task("deststg-img", function () {
  gulp
    .src(paths.dest.local.img + "pc/*.*")
    .pipe(gulp.dest(paths.dest.stg.img));
});
gulp.task("deststg-img:sp", function () {
  gulp
    .src(paths.dest.local.img + "sp/*.*")
    .pipe(gulp.dest(paths.destsp.stg.img));
});
