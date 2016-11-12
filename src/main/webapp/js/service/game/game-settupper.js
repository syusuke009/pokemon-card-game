(function($){

  GameSetupper = function(isHalf) {
    if (isHalf) {
      this.deckSize_ = 30;
      this.sideSize_ = 3;
      this.sameCardLimit_ = 2;
    } else {
      this.deckSize_ = 60;
      this.sideSize_ = 6;
      this.sameCardLimit_ = 4;
    }

    this.myField_;
    this.rivalField_
  };

  GameSetupper.prototype.setup = function(model) {
    this.myField_ = model.getField(Const.Viewpoint.ME);
    this.rivalField_ = model.getField(Const.Viewpoint.RIVAL);

    this.stanbyHands_();

    this.stanbySide_();
  };

  GameSetupper.prototype.stanbyHands_ = function() {
    this.drawHand_(this.myField_);
    this.drawHand_(this.rivalField_);
    if (!UtilFunc.existsBaseMonster(this.myField_.getHands()) &&
        !UtilFunc.existsBaseMonster(this.rivalField_.getHands())) {
      console.log('2人とも手札にたねモンスターがいないので引き直します');
      this.revertHands_(this.myField_);
      this.revertHands_(this.rivalField_);
      this.stanbyHands_();
    }
    while (!UtilFunc.existsBaseMonster(this.myField_.getHands())) {
      MessageDisplay.println('プレイヤーの手札にたねモンスターがいないので引き直し、相手はさらに一枚引きます');
      this.revertHands_(this.myField_);
      this.drawHand_(this.myField_);
      this.drawHand_(this.rivalField_, 1);
    }
    while (!UtilFunc.existsBaseMonster(this.rivalField_.getHands())) {
      MessageDisplay.println('相手の手札にたねモンスターがいないので引き直し、プレイヤーはさらに一枚引きます');
      this.revertHands_(this.rivalField_);
      this.drawHand_(this.rivalField_);
      this.drawHand_(this.myField_, 1);
    }
  };

  GameSetupper.prototype.drawHand_ = function(field, count) {
    var c = !!count ? count : 7;
    var deck = field.getDeck();
    for (var i = 0; i < c; i++) {
      var card = deck.draw();
      field.addHand(card);
    };
  };

  GameSetupper.prototype.revertHands_ = function(field) {
    var deck = field.getDeck();
    var trnIds = $.map(field.getHands().getAll(), function(h) {
      return h.trnId;
    });
    $.each(trnIds, function(idx, trnId) {
      var hand = field.pickHand(trnId);
      deck.add(hand);
    });
    deck.shuffle();
  };

  GameSetupper.prototype.stanbySide_ = function() {
    this.setSide_(this.myField_);
    this.setSide_(this.rivalField_);
  };

  GameSetupper.prototype.setSide_ = function(field) {
    var arr = [];
    var deck = field.getDeck();
    for(var i = 0; i < this.sideSize_; i++) {
      arr.push(deck.draw());
    }
    field.setSide(arr);
  };

})(jQuery);
