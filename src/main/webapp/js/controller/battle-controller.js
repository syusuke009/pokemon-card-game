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

    this.calculator_.calculate(skill, attacker, defender).then(function(result) {
      defender.hurt(result.damage);

      if (skill.timing === Const.EffectTiming.AFTER_DAMAGE) {
        var effect = this.effectDao_.getSkillEffect(skill.effect);
        var param = {};
        param.damage = result.damage;
        param.attacker = attacker;
        param.defender = defender;
        effect(param).then(function(){
          $defer.resolve();
        });
      } else {
        $defer.resolve();
      }
    }.bind(this));

    turn.attacked();


    return $defer.promise();
  };

})(jQuery);
