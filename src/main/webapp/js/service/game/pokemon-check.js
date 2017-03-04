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

    if (!model.getTurn().wasAttacked()) {
      var defenderField = (model.getTurn().whoseTurn() === Const.Viewpoint.ME ? rivalModel : myModel);
      defenderField.getBattleMonster().attacked(null);
    }

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
    if (monster.hasStatus(Const.Status.POISON)) {
      MessageDisplay.println(monster.name + ' は どく で 10 ダメージ！');
      monster.hurt(10);
    }
    if (monster.hasStatus(Const.Status.DOUBLE_POISON)) {
      MessageDisplay.println(monster.name + ' は どくどく で 20 ダメージ！');
      monster.hurt(20);
    }
  };

  PokemonChecker.prototype.checkBurn_ = function(field) {
    var $defer = $.Deferred();
    var monster = field.getBattleMonster();
    if (monster.hasStatus(Const.Status.BURN)) {
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
    if (monster.hasStatus(Const.Status.SLEEP)) {
      var dialog = new CoinTossDialog();
      dialog.show().then(function(response){
        if (response[0]) {
          MessageDisplay.println(monster.name + ' は めをさました！');
          monster.removeStatus(Const.Status.SLEEP);
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
    if (monster.hasStatus(Const.Status.PARALYSIS)) {
      MessageDisplay.println(monster.name + ' は マヒ がとけた！');
      monster.removeStatus(Const.Status.PARALYSIS);
    }
  };

  PokemonChecker.prototype.checkEffects_ = function(model) {
    var turn = model.getTurn();
    var attackerField = model.getField(turn.whoseTurn());
    var attacker = attackerField.getBattleMonster();
    if (attacker.getEffectCount(Const.Effect.BLIND) > 0) {
      attacker.removeEffect(Const.Effect.BLIND);
    }
    if (attacker.getEffectCount(Const.Effect.ATTACK_UP_10) > 0) {
      attacker.removeEffect(Const.Effect.ATTACK_UP_10);
    }
    if (attacker.getEffectCount(Const.Effect.ATTACK_DOWN_10) > 0) {
      attacker.removeEffect(Const.Effect.ATTACK_DOWN_10);
    }
    if (attacker.getEffectCount(Const.Effect.ATTACK_DOWN_20) > 0) {
      attacker.removeEffect(Const.Effect.ATTACK_DOWN_20);
    }
    if (attacker.getEffectCount(Const.Effect.CANT_ATTACK) > 0) {
      attacker.removeEffect(Const.Effect.CANT_ATTACK);
    }
    if (attacker.getEffectCount(Const.Effect.CANT_ESCAPE) > 0) {
      attacker.removeEffect(Const.Effect.CANT_ESCAPE);
    }
    if (attacker.getEffectCount(Const.Effect.CANT_SKILL1) > 0) {
      attacker.removeEffect(Const.Effect.CANT_SKILL1);
    }
    if (attacker.getEffectCount(Const.Effect.CANT_SKILL2) > 0) {
      attacker.removeEffect(Const.Effect.CANT_SKILL2);
    }
    if (attacker.getEffectCount(Const.Effect.DOUBLING) > 0) {
      attacker.removeEffect(Const.Effect.DOUBLING);
    }
    if (attacker.getEffectCount(Const.Effect.PRE_DOUBLING) > 0) {
      attacker.removeEffect(Const.Effect.PRE_DOUBLING);
      attacker.addEffect(Const.Effect.DOUBLING);
    }
    attacker.trushAttackEffectCards();

    var defenderField = model.getField(UtilFunc.reverseViewpoint(turn.whoseTurn()));
    var defender = defenderField.getBattleMonster();
    if (defender.getEffectCount(Const.Effect.TAKE_ALONG) > 0) {
      defender.removeEffect(Const.Effect.TAKE_ALONG);
    }
    if (defender.getEffectCount(Const.Effect.DEFENCE_UP_20) > 0) {
      defender.removeEffect(Const.Effect.DEFENCE_UP_20);
    }
    if (defender.getEffectCount(Const.Effect.DAMAGE_GUARD_LESS_THAN_40) > 0) {
      defender.removeEffect(Const.Effect.DAMAGE_GUARD_LESS_THAN_40);
    }
    if (defender.getEffectCount(Const.Effect.DAMAGE_GUARD) > 0) {
      defender.removeEffect(Const.Effect.DAMAGE_GUARD);
    }
    if (defender.getEffectCount(Const.Effect.MATCHLESS) > 0) {
      defender.removeEffect(Const.Effect.MATCHLESS);
    }
    defender.trushDefenceEffectCards();
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
      if (!monster.isDummy) {
        count++;
      }
      MessageDisplay.println(monster.name + ' は たおれた！');
    }
    var dead = [];
    $.each(field.getBench(), function(idx, card) {
      if (isDead(card)) {
        dead.push(card.trnId);
        if (!card.isDummy) {
          count++;
        }
        MessageDisplay.println(card.name + ' は たおれた！');
      }
    });
    $.each(dead, function(idx, id) {
      field.pickBench(id).trush();
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
