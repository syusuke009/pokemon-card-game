(function($){

  PokemonChecker = function() {
  };

  PokemonChecker.prototype.check = function(model) {
    var $defer = $.Deferred();
    var myModel = model.getField(Const.Viewpoint.ME);
    var rivalModel = model.getField(Const.Viewpoint.RIVAL);

    this.checkPoison_(myModel);
    this.checkPoison_(rivalModel);

    this.checkBurn_(myModel);
    this.checkBurn_(rivalModel);

    this.checkSleep_(myModel);
    this.checkSleep_(rivalModel);

    if (model.getTurn().whoseTurn() === Const.Viewpoint.ME) {
      this.checkParalysis_(myModel);
    } else {
      this.checkParalysis_(rivalModel);
    }

    this.checkEffects_();

    this.checkAlive_(myModel);
    this.checkAlive_(rivalModel);

    return $defer.promise();
  };

  PokemonChecker.prototype.checkPoison_ = function(field) {
    var monster = field.getBattleMonster();
    var status = monster.getStatus();
    if (status.indexOf(Const.Status.POISON) >= 0) {
      monster.hurt(10);
    }
  };

  PokemonChecker.prototype.checkBurn_ = function() {

  };

  PokemonChecker.prototype.checkSleep_ = function() {

  };

  PokemonChecker.prototype.checkParalysis_ = function() {

  };

  PokemonChecker.prototype.checkEffects_ = function() {

  };

  PokemonChecker.prototype.checkAlive_ = function(field) {
    var isDead = function(c) {
      return c.hp <= c.getDamageCount() * 10;
    };
    var monster = field.getBattleMonster();
    if (isDead(monster)) {
      field.trush(monster);
      field.setBattleMonster(null);
    }
    $.each(field.getBench(), function(idx, card) {
      if (isDead(card)) {
        field.trush(field.pickBench(card.trnId));
      }
    });

  };

})(jQuery);
