(function($){

  DamageCalculator = function() {
    this.effectDao_ = new EffectDao();
  };

  DamageCalculator.prototype.calculate = function(skill, attacker, defender) {
    var result = {};

    if (defender.getStatus().indexOf(Const.Status.DAMAGE_GUARD) >= 0) {
      result.damage = 0;
      return $.Deferred().resolve(result).promise();
    }

    return this.calculateSkillImpact_(skill).then(function(d) {
      var $defer = $.Deferred();
      if (d <= 0) {
        result.damage = 0;
        $defer.resolve(result);
        return $defer.promise();
      }

      d = this.effectAttackerGoods_(attacker, d);

      d = this.effectWeak_(attacker, defender, d);

      d = this.effectRegist_(attacker, defender, d);

      d = this.effectDefenderGoods_(defender, d);

      result.damage = d;
      $defer.resolve(result);
      return $defer.promise();
    }.bind(this));
  };

  DamageCalculator.prototype.calculateSkillImpact_ = function(skill) {
    var $defer;
    if (skill.timing === 'calc-damage') {
      var param = {};
      param.skill = skill;
      $defer = this.effectDao_.get(skill.effect)(param);
    } else {
      $defer = $.Deferred();
      $defer.resolve(skill.damage);
    }
    return $defer.promise();
  };

  DamageCalculator.prototype.effectAttackerGoods_ = function(attacker, d) {
    return d;
  };

  DamageCalculator.prototype.effectWeak_ = function(attacker, defender, d) {
    if (!defender.weak || !defender.weak[attacker.type]) {
      return d;
    }
    var weakValue = defender.weak[attacker.type];
    switch (weakValue) {
    case '*2':
      return d * 2;
    }
    return d;
  };

  DamageCalculator.prototype.effectRegist_ = function(attacker, defender, d) {
    if (!defender.regist || !defender.regist[attacker.type]) {
      return d;
    }
    var registValue = defender.regist[attacker.type];
    if (!isNaN(Number(registValue))) {
      return d + Number(registValue);
    }
    return d;
  };

  DamageCalculator.prototype.effectDefenderGoods_ = function(defender, d) {
    return d;
  };

})(jQuery);
