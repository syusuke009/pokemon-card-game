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

    var result = this.calculator_.calculate(skill, attacker, defender);
    defender.hurt(result.damage);

    if (skill.timing === Const.EffectTiming.AFTER_DAMAGE) {
      var effect = this.effectDao_.get(skill.effect);
      result.attacker = attacker;
      result.defender = defender;
      effect(result).then(function(){
        $defer.resolve();
      });
    } else {
      $defer.resolve();
    }

    turn.attacked();


    return $defer.promise();
  };

})(jQuery);
