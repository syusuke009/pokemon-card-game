(function($){

  GameSetupper = function(regulation) {
    this.regulation_ = regulation;

    this.$rivalDrawnDefer;
  };

  GameSetupper.prototype.setup = function(viewpoint) {
    this.$rivalDrawnDefer = $.Deferred();
    var model = new GameModel();
    var supplier = new DeckSupplier(new CardMstDao(), new SkillDao());
    var deckDao = new DeckDao();

    var field = new PlayField(supplier.supply(deckDao.get('user1'), viewpoint));
    var redrawCnt = this.stanbyHands_(field);
    model.setField(viewpoint, field);
    var $defer = $.Deferred();
    this.resolveDrawn_($defer, field, redrawCnt);

    RequestSignalSender.initialDrawn(field, redrawCnt);

    var promise = $.when($defer.promise(), this.$rivalDrawnDefer.promise());

    return promise.then(function(mine, rivals) {
      this.resolvePenalty_(mine.redrawCount, rivals.redrawCount, mine.field);
      this.setSide_(mine.field);


      this.resolvePenalty_(rivals.redrawCount, mine.redrawCount, rivals.field);
      this.setSide_(rivals.field);

      MessageDisplay.println('ゲームを開始の準備をします');
      MessageDisplay.println('・たねポケモンを１枚選んでバトルに出してください');
      MessageDisplay.println('・たねポケモンをベンチに出すことができます');

      model.setField(Const.Viewpoint.RIVAL, rivals.field);
      return $.Deferred().resolve(model).promise();
    }.bind(this));
  };

  GameSetupper.prototype.resolveDrawn_ = function($defer, field, redrawCount) {
    var data = {};
    data.field = field;
    data.redrawCount = redrawCount;
    $defer.resolve(data);
  };

  GameSetupper.prototype.resolveRivalDrawn = function(field, redrawCount) {
    this.resolveDrawn_(this.$rivalDrawnDefer, field, redrawCount);
  };

  GameSetupper.prototype.stanbyHands_ = function(field) {
    var redrawCount = 0;
    this.drawHand_(field);
    while (!UtilFunc.existsBaseMonster(field.getHands())) {
      MessageDisplay.println('手札にたねポケモンがいないので引き直します');
      this.revertHands_(field);
      this.drawHand_(field);
      redrawCount++;
    }
    return redrawCount;
  };

  GameSetupper.prototype.resolvePenalty_ = function(myRedraw, rivalRedraw, field) {
    var cnt = rivalRedraw - myRedraw;
    if (cnt <= 0) {
      return;
    }
    MessageDisplay.println('あいての引き直しが ' + cnt + '回 多かったため、さらに ' + cnt + '枚 引きます');
    this.drawHand_(field, cnt);
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

  GameSetupper.prototype.setSide_ = function(field) {
    var arr = [];
    var deck = field.getDeck();
    for(var i = 0; i < this.regulation_.sideCount(); i++) {
      arr.push(deck.draw());
    }
    field.setSide(arr);
  };

})(jQuery);
