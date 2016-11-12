(function($){

  Bench = function(arr) {
    CardBundle.apply(this, arguments);
  };
  Bench.prototype = $.extend({}, CardBundle.prototype);

  Bench.prototype.put = function(card) {
    card.backToBench();
    this.add(card);
  };

  Bench.prototype.replace = function(oldCard, newCard) {
    var bench = this.getAll();
    var idx = bench.findIndex(function(c){
      return c.trnId === oldCard.trnId;
    });
    if (idx >= 0) {
      bench[idx] = newCard;
    }
  };

})(jQuery);