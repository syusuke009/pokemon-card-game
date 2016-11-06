(function($){

  Const = {};

  Const.Viewpoint = {
    ME: 'my',
    RIVAL: 'rival'
  };

  Const.Area = {
    HAND: 'hand',
    BENCH: 'bench',
  };
  BATTLE_MONSTER: 'battle-monster'

  Const.Status = {
    POISON: 'poison',
    BI_POISON: 'bi-poison',
    BURN: 'burn',
    SLEEP: 'sleep',
    PARALYSIS: 'paralysis',
    CONFUSION: 'confusion',

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
