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

  });
}($));