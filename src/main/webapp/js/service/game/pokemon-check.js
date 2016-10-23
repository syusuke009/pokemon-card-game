(function($){

  PokemonChecker = function() {
  };

  PokemonChecker.prototype.check = function(model) {

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

})(jQuery);
