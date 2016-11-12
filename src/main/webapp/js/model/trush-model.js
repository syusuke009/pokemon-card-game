(function($){

  Trush = function(arr) {
    CardBundle.apply(this, arguments);
  };
  Trush.prototype = $.extend({}, CardBundle.prototype);

  Trush.prototype.trush = function(card) {
    this.add(card);
  };

  Trush.prototype.getTop = function() {
    return this.getAll()[this.size() - 1];
  };

})(jQuery);