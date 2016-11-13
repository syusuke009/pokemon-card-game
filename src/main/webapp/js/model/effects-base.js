(function($){

  EffectsBase = {};

  EffectsBase.poison = function(param) {
    var $defer = $.Deferred();
    param.defender.addStatus(Const.Status.POISON);
    $defer.resolve();
    return $defer.promise();
  };

  EffectsBase.poisonByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        param.defender.addStatus(Const.Status.POISON);
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
        param.defender.addStatus(Const.Status.PARALYSIS);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.confusionByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        param.defender.addStatus(Const.Status.CONFUSION);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

  EffectsBase.poisonOrConfusionByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        param.defender.addStatus(Const.Status.POISON);
      } else {
        param.defender.addStatus(Const.Status.CONFUSION);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };

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

  EffectsBase.boostByExtraEnergy = function(energies, skill, type, limit) {
    var $defer = $.Deferred();
    var extra = UtilFunc.calculateExtraEnergy(skill.cost, energies, type);
    $defer.resolve(skill.damage + (Math.max(extra, limit) * 10));
    return $defer.promise();
  };

  EffectsBase.boostByDamage = function(target, skill) {
    var $defer = $.Deferred();
    var boost = target.getDamageCount() * 10;
    $defer.resolve(skill.damage + boost);
    return $defer.promise();
  };

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
    param.attacker.hurt(damage);
    $defer.resolve();
    return $defer.promise();
  };

  EffectsBase.selfDamageByCoinToss = function(damage, attacker) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (!response[0]) {
        attacker.hurt(damage);
      }
      $defer.resolve();
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
      card.hurt(damage);
    });
    $defer.resolve();
    return $defer.promise();
  };

  EffectsBase.suicideBombing = function(param, benchDamage) {
    param.attacker.hurt(param.damage);
    var viewpoint = param.model.getTurn().whoseTurn();
    var $d1 = EffectsBase.benchDamage(param.model.getField(viewpoint), benchDamage);
    var $d2 = EffectsBase.benchDamage(param.model.getField(UtilFunc.reverseViewpoint(viewpoint)), benchDamage);
    return $.when($d1, $d2);
  };

  EffectsBase.refresh = function(param, cost) {
    var attacker = param.attacker;
    return EffectsBase.trushEnergy(attacker, cost).then(function(response) {
      attacker.hurt(attacker.hp * (-1));
    });
  }
})(jQuery);
