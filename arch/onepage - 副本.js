$(document).ready(function(){
	$('#onepage').onepage();
});


jQuery.fn.extend({
  onepage: function(index){
	if ( typeof(index) == 'undefined')
	{
		var $_this = $(this),
		    index = 1,
		    $_this_chil = $_this.children(),
		    page = $_this_chil.length,
		    CanScroll = true,
		    height = $(window).height(),
		    touch = false,
		    touchPosSX = 0,
		    touchPosSY = 0,
		    touchPosEX = -1,
		    touchPosEY = -1;
	    $('html,body').height(height);
	    $_this.children().each(function(){
		    $(this).height(height);
	    });
	    $(window).resize(function(){
			height = $(window).height();
			$('html,body').height(height);
		    $_this.children().each(function(){
			    $(this).height(height);
		    });
		}); 
		//
		function pageScroll(e){
			var sl,
				pending = false;
			//pending 标记已经到顶部或是底部时，不触发动画同时重置CanScroll
			e = e || window.event;
			if (navigator.userAgent.toLowerCase().indexOf('msie') >= 0) {
				event.returnValue = false;
			} else {
				e.preventDefault();
			};
			//防止动画处理时被再次触发
			if(!CanScroll){
				return;
			}
			CanScroll = false;
			if(!touch)
			{
				if (e.wheelDelta) {
					sl = e.wheelDelta;
				} else if (e.detail) {
					sl = -e.detail;
				};
			}
			else
			{
				if( touchPosEY == -1 || Math.abs(touchPosEY -  touchPosSY) < 10 )
				{
					touchPosEX = e.targetTouches[0].pageX;
					touchPosEY = e.targetTouches[0].pageY;
					CanScroll = true;
					return;
				}
				else{
					sl = touchPosEY - touchPosSY;
					touch = false;
				}
			}
			if(typeof(sl) == 'undefined')
			{
				CanScroll = true;
				return;
			}
			else
			{
				//
			}
			if (sl < 0) {//向下
				if(index < page)
				{
					var next = $($_this_chil[index]),
					point = $($_this_chil[index-1]);
					point.css({'z-index':-10});
					next.css({'postion':'absolute','top':height,'z-index':100,'display':'block'});
					next.animate({'top':0},400,function(){
						point.css({'display':'none'});
						CanScroll = true;
						index++;
					});
				}
				else
				{
					CanScroll = true;
					pending = true;
				}
			}
			else {//向上
				if( (index-1) > 0)
				{
					var pre = $($_this_chil[index-2]),
					point = $($_this_chil[index-1]);
					point.css({'z-index':-10});
					pre.css({'postion':'absolute','top':-height,'z-index':100,'display':'block'});
					pre.animate({'top':0},400,function(){
						point.css({'display':'none'});
						CanScroll = true;
						index--;
					});
				}
				else
				{
					pending = true;
				}
			}
			if(pending)
				CanScroll = true;
		};
		//
		window.DOMMouseScroll = pageScroll;
		window.onmousewheel = pageScroll;
		document.getElementById("onepage").addEventListener('touchstart',function(e){
			if(e.targetTouches.length > 1 || e.scale && event.scale !== 1) return;
			touchPosSX = event.targetTouches[0].pageX;
			touchPosSY = event.targetTouches[0].pageY;
			touch = true;
		},false);
		document.getElementById("onepage").addEventListener('touchend',function(e){
			touchPosEX = -1;
		    touchPosEY = -1;
			touch = false;
		},false);
		document.getElementById("onepage").addEventListener('touchmove',pageScroll,false);
		var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" ;
		if (document.attachEvent)
			document.attachEvent("on"+mousewheelevt, pageScroll );
		else if (document.addEventListener)
			document.addEventListener(mousewheelevt, pageScroll, false);
	}
	else
	{
		
	}
  }
});


