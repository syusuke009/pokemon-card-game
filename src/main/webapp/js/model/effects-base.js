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
   * コインを投げて「おもて」なら、ダメージが0になる
   */
  EffectsBase.damageGuardByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        param.attacker.addDefenceSkillEffect(Const.Status.DAMAGE_GUARD);
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
        param.attacker.addDefenceSkillEffect(Const.Status.MATCHLESS);
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
    var dialog = new EnergySelectionDialog();
    dialog.show(card.getEnergy(), trushes).then(function(response){
      response.forEach(function(trushed){
        card.removeEnergy(trushed);
      })
      card.addDefenceSkillEffect(Const.Status.MATCHLESS);
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
   * あたえたダメージ分、回復する
   */
  EffectsBase.absorb = function(param) {
    var attacker = param.attacker;
    attacker.hurt(param.damage * -1);
    MessageDisplay.println(attacker.name + ' は ' + param.damage + ' かいふくした！');
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
})(jQuery);
