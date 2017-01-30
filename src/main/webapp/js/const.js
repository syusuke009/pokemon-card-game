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

    BLIND: 'blind',
    ATTACK_DOWN_10: 'attack-down-10',
    ATTACK_DOWN_20: 'attack-down-20',
    DEFENCE_UP_20: 'defence-up-20',
    CANT_ESCAPE: 'cant-escape',
    CANT_ATTACK: 'cant-attack',
    CANT_SKILL1: 'cant-skill1',
    CANT_SKILL2: 'cant-skill2',

    DAMAGE_GUARD_LESS_THAN_40: 'damage-guard-less-than-40',
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
