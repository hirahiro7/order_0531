var gulp = require("gulp");

var runsequence = require("run-sequence");
var requireDir = require("require-dir");
var config = require("./paths.js");

requireDir("./tasks", { require: true });

/*
 ** ローカルデータ作成オールインワン(pc sp)
 ** 1.pugのコンパイル(path変換)
 ** 2.imgの移動
 ** 3.stylusのコンパイル(path変換)
 ** 4.jsのコンパイル(path変換)
 ** 5.ブラウザシンク
 */
gulp.task("dest-watch", function(callback) {
  return runsequence(
    "pug-watch",
    "dest-img-watch",
    "stylus-watch",
    "dest-js-watch",
    "localhost-watch",
    callback
  );
});
gulp.task("dest:sp-watch", function(callback) {
  return runsequence(
    "pug:sp-watch",
    "dest-img-watch",
    "stylus:sp-watch",
    "dest-js:sp-watch",
    "localhost-watch",
    callback
  );
});

/*
 ** ステージングデータ作成オールインワン
 ** 1.htmlファイルをstg用に作成
 ** 2.imgの移動
 ** 3.cssファイルをstg用に作成
 ** 4.jsファイルをstg用に作成
 */
gulp.task("dest-stg", function(callback) {
  return runsequence(
    "deststg",
    "deststg-img",
    "deststg-css",
    "deststg-js",
    callback
  );
});
gulp.task("dest:sp-stg", function(callback) {
  return runsequence(
    "deststg:sp",
    "deststg-img:sp",
    "deststg-css:sp",
    "deststg-js:sp",
    callback
  );
});
