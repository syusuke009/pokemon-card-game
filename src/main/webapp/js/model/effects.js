(function($){

  Effects = {};

  Effects.skill_1_1 = function(param) {
    var $defer = $.Deferred();
    var d = param.attacker.getDamageCount();
    if (d > 0) {
      param.attacker.hurt(-10);
    }
    $defer.resolve();
    return $defer.promise();
  };

  Effects.skill_2_2 = EffectsBase.poison;

  Effects.skill_4_2 = function(param) {
    return EffectsBase.trushEnergy(param.attacker, ["fire"]);
  };

  Effects.skill_5_2 = Effects.skill_4_2;

  Effects.skill_6_1 = function(param) {
    return EffectsBase.trushEnergy(param.attacker, ["fire", "fire"]);
  };

  Effects.skill_7_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_7_2 = EffectsBase.damageGuardByCoinToss;

  Effects.skill_8_1 = EffectsBase.damageGuardByCoinToss;

  Effects.skill_9_1 = function(param) {
    var energies = UtilFunc.mapEnergyToArray(param.attacker.getEnergy());
    return EffectsBase.boostByExtraEnergy(energies, param.skill, "aqua", 2);
  };

  Effects.skill_13_1 = EffectsBase.poisonByCoinToss;

  Effects.skill_14_1 = EffectsBase.damageGuardByCoinToss;
  Effects.skill_14_2 = EffectsBase.poisonByCoinToss;

  Effects.skill_15_1 = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog(2);
    dialog.show().then(function(response){
      var times = response.filter(function(b){
        return b;
      }).length;
      $defer.resolve(param.skill.damage * times);
    });
    return $defer.promise();
  };
  Effects.skill_15_2 = EffectsBase.poisonByCoinToss;

  Effects.skill_20_2 = EffectsBase.halfHpDamage;

  Effects.skill_25_2 = function(param) {
    return EffectsBase.selfDamageByCoinToss(10, param.attacker);
  };

  Effects.skill_26_1 = EffectsBase.matchlessByCoinToss;
  Effects.skill_26_2 = function(param) {
    return EffectsBase.selfDamageByCoinToss(30, param.attacker);
  };


  Effects.trainer_effect_1001 = function(eventdata, model) {
    var viewpoint = UtilFunc.getViewpoint(eventdata.trnId);
    var field = model.getField(viewpoint);
    var target = field.selectFrom(eventdata.area, eventdata.trnId);
    target.hurt(-20);
  };
  Effects.trainer_condition_1001 = function(model) {
    return Effects.trainer_target_1001(model).length > 0;
  };
  Effects.trainer_target_1001 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);

    var arr = [];
    if (field.getBattleMonster() !== null) {
      arr.push(field.getBattleMonster());
    }
    field.getBench().forEach(function(c) {
      arr.push(c);
    });
    return arr.filter(function(c) {
      return c.getDamageCount() > 0;
    }).map(function(c) {
      return c.trnId;
    });
  };

  Effects.trainer_effect_1002 = function(eventdata, model) {
    var viewpoint = UtilFunc.getViewpoint(eventdata.trnId);
    var field = model.getField(viewpoint);
    var target = field.selectFrom(eventdata.area, eventdata.trnId);
    target.hurt(-40);
  };
  Effects.trainer_condition_1002 = function(model) {
    return Effects.trainer_target_1002(model).length > 0;
  };
  Effects.trainer_target_1002 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);

    var arr = [];
    if (field.getBattleMonster() !== null) {
      arr.push(field.getBattleMonster());
    }
    field.getBench().forEach(function(c) {
      arr.push(c);
    });
    return arr.filter(function(c) {
      return c.getDamageCount() > 0 && c.getEnergy().length > 0;
    }).map(function(c) {
      return c.trnId;
    });
  };

  Effects.trainer_effect_1003 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var monster = field.getBattleMonster();
    var status = monster.getStatus();
    var targets = [ Const.Status.POISON, Const.Status.BURN, Const.Status.SLEEP, Const.Status.PARALYSIS, Const.Status.CONFUSION ];
    targets.forEach(function(s) {
      var idx = status.indexOf(s);
      if (idx >= 0) {
        status.splice(idx, 1);
      }
    });
  };
  Effects.trainer_condition_1003 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var monster = field.getBattleMonster();
    var status = monster.getStatus();
    var targets = [ Const.Status.POISON, Const.Status.BURN, Const.Status.SLEEP, Const.Status.PARALYSIS, Const.Status.CONFUSION ];
    return targets.some(function(s) {
      var idx = status.indexOf(s);
      return idx >= 0;
    });
  };
  Effects.trainer_target_1003 = null;





  Effects.trainer_effect_8001 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    field.getHands().map(function(c){
      return c.trnId;
    }).forEach(function(trnId) {
      field.trush(field.pickHand(trnId));
    });
    for (var i = 0; i < 7; i++) {
      field.addHand(field.getDeck().draw());
    }
  };
  Effects.trainer_condition_8001 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getDeck().size() >= 7;
  };
  Effects.trainer_target_8001 = null;

  Effects.trainer_effect_8002 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    for (var i = 0; i < 2; i++) {
      field.addHand(field.getDeck().draw());
    }
  };
  Effects.trainer_condition_8002 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getDeck().size() >= 2;
  };
  Effects.trainer_target_8002 = null;
})(jQuery);
