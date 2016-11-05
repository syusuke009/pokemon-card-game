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

    this.checkEffects_(model);

    $.when(def1, def2, def3, def4).then(function(){
      var myDyingCount = this.checkDying_(myModel);
      this.getSide_(rivalModel, myDyingCount);
      var rivalDyingCount = this.checkDying_(rivalModel);
      this.getSide_(myModel, rivalDyingCount);
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
      dialog.show().then(function(response){
        if (response[0]) {
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
      dialog.show().then(function(response){
        if (response[0]) {
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

  PokemonChecker.prototype.checkEffects_ = function(model) {
    var turn = model.getTurn();
    var attackerField = model.getField(turn.whoseTurn());
    var defenderField = model.getField(UtilFunc.reverseViewpoint(turn.whoseTurn()));

    // clear defence effect
    var defenceEffect = [Const.Status.DAMAGE_GUARD];
    var monster = defenderField.getBattleMonster();
    this.removeEffect_(monster, defenceEffect);
    defenderField.getBench().forEach(function(m) {
      this.removeEffect_(m, defenceEffect);
    }.bind(this));

    // clear attack effect
    var attackEffect = [];
    var monster = attackerField.getBattleMonster();
    this.removeEffect_(monster, attackEffect);
    attackerField.getBench().forEach(function(m) {
      this.removeEffect_(m, attackEffect);
    }.bind(this));
  };

  PokemonChecker.prototype.removeEffect_ = function(card, effects) {
    var status = card.getStatus();
    effects.forEach(function(effect) {
      if (status.indexOf(effect) >= 0) {
        status.splice(status.indexOf(effect), 1);
      }
    });
  };

  PokemonChecker.prototype.checkDying_ = function(field) {
    var isDead = function(c) {
      return c.hp <= c.getDamageCount() * 10;
    };
    var count = 0;
    var monster = field.getBattleMonster();
    if (isDead(monster)) {
      field.trush(monster);
      field.setBattleMonster(null);
      count++;
      MessageDisplay.println(monster.name + ' はたおれた！');
    }
    $.each(field.getBench(), function(idx, card) {
      if (isDead(card)) {
        field.trush(field.pickBench(card.trnId));
        count++;
        MessageDisplay.println(card.name + ' はたおれた！');
      }
    });
    return count;
  };

  PokemonChecker.prototype.getSide_ = function(field, count) {
    for (var i = 0; i < count; i++) {
      var side = field.pickSide();
      if (side === null) {
        break;
      }
      field.addHand(side);
    }
  };

})(jQuery);