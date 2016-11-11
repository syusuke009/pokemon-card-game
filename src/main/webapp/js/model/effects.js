(function($){

  Effects = {};

  Effects.EventType = {
      REQUEST_SELECT : 'request-select',
      REQUEST_REDRAW_FIELD : 'request-redraw-field',
      REQUEST_REDRAW_DETAIL : 'request-redraw-detail',
  };
  Effects.getEventTarget = function() {
    return $(document.body);
  };
  Effects.dispatchSelectRequestEvent = function(selectables, $defer) {
    if (!selectables) throw 'need to pass parameger of selectable trnIds';
    if (!$defer) throw 'need to pass parameger of $.Deferred';
    Effects.getEventTarget().trigger(Effects.EventType.REQUEST_SELECT, [selectables, $defer]);
  };
  Effects.dispatchRedrawFieldRequestEvent = function() {
    Effects.getEventTarget().trigger(Effects.EventType.REQUEST_REDRAW_FIELD);
  };

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
    return EffectBase.pluralAttack(param, 2);
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

  Effects.skill_84_1 = function(param) {
    return EffectsBase.pluralAttack(param, 2);
  };

  Effects.skill_87_2 = EffectsBase.paralysisByCoinToss;

  Effects.skill_96_2 = EffectsBase.confusionByCoinToss;

  Effects.skill_101_1 = Effects.skill_25_2;

  Effects.skill_109_1 = EffectsBase.poisonOrConfusionByCoinToss;

  Effects.skill_113_1 = EffectsBase.damageGuardByCoinToss;
  Effects.skill_113_2 = function(param) {
    var $defer = $.Deferred();
    param.attacker.hurt(80);
    $defer.resolve();
    return $defer.promise();
  };

  Effects.skill_114_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_114_2 = EffectsBase.poison;

  Effects.skill_121_1 = function(param) {
    var attacker = param.attacker;
    return EffectsBase.trushEnergy(attacker, ["aqua"]).then(function(response) {
      attacker.hurt(attacker.hp * (-1));
    });
  };
  Effects.skill_121_2 = EffectsBase.paralysisByCoinToss;

  Effects.skill_124_1 = function(param) {
    return EffectsBase.pluralAttack(param, 2);
  };
  Effects.skill_124_2 = function(param) {
    return EffectsBase.boostByDamage(param.defender, param.skill);
  };

  Effects.skill_125_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_125_2 = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        $defer.resolve(param.skill.damage + 10);
      } else {
        $defer.resolve(param.skill.damage);
        param.attacker.hurt(10);
      }
    });
    return $defer.promise();
  };

  Effects.skill_126_2 = Effects.skill_4_2;





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
    var dialog = new EnergySelectionDialog();
    dialog.show(target.getEnergy(), ['normal']).then(function(response){
      response.forEach(function(trushed){
        target.removeEnergy(trushed);
      })
      target.hurt(-40);
    });
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

  Effects.trainer_effect_1011 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var candidates = [];
    var field = model.getField(viewpoint);
    candidates.push(field.getBattleMonster());
    field.getBench().forEach(function(c) {
      candidates.push(c);
    });
    var field = model.getField(UtilFunc.reverseViewpoint(viewpoint));
    candidates.push(field.getBattleMonster());
    field.getBench().forEach(function(c) {
      candidates.push(c);
    });
    candidates.forEach(function(target) {
      var damageCount = target.getDamageCount();
      if (damageCount > 0) {
        target.hurt(damageCount * (-10));
        $.each($.extend([], target.getEnergy()), function(idx, e) {
          target.removeEnergy(e);
        });
      }
    });
  };
  Effects.trainer_condition_1011 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var monster = field.getBattleMonster();
    if (monster.getDamageCount() > 0) {
      return true;
    }
    if (field.getBench().some(function(c) {
      return c.getDamageCount() > 0;
    })) {
      return true;
    }
    field = model.getField(UtilFunc.reverseViewpoint(viewpoint));
    monster = field.getBattleMonster();
    if (monster.getDamageCount() > 0) {
      return true;
    }
    if (field.getBench().some(function(c) {
      return c.getDamageCount() > 0;
    })) {
      return true;
    }
    return false;
  };
  Effects.trainer_target_1011 = null;



  Effects.trainer_effect_1013 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var monster = field.getBattleMonster();
      field.setBattleMonster(field.pickBench(response.trnId));
      field.putBench(monster);
      Effects.dispatchRedrawFieldRequestEvent();
    });

    Effects.dispatchSelectRequestEvent(field.getBench().map(function(card) {
      return card.trnId;
    }), $defer);
    return false;
  };
  Effects.trainer_condition_1013 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getBench().length > 0;
  };
  Effects.trainer_target_1013 = null;


  Effects.trainer_effect_1020 = function(model) {
    var turn = model.getTurn();
    var viewpoint = UtilFunc.reverseViewpoint(turn.whoseTurn());
    var field = model.getField(viewpoint);
    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var monster = field.getBattleMonster();
      field.setBattleMonster(field.pickBench(response.trnId));
      field.putBench(monster);
      Effects.dispatchRedrawFieldRequestEvent();
    });

    Effects.dispatchSelectRequestEvent(field.getBench().map(function(card) {
      return card.trnId;
    }), $defer);
    return false;
  };
  Effects.trainer_condition_1020 = function(model) {
    var viewpoint = UtilFunc.reverseViewpoint(model.getTurn().whoseTurn());
    var field = model.getField(viewpoint);
    return field.getBench().length > 0;
  };
  Effects.trainer_target_1020 = null;





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

  Effects.trainer_effect_8003 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    // TODO
  };
  Effects.trainer_condition_8003 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    // TODO
  };
  Effects.trainer_target_8003 = null;

  Effects.trainer_effect_8004 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var mst = new CardMstDao();
    var evolutionTrnId;
    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var $defer = $.Deferred();
      evolutionTrnId = response.trnId;
      var secondEvo = field.selectFrom(response.area, response.trnId);
      var firstEvo = CardFactory.create({}, mst.get(secondEvo.baseCardCode));
      var bases = UtilFunc.findEvolutionBase(firstEvo, field, turn);
      Effects.dispatchSelectRequestEvent(bases, $defer);
      return $defer.promise();
    }).then(function(response) {
      var base = field.selectFrom(response.area, response.trnId);
      var evoluted = field.pickHand(evolutionTrnId);
      evoluted.evolute(base);
      field.override(response.area, base, evoluted);
      turn.newAssign(evolutionTrnId);
      Effects.dispatchRedrawFieldRequestEvent();
    });
    var secondEvos = field.getHands().filter(function(card) {
      return card.kind === '3';
    }).filter(function(secondEvo) {
      var firstEvo = CardFactory.create({}, mst.get(secondEvo.baseCardCode));
      var bases = UtilFunc.findEvolutionBase(firstEvo, field, turn);
      return bases.length > 0;
    }).map(function(card) {
      return card.trnId;
    });
    Effects.dispatchSelectRequestEvent(secondEvos, $defer);
    return false;
  };
  Effects.trainer_condition_8004 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var mst = new CardMstDao();
    var targets = field.getHands().filter(function(card) {
      return card.kind === '3';
    }).filter(function(secondEvo) {
      var firstEvo = CardFactory.create({}, mst.get(secondEvo.baseCardCode));
      var bases = UtilFunc.findEvolutionBase(firstEvo, field, turn);
      return bases.length > 0;
    }).map(function(card) {
      return card.trnId;
    });
    return targets.length > 0;
  };
  Effects.trainer_target_8004 = null;

  Effects.trainer_effect_8005 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    // TODO
  };
  Effects.trainer_condition_8005 = function(model) {
    // TODO
  };
  Effects.trainer_target_8005 = null;

  Effects.trainer_effect_8006 = function(model) {
    var turn = model.getTurn();
    var viewpoint = UtilFunc.reverseViewpoint(turn.whoseTurn());
    var field = model.getField(viewpoint);
    var deck = field.getDeck();
    field.getHands().map(function(hand) {
      return hand.trnId;
    }).forEach(function(trnId) {
      deck.add(field.pickHand(trnId));
    });
    deck.shuffle();
    for (var i = 0; i < 7; i++) {
      field.addHand(deck.draw());
    }
  };
  Effects.trainer_condition_8006 = function(model) {
    var turn = model.getTurn();
    var viewpoint = UtilFunc.reverseViewpoint(turn.whoseTurn());
    var field = model.getField(viewpoint);
    return field.getHands().length > 0;
  };
  Effects.trainer_target_8006 = null;
})(jQuery);
