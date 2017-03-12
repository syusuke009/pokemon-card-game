(function($){

  Effects = {};

  Effects.EventType = {
      REQUEST_SELECT : 'effect:request-select',
      REQUEST_SELECT_SIGNAL_SEND : 'effect:request-select-signal-send',
      REQUEST_REDRAW_FIELD : 'effect:request-redraw-field',
      REQUEST_REDRAW_DETAIL : 'effect:request-redraw-detail',
      GAME_SET : 'effect:gameset'
  };
  Effects.getEventTarget = function() {
    return $(document.body);
  };
  Effects.dispatchSelectRequestEvent = function(selectables, $defer) {
    if (!selectables) throw 'need to pass parameger of selectable trnIds';
    if (!$defer) throw 'need to pass parameger of $.Deferred';
    Effects.getEventTarget().trigger(Effects.EventType.REQUEST_SELECT, [selectables, $defer]);
  };
  Effects.dispatchSelectSignalSendRequestEvent = function(selectables, $defer) {
    if (!selectables) throw 'need to pass parameger of selectable trnIds';
    if (!$defer) throw 'need to pass parameger of $.Deferred';
    Effects.getEventTarget().trigger(Effects.EventType.REQUEST_SELECT_SIGNAL_SEND, [selectables, $defer]);
  };
  Effects.dispatchRedrawFieldRequestEvent = function() {
    Effects.getEventTarget().trigger(Effects.EventType.REQUEST_REDRAW_FIELD);
  };
  Effects.dispatchGameSet = function(winner, message) {
    Effects.getEventTarget().trigger(Effects.EventType.GAME_SET, [winner, message]);
  };

  Effects.skill_1_1 = function(param) {
    return EffectsBase.absorb(10, param);
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
    var energies = UtilFunc.mapEnergyToArray(param.attacker.getEnergy(), param.attacker);
    return EffectsBase.boostByExtraEnergy(energies, param.skill, "aqua", 2);
  };

  Effects.skill_10_1 = EffectsBase.paralysisByCoinToss;

  Effects.skill_11_1 = EffectsBase.damageGuardByCoinToss;
  Effects.skill_11_2 = EffectsBase.paralysisByCoinToss;

  Effects.skill_12_1 = function(param) {
    var $defer = $.Deferred();
    var viewpoint = param.model.getTurn().whoseTurn();
    var field = param.model.getField(UtilFunc.reverseViewpoint(viewpoint));
    var selectables = field.getBench().map(function(c) {
      return c.trnId;
    });
    if (selectables.length === 0) {
      return $defer.resolve().promise();
    }
    var monster = field.getBattleMonster();
    Effects.dispatchSelectSignalSendRequestEvent(selectables, $defer)
    $defer.then(function(trnId) {
      field.putBench(monster);
      monster.backToBench();
    });
    return $defer.promise();
  };
  Effects.skill_12_2 = function(param) {
    var restore = Math.ceil(param.damage / 2 / 10) * 10;
    EffectsBase.absorb(restore, param);
  };

  Effects.skill_13_1 = EffectsBase.poisonByCoinToss;

  Effects.skill_14_1 = EffectsBase.damageGuardByCoinToss;
  Effects.skill_14_2 = EffectsBase.poisonByCoinToss;

  Effects.skill_15_1 = function(param) {
    return EffectsBase.pluralAttack(param, 2);
  };
  Effects.skill_15_2 = EffectsBase.poisonByCoinToss;

  Effects.skill_16_1 = Effects.skill_12_1;

  Effects.skill_17_1 = Effects.skill_12_1;
  Effects.skill_17_2 = EffectsBase.revenge;

  Effects.skill_18_2 = function(param) {
    var $defer = $.Deferred();
    var defender = param.defender;
    if (defender.hp === defender.getDamageCount() * 10) {
      return $defer.resolve().promise();
    }
    var viewpoint = UtilFunc.reverseViewpoint(param.model.getTurn().whoseTurn());
    var field = param.model.getField(viewpoint);
    var hands = field.getHands();
    defender.backToHand();
    var cards = defender.getAllCards();
    $.each(cards, function(idx, card) {
      hands.add(card);
    });
    MessageDisplay.println(defender.name + ' は 手札に飛ばされた！');
    var bench = field.getBench();
    if (bench.length === 0) {
      field.setBattleMonster(null);
      var v = param.model.getTurn().whoseTurn();
      Effects.dispatchGameSet(v, (v === Const.Viewpoint.ME ? 'あいて' : 'あなた') + 'のポケモンが全滅しました');
    }

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var monster = field.pickBench(response.trnId);
      field.setBattleMonster(monster);
      Effects.dispatchRedrawFieldRequestEvent();
    });

    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(bench), $defer);
    return $defer;
  };

  Effects.skill_20_2 = EffectsBase.halfHpDamage;

  Effects.skill_21_2 = EffectsBase.revenge;

  Effects.skill_22_1 = EffectsBase.matchlessByCoinToss;

  Effects.skill_23_1 = EffectsBase.poisonByCoinToss;
  Effects.skill_23_2 = EffectsBase.paralysisByCoinToss;

  Effects.skill_24_1 = Effects.skill_12_1;
  Effects.skill_24_2 = EffectsBase.poison;

  Effects.skill_25_2 = function(param) {
    return EffectsBase.selfDamageByCoinToss(10, param);
  };

  Effects.skill_26_1 = EffectsBase.matchlessByCoinToss;
  Effects.skill_26_2 = function(param) {
    return EffectsBase.selfDamageByCoinToss(30, param);
  };

  Effects.skill_27_1 = EffectsBase.blind;

  Effects.skill_28_2 = function(param) {
    return EffectsBase.pluralAttack(param, 3);
  };

  Effects.skill_29_1 = Effects.skill_28_2;
  Effects.skill_29_2 = function(param) {
    return EffectsBase.callFriend(param, function(card) {
      var code = card.code;
      return code === '29' || code === '32';
    });
  };

  Effects.skill_30_1 = EffectsBase.confusionByCoinToss;
  Effects.skill_30_2 = Effects.skill_15_1;

  Effects.skill_31_1 = function(param) {
    return EffectsBase.boostByBench(param, 20, function(card) {
      var code = card.code;
      return code === '34';
    });
  };

  Effects.skill_32_1 = function(param) {
    return EffectsBase.pluralAttack(param, 1);
  };

  Effects.skill_33_1 = Effects.skill_15_1;

  Effects.skill_34_1 = function(param) {
    return EffectsBase.boostOrSelfDamageByCoinToss(10, param);
  };
  Effects.skill_34_2 = EffectsBase.doublePoison;

  Effects.skill_35_1 = EffectsBase.sleepByCoinToss;
  Effects.skill_35_2 = EffectsBase.useRivalSkill;

  Effects.skill_36_1 = EffectsBase.useRivalSkill;
  Effects.skill_36_2 = EffectsBase.defenceUp20;

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
      var monster= field.getBattleMonster();
      monster.backToBench();
      field.putBench(monster);
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
  Effects.skill_41_2 = function(param) {
    return EffectsBase.absorb(param.damage, param);
  };

  Effects.skill_42_2 = Effects.skill_41_2;

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
    return Effects.skill_28_2(param);
  };

  Effects.skill_46_2 = EffectsBase.sleep;

  Effects.skill_47_1 = EffectsBase.sleep;

  Effects.skill_48_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_48_2 = Effects.skill_41_2;

  Effects.skill_49_1 = EffectsBase.poisonAndConfusionByCoinToss;

  Effects.skill_51_2 = function(param) {
    var viewpoint = param.model.getTurn().whoseTurn();
    return EffectsBase.benchDamage(param.model.getField(viewpoint), 10);
  };

  Effects.skill_52_1 = EffectsBase.drawByCoinToss;

  Effects.skill_53_2 = EffectsBase.attackDown10;

  Effects.skill_54_1 = function(param) {
    param.model.getTurn().prohibitTrainer();
    return $.Deferred().resolve().promise();
  };
  Effects.skill_54_2 = Effects.skill_28_2;

  Effects.skill_55_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_55_2 = function(param) {
    return EffectsBase.burstEnergy(1, param);
  };

  Effects.skill_57_1 = Effects.skill_28_2;
  Effects.skill_57_2 = EffectsBase.selfConfusionByCoinToss;

  Effects.skill_59_1 = Effects.skill_4_2;
  Effects.skill_59_2 = function(param) {
    return EffectsBase.selfDamage(30, param);
  };

  Effects.skill_60_1 = Effects.skill_9_1;

  Effects.skill_61_1 = function(param) {
    var dialog = new SkillSelectionDialog(param.model, true);
    return dialog.show(param.defender).then(function(key) {
      if (key === 'skill1') {
        param.defender.addEffect(Const.Effect.CANT_SKILL1);
      } else if (key === 'skill2') {
        param.defender.addEffect(Const.Effect.CANT_SKILL2);
      }
      return $.Deferred().resolve().promise();
    });
  };
  Effects.skill_61_2 = Effects.skill_15_1;

  Effects.skill_62_1 = Effects.skill_9_1;
  Effects.skill_62_2 = Effects.skill_55_2;

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

  Effects.skill_74_1 = EffectsBase.pluralAttackUntilTail;

  Effects.skill_75_1 = EffectsBase.damageGuardLessThan40;

  Effects.skill_76_2 = function(param) {
    return EffectsBase.suicideBombing(param, 20);
  };

  Effects.skill_79_1 = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      var attacker = param.attacker;
      var restore = 10;
      if (response[0]) {
        attacker.hurt(restore * -1);
        MessageDisplay.println(attacker.name + ' は ' + restore + ' かいふくした！');
      }
      $defer.resolve();
    });
    return $defer.promise();
  };
  Effects.skill_79_2 = function(param) {
    return EffectsBase.trushEnergy(param.attacker, ['esper']).then(function(bool) {
      var $defer = $.Deferred();
      if (bool) {
        var viewpoint = param.model.getTurn().whoseTurn();
        var field = param.model.getField(viewpoint);
        var trush = field.getTrush();
        var dialog = new CardSelectionDialog();
        dialog.show(trush.getAll().filter(function(card) {
          return UtilFunc.isTrainer(card.kind);
        }), 1).then(function(response) {
          var card = trush.pick(response[0].trnId);
          field.getHands().add(card);
          $defer.resolve();
        });
      } else {
        $defer.resolve();
      }
      return $defer.promise();
    });
  };

  Effects.skill_80_1 = EffectsBase.paralysisByCoinToss;

  Effects.skill_84_1 = Effects.skill_15_1;

  Effects.skill_81_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_81_2 = function(param) {
    return EffectsBase.suicideBombing(param, 10);
  };

  Effects.skill_82_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_82_2 = Effects.skill_76_2;

  Effects.skill_83_1 = function(param) {
    param.attacker.addPersistantEffect('skill_83_1');
    return EffectsBase.pluralAttack(param, 1);
  };
  Effects.skill_83_1_condition = function(model) {
    var viewpoint = model.getTurn().whoseTurn()
    var attacker = model.getField(viewpoint).getBattleMonster();
    return !attacker.hasPersistantEffect('skill_83_1');
  };


  Effects.skill_85_1 = function(param) {
    return EffectsBase.boostByDamage(param.attacker, param.skill);
  };

  Effects.skill_87_2 = EffectsBase.paralysisByCoinToss;

  Effects.skill_88_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_88_2 = EffectsBase.defenceUp20;

  Effects.skill_89_1 = EffectsBase.poisonByCoinToss;

  Effects.skill_92_1 = EffectsBase.sleepByCoinToss;
  Effects.skill_92_2 = EffectsBase.takeAlong;

  Effects.skill_93_1 = EffectsBase.sleep;
  Effects.skill_93_2 = function(param) {
    var $defer = $.Deferred();
    if (param.defender.hasStatus(Const.Status.SLEEP)) {
      $defer.resolve(param.skill.damage);
    } else {
      $defer.resolve(0);
    }
    return $defer.promise();
  };

  Effects.skill_94_1 = function(param) {
    var model = param.model;
    var turn = model.getTurn();
    var viewpoint = UtilFunc.reverseViewpoint(turn.whoseTurn());
    var field = model.getField(viewpoint);

    var $defer = $.Deferred();
    if (field.getBench().length === 0) {
      return $defer.resolve().promise();
    }
    $defer.promise().then(function(response) {
      var target = field.selectFrom(response.area, response.trnId);
      target.hurt(10);
      MessageDisplay.println(target.name + ' に 10 ダメージ！');
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getBench()), $defer);
    return $defer;
  };

  Effects.skill_96_2 = EffectsBase.confusionByCoinToss;

  Effects.skill_97_1 = function(param) {
    var $defer = $.Deferred();
    var psd = new PlayerSelectionDialog();
    psd.show(param.model.getTurn()).then(function(viewpoint) {
      var deck = param.model.getField(viewpoint).getDeck();
      var list = [];
      for (var i = 0; i < 3; i++) {
        list.push(deck.draw());
      }
      var rd = new ReorderDialog();
      rd.show(list).then(function(reordered) {
        deck.putOn(reordered);
        $defer.resolve();
      });
    });
    return $defer.promise();
  };
  Effects.skill_97_2 = Effects.skill_94_1;

  Effects.skill_90_1 = EffectsBase.confusionByCoinToss;
  Effects.skill_90_2 = EffectsBase.damageGuardByCoinToss;

  Effects.skill_91_1 = EffectsBase.paralysisOrMiss;
  Effects.skill_91_2 = Effects.skill_15_1;

  Effects.skill_95_2 = EffectsBase.damageGuardLessThan40;

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

  Effects.skill_102_1 = EffectsBase.sleep;
  Effects.skill_102_2 = Effects.skill_1_1;

  Effects.skill_103_1 = function(param) {
    var $defer = $.Deferred();
    var viewpoint = param.model.getTurn().whoseTurn();
    var field = param.model.getField(viewpoint);
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
  };;
  Effects.skill_103_2 = function(param) {
    var times = UtilFunc.mapEnergyToArray(param.attacker.getEnergy(), param.attacker).length;
    return EffectsBase.pluralAttack(param, times);
  };

  Effects.skill_104_1 = EffectsBase.attackDown20;
  Effects.skill_104_2 = Effects.skill_85_1;

  Effects.skill_105_1 = Effects.skill_15_1;
  Effects.skill_105_2 = function(param) {
    return EffectsBase.callFriend(param, function(card) {
      return card.getType() === 'fight' && card.kind === '1';
    });
  };

  Effects.skill_106_1 = function(param) {
    var model = param.model;
    var turn = model.getTurn();
    var viewpoint = UtilFunc.reverseViewpoint(turn.whoseTurn());
    var field = model.getField(viewpoint);

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var target = field.selectFrom(response.area, response.trnId);
      target.hurt(20);
      MessageDisplay.println(target.name + ' に 20 ダメージ！');
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getBench()), $defer);
    return $defer;
  };
  Effects.skill_106_1_condition = function(model) {
    var viewpoint = UtilFunc.reverseViewpoint(model.getTurn().whoseTurn());
    var field = model.getField(viewpoint);
    return field.getBench().length > 0;
  };

  Effects.skill_108_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_108_2 = EffectsBase.confusionByCoinToss;

  Effects.skill_109_1 = EffectsBase.poisonOrConfusionByCoinToss;

  Effects.skill_110_1 = EffectsBase.poisonByCoinToss;
  Effects.skill_110_2 = Effects.skill_81_2;

  Effects.skill_111_1 = EffectsBase.prohibitAttackByCoinToss;

  Effects.skill_112_2 = function(param) {
    return Effects.skill_12_1(param).then(function(){
      return EffectsBase.selfDamage(20, param);
    });
  };

  Effects.skill_113_1 = EffectsBase.damageGuardByCoinToss;
  Effects.skill_113_2 = function(param) {
    return EffectsBase.selfDamage(80, param);
  };

  Effects.skill_114_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_114_2 = EffectsBase.poison;

  Effects.skill_115_1 = EffectsBase.draw;
  Effects.skill_115_2 = function(param) {
    return EffectsBase.pluralAttack(param, 4);
  };

  Effects.skill_116_1 = EffectsBase.blind;

  Effects.skill_117_1 = Effects.skill_9_1;
  Effects.skill_117_2 = EffectsBase.matchlessByCoinToss;

  Effects.skill_121_1 = function(param) {
    return EffectsBase.refresh(param, ["aqua"]);
  };
  Effects.skill_121_2 = EffectsBase.paralysisByCoinToss;

  Effects.skill_122_1 = function(param) {
    return EffectsBase.boostByDamage(param.defender, param.skill);
  };

  Effects.skill_123_1 = EffectsBase.doubling;
  Effects.skill_123_2 = EffectsBase.boostByDoubling;

  Effects.skill_124_1 = Effects.skill_15_1;
  Effects.skill_124_2 = Effects.skill_122_1;

  Effects.skill_125_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_125_2 = function(param) {
    return EffectsBase.boostOrSelfDamageByCoinToss(10, param);
  };

  Effects.skill_126_2 = Effects.skill_4_2;

  Effects.skill_127_1 = EffectsBase.paralysisByCoinToss;

  Effects.skill_128_1 = function(param) {
    return EffectsBase.boostByCoinToss(10, param);
  };
  Effects.skill_128_2 = function(param) {
    var $damageDefer = EffectsBase.boostByDamage(param.attacker, param.skill);
    var $statusDefer = EffectsBase.selfConfusionByCoinToss(param);
    return $.when($damageDefer, $statusDefer);
  };

  Effects.skill_129_1 = Effects.skill_98_2;

  Effects.skill_130_2 = EffectsBase.paralysisByCoinToss;

  Effects.skill_131_1 = Effects.skill_9_1;
  Effects.skill_131_2 = EffectsBase.confusionByCoinToss;

  Effects.skill_133_1 = EffectsBase.prohibitAttackByCoinToss;
  Effects.skill_133_2 = function(param) {
    return EffectsBase.boostByCoinToss(20, param);
  };

  Effects.skill_134_1 = Effects.skill_133_2;
  Effects.skill_134_2 = Effects.skill_9_1;

  Effects.skill_135_1 = Effects.skill_133_2;
  Effects.skill_135_2 = Effects.skill_115_2;

  Effects.skill_136_1 = Effects.skill_133_2;
  Effects.skill_136_2 = Effects.skill_4_2;

  Effects.skill_137_1 = function(param) {
    var dialog = new TypeSelectionDialog();
    return dialog.show(['leaf','fire','aqua','thunder','esper','fight']).then(function(response) {
      param.defender.overwriteWeak(response);
      MessageDisplay.println(param.defender.name + 'は ' + UtilFunc.getTypeCaption(response) + 'タイプ が弱点になった！')
      return $.Deferred().resolve().promise();
    });
  };
  Effects.skill_137_2 = function(param) {
    var dialog = new TypeSelectionDialog();
    return dialog.show(['leaf','fire','aqua','thunder','esper','fight']).then(function(response) {
      param.attacker.overwriteRegist(response);
      MessageDisplay.println(param.attacker.name + 'は ' + UtilFunc.getTypeCaption(response) + 'タイプ に抵抗力がついた！')
      return $.Deferred().resolve().promise();
    });
  };

  Effects.skill_138_1 = Effects.skill_9_1;

  Effects.skill_139_1 = Effects.skill_9_1;
  Effects.skill_139_2 = Effects.skill_15_1;

  Effects.skill_141_2 = Effects.skill_12_2;

  Effects.skill_143_1 = EffectsBase.paralysisByCoinToss;

  Effects.skill_144_1 = EffectsBase.paralysisByCoinToss;
  Effects.skill_144_2 = function(param) {
    var viewpoint = param.model.getTurn().whoseTurn();
    var dialog = new CoinTossDialog();
    return dialog.show().then(function(response){
      var field = param.model.getField(response[0] ? UtilFunc.reverseViewpoint(viewpoint) : viewpoint);
      return EffectsBase.benchDamage(field, 10);
    });
  };

  Effects.skill_145_1 = function(param) {
    return EffectsBase.selfDamageByCoinToss(30, param);
  };
  Effects.skill_145_2 = EffectsBase.trushAllEnergy;

  Effects.skill_146_1 = EffectsBase.trushDeckByTrushEnergy;
  Effects.skill_146_2 = Effects.skill_32_1;

  Effects.skill_148_1 = Effects.skill_15_1;
  Effects.skill_148_2 = Effects.skill_55_2;

  Effects.skill_149_1 = Effects.skill_15_1;

  Effects.skill_150_1 = function(param) {
    return EffectsBase.boostByEnergyCount(param.defender.getEnergy(), param.skill);
  };
  Effects.skill_150_2 = function(param) {
    return EffectsBase.matchlessByTrushEnergy(param, ['esper']);
  };

  Effects.skill_151_1 = function(param) {
    return EffectsBase.damageByEnergyCount(param.defender.getEnergy(), param.skill);
  };
  Effects.skill_151_2 = function(param) {
    var model = param.model;
    var turn = model.getTurn();
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var monsters = [];
    monsters.push(field.getBattleMonster());
    $.each(field.getBench(), function(idx, card) {
      monsters.push(card);
    });
    field = model.getField(UtilFunc.reverseViewpoint(viewpoint));
    monsters.push(field.getBattleMonster());
    $.each(field.getBench(), function(idx, card) {
      monsters.push(card);
    });

    var targets = monsters.filter(function(card){
      return UtilFunc.isEvolutionMonster(card.kind);
    });

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      field = model.getField(UtilFunc.getViewpoint(response.trnId));
      var target = field.selectFrom(response.area, response.trnId);
      var base = target.degenerate();
      field.replace(response.area, target, base);
      field.addHand(target);
      MessageDisplay.println(target.name + ' は ' + base.name + ' にたいかした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets), $defer);
    return $defer;
  };
  Effects.skill_151_2_condition = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var monsters = [];
    monsters.push(field.getBattleMonster());
    $.each(field.getBench(), function(idx, card) {
      monsters.push(card);
    });
    field = model.getField(UtilFunc.reverseViewpoint(viewpoint));
    monsters.push(field.getBattleMonster());
    $.each(field.getBench(), function(idx, card) {
      monsters.push(card);
    });
    return monsters.filter(function(card){
      return UtilFunc.isEvolutionMonster(card.kind);
    }).length > 0;
  };



  Effects.special_45_sp = function(model, card) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var targets = [];
    targets.push(field.getBattleMonster());
    $.each(field.getBench(), function(idx, card) {
      targets.push(card);
    });
    targets = targets.filter(function(card) {
      return card.getDamageCount() > 0;
    });

    var dialog = new CoinTossDialog();
    dialog.show().then(function(response) {
      var $defer = $.Deferred();
      if (response[0]) {
        Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets), $defer);
      } else {
        $defer.reject();
      }
      return $defer.promise();
    }).then(function(response) {
      var target = field.selectFrom(response.area, response.trnId);
      target.hurt(-10);
      MessageDisplay.newSentence(card.name + ' の ' + card.special.name + '！');
      MessageDisplay.println(target.name + ' は 10 かいふくした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
    return false;
  };
  Effects.special_45_sp_condition = function(model, card) {
    if (Effects.existsChemicalGas(model)) {
      return false;
    }
    var turn = model.getTurn();
    if (turn.wasUsedSpecial(card)) {
      return false;
    }
    if (UtilFunc.hasPreventSpecialStatus(card)) {
      return false;
    }
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var targets = [];
    targets.push(field.getBattleMonster());
    $.each(field.getBench(), function(idx, card) {
      targets.push(card);
    });
    return targets.some(function(card) {
      return card.getDamageCount() > 0;
    });
  };

  Effects.special_49_sp = function(model, card) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();

    var $defer = $.Deferred();
    $defer.then(function(response) {
      var f = model.getField(UtilFunc.getViewpoint(response.trnId));
      var target = f.selectFrom(response.area, response.trnId);
      card.overwriteType(target.getType());
      MessageDisplay.println(card.name + ' は ' + UtilFunc.getTypeCaption(target.getType()) + 'タイプ にへんしょくした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });

    var field = model.getField(viewpoint);
    var targets = [];
    targets.push(field.getBattleMonster());
    $.each(field.getBench(), function(idx, card) {
      targets.push(card);
    });
    field = model.getField(UtilFunc.reverseViewpoint(viewpoint));
    targets.push(field.getBattleMonster());
    $.each(field.getBench(), function(idx, card) {
      targets.push(card);
    });
    var ids = UtilFunc.mapToTrnId(targets).filter(function(c) {
      return c.trnId !== card.trnId;
    });
    Effects.dispatchSelectRequestEvent(ids, $defer);
    return false;
  };
  Effects.special_49_sp_condition = function(model, card) {
    if (Effects.existsChemicalGas(model)) {
      return false;
    }
    var turn = model.getTurn();
    if (turn.wasUsedSpecial(card)) {
      return false;
    }
    if (UtilFunc.hasPreventSpecialStatus(card)) {
      return false;
    }
    return true;
  };

  Effects.special_72_sp = function(model, card) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var trush = field.getTrush();

    var $defer = $.Deferred();
    $defer.then(function(response) {
      if (!!response) {
        var battleMonster = field.pickBench(response.trnId);
        field.setBattleMonster(battleMonster);
      } else {
        field.pickBench(card.trnId);
      }
      card.backToHand();
      var cards = card.getAllCards();
      $.each(cards, function(idx, c) {
        if (c.trnId === card.trnId) {
          hands.add(c);
          MessageDisplay.println(card.name + ' は おくびょうになって手札にもどった！');
        } else {
          trush.trush(c);
        }
      });
      Effects.dispatchRedrawFieldRequestEvent();
    });
    if (card.trnId === field.getBattleMonster().trnId) {
      Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getBench()), $defer);
    } else {
      $defer.resolve();
    }
    return false;
  };
  Effects.special_72_sp_condition = function(model, card) {
    if (Effects.existsChemicalGas(model)) {
      return false;
    }
    if (UtilFunc.hasPreventSpecialStatus(card)) {
      return false;
    }
    if (model.getTurn().isNewAssignedMonster(card.trnId)) {
      return false;
    }
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getBench().length !== 0;
  };

  Effects.special_101_sp = function(model, card) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var trush = field.getTrush();

    var dialog = new TypeSelectionDialog();
    dialog.show(Const.Types).then(function(type) {
      var $defer = $.Deferred();
      var targets = [];
      targets.push(field.getBattleMonster());
      $.each(field.getBench(), function(idx, c) {
        targets.push(c);
      });
      var ids = UtilFunc.mapToTrnId(targets).filter(function(c) {
        return c.trnId !== card.trnId;
      });
      Effects.dispatchSelectRequestEvent(ids, $defer);

      return $.when($.Deferred().resolve(type).promise(), $defer);
    }).then(function(type, selection) {
      MessageDisplay.newSentence(card.name + ' の エネエネ！');

      card.hurt(card.hp);
      AutopsyService.process(model, viewpoint);

      var dao = new CardMstDao();
      var mst = dao.get('10099');
      var key = {};
      key.id = card.trnId;
      key.cardCode = card.code;
      mst.type = type;

      var energy = CardFactory.create(key, mst);
      energy.originalCard = trush.pick(card.trnId);

      var target = field.selectFrom(selection.area, selection.trnId);
      target.addEnergy(energy);

      MessageDisplay.println(target.name + ' に ' + UtilFunc.getTypeCaption(type) + 'エネルギー が2こつけられた');

      var $defer = $.Deferred();
      if (field.getBattleMonster() === null) {
        Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getBench()), $defer);
      } else {
        $defer.resolve();
      }
      return $defer.promise();
    }).then(function(response) {
      if (!!response) {
        field.setBattleMonster(field.pickBench(response.trnId));
      }
      Effects.dispatchRedrawFieldRequestEvent();
    });
    return false;
  };
  Effects.special_101_sp_condition = function(model, card) {
    if (Effects.existsChemicalGas(model)) {
      return false;
    }
    if (UtilFunc.hasPreventSpecialStatus(card)) {
      return false;
    }
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getBench().length !== 0;
  };

  Effects.special_149_sp = function(model, card) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var oldMonster = field.getBattleMonster();
    var newMonster = field.pickBench(card.trnId);
    field.putBench(oldMonster);
    field.setBattleMonster(newMonster);
    MessageDisplay.newSentence(card.name + ' の ' + card.special.name + '！');
  };
  Effects.special_149_sp_condition = function(model, card) {
    if (Effects.existsChemicalGas(model)) {
      return false;
    }
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getBattleMonster() !== card;
  };

  // 9_sp あまごい
  Effects.findPrayingRain = function(field) {
    var monster = field.getBattleMonster();
    if (UtilFunc.specialIs(Const.Special.PRAYING_RAIN, monster) && !UtilFunc.hasPreventSpecialStatus(monster)) {
      return monster;
    }
    var result = null;
    $.each(field.getBench(), function(idx, card) {
      if (UtilFunc.specialIs(Const.Special.PRAYING_RAIN, card)) {
        result = card;
      }
    });
    return result;
  };

  // 89_sp かがくへんかガス
  Effects.existsChemicalGas = function(model) {
    model = model || window.getGameModel();
    var viewpoint = model.getTurn().whoseTurn();
    if (!viewpoint) {
      return false;
    }
    var field = model.getField(viewpoint);
    var monster = field.getBattleMonster();
    if (UtilFunc.specialIs(Const.Special.CHEMICAL_GAS, monster) && !UtilFunc.hasPreventSpecialStatus(monster)) {
      return true;
    }
    if (field.getBench().some(function(card) {
      return UtilFunc.specialIs(Const.Special.CHEMICAL_GAS, card);
    })) {
      return true;
    }

    field = model.getField(UtilFunc.reverseViewpoint(viewpoint));
    monster = field.getBattleMonster();
    if (UtilFunc.specialIs(Const.Special.CHEMICAL_GAS, monster) && !UtilFunc.hasPreventSpecialStatus(monster)) {
      return true;
    }
    if (field.getBench().some(function(card) {
      return UtilFunc.specialIs(Const.Special.CHEMICAL_GAS, card);
    })) {
      return true;
    }
    return false;
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
      var dialog = new EnergySelectionDialog(target);
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

  Effects.trainer_effect_1005 = function(model, used) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);

    var targets = [];
    if (field.getBattleMonster() !== null) {
      targets.push(field.getBattleMonster());
    }
    field.getBench().forEach(function(c) {
      targets.push(c);
    });

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var target = field.selectFrom(response.area, response.trnId);
      target.addEffect(Const.Effect.ATTACK_UP_10);
      target.addAttackEffectCard(used);
      MessageDisplay.newSentence('プラスパワー を つかった！');
      MessageDisplay.println(target.name + ' は こうげきりょくがあがった！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets), $defer);
    return false;
  };
  Effects.trainer_condition_1005 = function(model) {
    return true;
  };

  Effects.trainer_effect_1006 = function(model, used) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);

    var targets = [];
    if (field.getBattleMonster() !== null) {
      targets.push(field.getBattleMonster());
    }
    field.getBench().forEach(function(c) {
      targets.push(c);
    });

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var target = field.selectFrom(response.area, response.trnId);
      target.addEffect(Const.Effect.DEFENCE_UP_20);
      target.addDefenceEffectCard(used);
      MessageDisplay.newSentence('ディフェンダー を つかった！');
      MessageDisplay.println(target.name + ' は ぼうぎょりょくが ぐーんとあがった！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets), $defer);
    return false;
  };
  Effects.trainer_condition_1006 = Effects.trainer_condition_1005;

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

  Effects.trainer_effect_1008 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var deck = model.getField(viewpoint).getDeck();
    var list = [];
    for (var i = 0; i < 5; i++) {
      list.push(deck.draw());
    }
    MessageDisplay.newSentence('ポケモン図鑑 を つかった！');
    var dialog = new ReorderDialog();
    dialog.show(list).then(function(reordered) {
      deck.putOn(reordered);
    });
  };
  Effects.trainer_condition_1008 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getDeck().size() >= 5;
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

  Effects.trainer_effect_1012 = function(model, original) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);

    var dao = new CardMstDao();
    var mst = dao.get('9901');
    var key = {};
    key.id = original.trnId;
    key.cardCode = original.code;

    var card = CardFactory.create(key, mst);
    card.originalCard = original;

    field.putBench(card);
    model.getTurn().newAssign(card.trnId);

    MessageDisplay.newSentence('ピッピ人形 を つかった！');
  };
  Effects.trainer_condition_1012 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    return field.getBench().length < 5;
  };

  Effects.trainer_effect_1013 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var oldMonster = field.getBattleMonster();
      oldMonster.backToBench();
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

  Effects.trainer_effect_1014 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var trush = field.getTrush();

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var card = field.selectFrom(response.area, response.trnId);
      card.backToHand();
      var cards = card.getAllCards();
      MessageDisplay.newSentence('ポケモン回収 を つかった！');
      $.each(cards, function(idx, c) {
        if (c.kind === '1' || !!c.isDummyMonster) {
          hands.add(c);
          MessageDisplay.println(c.name + ' は 手札にもどった！');
        } else {
          trush.trush(c);
        }
      });


      var $d = $.Deferred();
      if (response.area === Const.Area.BATTLE_MONSTER) {
        field.setBattleMonster(null);
        Effects.dispatchRedrawFieldRequestEvent();
        Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getBench()), $d);
      } else if (response.area === Const.Area.BENCH) {
        field.pickBench(response.trnId);
        $d.resolve(null);
      }

      return $d;
    }).then(function(response) {
      if (!!response) {
        var monster = field.pickBench(response.trnId);
        field.setBattleMonster(monster);
        MessageDisplay.println('『いけっ！ ' + monster.name + '！』', 'あいては ' + monster.name + ' を くりだした！');
      }
      Effects.dispatchRedrawFieldRequestEvent();
    });

    var targets = UtilFunc.mapToTrnId(field.getBench());
    targets.push(field.getBattleMonster().trnId);
    Effects.dispatchSelectRequestEvent(targets, $defer);
    return false;
  };
  Effects.trainer_condition_1014 = function(model) {
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


  Effects.trainer_effect_1018 = function(model) {
    var turn = model.getTurn();
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var monsters = [];
    monsters.push(field.getBattleMonster());
    $.each(field.getBench(), function(idx, card) {
      monsters.push(card);
    });

    var targets = monsters.filter(function(card){
      return UtilFunc.isEvolutionMonster(card.kind);
    });

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      field = model.getField(UtilFunc.getViewpoint(response.trnId));
      var target = field.selectFrom(response.area, response.trnId);
      var base = target.degenerate();
      field.replace(response.area, target, base);
      field.addHand(target);
      MessageDisplay.newSentence('退化スプレー を つかった！');
      MessageDisplay.println(target.name + ' は ' + base.name + ' にたいかした！');
      Effects.dispatchRedrawFieldRequestEvent();
    });
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets), $defer);
    return false;
  };
  Effects.trainer_condition_1018 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var monsters = [];
    monsters.push(field.getBattleMonster());
    $.each(field.getBench(), function(idx, card) {
      monsters.push(card);
    });
    return monsters.filter(function(card){
      return UtilFunc.isEvolutionMonster(card.kind);
    }).length > 0;
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

  Effects.trainer_effect_1021 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var deck = field.getDeck();

    var dialog = new CoinTossDialog();
    dialog.show().then(function(response) {
      if (response[0]) {
        return new CardSelectionDialog().show(deck.getAll().filter(function(card) {
          return UtilFunc.isBaseMonster(card.kind) || UtilFunc.isEvolutionMonster(card.kind);
        }), 1);
      } else {
        MessageDisplay.println('だめだ！ ポケモンがボールから でてしまった！');
        return $.Deferred().reject().promise();
      }
    }).then(function(response) {
      var card = deck.pick(response[0].trnId);
      field.getHands().add(card);
      deck.shuffle();
      MessageDisplay.println('やったー！' + card.name + ' をつかまえた！');
      RequestSignalSender.disclose([card], '手札に加えたカード');
      Effects.dispatchRedrawFieldRequestEvent();
    }, function() {
      Effects.dispatchRedrawFieldRequestEvent();
    });

    MessageDisplay.newSentence('モンスターボール を つかった！');
    return false;
  };
  Effects.trainer_condition_1021 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var deck = field.getDeck();
    return deck.getAll().filter(function(card) {
      return UtilFunc.isBaseMonster(card.kind) || UtilFunc.isEvolutionMonster(card.kind);
    }).length > 0;
  };

  Effects.trainer_effect_1022 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var deck = field.getDeck();

    var dialog = new CardSelectionDialog();
    dialog.show(deck.getAll().filter(function(card) {
      return UtilFunc.isBaseEnergy(card.kind);
    }), 1).then(function(response) {
      var card = deck.pick(response[0].trnId);
      field.getHands().add(card);
      deck.shuffle();
      MessageDisplay.println(card.name + ' を転送した！');
      RequestSignalSender.disclose([card], '手札に加えたカード');
      Effects.dispatchRedrawFieldRequestEvent();
    }, function() {});

    MessageDisplay.newSentence('エネルギー転送 を つかった！');
    return false;
  };
  Effects.trainer_condition_1022 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var deck = field.getDeck();
    return deck.getAll().filter(function(card) {
      return UtilFunc.isBaseEnergy(card.kind);
    }).length > 0;
  };

  Effects.trainer_effect_1023 = function(model, original) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);

    var dao = new CardMstDao();
    var mst = dao.get('9902');
    var key = {};
    key.id = original.trnId;
    key.cardCode = original.code;

    var card = CardFactory.create(key, mst);
    card.originalCard = original;

    field.putBench(card);
    model.getTurn().newAssign(card.trnId);

    MessageDisplay.newSentence('なにかの化石 を つかった！');
  };
  Effects.trainer_condition_1023 = Effects.trainer_condition_1012;

  Effects.trainer_effect_1024 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var deck = field.getDeck();
    var trush = field.getTrush();

    var dialog = new CoinTossDialog();
    dialog.show().then(function(response) {
      if (response[0]) {
        return new CardSelectionDialog().show(trush.getAll(), 1);
      } else {
        MessageDisplay.println('だめだ！ リサイクルできなかった');
        return $.Deferred().reject().promise();
      }
    }).then(function(response) {
      var card = trush.pick(response[0].trnId);
      deck.putOn([card]);
      MessageDisplay.println(card.name + ' を リサイクルした！', null);
      Effects.dispatchRedrawFieldRequestEvent();
    }, function() {
      Effects.dispatchRedrawFieldRequestEvent();
    });

    MessageDisplay.newSentence('リサイクル を つかった！');
    return false;
  };
  Effects.trainer_condition_1024 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var trush = field.getTrush();
    return trush.getAll().length > 0;
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
    var hands = field.getHands();
    var deck = field.getDeck();

    var targets = hands.getAll().filter(function(card) {
      return UtilFunc.isBaseMonster(card.kind) || UtilFunc.isEvolutionMonster(card.kind);
    });

    var $defer = $.Deferred();
    $defer.then(function(response) {
      var release = field.pickHand(response.trnId);
      deck.putOn([release]);
      RequestSignalSender.operation_.disclose([release], 'デッキに戻したカード');
      return new CardSelectionDialog().show(deck.getAll().filter(function(card) {
        return UtilFunc.isBaseMonster(card.kind) || UtilFunc.isEvolutionMonster(card.kind);
      }), 1);
    }).then(function(response) {
      var gain = deck.pick(response[0].trnId);
      hands.add(gain);
      deck.shuffle();
      RequestSignalSender.operation_.disclose([gain], '手札に加えたカード');
      Effects.dispatchRedrawFieldRequestEvent();
    });

    MessageDisplay.newSentence('ポケモン交換おじさん が たすけにきた！');
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(targets), $defer);
    return false;
  };
  Effects.trainer_condition_8003 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    return hands.getAll().filter(function(card) {
      return UtilFunc.isBaseMonster(card.kind) || UtilFunc.isEvolutionMonster(card.kind);
    }).length > 0;
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
    var deck = field.getDeck();
    var hands = field.getHands();
    var targetIds = hands.getAll().filter(function(card) {
      return UtilFunc.isTrainer(card.kind);
    }).map(function(card) {
      return card.trnId;
    });

    RequestSignalSender.operation_.disclose(hands.getAll(), '相手の手札');
    $.each(targetIds, function(idx, trnId) {
      deck.putOn([field.pickHand(trnId)]);
    });
    deck.shuffle();

    field = model.getField(UtilFunc.reverseViewpoint(viewpoint));
    deck = field.getDeck();
    hands = field.getHands();
    targetIds = hands.getAll().filter(function(card) {
      return UtilFunc.isTrainer(card.kind);
    }).map(function(card) {
      return card.trnId;
    });

    new CardDisclosureDialog().show(hands.getAll(), '相手の手札').then(function() {
      $.each(targetIds, function(idx, trnId) {
        deck.putOn([field.pickHand(trnId)]);
      });
      deck.shuffle();
      Effects.dispatchRedrawFieldRequestEvent();
    });

    MessageDisplay.newSentence('ミニスカート が たすけにきた！');
  };
  Effects.trainer_condition_8005 = Effects.trainer_condition_1005;

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

  Effects.trainer_effect_8007 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var deck = field.getDeck();

    $.each(hands.getAll().map(function(hand) {
      return hand.trnId;
    }), function(idx, trnId) {
      deck.add(hands.pick(trnId));
    });
    deck.shuffle();

    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      var count = (response[0]) ? 8 : 1;
      for (var i = 0; i < count; i++) {
        if (deck.isEmpty()) {
          Effects.dispatchGameSet(UtilFunc.reverseViewpoint(viewpoint), 'デッキがなくなりカードがドローできなくなりました');
        } else {
          hands.add(deck.draw());
        }
      }
      Effects.dispatchRedrawFieldRequestEvent();
    });
    MessageDisplay.newSentence('ギャンブラー が たすけにきた！');
  };
  Effects.trainer_condition_8007 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    return (field.getHands().size() + field.getDeck().size()) > 1;
  };

  Effects.trainer_effect_8008 = function(model) {
    var viewpoint = model.getTurn().whoseTurn();
    var field = model.getField(viewpoint);
    var hands = field.getHands();
    var deck = field.getDeck();

    var $defer = $.Deferred();
    $defer.promise().then(function(response) {
      var card = field.pickBench(response.trnId);
      card.backToHand();
      $.each(card.getAllCards(), function(idx, c) {
        deck.add(c);
      });
      MessageDisplay.println(card.name + ' は デッキにもどった！');

      deck.shuffle();

      Effects.dispatchRedrawFieldRequestEvent();
    });

    MessageDisplay.newSentence('フジろうじん が たすけにきた！');
    Effects.dispatchSelectRequestEvent(UtilFunc.mapToTrnId(field.getBench()), $defer);
    return false;
  };
  Effects.trainer_condition_8008 = function(model) {
    var turn = model.getTurn();
    var viewpoint = turn.whoseTurn();
    var field = model.getField(viewpoint);
    return field.getBench().length > 0;
  };
})(jQuery);
