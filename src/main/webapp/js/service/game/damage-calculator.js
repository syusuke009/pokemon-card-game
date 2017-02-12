(function($){

  DamageCalculator = function() {
    this.effectDao_ = new EffectDao();
  };

  DamageCalculator.prototype.calculate = function(skill, attacker, defender, model) {
    var result = {};
    result.skill = skill;
    result.attacker = attacker;
    result.defender = defender;
    result.model = model;

    return this.calculateSkillImpact_(skill, attacker, defender, model).then(function(d) {
      var $defer = $.Deferred();
      if (d <= 0) {
        if (skill.damage > 0) {
          MessageDisplay.println('しかし こうげきははずれた！');
        }
        result.damage = 0;
        $defer.resolve(result);
        return $defer.promise();
      }

      d = this.effectAttackerEffect_(attacker, d);

      d = this.effectWeak_(attacker, defender, d);

      d = this.effectRegist_(attacker, defender, d);

      d = this.effectDefenderEffect_(defender, d);

      d = Math.max(d, 0);

      MessageDisplay.println(defender.name + ' に ' + d + ' のダメージ！');
      result.damage = d;
      $defer.resolve(result);
      return $defer.promise();
    }.bind(this));
  };

  DamageCalculator.prototype.calculateSkillImpact_ = function(skill, attacker, defender, model) {
    var $defer;
    if (skill.timing === Const.EffectTiming.CALC_DAMAGE) {
      var param = {};
      param.skill = skill;
      param.attacker = attacker;
      param.defender = defender;
      param.model = model;
      $defer = this.effectDao_.getSkillEffect(skill.effect)(param);
    } else {
      $defer = $.Deferred();
      $defer.resolve(skill.damage);
    }
    return $defer.promise();
  };

  DamageCalculator.prototype.effectAttackerEffect_ = function(attacker, d) {
    d = d - (10 * attacker.getEffectCount(Const.Effect.ATTACK_DOWN_10));
    d = d - (20 * attacker.getEffectCount(Const.Effect.ATTACK_DOWN_20));
    return d;
  };

  DamageCalculator.prototype.effectWeak_ = function(attacker, defender, d) {
    var weakValue = defender.isWeak(attacker.type);
    switch (weakValue) {
    case '*2':
      MessageDisplay.println('こうかは ばつぐんだ！');
      return d * 2;
    }
    return d;
  };

  DamageCalculator.prototype.effectRegist_ = function(attacker, defender, d) {
    var registValue = defender.hasRegist(attacker.type);
    var num = Number(registValue);
    if (!isNaN(num) && num < 0) {
      MessageDisplay.println('こうかは いまひとつのようだ');
      return Math.max(d + num, 0);
    }
    return d;
  };

  DamageCalculator.prototype.effectDefenderEffect_ = function(defender, d) {
    if (defender.getEffectCount(Const.Effect.DAMAGE_GUARD_LESS_THAN_40) > 0 && (d < 40)) {
      MessageDisplay.println(defender.name + ' は ぼうぎょしている！');
      return 0;
    }
    if (defender.getEffectCount(Const.Effect.DAMAGE_GUARD) > 0) {
      MessageDisplay.println(defender.name + ' は ぼうぎょしている！');
      return 0;
    }
    d = d - (20 * defender.getEffectCount(Const.Effect.DEFENCE_UP_20));
    return d;
  };

})(jQuery);
