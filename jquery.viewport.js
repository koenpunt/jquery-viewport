/**!
 * jQuery Viewport Plugin
 *
 * Copyright (c) 2011-2014 Koen Punt - http://koen.pt
 *
 * Available for use under the MIT License
 */

;(function( $ ){
  $.fn.extend({

    inViewport: function(options){
      var visibleElements = this.filter(function(){
        return $.inViewport(this, options);
      });
      return this.pushStack(visibleElements);
    },

    mostVisible: function(){
      var visibleElements = this.inViewport()
        , max = 0, visibility, mostVisible;

      visibleElements.each(function(i, el){
        visibility = $(el).data('vpVisibility');
        if(visibility > max){
          max = visibility;
          mostVisible = el;
        }
      });
      return $(mostVisible);
    }
  });

  var defaults = {offsetTop: 0, offsetBottom: 0};

  $.inViewport = function(element, options){
    var $element = $(element), opts, scrollTop, viewportHeight
      , elementHeight, elementOffset, elementTop, elementBottom
      , a, b, visibility;

    opts = $.extend({}, defaults, options || {});

    scrollTop = $(window).scrollTop();
    viewportHeight = $(window).height() - opts.offsetTop - opts.offsetBottom;

    elementHeight = $element.height();
    elementOffset = $element.offset();
    elementTop = elementOffset.top - scrollTop - opts.offsetTop;
    elementBottom = elementTop + elementHeight;

    a = Math.max(0, Math.min(elementTop - (viewportHeight - elementHeight), elementHeight));
    b = Math.max(0, Math.min(elementBottom, elementHeight));

    visibility = ( b - a ) / elementHeight;

    $element.data('vpVisibility', visibility);

    return visibility;
  };

})( jQuery );