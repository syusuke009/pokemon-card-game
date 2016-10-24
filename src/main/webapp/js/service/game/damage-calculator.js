(function($){

  DamageCalculator = function() {
  };

  DamageCalculator.prototype.calculate = function(skill, attacker, defender) {
    var result = {};

    var d = this.calculateSkillImpact_(skill);
    if (d <= 0) {
      result.damage = 0;
      return result;
    }

    d = this.effectAttackerGoods_(attacker, d);

    d = this.effectWeak_(attacker, defender, d);

    d = this.effectRegist_(attacker, defender, d);

    d = this.effectDefenderGoods_(defender, d);

    result.damage = d;
    return result;
  };

  DamageCalculator.prototype.calculateSkillImpact_ = function(skill) {
    if (skill.timing === 'damage-calc') {

    } else {
      return skill.damage;
    }
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
