(function($){

  Deck = function(arr) {
    this.deck_ = arr;
  };

  Deck.prototype.draw = function() {
    return this.deck_.pop();
  };

  Deck.prototype.add = function(card) {
    this.deck_.push(card);
  };

  Deck.prototype.shuffle = function() {
    var count = this.deck_.length;

    while (count > 0) {
       var index = Math.floor(Math.random() * count);
       count--;
       var temp = this.deck_[count];
       this.deck_[count] = this.deck_[index];
       this.deck_[index] = temp;
    }
  };

  Deck.prototype.isEmpty = function() {
    return this.deck_.length === 0;
  };

  Deck.prototype.size = function() {
    return this.deck_.length;
  };

  Deck.prototype.turnUp = function(count) {
    var c = !!count ? count : 1;
    return this.deck_.slice(0, c);
  };
})(jQuery);