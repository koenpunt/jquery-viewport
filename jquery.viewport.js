;(function( $ ){
	$.fn.extend({
		inViewport: function(){
			var self = $(this),
				scrollTop = $(window).scrollTop(),
				windowHeight = $(window).height(),
				offset = self.offset(),
				elementBottom = offset.top + self.height() - scrollTop,
				elementTop = offset.top - scrollTop,
				position = 0;

				var a = elementTop - (windowHeight - self.height()) > self.height() ? self.height() : elementTop - (windowHeight - self.height());
					a = a > 0 ? a : 0;
				var b = elementBottom > self.height() ? self.height() : elementBottom;
					b = b > 0 ? b : 0;
				var vpVisibility = (b-a) / self.height();
				self.data('vpVisibility', vpVisibility);
			return vpVisibility;
		},
		mostVisible: function(){
			var visibleElements = [];
			var mostVisible = null;
			var highestVisibility = 0;
			this.each(function(){
				if($(this).inViewport(true)){
					visibleElements.push(this);
				}	
			});
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
})( jQuery );