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

    const searchModal = (() => {
      $('.js-searchModalOpen').on('click', function () {
        $('.js-searchModal').fadeIn(100);
      });

      $('.js-searchModalClose').on('click', function () {
        $('.js-searchModal').fadeOut(100);
      });

      $('.js-searchModal').on('click', function () {
        $('.js-searchModal').fadeOut(100);
      });

      $('.p-search').on('click', function (e) {
        e.stopPropagation();
      });

    })();

    const cartfunc = (() => {
      // モーダル
      $('.js-cartOpen').on('click', function () {
        if ($(this).hasClass('is-disable')) return false;
        $('.js-cartModal').fadeIn(100).css('display', 'flex');
      });

      $('.js-cartClose,.jsformSubmit').on('click', function () {
        $('.js-cartModal').fadeOut(100);
      });

      // アイコンバッチ
      const badge = (() => {
        let badgeCount = function () {
          let count = 0;
          $('.js-checkform').each(function () {
            count = ($(this).prop("checked")) ? ++count : count;
          });
          return count;
        };

        $(document).on('click', '.js-checkform', (function () {
          let badgeSet = function () {
            if (badgeCount()) {
              $('.js-cartBadge').css('display', 'flex').text(badgeCount());
            } else {
              $('.js-cartBadge').css('display', 'none');
            }
          };
          badgeSet();
          return badgeSet;
        })());
      })();

      // カートアイテム作成
      const cartItem = (() => {
        let cartWrapSel = $('.js-cartWrap');

        const myEvent = (() => {

          let chkState = function () {
            // チェックの状態をチェックする
            $('.js-checkform').each(function () {
              if ($(this).prop("checked")) {
                $(this).parents('.c-item').addClass('js-checked');
              } else {
                // テーブル内の他のチェックボックスを判別する(複数選択の対応)
                let ischecked = false;
                $(this).parents('.c-checkTbl').find('.js-checkform').each(function () {
                  if ($(this).prop("checked")) {
                    ischecked = true;
                  }
                });
                // テーブル内に他のチェックが無いときにアイテムのチェックフラグを落とす
                if (!ischecked) {
                  $(this).parents('.c-item').removeClass('js-checked');
                }
              }
            });

            return $('.c-item').hasClass('js-checked');
          };

          let update = function () {
            cartWrapSel.empty();
            let insertCart = function (itemSel) {
              // DOM作っていく
              let imgSrc = itemSel.find('.c-item__img img').attr('src');
              let num = itemSel.find('.c-item__num').text();
              let name = itemSel.find('.c-item__name').text();
              let price = itemSel.find('.c-item__price').text();
              // テーブルの見出し部分を最初に定義
              let sku = "<tr><th>サイズ</th><th>サイズ</th><th>金額</th></tr>";
              itemSel.find('.js-checkform:checked').each(function () {
                let size = $(this).attr('data-size');
                let color = $(this).attr('data-color');
                sku += `<tr><td>${size}</td><td>${color}</td><td>${price}</td></tr>`
              });
              let other = (itemSel.find('.c-item__other .c-textform').val()) ? `<div class="c-cartItem__other"><p>${itemSel.find('.c-item__other .c-textform').val()}</p></div>` : '';
              let dom = `<div class="c-cartItem">
                            <div class="c-cartItem__img">
                              <img src="${imgSrc}" alt="">
                            </div>
                            <p class="c-cartItem__num">${num}</p>
                            <p class="c-cartItem__name">${name}</p>
                            <div class="c-cartItem__tbl">
                              <table>
                                ${sku}
                              </table>
                            </div>
                            ${other}
                         </div>`;
              $(cartWrapSel).append(dom);
            };
            if (chkState()) {
              // カートボタンを有効に
              $('.js-cartOpen').removeClass('is-disable');
              $('.c-item').each(function () {
                $(this).find('.js-otherform').attr('disabled', true);
                if ($(this).hasClass('js-checked')) {
                  $(this).find('.js-otherform').attr('disabled', false);
                  insertCart($(this));
                }
              });
            } else {
              // カートボタンを無効
              $('.js-cartOpen').addClass('is-disable');
              // 補足情報入力を無効
              $('.js-otherform').attr('disabled', true);
            }
          };

          $(document).on('click', '.js-checkform', (function () {
            update();
            return update;
          })());

          $(document).on('change', '.js-otherform', (function () {
            update();
            return update;
          })());

        })();
      })();

    })();


    const formfunc = (() => {

    })();

  });
}($));