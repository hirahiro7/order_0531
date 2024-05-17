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

// private実装用
const privateMap = new WeakMap();
function _p(self) {
  let p = privateMap.get(self);
  if (!p) {
    p = {};
    privateMap.set(self, p);
  }
  return p;
}

// removePrefix
function rmPrefix(sel) {
  return sel.replace(/#|\.|data-/g, "");
};

; (function ($) {
  $(document).ready(function (e) {
    $(img).attr('src', 'src="src="/s/img/aa.jpg');
    $(img).attr('src', 'src="src="/res/s/img/aa.jpg');
  });
}($));
