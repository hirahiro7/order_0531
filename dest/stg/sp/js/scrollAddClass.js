/*
 * スクロールで指定要素に到達したときクラスを追加
 */
;(function( $ ){

	$.fn.scrollAddClass = function( options ) {

		const defaults = $.extend( {
		  selector : '.target',
		  offset : 0,
		  removeAction : false,
			class : 'is-active'
		}, options);

		return this.each(function() {

			var self = $(this);

			$(window).on('load scroll resize',function(){
				var windowTop = $(this).scrollTop();
				var windowBtm = $(this).scrollTop() + $(this).height();

				var targetPosTop = self.offset().top;
				var targetPosBtm = self.offset().top + self.outerHeight();

				if ( windowBtm > (targetPosTop+defaults.offset) && windowTop < (targetPosBtm-defaults.offset) ) {
					self.addClass(defaults.class);
				}else{
					if( defaults.removeAction ){
						self.removeClass(defaults.class);
					}
				}
			});

		});

	};

})( jQuery );
