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
      lenis.on('scroll', (e) => {
        console.log(e)
      });

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    })();

    var inview = (function () {
      $(window).on("load scroll resize", function () {
        var wself = $(this);
        var offset = wself.height() / 2;
        var windowTop = wself.scrollTop() + offset;
        var windowBtm = wself.scrollTop() + wself.height() - offset;

        $(".is-target").each(function () {
          var self = $(this);

          var targetPosTop = self.offset().top;
          var targetPosBtm = self.offset().top + self.outerHeight();

          if (windowBtm >= targetPosTop) {
            self.addClass('is-active');
          }
        });
      });
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

  });
}($));