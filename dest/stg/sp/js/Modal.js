/*
* モーダル処理の基本クラス
*/
class Modal{
  constructor( { modalWrap , openElm, closeElm, toggleElm } ){
    _p(this).modalWrap = modalWrap;
    _p(this).openElm = openElm;
    _p(this).closeElm = closeElm;
    _p(this).toggleElm = toggleElm;
    _p(this).bgFixed = () => {
      $(modalWrap).css({
        'position': 'fixed',
        'top': -$(window).scrollTop(),
        'z-index': 9999999
      });
    }

    _p(this).bgFixedRelease = () => {
      var posTop = $(modalWrap).offset().top;
      $(modalWrap).css({
        'position': 'relative',
        'top': 'auto',
        'z-index': 'auto'
      });
      $('html,body').scrollTop( -posTop );
    }

    var containerSet = (() => {
      // スクロールバーの横幅の差分を考慮する
      // 横幅計測用のダミーエレメントを追加
      $('body').append('<div class="__dummy" style="position:fixed;width:100vw;height0;"></div>');
      SCROLLWIDTH = $('.__dummy').width() - $(window).width();
      $('html,.header').css({
        'width': 'calc( 100vw - ' + SCROLLWIDTH + 'px )'
      });
      $('.__dummy').remove();
    })();

    var myEvent = (() => {
      $(openElm).on('click',(e) => {
        this.modalOpen();
      });
      $(closeElm).on('click',(e) => {
        this.modalClose();
      });
      $(toggleElm).on('click',(e) => {
        this.modalToggle();
      });
    })();

  }

  modalOpen(){
    _p(this).bgFixed();
    $(_p(this).modalWrap).fadeIn();
  }

  modalClose(){
    _p(this).bgFixedRelease();
    $(_p(this).modalWrap).fadeOut();
  }

  modalToggle(){
    if( $(_p(this).modalWrap).is(':visible') ){
      _p(this).bgFixedRelease();
      $(_p(this).modalWrap).fadeOut();
    }else{
      _p(this).bgFixed();
      $(_p(this).modalWrap).fadeIn();
    }
  }

}
