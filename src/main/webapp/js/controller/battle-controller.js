(function($){

  BattleController = function() {
    this.effectDao_ = new EffectDao();
    this.calculator_ = new DamageCalculator();
  };

  BattleController.prototype.battle = function(model, skillKey) {
    var $defer = $.Deferred();

    var turn = model.getTurn();
    var attackerField = model.getField(turn.whoseTurn());
    var attacker = attackerField.getBattleMonster();
    var defenderField = model.getField(UtilFunc.reverseViewpoint(turn.whoseTurn()));
    var defender = defenderField.getBattleMonster();
    var skill = attacker[skillKey];

    turn.attacked();

    return this.processBeforeDamage_(skill, attacker, defender)
        .then(function(){
          return this.calculator_.calculate(skill, attacker, defender, model);
        }.bind(this))
        .then(this.processAfterDamage_.bind(this));
  };

  BattleController.prototype.processBeforeDamage_ = function(skill, attacker, defender) {
    var $defer = $.Deferred();

    if (skill.timing === Const.EffectTiming.BEFORE_DAMAGE) {
      var effect = this.effectDao_.getSkillEffect(skill.effect);
      var param = {};
      param.attacker = attacker;
      param.defender = defender;
      effect(param).then(function(){
        $defer.resolve();
      });
    } else {
      $defer.resolve();
    }

    return $defer.promise();
  };

  BattleController.prototype.processAfterDamage_ = function(response) {
    var $defer = $.Deferred();

    response.defender.hurt(response.damage);

    if (response.skill.timing === Const.EffectTiming.AFTER_DAMAGE) {
      var effect = this.effectDao_.getSkillEffect(response.skill.effect);
      var param = {};
      param.damage = response.damage;
      param.attacker = response.attacker;
      param.defender = response.defender;
      effect(param).then(function(){
        $defer.resolve();
      });
    } else {
      $defer.resolve();
    }
    return $defer.promise();
  };

})(jQuery);
