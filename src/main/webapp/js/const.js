(function($){

  Const = {};

  Const.UserIdKey = 'user';

  Const.Viewpoint = {
    ME: 'my',
    RIVAL: 'rival'
  };

  Const.Area = {
    HAND: 'hand',
    BENCH: 'bench',
    BATTLE_MONSTER: 'battle-monster'
  };

  Const.Status = {
    POISON: 'poison',
    DOUBLE_POISON: 'double-poison',
    BURN: 'burn',
    SLEEP: 'sleep',
    PARALYSIS: 'paralysis',
    CONFUSION: 'confusion',

    CANT_ESCAPE: 'cant-escape',
    CANT_ATTACK: 'cant-attack',

    DAMAGE_GUARD: 'damage-guard',
    MATCHLESS: 'matchless'
  };

  Const.Types = ["normal","leaf","fire","aqua","thunder","fight","esper"];

  Const.EffectTiming = {
    BEFORE_DAMAGE: 'before-damage',
    CALC_DAMAGE: 'calc-damage',
    AFTER_DAMAGE: 'after-damage'
  };
})(jQuery);
