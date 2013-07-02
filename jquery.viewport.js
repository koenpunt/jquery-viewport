/*!
 * jQuery Viewport Plugin
 *
 * Copyright 2011-2013, Koen Punt / http://www.koen.pt
 * Dual licensed under the MIT and GPL licenses (just like jQuery):
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
*/

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
      var visibleElements = this.inViewport()
        , mostVisible = null
        , highestVisibility = 0;

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

  var defaults = {offsetTop: 0, offsetBottom: 0};

  $.inViewport = function(element, options){
    var element = $(element)
      , opts = $.extend({}, defaults, options)
      , scrollTop = $(window).scrollTop() + opts.offsetTop
      , windowHeight = $(window).height() - opts.offsetTop - opts.offsetBottom
      , offset = element.offset()
      , elementBottom = offset.top + element.height() - scrollTop
      , elementTop = offset.top - scrollTop
      , a, b;

    if(elementTop - (windowHeight - element.height()) > element.height()){
      a = element.height();
    }else{
      a = elementTop - (windowHeight - element.height());
    }
    a = a > 0 ? a : 0;

    if(elementBottom > element.height()){
      b = element.height();
    }else{
      b = elementBottom;
    }
    b = b > 0 ? b : 0;

    vpVisibility = (b-a) / element.height();
    element.data('vpVisibility', vpVisibility);
    return vpVisibility;
  };

})( jQuery );