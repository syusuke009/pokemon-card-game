(function($){

  PlayField = function(deck) {

    this.deck_ = deck;
    this.trush_ = [];

    this.side_;

    this.battleMonster_ = null;
    this.bench_ = [];

    this.hands_ = [];

  };

  PlayField.prototype.getDeck = function() {
    return this.deck_;
  };

  PlayField.prototype.getTrush = function() {
    return this.trush_;
  };

  PlayField.prototype.trush = function(card) {
    this.trush_.push(card);
  };

  PlayField.prototype.pickSide = function() {
    return this.side_.shift();
  };

  PlayField.prototype.getSide = function() {
    return this.side_;
  };

  PlayField.prototype.setSide = function(sides) {
    this.side_ = sides;
  };

  PlayField.prototype.setBattleMonster = function(card) {
    this.battleMonster_ = card;
  };

  PlayField.prototype.getBattleMonster = function() {
    return this.battleMonster_;
  };

  PlayField.prototype.putBench = function(card) {
    card.backToBench();
    this.bench_.push(card);
  };

  PlayField.prototype.getBench = function() {
    return this.bench_;
  };

  PlayField.prototype.selectBench = function(trnId) {
    return this.bench_.find(function(e){
      return (e.trnId === trnId);
    });
  };

  PlayField.prototype.pickBench = function(trnId) {
    var idx = this.bench_.findIndex(function(e){
      return (e.trnId === trnId);
    });
    if (idx < 0) return null;
    var selected = this.bench_[idx];
    this.bench_.splice(idx, 1);
    return selected;
  };

  PlayField.prototype.addHand = function(card) {
    return this.hands_.push(card);
  };

  PlayField.prototype.getHands = function() {
    return this.hands_;
  };

  PlayField.prototype.selectHand = function(trnId) {
    return this.hands_.find(function(e){
      return (e.trnId === trnId);
    });
  };

  PlayField.prototype.pickHand = function(trnId) {
    var idx = this.hands_.findIndex(function(e){
      return (e.trnId === trnId);
    });
    if (idx < 0) return null;
    var selected = this.hands_[idx];
    this.hands_.splice(idx, 1);
    return selected;
  };

  PlayField.prototype.selectFrom = function(area, trnId) {
    var card;
    switch (area) {
    case Const.Area.HAND:
      card = this.selectHand(trnId);
      break;
    case Const.Area.BENCH:
        card = this.selectBench(trnId);
        break;
    case Const.Area.BATTLE_MONSTER:
        card = this.getBattleMonster();
        break;
    }
    return card;
  };

  PlayField.prototype.override = function(area, oldCard, newCard) {
    switch (area) {
    case Const.Area.HAND:
      throw 'Unsupport override case: ' + area
      break;
    case Const.Area.BENCH:
      var idx = this.bench_.findIndex(function(c){
        return c.trnId === oldCard.trnId;
      });
      if (idx >= 0) {
        this.bench_[idx] = newCard;
      }
      break;
    case Const.Area.BATTLE_MONSTER:
      this.setBattleMonster(newCard);
      break;
    }
  };
})(jQuery);
