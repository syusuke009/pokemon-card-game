(function($){

  Deck = function(arr) {
    CardBundle.apply(this, arguments);
  };
  Deck.prototype = $.extend({}, CardBundle.prototype);

  Deck.prototype.draw = function() {
    return this.getAll().pop();
  };

  Deck.prototype.shuffle = function() {
    var count = this.size();

    var deck = this.getAll();
    while (count > 0) {
       var index = Math.floor(Math.random() * count);
       count--;
       var temp = deck[count];
       deck[count] = deck[index];
       deck[index] = temp;
    }
  };

  Deck.prototype.turnUp = function(count) {
    var c = !!count ? count : 1;
    var size = this.size();
    return this.getAll().slice(size - c, size);
  };

  Deck.prototype.putOn = function(list) {
    list.reverse();
    $.each(list, function(idx, card) {
      this.add(card);
    }.bind(this));
  };
})(jQuery);