;(function( $ ){
	$.fn.extend({
		inViewport: function(){
			return inViewport(this.get(0)) > 0;
		},
		mostVisible: function(){
			var visibleElements = [];
			var mostVisible = null;
			var highestVisibility = 0;
			this.each(function(){
				if(inViewport(this)){
					visibleElements.push(this);
				}
				$.each(visibleElements, function(index, element){
					if($(element).data().vpVisibility > highestVisibility){
						highestVisibility = $(element).data().vpVisibility;
						mostVisible = $(element);
					}
				});
			
			});
		
			return mostVisible;
		}
	});
	
	var inViewport = function(element){
		var self = $(element),
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
			
			$(element).data('vpVisibility', vpVisibility);
			
		return vpVisibility;
		
	};
})( jQuery );