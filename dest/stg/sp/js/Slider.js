/*
* スライダー処理の基本クラス
*/
class Carousel{
  constructor( { prop , pager=true, ctrl=true } ){
     _p(this).prop = prop;
     const myFunc = new CarouselState(prop, pager);
     if( ctrl ){ const myctrl = new Ctrl(prop,myFunc); }
     if( pager ){ const mypager = new Pager(prop,myFunc); }

     _p(this).myEvent = (()=>{
       const carouselItem = _p(this).prop.carouselItem;
       const flick = (() =>{
         let pointX;
         let isTouch = false;
         const getPageX = function(e){
           var pageX = 0;
           if (e.originalEvent.touches) {
             pageX = e.originalEvent.touches[0].pageX;
           } else {
             pageX = e.pageX;
           }
           return pageX;
         };

         $(carouselItem).on(TOUCHSTART,(e)=>{
           isTouch = true;
           pointX = getPageX(e);
         });

         $(carouselItem).on(TOUCHMOVE,(e)=>{
           if(!isTouch){ return true; };
           if( getPageX(e)-pointX > 40){
             e.preventDefault();
             myFunc.moving('prev');
             isTouch = false;
           }else if( getPageX(e)-pointX < -40){
             e.preventDefault();
             myFunc.moving('next');
             isTouch = false;
           }else{
             return true;
           }
         });

         $(carouselItem).on(TOUCHEND,(e)=>{
           isTouch = false;
         });

       })();

     })();

  }

  getProp(){
    return _p(this).prop;
  }
}

class Ctrl{
  constructor( prop , ctrlObj ){
    _p(this).prop = prop;
    const carouselAllWrap = _p(this).prop.carouselAllWrap;
    const ctrlWrap = _p(this).prop.carouselAllWrap + '__ctrl';
    const ctrlPrev = _p(this).prop.carouselAllWrap + '__prev';
    const ctrlNext = _p(this).prop.carouselAllWrap + '__next';

    _p(this).setElm = (async () => {

      const appendElm = () => {
        return new Promise( resolve => {
          $(carouselAllWrap).append(`<div class ="${rmPrefix(ctrlWrap)}">`);
          $(ctrlWrap).append(`<div class ="${rmPrefix(ctrlPrev)}">`);
          $(ctrlWrap).append(`<div class ="${rmPrefix(ctrlNext)}">`);
          resolve();
        });
      };
      await appendElm();

      const myEvent = (() => {
        $(ctrlNext).on('click',() => {
          ctrlObj.moving('next');
        });

        $(ctrlPrev).on('click',() => {
          ctrlObj.moving('prev');
        });
      })();

    })();
  }
}

class Pager{
  constructor( prop , ctrlObj ){
    _p(this).prop = prop;
    const carouselAllWrap = _p(this).prop.carouselAllWrap;
    const pagerWrap = _p(this).prop.carouselAllWrap + '__pager';
    const pagerItem = _p(this).prop.carouselAllWrap + '__pager_item';
    const activeClass = 'is-active';

    _p(this).setElm = (async () => {
      const appendElm = () => {
        return new Promise( resolve => {
          $(carouselAllWrap).append(`<div class ="${rmPrefix(pagerWrap)}">`);
          for(let i=0; i<ctrlObj.length(); i++){
            $(pagerWrap).append(`<div class ="${rmPrefix(pagerItem)}">`);
          }
          resolve();
        });
      };
      await appendElm();

      $(pagerItem).eq(0).addClass(activeClass);

      const myEvent = (() => {
        $(pagerItem).on('click',(e) => {
          const count = $(e.target).index();
          ctrlObj.moving(count);
        });
      })();

    })();
  }
}

class CarouselState{

  constructor( prop, pager ){
    _p(this).prop = prop;
    _p(this).current = 0;
    _p(this).direction = "";
    _p(this).length = $(_p(this).prop.carouselItem).length;
    _p(this).isAnimate = false;
    _p(this).animation = (direction) => {
      const carouselItem = _p(this).prop.carouselItem;
      const pagerItem = (_p(this).prop.pagerItem) ? _p(this).prop.pagerItem : _p(this).prop.carouselAllWrap + '__pager_item';
      const current = _p(this).current;
      const activeClass = 'is-active';

      $(carouselItem).eq(current).addClass(activeClass).siblings().removeClass(activeClass);
      if( pager ){
        $(pagerItem).eq(current).addClass(activeClass).siblings().removeClass(activeClass);
      }

      return new Promise( resolve => {
        $(carouselItem).on(ANIMATIONONEND,()=>{
          resolve(false);
        });
      });
    };

    _p(this).animation('next');
  }

  async moving( direction ){

    if( _p(this).isAnimate ){
      return true;
    }else{
      _p(this).isAnimate = true;
    }

    if( direction === 'next' ){
      // 次へ
      _p(this).direction = 'next';
      _p(this).current = ( _p(this).current >= (_p(this).length-1) ) ?  0 : ++_p(this).current;
    }else if( direction === 'prev' ){
      // 前へ
      _p(this).direction = 'prev';
      _p(this).current = ( _p(this).current <= 0 ) ?  (_p(this).length-1) : --_p(this).current;
    }else{
      // 指定番号へ(方向はセットしておく)
      _p(this).direction = (_p(this).current < direction) ? 'next' : 'prev';
      _p(this).current = direction;
    }

    _p(this).isAnimate = await _p(this).animation( direction );

  }

  getProp(){
    return _p(this).prop;
  }

  length(){
    return _p(this).length;
  }

  current(){
    return _p(this).current;
  }

}
