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

    d = this.effectWeak_(attacker, difender, d);

    d = this.effectRegist_(attacker, difender, d);

    d = this.effectDefenderGoods_(difender, d);

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

  DamageCalculator.prototype.effectWeak_ = function(attacker, difender, d) {
    var weakValue = difender.weak[attacker.type] || '';
    switch (weakValue) {
    case '*2':
      return d * 2;
    }
    return d;
  };

  DamageCalculator.prototype.effectRegist_ = function(attacker, difender, d) {
    var registValue = difender.regist[attacker.type] || '';
    if (!isNaN(Number(registValue))) {
      return d + Number(registValue);
    }
    return d;
  };

  DamageCalculator.prototype.effectDefenderGoods_ = function(difender, d) {
    return d;
  };

})(jQuery);
