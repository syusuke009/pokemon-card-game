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
})(jQuery);
