(function($){

  ActionButtonController = function() {
    this.effectDao_ = new EffectDao();
  };

  ActionButtonController.prototype.control = function(card, game, area) {
    var turn = game.getTurn();
    var viewpoint = turn.isSetupTurn() ?  UtilFunc.getViewpoint(card.trnId) : turn.whoseTurn();
    if (viewpoint !== UtilFunc.getViewpoint(card.trnId)) {
      return { kind: 'none' };
    }
    var field = game.getField(viewpoint);
    switch(card.kind) {
    case '1':
      return this.forBaseMonster_(card, field, area, turn, game);
    case '2':
    case '3':
      return this.forEvolutionMonster_(card, field, area, turn, game);
    case 'goods':
    case 'supporter':
      return this.forTrainer_(card, field, area, turn, game);
    case 'energy':
    case 'energy-sp':
      return this.forEnergy_(field, area, turn, card);
    }
  };

  ActionButtonController.prototype.forBaseMonster_ = function(card, field, area, turn, game) {
    var result = {};
    result.kind = 'base-monster';
    switch(area) {
    case Const.Area.HAND:
      result.toBattle = !this.existsBattleMonster_(field);
      result.toBench = this.canAttendBench_(field);
      break;
    case Const.Area.BATTLE_MONSTER:
      result.attack = turn.allowAttack() && card.canAttack();
      result.special = this.canActSpecial(card) ? this.effectDao_.getSkillEffectCondition('special_' + card.special.code)(game, card) : null;
      result.escape = !turn.wasEscaped() && card.canEscape() && field.getBench().length > 0;
      break;
    case Const.Area.BENCH:
      result.special = this.canActSpecial(card) ? this.effectDao_.getSkillEffectCondition('special_' + card.special.code)(game, card) : null;
      result.toBattle = !this.existsBattleMonster_(field);
      break;
    }
    return result;
  };

  ActionButtonController.prototype.forEvolutionMonster_ = function(card, field, area, turn, game) {
    var result = {};
    result.kind = 'evolution-monster';
    switch(area) {
    case Const.Area.HAND:
      result.evolution = this.canEvolute_(card, field, turn);
      break;
    case Const.Area.BATTLE_MONSTER:
      result.attack = turn.allowAttack() && card.canAttack();
      result.special = this.canActSpecial(card) ? this.effectDao_.getSkillEffectCondition('special_' + card.special.code)(game, card) : null;
      result.escape = !turn.wasEscaped() && card.canEscape() && field.getBench().length > 0;
      break;
    case Const.Area.BENCH:
      result.special = this.canActSpecial(card) ? this.effectDao_.getSkillEffectCondition('special_' + card.special.code)(game, card) : null;
      result.toBattle = !this.existsBattleMonster_(field);
      break;
    }
    return result;
  };

  ActionButtonController.prototype.forTrainer_ = function(card, field, area, turn, game) {
    var result = {};
    result.kind = 'trainer';
    switch(area) {
    case Const.Area.HAND:
      if (turn.isSetupTurn() || turn.isProhibitedTrainer()) {
        result.use = false;
      } else{
        var notlimit = card.kind === 'goods' ? true : !turn.isUsedSupporter();
        var condition = this.effectDao_.getTrainerUseCondition(card.code)(game);
        result.use = notlimit && condition;
      }
      break;
    }
    return result;
  };

  ActionButtonController.prototype.forEnergy_ = function(field, area, turn, card) {
    var result = {};
    result.kind = 'energy';
    switch(area) {
    case Const.Area.HAND:
      if (turn.isSetupTurn()) {
        result.attach = false;
      } else{
        result.attach = !turn.isAttachedEnergy() || (Effects.findPrayingRain(field) && card.getType() === 'aqua');
      }
      break;
    }
    return result;
  };

  ActionButtonController.prototype.canActSpecial = function(card) {
    if (!card.special) {
      return false;
    }
    return card.special.timing === Const.EffectTiming.ACTION;
  };

  ActionButtonController.prototype.existsBattleMonster_ = function(field) {
    return field.getBattleMonster() !== null;
  };

  ActionButtonController.prototype.canAttendBench_ = function(field) {
    return field.getBench().length < 5;
  };

  ActionButtonController.prototype.canEvolute_ = function(card, field, turn) {
    if (turn.isFirstTurn()) {
      return false;
    }
    return UtilFunc.findEvolutionBase(card, field, turn).length > 0;
  };


})(jQuery);
