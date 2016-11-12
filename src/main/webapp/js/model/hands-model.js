(function($){

  Hands = function(arr) {
    CardBundle.apply(this, arguments);
  };
  Hands.prototype = $.extend({}, CardBundle.prototype);

})(jQuery);