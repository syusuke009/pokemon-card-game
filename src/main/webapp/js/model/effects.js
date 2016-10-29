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

  Effects.skill_13_1 = EffectsBase.poisonByCoinToss;

  Effects.skill_14_1 = function(param) {
    var $defer = $.Deferred();
    // TODO ダメージを0
    $defer.resolve();
    return $defer.promise();
  };
  Effects.skill_14_2 = EffectsBase.poisonByCoinToss;

  Effects.skill_15_1 = function(param) {

  };
  Effects.skill_15_2 = EffectsBase.poisonByCoinToss;

})(jQuery);
