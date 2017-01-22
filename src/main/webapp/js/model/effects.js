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
      MessageDisplay.println(param.attacker.name + ' は 10 かいふくした！');
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
    return EffectsBase.pluralAttack(param, 2);
  };
  Effects.skill_15_2 = EffectsBase.poisonByCoinToss;

  Effects.skill_20_2 = EffectsBase.halfHpDamage;

  Effects.skill_23_1 = EffectsBase.poisonByCoinToss;
  Effects.skill_23_2 = EffectsBase.paralysisByCoinToss;
  Effects.skill_24_1 = null;
  Effects.skill_24_2 = EffectsBase.poison;

  Effects.skill_25_2 = function(param) {
    return EffectsBase.selfDamageByCoinToss(10, param);
  };

  Effects.skill_26_1 = EffectsBase.matchlessByCoinToss;
  Effects.skill_26_2 = function(param) {
    return EffectsBase.selfDamageByCoinToss(30, param);
  };

  Effects.skill_29_1 = function(param) {
    return EffectsBase.pluralAttack(param, 3);
  };
  Effects.skill_29_2 = function(param) {
    return EffectsBase.callFriend(param, function(card) {
      var code = card.code;
      return code === '29' || code === '32';
    });
  };

  Effects.skill_30_1 = EffectsBase.confusionByCoinToss;
  Effects.skill_30_2 = function(param) {
    return EffectsBase.pluralAttack(param, 2);
  };

  Effects.skill_31_1 = function(param) {
    return EffectsBase.boostByBench(param, 20, function(card) {
      var code = card.code;
      return code === '34';
    });
  };

  Effects.skill_32_1 = function(param) {
    return EffectsBase.pluralAttack(param, 1);
  };

  Effects.skill_33_1 = function(param) {
    return EffectsBase.pluralAttack(param, 2);
  };

  Effects.skill_34_1 = function(param) {
    return EffectsBase.boostOrSelfDamageByCoinToss(10, param);
  };
  Effects.skill_34_2 = EffectsBase.doublePoison;

  Effects.skill_37_1 = EffectsBase.confusionByCoinToss;

  Effects.skill_38_1 = function(param) {
    var $defer = $.Deferred();
    var viewpoint = param.model.getTurn().whoseTurn();
    var field = param.model.getField(UtilFunc.reverseViewpoint(viewpoint));
    var bench = field.getBench();
    if (bench.length === 0) {
      $defer.resolve();
      return $defer.promise();
    }
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(bench), $defer);
    return $defer.promise().then(function(response) {
      field.putBench(field.getBattleMonster());
      var card = field.pickBench(response.trnId);
      field.setBattleMonster(card);
      return $.Deferred().resolve().promise();
    });
  };
  Effects.skill_38_2 = Effects.skill_4_2;

  Effects.skill_39_1 = EffectsBase.sleep;

  Effects.skill_40_1 = EffectsBase.sleep;
  Effects.skill_40_2 = function(param) {
    return EffectsBase.boostByBench(param, 10, function(card) {
      return true;
    });
  };

  Effects.skill_41_1 = EffectsBase.confusionByCoinToss;
  Effects.skill_41_2 = EffectsBase.absorb;

  Effects.skill_42_2 = EffectsBase.absorb;

  Effects.skill_43_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_43_2 = function(param) {
    return EffectsBase.callFriend(param, function(card) {
      var code = card.code;
      return code === '43';
    });
  };

  Effects.skill_44_1 = EffectsBase.poison;
  Effects.skill_44_2 = EffectsBase.confusionEachOther;

  Effects.skill_45_1 = function(param) {
    param.attacker.addStatus(Const.Status.CONFUSION);
    MessageDisplay.println(param.attacker.name + ' は こんらんした！');
    return EffectsBase.pluralAttack(param, 3);
  };

  Effects.skill_46_2 = EffectsBase.sleep;

  Effects.skill_47_1 = EffectsBase.sleep;

  Effects.skill_48_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_48_2 = EffectsBase.absorb;

  Effects.skill_49_1 = EffectsBase.poisonAndConfusionByCoinToss;

  Effects.skill_51_2 = function(param) {
    var viewpoint = param.model.getTurn().whoseTurn();
    return EffectsBase.benchDamage(param.model.getField(viewpoint), 10);
  };

  Effects.skill_59_1 = Effects.skill_4_2;
  Effects.skill_59_2 = function(param) {
    return EffectsBase.selfDamage(30, param);
  };

  Effects.skill_63_1 = EffectsBase.paralysisByCoinToss;

  Effects.skill_64_1 = function(param) {
    return EffectsBase.refresh(param, ["esper"]);
  };

  Effects.skill_65_1 = EffectsBase.confusionByCoinToss;

  Effects.skill_67_1 = function(param) {
    return EffectsBase.suppressByDamage(param.attacker, param.skill);
  };
  Effects.skill_67_2 = function(param) {
    return EffectsBase.selfDamage(20, param);
  };

  Effects.skill_69_2 = function(param) {
    return EffectsBase.callFriend(param, function(card) {
      var code = card.code;
      return code === '69';
    });
  };

  Effects.skill_70_1 = EffectsBase.poisonByCoinToss;

  Effects.skill_71_1 = Effects.skill_38_1;
  Effects.skill_71_2 = EffectsBase.prohibitEscapeByCoinToss;

  Effects.skill_73_1 = EffectsBase.confusionByCoinToss;
  Effects.skill_73_2 = EffectsBase.poison;

  Effects.skill_84_1 = function(param) {
    return EffectsBase.pluralAttack(param, 2);
  };

  Effects.skill_81_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_81_2 = function(param) {
    return EffectsBase.suicideBombing(param, 10);
  };

  Effects.skill_82_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_82_2 = function(param) {
    return EffectsBase.suicideBombing(param, 20);
  };

  Effects.skill_87_2 = EffectsBase.paralysisByCoinToss;

  Effects.skill_96_2 = EffectsBase.confusionByCoinToss;

  Effects.skill_90_1 = EffectsBase.confusionByCoinToss;
  Effects.skill_90_2 = EffectsBase.damageGuardByCoinToss;

  Effects.skill_91_1 = EffectsBase.paralysisOrMiss;
  Effects.skill_91_2 = function(param) {
    return EffectsBase.pluralAttack(param, 2);
  };

  Effects.skill_98_1 = function(param) {
    return EffectsBase.callFriend(param, function(card) {
      var code = card.code;
      return code === '98';
    });
  };
  Effects.skill_99_1 = function(param) {
    var $defer = $.Deferred();
    $defer.resolve(param.attacker.getDamageCount() * 10);
    return $defer.promise();
  };

  Effects.skill_101_1 = Effects.skill_25_2;

  Effects.skill_108_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_108_2 = EffectsBase.confusionByCoinToss;

  Effects.skill_109_1 = EffectsBase.poisonOrConfusionByCoinToss;

  Effects.skill_110_1 = EffectsBase.poisonByCoinToss;
  Effects.skill_110_2 = function(param) {
    return EffectsBase.suicideBombing(param, 10);
  };


  Effects.skill_113_1 = EffectsBase.damageGuardByCoinToss;
  Effects.skill_113_2 = function(param) {
    return EffectsBase.selfDamage(80, param);
  };

  Effects.skill_114_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_114_2 = EffectsBase.poison;

  Effects.skill_121_1 = function(param) {
    return EffectsBase.refresh(param, ["aqua"]);
  };
  Effects.skill_121_2 = EffectsBase.paralysisByCoinToss;

  Effects.skill_122_1 = function(param) {
    return EffectsBase.boostByDamage(param.defender, param.skill);
  };

  Effects.skill_124_1 = function(param) {
    return EffectsBase.pluralAttack(param, 2);
  };
  Effects.skill_124_2 = Effects.skill_122_1;

  Effects.skill_125_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_125_2 = function(param) {
    return EffectsBase.boostOrSelfDamageByCoinToss(10, param);
  };

  Effects.skill_126_2 = Effects.skill_4_2;

  Effects.skill_127_1 = EffectsBase.paralysisByCoinToss;

  Effects.skill_129_1 = Effects.skill_98_2;

  Effects.skill_130_2 = EffectsBase.paralysisByCoinToss;

  Effects.skill_131_1 = Effects.skill_9_1;
  Effects.skill_131_2 = EffectsBase.confusionByCoinToss;

  Effects.skill_143_1 = EffectsBase.paralysisByCoinToss;

  Effects.skill_145_1 = function(param) {
    return EffectsBase.selfDamageByCoinToss(30, param);
  };
  Effects.skill_145_2 = EffectsBase.trushAllEnergy;

  Effects.skill_148_1 = function(param) {
    return EffectsBase.pluralAttack(param, 2);
  };
  Effects.skill_148_2 = function(param) {
    return EffectsBase.burstEnergy(1, param);
  };

  Effects.skill_149_1 = function(param) {
    return EffectsBase.pluralAttack(param, 2);
  };


  Effects.skill_150_1 = function(param) {
    return EffectsBase.boostByEnergyCount(param.defender.getEnergy(), param.skill);
  };
  Effects.skill_150_2 = function(param) {
    return EffectsBase.matchlessByTrushEnergy(param, ['esper']);
  };



  Effects.trainer_effect_1001 = function(model) {
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
    var targets = arr.filter(function(c) {
      return c.getDamageCount() > 0;
    });

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var target = field.selectFrom(response.area, response.trnId);
      target.hurt(-20);
      MessageDisplay.newSentence('きずぐすり を つかった！');
      MessageDisplay.println(target.name + ' は 20 かいふくした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets), $defer);
    return false;
  };
  Effects.trainer_condition_1001 = function(model) {
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
    var targets = arr.filter(function(c) {
      return c.getDamageCount() > 0;
    });
    return targets.length > 0;
  };

  Effects.trainer_effect_1002 = function(model) {
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
    var targets = arr.filter(function(c) {
      return c.getDamageCount() > 0 && c.getEnergy().length > 0;
    })

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var target = field.selectFrom(response.area, response.trnId);
      var dialog = new EnergySelectionDialog();
      return $.when(dialog.show(target.getEnergy(), ['normal']), $.Deferred().resolve(target).promise());
    }).then(function(response, target){
      response.forEach(function(trushed){
        target.removeEnergy(trushed);
      })
      target.hurt(-40);
      MessageDisplay.newSentence('いいきずぐすり を つかった！');
      MessageDisplay.println(target.name + ' は 40 かいふくした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets), $defer);
    return false;
  };
  Effects.trainer_condition_1002 = function(model) {
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
    }).length > 0;
  };

  Effects.trainer_effect_1003 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var monster = field.getBattleMonster();
    var status = monster.getStatus();
    var targets = [ Const.Status.POISON, Const.Status.DOUBLE_POISON, Const.Status.BURN, Const.Status.SLEEP, Const.Status.PARALYSIS, Const.Status.CONFUSION ];
    targets.forEach(function(s) {
      var idx = status.indexOf(s);
      if (idx >= 0) {
        status.splice(idx, 1);
      }
      MessageDisplay.newSentence('なんでもなおし を つかった！');
      MessageDisplay.println(monster.name + ' のステータスがかいふくした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
  };
  Effects.trainer_condition_1003 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var monster = field.getBattleMonster();
    var status = monster.getStatus();
    var targets = [ Const.Status.POISON, Const.Status.DOUBLE_POISON, Const.Status.BURN, Const.Status.SLEEP, Const.Status.PARALYSIS, Const.Status.CONFUSION ];
    return targets.some(function(s) {
      var idx = status.indexOf(s);
      return idx >= 0;
    });
  };

  Effects.trainer_effect_1004 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var trush = field.getTrush();
    var dialog = new CardSelectionDialog();
    dialog.show(trush.getAll().filter(function(c) {
      return c.kind === '1';
    }), 1).then(function(response) {
      var card = field.getTrush().pick(response[0].trnId);
      card.hurt(Math.floor(card.hp / 2 / 10) * 10);
      field.putBench(card);
      MessageDisplay.newSentence('げんきのかけら を つかった！');
      MessageDisplay.println(card.name + ' は げんきをとりもどした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
  };
  Effects.trainer_condition_1004 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var trush = field.getTrush();
    return (field.getBench().length < 5) && trush.getAll().some(function(c) {
      return c.kind === '1';
    });
  };

  Effects.trainer_effect_1007 = function(model) {
    var viewpoint = UtilFunc.reverseViewpoint(model.getTurn().whoseTurn());
    var field = model.getField(viewpoint);
    var trush = field.getTrush();
    var dialog = new CardSelectionDialog();
    dialog.show(trush.getAll().filter(function(c) {
      return c.kind === '1';
    }), 1).then(function(response) {
      var card = field.getTrush().pick(response[0].trnId);
      field.putBench(card);
      MessageDisplay.newSentence('ポケモンの笛 を つかった！');
      MessageDisplay.println(card.name + ' は ベンチによみがえった！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
  };
  Effects.trainer_condition_1007 = function(model) {
    var viewpoint = UtilFunc.reverseViewpoint(model.getTurn().whoseTurn());
    var field = model.getField(viewpoint);
    var trush = field.getTrush();
    return trush.getAll().some(function(c) {
      return c.kind === '1';
    });
  };

  Effects.trainer_effect_1009 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var trush = field.getTrush();

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var $defer = $.Deferred();
      var hand = hands.pick(response.trnId);
      trush.trush(hand);
      Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(hands.getAll()), $defer);
      return $defer.promise();
    }).then(function(response) {
      var hand = hands.pick(response.trnId);
      trush.trush(hand);

      var dialog = new CardSelectionDialog();
      return dialog.show(trush.getAll().filter(function(card) {
        return UtilFunc.isTrainer(card.kind);
      }), 1);
    }).then(function(response) {
      var card = trush.pick(response[0].trnId);
      hands.add(card);
      MessageDisplay.newSentence('ダウジングマシーン を つかった！');
      MessageDisplay.println(card.name + ' を みつけた！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getHands().getAll()), $defer);
    return false;
  };
  Effects.trainer_condition_1009 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return (field.getHands().size() > 2) && field.getTrush().getAll().some(function(card) {
      return UtilFunc.isTrainer(card.kind);
    });
  };

  Effects.trainer_effect_1010 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var deck = field.getDeck();
    var trush = field.getTrush();

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var $defer = $.Deferred();
      var hand = hands.pick(response.trnId);
      trush.trush(hand);
      Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(hands.getAll()), $defer);
      return $defer.promise();
    }).then(function(response) {
      var hand = hands.pick(response.trnId);
      trush.trush(hand);

      var dialog = new CardSelectionDialog();
      return dialog.show(deck.getAll(), 1);
    }).then(function(response) {
      var card = deck.pick(response[0].trnId);
      hands.add(card);
      deck.shuffle();
      MessageDisplay.newSentence('パソコン通信 を つかった！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getHands().getAll()), $defer);
    return false;
  };
  Effects.trainer_condition_1010 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return (field.getHands().size() > 2) && (!field.getDeck().isEmpty());
  };

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
    MessageDisplay.newSentence('ポケモンセンター を つかった！');
    MessageDisplay.println('すべてのポケモン が かいふくし、かいふくしたポケモン の エネルギーは うしなわれた！');
    Effects.dispatchRedrawFieldRequestEvent();
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



  Effects.trainer_effect_1013 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var oldMonster = field.getBattleMonster();
      var newMonster = field.pickBench(response.trnId);
      field.setBattleMonster(newMonster);
      field.putBench(oldMonster);
      MessageDisplay.newSentence('ポケモンいれかえ を つかった！');
      MessageDisplay.println('『もどれっ！ ' + oldMonster.name + '！』', 'あいては ' + oldMonster.name + ' を ひっこめた');
      MessageDisplay.println('『いけっ！ ' + newMonster.name + '！』', 'あいては ' + newMonster.name + ' を くりだした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });

    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getBench()), $defer);
    return false;
  };
  Effects.trainer_condition_1013 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getBench().length > 0;
  };

  Effects.trainer_effect_1015 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var trush = field.getTrush();

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var hand = hands.pick(response.trnId);
      trush.trush(hand);

      var dialog = new CardSelectionDialog();
      return dialog.show(trush.getAll().filter(function(card) {
        return card.kind === 'energy';
      }), 2);
    }).then(function(response) {
      response.forEach(function(c) {
        var card = trush.pick(c.trnId);
        hands.add(card);
      });
      MessageDisplay.newSentence('エネルギー回収 を つかった！');
      MessageDisplay.println(response.map(function(c){
        return c.name;
      }).join(' と ') + ' を かいしゅうした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });

    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getHands().getAll()), $defer);
    return false;
  };
  Effects.trainer_condition_1015 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return (field.getHands().size() > 1) && (field.getTrush().getAll().filter(function(card) {
      return card.kind === 'energy';
    }).length >= 2);
  };

  Effects.trainer_effect_1016 = function(model) {
    var turn = model.getTurn();
    var viewpoint = UtilFunc.reverseViewpoint(turn.whoseTurn());
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var trush = field.getTrush();

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var $defer = $.Deferred();
      var card = field.selectFrom(response.area, response.trnId);

      var dialog = new CardSelectionDialog();
      dialog.show(card.getEnergy(), 1).then(function(res) {
        $defer.resolve({
          'target':response,
          'energy': res
        });
      });
      return $defer.promise();
    }).then(function(response) {
      var target = field.selectFrom(response.target.area, response.target.trnId);
      response.energy.forEach(function(e) {
        target.removeEnergy(e);
      });
      MessageDisplay.newSentence('エネルギーリムーブ を つかった！');
      MessageDisplay.println(target.name + ' は ' + response.energy.map(function(c){
        return c.name;
      }).join(' と ') + ' を うしなった！');
      Effects.dispatchRedrawFieldRequestEvent();
    });

    var targets = [];
    targets.push(field.getBattleMonster());
    field.getBench().forEach(function(b) {
      targets.push(b);
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets.filter(function(card) {
      return card.getEnergy().length > 0;
    })), $defer);
    return false;
  };
  Effects.trainer_condition_1016 = function(model) {
    var viewpoint = UtilFunc.reverseViewpoint(model.getTurn().whoseTurn());
    var field = model.getField(viewpoint);
    var targets = [];
    targets.push(field.getBattleMonster());
    field.getBench().forEach(function(b) {
      targets.push(b);
    });
    return targets.filter(function(card) {
      return card.getEnergy().length > 0;
    }).length > 0;
  };

  Effects.trainer_effect_1017 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var myField = model.getField(viewpoint);
    var rivalField = model.getField(UtilFunc.reverseViewpoint(viewpoint));

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var $defer = $.Deferred();
      var card = myField.selectFrom(response.area, response.trnId);

      var dialog = new CardSelectionDialog();
      dialog.show(card.getEnergy(), 1).then(function(res) {
        $defer.resolve({
          'target':response,
          'energy': res
        });
      });
      return $defer.promise();
    }).then(function(response) {
      var $defer = $.Deferred();
      var target = myField.selectFrom(response.target.area, response.target.trnId);
      response.energy.forEach(function(e) {
        target.removeEnergy(e);
      });

      var targets = [];
      targets.push(rivalField.getBattleMonster());
      rivalField.getBench().forEach(function(b) {
        targets.push(b);
      });
      Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets.filter(function(card) {
        return card.getEnergy().length >= 2;
      })), $defer);
      return $defer.promise();
    }).then(function(response) {
      var $defer = $.Deferred();
      var card = rivalField.selectFrom(response.area, response.trnId);

      var dialog = new CardSelectionDialog();
      dialog.show(card.getEnergy(), 2).then(function(res) {
        $defer.resolve({
          'target':response,
          'energy': res
        });
      });
      return $defer.promise();
    }).then(function(response) {
      var $defer = $.Deferred();
      var target = rivalField.selectFrom(response.target.area, response.target.trnId);
      response.energy.forEach(function(e) {
        target.removeEnergy(e);
      });
      MessageDisplay.newSentence('超エネルギーリムーブ を つかった！');
      MessageDisplay.println(target.name + ' は ' + response.energy.map(function(c){
        return c.name;
      }).join(' と ') + ' を うしなった！');
      Effects.dispatchRedrawFieldRequestEvent();
    });

    var targets = [];
    targets.push(myField.getBattleMonster());
    myField.getBench().forEach(function(b) {
      targets.push(b);
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets.filter(function(card) {
      return card.getEnergy().length > 0;
    })), $defer);
    return false;
  };
  Effects.trainer_condition_1017 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var targets = [];
    field = model.getField(viewpoint);
    targets = [];
    targets.push(field.getBattleMonster());
    field.getBench().forEach(function(b) {
      targets.push(b);
    });
    var mineCondition = targets.filter(function(card) {
      return card.getEnergy().length > 0;
    }).length > 0;

    viewpoint = UtilFunc.reverseViewpoint(model.getTurn().whoseTurn());
    field = model.getField(viewpoint);
    targets = [];
    targets.push(field.getBattleMonster());
    field.getBench().forEach(function(b) {
      targets.push(b);
    });
    var rivalCondition = targets.filter(function(card) {
      return card.getEnergy().length >= 2;
    }).length > 0;

    return mineCondition && rivalCondition;
  };

  Effects.trainer_effect_1019 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var deck = field.getDeck();
    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var $defer = $.Deferred();
      var hand = hands.pick(response.trnId);
      deck.add(hand);

      Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getHands().getAll()), $defer);
      return $defer.promise();
    }).then(function(response) {
      var hand = hands.pick(response.trnId);
      deck.add(hand);

      deck.shuffle();
      hands.add(deck.draw());

      MessageDisplay.newSentence('メンテナンス を つかった！');
      Effects.dispatchRedrawFieldRequestEvent();
    });

    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getHands().getAll()), $defer);
    return false;
  };
  Effects.trainer_condition_1019 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getHands().size() > 2;
  };

  Effects.trainer_effect_1020 = function(model) {
    var turn = model.getTurn();
    var viewpoint = UtilFunc.reverseViewpoint(turn.whoseTurn());
    var field = model.getField(viewpoint);
    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var oldMonster = field.getBattleMonster();
      var newMonster = field.pickBench(response.trnId);
      field.setBattleMonster(newMonster);
      field.putBench(oldMonster);
      MessageDisplay.newSentence('突風 を つかった！');
      MessageDisplay.println(oldMonster.name + ' は もどされ ' + newMonster.name + ' が でてきた！');
      Effects.dispatchRedrawFieldRequestEvent();
    });

    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getBench()), $defer);
    return false;
  };
  Effects.trainer_condition_1020 = function(model) {
    var viewpoint = UtilFunc.reverseViewpoint(model.getTurn().whoseTurn());
    var field = model.getField(viewpoint);
    return field.getBench().length > 0;
  };





  Effects.trainer_effect_8001 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    field.getHands().getAll().map(function(c){
      return c.trnId;
    }).forEach(function(trnId) {
      field.getTrush().trush(field.pickHand(trnId));
    });
    for (var i = 0; i < 7; i++) {
      field.addHand(field.getDeck().draw());
    }
    MessageDisplay.newSentence('オーキドはかせ が たすけにきた！');
  };
  Effects.trainer_condition_8001 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getDeck().size() >= 7;
  };

  Effects.trainer_effect_8002 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    for (var i = 0; i < 2; i++) {
      field.addHand(field.getDeck().draw());
    }
    MessageDisplay.newSentence('マサキ が たすけにきた！');
  };
  Effects.trainer_condition_8002 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getDeck().size() >= 2;
  };

  Effects.trainer_effect_8003 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    // TODO
    MessageDisplay.newSentence('ポケモン交換おじさん が たすけにきた！');
  };
  Effects.trainer_condition_8003 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    // TODO
  };

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
      MessageDisplay.newSentence('ポケモン育て屋さん が たすけにきた！');
      MessageDisplay.println(base.name + ' は ' + evoluted.name + ' に しんかした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
    var secondEvos = field.getHands().getAll().filter(function(card) {
      return card.kind === '3';
    }).filter(function(secondEvo) {
      var firstEvo = CardFactory.create({}, mst.get(secondEvo.baseCardCode));
      var bases = UtilFunc.findEvolutionBase(firstEvo, field, turn);
      return bases.length > 0;
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(secondEvos), $defer);
    return false;
  };
  Effects.trainer_condition_8004 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var mst = new CardMstDao();
    var targets = field.getHands().getAll().filter(function(card) {
      return card.kind === '3';
    }).filter(function(secondEvo) {
      var firstEvo = CardFactory.create({}, mst.get(secondEvo.baseCardCode));
      var bases = UtilFunc.findEvolutionBase(firstEvo, field, turn);
      return bases.length > 0;
    });
    return targets.length > 0;
  };

  Effects.trainer_effect_8005 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    // TODO
    MessageDisplay.newSentence('ミニスカート が たすけにきた！');
  };
  Effects.trainer_condition_8005 = function(model) {
    // TODO
  };

  Effects.trainer_effect_8006 = function(model) {
    var turn = model.getTurn();
    var viewpoint = UtilFunc.reverseViewpoint(turn.whoseTurn());
    var field = model.getField(viewpoint);
    var deck = field.getDeck();
    field.getHands().getAll().map(function(hand) {
      return hand.trnId;
    }).forEach(function(trnId) {
      deck.add(field.pickHand(trnId));
    });
    deck.shuffle();
    for (var i = 0; i < 7; i++) {
      field.addHand(deck.draw());
    }
    MessageDisplay.newSentence('にせオーキドはかせ が たすけにきた！');
  };
  Effects.trainer_condition_8006 = function(model) {
    var turn = model.getTurn();
    var viewpoint = UtilFunc.reverseViewpoint(turn.whoseTurn());
    var field = model.getField(viewpoint);
    return !field.getHands().isEmpty();
  };
})(jQuery);
