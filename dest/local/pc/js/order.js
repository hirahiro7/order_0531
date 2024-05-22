; (function ($) {

  //animation END
  const ANIMATIONONEND = 'webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend';
  //transition END
  const TRANSITIONEND = 'webkitTransitionEnd MozTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionEnd transitionend';

  // タッチorスクロールイベント
  const TOUCHSTART = 'ontouchend' in document ? 'touchstart' : 'mousedown';
  const TOUCHMOVE = 'ontouchend' in document ? 'touchmove' : 'mousemove';
  const TOUCHEND = 'ontouchend' in document ? 'touchend' : 'mouseup';

  // スクロールバー横幅
  let SCROLLWIDTH = 0;


  $(document).ready(function () {

    // lenis
    const lenis = (() => {
      const lenis = new Lenis()
      // lenis.on('scroll', (e) => {
      //   console.log(e)
      // });

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    })();


    var anchor = (function () {
      $(".anchor-item").on("click", function () {
        var speed = 400;
        var num = $(this).index();
        var offset = -100;
        var position = $(".sec-area").eq(num).offset().top + offset;
        var landing = $(window).scrollTop() > position ? -10 : 10;

        $("html,body").animate(
          { scrollTop: position - landing },
          speed,
          "swing",
          function () {
            $("html,body").animate({ scrollTop: position }, speed, "swing");
          }
        );
      });
    })();

    const fixedTab = (() => {
      $(window).on("load", function () {
        var targetSel = $('.p-itemarea__category');
        var parentSel = $('.p-category');
        targetSel.css('min-height', parentSel.height());
      });

      $(window).on("load scroll", function () {
        var wself = $(this);
        var targetSel = $('.p-itemarea__category');
        var windowTop = wself.scrollTop();
        var targetTop = targetSel.offset().top;

        if (windowTop >= targetTop) {
          targetSel.addClass('is-fixed');
        } else {
          targetSel.removeClass('is-fixed');
        }
      });
    })();

    const toggleItem = (() => {
      $('.c-category').on('click', function () {
        var index = $(this).index();
        $(this).addClass('is-active').siblings().removeClass('is-active');
        $('.p-item').eq(index).siblings().removeClass('is-active');
        $('.p-item').eq(index).addClass('is-active');

        var speed = 400;
        var position = $(".p-itemarea__category").offset().top;
        var landing = $(window).scrollTop() > position ? -10 : 10;
        if ($(".p-itemarea__category").hasClass('is-fixed')) {
          $("html,body").animate(
            { scrollTop: position - landing },
            speed,
            "swing",
            function () {
              $("html,body").animate({ scrollTop: position }, speed, "swing");
            }
          );
        }
      });
    })();

    const order = (() => {
      let sel_sort = function (type) {
        let wrapperClass = '.p-item';
        let itemClass = '.c-item';
        let $elms;

        $(wrapperClass).each(function (i) {
          let wrapSel = $(this);
          switch (type) {
            // おすすめ順
            case 'recommend':
              $elms = wrapSel.children(itemClass).sort(function (a, b) {
                let val1 = parseInt($(a).attr('data-recommend'));
                let val2 = parseInt($(b).attr('data-recommend'));
                if (val1 < val2) {
                  return -1;
                } else if (val1 > val2) {
                  return 1;
                } else {
                  return 0;
                }
              });
              break;

            // 品番順
            case 'num':
              $elms = wrapSel.children(itemClass).sort(function (a, b) {
                let val1 = parseInt($(a).attr('data-num'));
                let val2 = parseInt($(b).attr('data-num'));
                if (val1 < val2) {
                  return -1;
                } else if (val1 > val2) {
                  return 1;
                } else {
                  return 0;
                }
              });
              break;

            // 名前順
            case 'name':
              $elms = wrapSel.children(itemClass).sort(function (a, b) {
                let val1 = $(a).find('.c-item__name').text();
                let val2 = $(b).find('.c-item__name').text();
                if (val1 < val2) {
                  return -1;
                } else if (val1 > val2) {
                  return 1;
                } else {
                  return 0;
                }
              });
              break;

            // 価格低い順
            case 'price_low':
              $elms = wrapSel.children(itemClass).sort(function (a, b) {
                // ¥マークを無視するため2文字目から取得して、カンマ','を削除
                let val1 = parseInt($(a).find('.c-item__price').text().substring(1).replace(/,/g, ''));
                let val2 = parseInt($(b).find('.c-item__price').text().substring(1).replace(/,/g, ''));
                console.log(val1)
                if (val1 < val2) {
                  return -1;
                } else if (val1 > val2) {
                  return 1;
                } else {
                  return 0;
                }
              });
              break;

            // 価格高い順
            case 'price_high':
              $elms = wrapSel.children(itemClass).sort(function (a, b) {
                // ¥マークを無視するため2文字目から取得して、カンマ','を削除
                let val1 = parseInt($(a).find('.c-item__price').text().substring(1).replace(/,/g, ''));
                let val2 = parseInt($(b).find('.c-item__price').text().substring(1).replace(/,/g, ''));
                if (val1 < val2) {
                  return 1;
                } else if (val1 > val2) {
                  return -1;
                } else {
                  return 0;
                }
              });
              break;

            default:
              return false;
              break;
          }

          wrapSel.empty();
          $elms.each(function () {
            wrapSel.append($(this));
          });
        });
      };

      const myEvent = (() => {
        $('.js-orderSelect').on('change', function () {
          sel_sort($(this).val());
        });
      })();
    })();


    const freeTxt = (() => {
      let getFreeTxt = "GIT";

      let wrapperClass = '.p-item';
      let itemClass = '.c-item';

      let freeSearch = function (getFreeTxt) {
        if (!getFreeTxt) return false;
        $(wrapperClass).each(function (i) {
          let wrapSel = $(this);
          wrapSel.children(itemClass).each(function () {
            let itemSel = $(this);
            // 最初非表示
            itemSel.css('display', 'none');
            // 入力(配列)すべてチェックする
            $.each(getFreeTxt, function (j, val) {
              if (itemSel.text().indexOf(val) != -1) {
                itemSel.css('display', 'grid');
              }
            });
          });
        });
      };

      const myEvent = (() => {
        $('.js-freeTxt').on('change', function () {
          let getFreeTxt = $(this).val().split(' ');
          freeSearch(getFreeTxt);
        });
      })();
    })();

  });
}($));