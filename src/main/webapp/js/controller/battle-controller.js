(function($){

  BattleController = function() {
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

    turn.attacked();

    $defer.resolve();

    return $defer.promise();
  };

})(jQuery);
