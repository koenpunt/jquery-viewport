;(function( $ ){
	$.fn.extend({
		
		inViewport: function(){
			var visibleElements = [];
			this.each(function(){
				if($.inViewport(this)){
					visibleElements.push(this);
				}	
			});
			return this.pushStack(visibleElements);
		},
		
		mostVisible: function(){
			var visibleElements = this.inViewport(),
				mostVisible = null,
				highestVisibility = 0;
			
			$.each(visibleElements, function(index, element){
				if(elementVisibility = $(element).data('vpVisibility')){
					if(elementVisibility > highestVisibility){
						highestVisibility = elementVisibility;
						mostVisible = $(element);
					}
				}
			});
		
			return mostVisible;
		}
	});
	
	$.inViewport = function(element){
		var element = $(element),
			scrollTop = $(window).scrollTop(),
			windowHeight = $(window).height(),
			offset = element.offset(),
			elementBottom = offset.top + element.height() - scrollTop,
			elementTop = offset.top - scrollTop,
			a,b;
			a = elementTop - (windowHeight - element.height()) > element.height() ? element.height() : elementTop - (windowHeight - element.height());
			a = a > 0 ? a : 0;
			b = elementBottom > element.height() ? element.height() : elementBottom;
			b = b > 0 ? b : 0;
			vpVisibility = (b-a) / element.height();
			element.data('vpVisibility', vpVisibility);
		return vpVisibility;
	};
	
})( jQuery );