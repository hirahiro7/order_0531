/*
* スムーススクロール
*/
;(function($){

  $.fn.smoothScroll = function( option ){

    const defaults = $.extend({
      target : '',
      offset: 0,
      speed: 300,
      landing: 5
    },option);

    $(this).on('click',() => {
      const speed = defaults.speed;
      const target = defaults.target;
      const position = target.offset().top + defaults.offset;
      const landing = ($(window).scrollTop() > position) ? -defaults.landing : defaults.landing;

      // 2回アニメーションして着地をゆるやかに
      $('html,body').animate({ scrollTop: position-landing }, speed, 'swing', () => {
        $('html,body').animate({ scrollTop: position }, speed, 'swing' );}
      );
    });

  };

}($));
