module.exports = {
  src: {
    pug: ["../src/pc/*.pug", "!" + "../src/pc/**/_*.pug"],
    data: "../src/pc/_data/*.json",
    stylus: [
      "../src/pc/stylus/dest/*.styl",
      "../src/pc/stylus/dest/**/*.styl",
      "!" + "../src/pc/stylus/**/_*.styl"
    ],
    js: "../src/pc/js/**/*.js"
  },
  srcsp: {
    pug: ["../src/sp/*.pug", "!" + "../src/sp/**/_*.pug"],
    data: "../src/sp/_data/*.json",
    stylus: [
      "../src/sp/stylus/dest/*.styl",
      "../src/sp/stylus/dest/**/*.styl",
      "!" + "../src/sp/stylus/**/_*.styl"
    ],
    js: "../src/sp/js/**/*.js"
  },
  datacommon: "../src/_datacommon/*.json",
  image: "../src/_img/**/",
  root: "../dest/local/",
  dest: {
    local: {
      html: "../dest/local/pc/",
      css: "../dest/local/pc/css/",
      js: "../dest/local/pc/js/",
      img: "../dest/local/_img/"
    },
    stg: {
      html: "../dest/stg/pc/",
      css: "../dest/stg/pc/css/",
      js: "../dest/stg/pc/js/",
      img: "../dest/stg/_img/pc/"
    }
  },
  destsp: {
    local: {
      html: "../dest/local/sp/",
      css: "../dest/local/sp/css/",
      js: "../dest/local/sp/js/",
      img: "../dest/local/_img/"
    },
    stg: {
      html: "../dest/stg/sp/",
      css: "../dest/stg/sp/css/",
      js: "../dest/stg/sp/js/",
      img: "../dest/stg/_img/sp/"
    }
  },
  url: {
    pc: "/s/feels/orders/",
    sp: "/res/s/feels/orders/"
  }
};
