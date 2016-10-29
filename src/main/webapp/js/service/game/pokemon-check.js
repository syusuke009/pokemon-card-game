(function($){

  PokemonChecker = function() {
  };

  PokemonChecker.prototype.check = function(model) {
    var $defer = $.Deferred();
    var myModel = model.getField(Const.Viewpoint.ME);
    var rivalModel = model.getField(Const.Viewpoint.RIVAL);

    this.checkPoison_(myModel);
    this.checkPoison_(rivalModel);

    var def1 = this.checkBurn_(myModel);
    var def2 = this.checkBurn_(rivalModel);

    var def3 = this.checkSleep_(myModel);
    var def4 = this.checkSleep_(rivalModel);

    if (model.getTurn().whoseTurn() === Const.Viewpoint.ME) {
      this.checkParalysis_(myModel);
    } else {
      this.checkParalysis_(rivalModel);
    }

    this.checkEffects_();

    $.when(def1, def2, def3, def4).then(function(){
      this.checkAlive_(myModel);
      this.checkAlive_(rivalModel);
      $defer.resolve();
    }.bind(this));

    return $defer.promise();
  };

  PokemonChecker.prototype.checkPoison_ = function(field) {
    var monster = field.getBattleMonster();
    var status = monster.getStatus();
    if (status.indexOf(Const.Status.POISON) >= 0) {
      monster.hurt(10);
    }
  };

  PokemonChecker.prototype.checkBurn_ = function(field) {
    var $defer = $.Deferred();
    var monster = field.getBattleMonster();
    var status = monster.getStatus();
    if (status.indexOf(Const.Status.BURN) >= 0) {
      var dialog = new CoinTossDialog();
      dialog.show().then(function(bool){
        if (bool) {
          monster.hurt(20);
        }
        $defer.resolve();
      });
    } else {
      $defer.resolve();
    }
    return $defer.promise();
  };

  PokemonChecker.prototype.checkSleep_ = function(field) {
    var $defer = $.Deferred();
    var monster = field.getBattleMonster();
    var status = monster.getStatus();
    if (status.indexOf(Const.Status.SLEEP) >= 0) {
      var dialog = new CoinTossDialog();
      dialog.show().then(function(bool){
        if (bool) {
          status.splice(status.indexOf(Const.Status.SLEEP), 1);
        }
        $defer.resolve();
      });
    } else {
      $defer.resolve();
    }
    return $defer.promise();
  };

  PokemonChecker.prototype.checkParalysis_ = function(field) {
    var monster = field.getBattleMonster();
    var status = monster.getStatus();
    if (status.indexOf(Const.Status.PARALYSIS) >= 0) {
      status.splice(status.indexOf(Const.Status.PARALYSIS), 1);
    }
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
