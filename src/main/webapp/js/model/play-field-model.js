(function($){

  PlayField = function(deck) {

    this.deck_ = deck;
    this.trush_ = new Trush();

    this.side_;

    this.battleMonster_ = null;
    this.bench_ = new Bench();

    this.hands_ = new Hands();

    this.managedIds = {};
    this.deck_.getAll().forEach(function(card){
      this.managedIds[card.trnId] = true;
    }.bind(this));

    this.bindEvents_();
  };

  PlayField.prototype.getDeck = function() {
    return this.deck_;
  };

  PlayField.prototype.getTrush = function() {
    return this.trush_;
  };

  PlayField.prototype.pickSide = function() {
    if (this.side_.length === 0) {
      return null;
    }
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
    this.bench_.put(card);
  };

  PlayField.prototype.getBench = function() {
    return this.bench_.getAll();
  };

  PlayField.prototype.selectBench = function(trnId) {
    return this.bench_.select(trnId);
  };

  PlayField.prototype.pickBench = function(trnId) {
    return this.bench_.pick(trnId);
  };

  PlayField.prototype.addHand = function(card) {
    return this.hands_.add(card);
  };

  PlayField.prototype.getHands = function() {
    return this.hands_;
  };

  PlayField.prototype.selectHand = function(trnId) {
    return this.hands_.select(trnId);
  };

  PlayField.prototype.pickHand = function(trnId) {
    return this.hands_.pick(trnId);
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
      this.bench_.replace(oldCard, newCard);
      break;
    case Const.Area.BATTLE_MONSTER:
      this.setBattleMonster(newCard);
      break;
    }
  };

  PlayField.prototype.bindEvents_ = function() {
    MonsterCard.getEventTarget().on(MonsterCard.EventType.REMOVE, function(e, arr) {
      var trush = this.getTrush();
      arr.filter(function(c) {
        return this.managedIds[c.trnId];
      }.bind(this)).forEach(function(c) {
        trush.trush(c);
      }.bind(this));
    }.bind(this));
  };
})(jQuery);
