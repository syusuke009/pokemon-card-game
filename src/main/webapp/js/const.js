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
    CONFUSION: 'confusion'
  };

  Const.Effect = {
    BLIND: 'blind',
    TAKE_ALONG: 'take-along',
    ATTACK_DOWN_10: 'attack-down-10',
    ATTACK_DOWN_20: 'attack-down-20',
    ATTACK_UP_10: 'attack-up-10',
    DEFENCE_UP_20: 'defence-up-20',
    CANT_ESCAPE: 'cant-escape',
    CANT_ATTACK: 'cant-attack',
    CANT_SKILL1: 'cant-skill1',
    CANT_SKILL2: 'cant-skill2',

    DAMAGE_GUARD_LESS_THAN_40: 'damage-guard-less-than-40',
    DAMAGE_GUARD: 'damage-guard',
    MATCHLESS: 'matchless',

    PRE_DOUBLING: 'pre-doubling',
    DOUBLING: 'doubling'
  };

  // autoの特殊能力のみ
  Const.Special = {
    ENERGY_BURN: '6_sp',
    PRAYING_RAIN: '9_sp',
    COUNTER_ATTACK: '68_sp',
    ESCAPE_SUPPORT: '85_sp',
    CHEMICAL_GAS: '89_sp',
    MYSTERIOUS_WALL: '122_sp',
    METAMORPHOSE: '132_sp',
    SEEING_THROUGH: '138_sp',
    HELMET_ARMOUR: '140_sp',
    PRIMITIVE_POWER: '142_sp',
    IMMUNITAS: '143_sp'
  };

  Const.Types = ["normal","leaf","fire","aqua","thunder","fight","esper","rainbow"];

  Const.EffectTiming = {
    HACK_SKILL: 'hack-skill',
    REINFORCE:  'reinforce',

    BEFORE_DAMAGE: 'before-damage',
    CALC_DAMAGE: 'calc-damage',
    AFTER_DAMAGE: 'after-damage',

    AUTO: 'auto',
    ACTION: 'action'
  };
})(jQuery);
