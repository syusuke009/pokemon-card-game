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
      MessageDisplay.println(monster.name + ' は どく で 10 ダメージ！');
      monster.hurt(10);
    }
    if (status.indexOf(Const.Status.DOUBLE_POISON) >= 0) {
      MessageDisplay.println(monster.name + ' は どくどく で 20 ダメージ！');
      monster.hurt(20);
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
          MessageDisplay.println(monster.name + ' は やけど で 20 ダメージ！');
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
          MessageDisplay.println(monster.name + ' は めをさました！');
          status.splice(status.indexOf(Const.Status.SLEEP), 1);
        } else {
          MessageDisplay.println(monster.name + ' は ねむっている');
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
      MessageDisplay.println(monster.name + ' は マヒ がとけた！');
      status.splice(status.indexOf(Const.Status.PARALYSIS), 1);
    }
  };

  PokemonChecker.prototype.checkEffects_ = function(model) {
    var turn = model.getTurn();
    var attackerField = model.getField(turn.whoseTurn());
    var defenderField = model.getField(UtilFunc.reverseViewpoint(turn.whoseTurn()));

    defenderField.getBattleMonster().updateDefenceEffect();
    defenderField.getBench().forEach(function(m) {
      m.updateDefenceEffect();
    }.bind(this));

    var attacker = attackerField.getBattleMonster();
    var attackerStatus = attacker.getStatus();
    if (attackerStatus.indexOf(Const.Status.CANT_ATTACK) >= 0) {
      attackerStatus.splice(attackerStatus.indexOf(Const.Status.CANT_ATTACK), 1);
    }
    if (attackerStatus.indexOf(Const.Status.CANT_ESCAPE) >= 0) {
      attackerStatus.splice(attackerStatus.indexOf(Const.Status.CANT_ESCAPE), 1);
    }
    attacker.updateAttackEffect();
    attackerField.getBench().forEach(function(m) {
      m.updateAttackEffect();
    }.bind(this));
  };

  PokemonChecker.prototype.checkDying_ = function(field) {
    var isDead = function(c) {
      return c.hp <= c.getDamageCount() * 10;
    };
    var count = 0;
    var monster = field.getBattleMonster();
    if (isDead(monster)) {
      monster.trush();
      field.setBattleMonster(null);
      count++;
      MessageDisplay.println(monster.name + ' は たおれた！');
    }
    $.each(field.getBench(), function(idx, card) {
      if (isDead(card)) {
        field.pickBench(card.trnId).trush();
        count++;
        MessageDisplay.println(card.name + ' は たおれた！');
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
