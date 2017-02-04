(function($){

  EffectsBase = {};

  EffectsBase.poison = function(param) {
    var $defer = $.Deferred();
    MessageDisplay.println(param.defender.name + ' は どく になった！');
    param.defender.addStatus(Const.Status.POISON);
    $defer.resolve();
    return $defer.promise();
  };

  EffectsBase.doublePoison = function(param) {
    var $defer = $.Deferred();
    MessageDisplay.println(param.defender.name + ' は どくどく になった！');
    param.defender.addStatus(Const.Status.DOUBLE_POISON);
    $defer.resolve();
    return $defer.promise();
  };

  EffectsBase.poisonByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        MessageDisplay.println(param.defender.name + ' は どく になった！');
        param.defender.addStatus(Const.Status.POISON);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.sleep = function(param) {
    var $defer = $.Deferred();
    MessageDisplay.println(param.defender.name + ' は ねむってしまった！');
    param.defender.addStatus(Const.Status.SLEEP);
    $defer.resolve();
    return $defer.promise();
  };

  EffectsBase.sleepByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        MessageDisplay.println(param.defender.name + ' は ねむってしまった！');
        param.defender.addStatus(Const.Status.SLEEP);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.paralysisByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        MessageDisplay.println(param.defender.name + ' は マヒ になった！');
        param.defender.addStatus(Const.Status.PARALYSIS);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.paralysisOrMiss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        MessageDisplay.println(param.defender.name + ' は マヒ になった！');
        param.defender.addStatus(Const.Status.PARALYSIS);
        $defer.resolve(param.skill.damage);
      } else {
        $defer.resolve(0);
      }
    });
    return $defer.promise();
  };

  EffectsBase.confusionByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        MessageDisplay.println(param.defender.name + ' は こんらんした！');
        param.defender.addStatus(Const.Status.CONFUSION);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.selfConfusionByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (!response[0]) {
        MessageDisplay.println(param.attacker.name + ' は こんらんした！');
        param.attacker.addStatus(Const.Status.CONFUSION);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.confusionEachOther = function(param) {
    param.defender.addStatus(Const.Status.CONFUSION);
    param.attacker.addStatus(Const.Status.CONFUSION);
    MessageDisplay.println(param.defender.name + ' は こんらんした！', param.attacker.name + ' は こんらんした！');
    MessageDisplay.println(param.attacker.name + ' は こんらんした！', param.defender.name + ' は こんらんした！');
    return  $.Deferred().resolve().promise();
  };

  EffectsBase.poisonOrConfusionByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        MessageDisplay.println(param.defender.name + ' は どく になった！');
        param.defender.addStatus(Const.Status.POISON);
      } else {
        MessageDisplay.println(param.defender.name + ' は こんらんした！');
        param.defender.addStatus(Const.Status.CONFUSION);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.poisonAndConfusionByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        MessageDisplay.println(param.defender.name + ' は どく になった！');
        MessageDisplay.println(param.defender.name + ' は こんらんした！');
        param.defender.addStatus(Const.Status.POISON);
        param.defender.addStatus(Const.Status.CONFUSION);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  /**
   * 40未満のダメージは0になる
   */
  EffectsBase.damageGuardLessThan40 = function(param) {
    var $defer = $.Deferred();
    param.attacker.addStatus(Const.Status.DAMAGE_GUARD_LESS_THAN_40);
    return $defer.resolve().promise();
  };

  /**
   * コインを投げて「おもて」なら、ダメージが0になる
   */
  EffectsBase.damageGuardByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        param.attacker.addStatus(Const.Status.DAMAGE_GUARD);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  /**
   * コインを投げて「おもて」なら、相手のワザをうけない
   */
  EffectsBase.matchlessByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        param.attacker.addStatus(Const.Status.MATCHLESS);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  /**
   * エネルギーを1枚トラッシュすることによって、相手のワザをうけない
   */
  EffectsBase.matchlessByTrushEnergy = function(param, trushes) {
    var $defer = $.Deferred();
    var card = param.attacker;
    if (!UtilFunc.checkEnoughEnergy(trushes, UtilFunc.mapEnergyToArray(card.getEnergy()))) {
      MessageDisplay.println('しかし ' + card.name + ' は ワザがだせなかった！');
      return $defer.resolve().promise();
    }
    var dialog = new EnergySelectionDialog();
    dialog.show(card.getEnergy(), trushes).then(function(response){
      response.forEach(function(trushed){
        card.removeEnergy(trushed);
      })
      card.addStatus(Const.Status.MATCHLESS);
      $defer.resolve();
    });
    return $defer.promise();
  };

  /**
   * 次の相手の晩、相手がコイントスをして「うら」ならワザが失敗する
   */
  EffectsBase.blind = function(param) {
    param.defender.addStatus(Const.Status.BLIND);
    MessageDisplay.println(param.defender.name + ' は めいちゅうりつがさがった！');
    return $.Deferred().resolve().promise();
  };

  EffectsBase.attackDown10 = function(param) {
    param.defender.addStatus(Const.Status.ATTACK_DOWN_10);
    MessageDisplay.println(param.defender.name + ' は こうげきりょくがさがった！');
    return $.Deferred().resolve().promise();
  };

  EffectsBase.attackDown20 = function(param) {
    param.defender.addStatus(Const.Status.ATTACK_DOWN_20);
    MessageDisplay.println(param.defender.name + ' は こうげきりょくが ぐーんとさがった！');
    return $.Deferred().resolve().promise();
  };

  EffectsBase.defenceUp20 = function(param) {
    param.attacker.addStatus(Const.Status.DEFENCE_UP_20);
    MessageDisplay.println(param.attacker.name + ' は ぼうぎょりょくが ぐーんとあがった！');
    return $.Deferred().resolve().promise();
  };

  EffectsBase.prohibitEscapeByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        param.defender.addStatus(Const.Status.CANT_ESCAPE);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.prohibitAttackByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        param.defender.addStatus(Const.Status.CANT_ATTACK);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  /**
   * コストとして自分の特定のエネルギーをトラッシュする
   */
  EffectsBase.trushEnergy = function(card, trushes) {
    var $defer = $.Deferred();
    if (!UtilFunc.checkEnoughEnergy(trushes, UtilFunc.mapEnergyToArray(card.getEnergy()))) {
      MessageDisplay.println('しかし ' + card.name + ' は ワザがだせなかった！');
      return $defer.resolve().promise();
    }
    var dialog = new EnergySelectionDialog();
    dialog.show(card.getEnergy(), trushes).then(function(response){
      response.forEach(function(trushed){
        card.removeEnergy(trushed);
      })
      $defer.resolve();
    });
    return $defer.promise();
  };

  /**
   * 相手のエネルギーカードをトラッシュする
   */
  EffectsBase.burstEnergy = function(count, param) {
    var $defer = $.Deferred();
    var dialog = new CardSelectionDialog();
    var card = param.defender;
    dialog.show(card.getEnergy(), 1).then(function(response){
      response.forEach(function(trushed){
        card.removeEnergy(trushed);
      })
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.trushAllEnergy = function(param) {
    var $defer = $.Deferred();
    var card = param.attacker;
    card.getEnergy().concat().forEach(function(e) {
      card.removeEnergy(e);
    });
    return $defer.resolve().promise();
  };

  EffectsBase.boostByCoinToss = function(boost, param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        $defer.resolve(param.skill.damage + boost);
      } else {
        $defer.resolve(param.skill.damage);
      }
    });
    return $defer.promise();
  };

  /**
   * 余分なエネルギーの数×10のダメージを追加
   */
  EffectsBase.boostByExtraEnergy = function(energies, skill, type, limit) {
    var $defer = $.Deferred();
    var extra = UtilFunc.calculateExtraEnergy(skill.cost, energies, type);
    $defer.resolve(skill.damage + (Math.min(extra, limit) * 10));
    return $defer.promise();
  };

  /**
   * エネルギーカードの数×10のダメージを追加
   */
  EffectsBase.boostByEnergyCount = function(energies, skill) {
    var $defer = $.Deferred();
    $defer.resolve(skill.damage + (energies.length * 10));
    return $defer.promise();
  };

  /**
   * ダメージカウント×10のダメージを追加
   */
  EffectsBase.boostByDamage = function(target, skill) {
    var $defer = $.Deferred();
    var boost = target.getDamageCount() * 10;
    $defer.resolve(skill.damage + boost);
    return $defer.promise();
  };

  /**
   * 控えポケモンの数によって、ダメージ追加
   */
  EffectsBase.boostByBench = function(param, boostDamage, filterFn) {
    var $defer = $.Deferred();
    var field = param.model.getField(param.model.getTurn().whoseTurn());
    var bench = field.getBench();
    var list = bench.filter(filterFn);
    $defer.resolve(param.skill.damage + (boostDamage * list.length));
    return $defer.promise();
  };

  /**
   * ダメージカウント×10だけあたえるダメージが減る
   */
  EffectsBase.suppressByDamage = function(target, skill) {
    var $defer = $.Deferred();
    var suppress = target.getDamageCount() * 10;
    $defer.resolve(skill.damage - suppress);
    return $defer.promise();
  };

  /**
   * コイントスで「おもて」の数の分だけダメージ
   */
  EffectsBase.pluralAttack = function(param, times) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog(times);
    dialog.show().then(function(response){
      var times = response.filter(function(b){
        return b;
      }).length;
      $defer.resolve(param.skill.damage * times);
    });
    return $defer.promise();
  };

  /**
   * 裏が出るまでコイントスして、「おもて」の数の分だけダメージ
   */
  EffectsBase.pluralAttackUntilTail = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog(Infinity);
    dialog.show().then(function(response){
      var times = response.filter(function(b){
        return b;
      }).length;
      $defer.resolve(param.skill.damage * times);
    });
    return $defer.promise();
  };

  EffectsBase.selfDamage = function(damage, param) {
    var $defer = $.Deferred();
    MessageDisplay.println(param.attacker.name + ' にも はんどうで ' + damage + ' ダメージ！');
    param.attacker.hurt(damage);
    $defer.resolve();
    return $defer.promise();
  };

  EffectsBase.selfDamageByCoinToss = function(damage, param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (!response[0]) {
        MessageDisplay.println(param.attacker.name + ' にも はんどうで ' + damage + ' ダメージ！');
        param.attacker.hurt(damage);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  /**
   * コイントスでダメージ追加か自分にダメージ
   */
  EffectsBase.boostOrSelfDamageByCoinToss = function(damage, param) {
    var $defer = $.Deferred();
    var skill = param.skill;
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        $defer.resolve(skill.damage + damage);
      } else {
        MessageDisplay.println(param.attacker.name + ' にも はんどうで ' + damage + ' ダメージ！');
        param.attacker.hurt(damage);
        $defer.resolve(skill.damage);
      }
    });
    return $defer.promise();
  };

  EffectsBase.halfHpDamage = function(param) {
    var $defer = $.Deferred();
    var defender = param.defender;
    var rest = (defender.hp / 10) - defender.getDamageCount();
    $defer.resolve(Math.ceil(rest / 2) * 10);
    return $defer.promise();
  };

  EffectsBase.benchDamage = function(field, damage) {
    var $defer = $.Deferred();
    field.getBench().forEach(function(card) {
      MessageDisplay.println(card.name + ' に ' + damage + ' ダメージ！');
      card.hurt(damage);
    });
    $defer.resolve();
    return $defer.promise();
  };

  /**
   * 自爆
   */
  EffectsBase.suicideBombing = function(param, benchDamage) {
    param.attacker.hurt(param.damage);
    var viewpoint = param.model.getTurn().whoseTurn();
    var $d1 = EffectsBase.benchDamage(param.model.getField(viewpoint), benchDamage);
    var $d2 = EffectsBase.benchDamage(param.model.getField(UtilFunc.reverseViewpoint(viewpoint)), benchDamage);
    return $.when($d1, $d2);
  };

  /**
   * エネルギーをトラッシュして、ダメージカウントをとりのぞく
   */
  EffectsBase.refresh = function(param, cost) {
    var attacker = param.attacker;
    return EffectsBase.trushEnergy(attacker, cost).then(function(response) {
      MessageDisplay.println(attacker.name + ' はぜんかいふくした！');
      attacker.hurt(attacker.hp * (-1));
    });
  };

  /**
   * ダメージをあたえたら回復する
   */
  EffectsBase.absorb = function(restore, param) {
    var attacker = param.attacker;
    var d = attacker.getDamageCount();
    if (d > 0) {
      attacker.hurt(restore * -1);
      MessageDisplay.println(attacker.name + ' は ' + restore + ' かいふくした！');
    }
    return $.Deferred().resolve().promise();
  };

  /**
   * デッキからカードを選び、ベンチに出す
   */
  EffectsBase.callFriend = function(param, filterFn) {
    var $defer = $.Deferred();
    var field = param.model.getField(param.model.getTurn().whoseTurn());
    var deck = field.getDeck();
    var list = deck.getAll().filter(filterFn);
    if (list.length === 0) {
      MessageDisplay.println('しかし よびだせるなかまがいなかった！');
      return $defer.resolve().promise();
    }
    var dialog = new CardSelectionDialog();
    dialog.show(list, 1).then(function(response) {
      $.each(response, function(idx, card) {
        field.putBench(deck.pick(card.trnId));
      });
      deck.shuffle();
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.draw = function(param) {
    var $defer = $.Deferred();
    var field = param.model.getField(param.model.getTurn().whoseTurn());
    var deck = field.getDeck();
    field.addHand(deck.draw());
    return $defer.resolve().promise();
  };

  EffectsBase.drawByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        var field = param.model.getField(param.model.getTurn().whoseTurn());
        var deck = field.getDeck();
        field.addHand(deck.draw());
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.trushDeckByTrushEnergy = function(param) {
    var $defer = $.Deferred();
    var card = param.attacker;
    if (!UtilFunc.checkEnoughEnergy(['fire'], UtilFunc.mapEnergyToArray(card.getEnergy()))) {
      MessageDisplay.println('しかし ' + card.name + ' は ワザがだせなかった！');
      return $defer.resolve().promise();
    }
    var viewpoint = UtilFunc.reverseViewpoint(param.model.getTurn().whoseTurn());
    var defenderField = param.model.getField(viewpoint);
    var dialog = new EnergySelectionDialog();
    dialog.show(card.getEnergy(), 'fire').then(function(response){
      var deck = defenderField.getDeck();
      var trush = defenderField.getTrush();
      response.forEach(function(trushed){
        card.removeEnergy(trushed);
      })
      for (var i = 0; i < response.length; i++) {
        trush.add(deck.draw());
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.revenge = function(param) {
    return param.attacker.returnAttackedSkill();
  };
})(jQuery);
