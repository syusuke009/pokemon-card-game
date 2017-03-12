(function($){

  MonsterCard = {};

  MonsterCard = function(key, mst) {
    this.trnId = key.id;
    this.code = String(key.cardCode);
    this.kind = mst.kind;
    this.kindCaption = MonsterCard.KindCaption[this.kind];
    this.type_ = mst.type;
    this.typeCaption = UtilFunc.getTypeCaption(this.type);
    this.name = mst.name;
    this.hp = Number(mst.hp);
    this.baseCardCode = mst.base;

    this.special = mst.special;
    this.skill1 = mst.skill1;
    this.skill2 = mst.skill2;

    this.escapeCost_ = mst.escape;
    this.originalType_ = mst.type;
    this.originalWeak_ = mst.weak;
    this.originalRegist_ = mst.regist;

    this.isDummy = mst.isDummy
    this.originalCard = null;

    this.damage_ = 0;
    this.status_ = [];
    this.energy_ = [];

    this.effect_ = [];
    this.persistantEffect_ = [];
    this.attackEffectCards_ = [];
    this.defenceEffectCards_ = [];
    this.overwrittenWeak_ = null;
    this.overwrittenRegist_ = null;

    this.attackedSkill_ = null;

    this.evolutedBase_ = null;

    this.dir = 'monster';
  };

  MonsterCard.KindCaption = {
    '1': 'たねポケモン',
    '2': '1進化ポケモン',
    '3': '2進化ポケモン'
  };

  MonsterCard.EventType = {
      REMOVE : 'monster-remove'
  };
  MonsterCard.getEventTarget = function() {
    return $(document.body);
  };
  MonsterCard.dispatchRemoveEvent = function(arr) {
    MonsterCard.getEventTarget().trigger(MonsterCard.EventType.REMOVE, [arr]);
  };

  MonsterCard.prototype.getType = function() {
    if (!UtilFunc.hasPreventSpecialStatus(this) && !Effects.existsChemicalGas()) {
      return this.type_;
    }
    return this.originalType_;
  }

  MonsterCard.prototype.getEscapeCost = function() {
    var model = window.getGameModel();
    var field = model.getField(UtilFunc.getViewpoint(this.trnId));
    var escapeCost = [];
    var count = this.escapeCost_.length;
    $.each(field.getBench(), function(idx, c) {
      if (!Effects.existsChemicalGas(model) && UtilFunc.specialIs(Const.Special.ESCAPE_SUPPORT, c)) {
        count--;
      }
    });
    for (var i = 0; i < count; i++) {
      escapeCost.push(this.escapeCost_[i]);
    }

    return escapeCost;
  }

  MonsterCard.prototype.isWeak = function(type) {
    if (!!this.overwrittenWeak_) {
      return this.overwrittenWeak_[type] || '';
    }
    if (!!this.originalWeak_) {
      return this.originalWeak_[type] || '';
    }
    return '';
  };

  MonsterCard.prototype.hasRegist = function(type) {
    if (!!this.overwrittenRegist_) {
      return this.overwrittenRegist_[type] || '';
    }
    if (!!this.originalRegist_) {
      return this.originalRegist_[type] || '';
    }
    return '';
  };

  MonsterCard.prototype.overwriteType = function(type) {
    this.type_ = type;
  };

  MonsterCard.prototype.overwriteWeak = function(type) {
    this.overwrittenWeak_ = {};
    this.overwrittenWeak_[type] = '*2';
  };

  MonsterCard.prototype.overwriteRegist = function(type) {
    this.overwrittenRegist_ = {};
    this.overwrittenRegist_[type] = '-30';
  };

  MonsterCard.prototype.addEnergy = function(e) {
    this.energy_.push(e);
  };

  MonsterCard.prototype.getEnergy = function() {
    return this.energy_;
  };

  MonsterCard.prototype.removeEnergy = function(e) {
    var idx = this.energy_.findIndex(function(c) {
      return e.trnId === c.trnId;
    });
    if (idx >= 0) {
      var energy = this.energy_.splice(idx, 1);
      MonsterCard.dispatchRemoveEvent(energy.originalCard || energy);
    }
  };

  MonsterCard.prototype.hurt = function(value) {
    this.damage_ += Number(value);
    if (this.damage_ > this.hp) {
      this.damage_ = this.hp;
    }
    if (this.damage_ < 0) {
      this.damage_ = 0;
    }
  };

  MonsterCard.prototype.trush = function() {
    this.backToHand();
    MonsterCard.dispatchRemoveEvent(this.getAllCards());
  };

  MonsterCard.prototype.getAllCards = function() {
    var targets = [];
    if (this.isDummy) {
      targets.push(this.originalCard);
    } else {
      targets.push(this);
    }
    this.getAllBase().forEach(function(b) {
      targets.push(b);
    });
    this.energy_.forEach(function(e) {
      targets.push(e.originalCard || e);
    });

    this.damage_ = 0;
    this.status_ = [];
    this.energy_ = [];
    this.evolutedBase_ = null;

    return targets;
  };

  MonsterCard.prototype.getDamageCount = function() {
    return this.damage_ / 10;
  };

  MonsterCard.prototype.getStatus = function() {
    return this.status_;
  };

  MonsterCard.prototype.setStatus = function(status) {
    this.status_ = status;
  };

  MonsterCard.prototype.hasStatus = function(status) {
    return this.status_.indexOf(status) >= 0;
  };

  MonsterCard.prototype.removeStatus = function(status) {
    this.status_.splice(this.status_.indexOf(status), 1);
  };

  MonsterCard.prototype.addStatus = function(status) {
    if (this.status_.indexOf(status) >= 0) {
      return;
    }
    if (!UtilFunc.hasPreventSpecialStatus(this) && !Effects.existsChemicalGas()
        && UtilFunc.specialIs(Const.Special.IMMUNITAS, this)) {
      MessageDisplay.println(this.name + ' は めんえき で ステータスいじょうをふせいだ！');
      return;
    }
    var idx;
    switch(status) {
    case Const.Status.POISON:
      if (this.hasStatus(Const.Status.DOUBLE_POISON)) {
        return;
      }
      break;
    case Const.Status.DOUBLE_POISON:
      if (this.hasStatus(Const.Status.POISON)) {
        this.removeStatus(Const.Status.POISON);
      }
      break;
    case Const.Status.BURN:
      break;
    case Const.Status.SLEEP:
    case Const.Status.PARALYSIS:
    case Const.Status.CONFUSION:
      if (this.hasStatus(Const.Status.SLEEP)) {
        this.removeStatus(Const.Status.SLEEP);
      }
      if (this.hasStatus(Const.Status.PARALYSIS)) {
        this.removeStatus(Const.Status.SLEPARALYSISEP);
      }
      if (this.hasStatus(Const.Status.CONFUSION)) {
        this.removeStatus(Const.Status.CONFUSION);
      }
      break;
    }
    this.status_.push(status);
  };

  MonsterCard.prototype.getEffectCount = function(effect) {
    return this.effect_.filter(function(ef) {
      return ef === effect;
    }).length;
  };

  MonsterCard.prototype.removeEffect = function(effect) {
    this.effect_ = this.effect_.filter(function(ef) {
      return ef !== effect;
    });
  };

  MonsterCard.prototype.addEffect = function(effect) {
    this.effect_.push(effect)
  };

  MonsterCard.prototype.addPersistantEffect = function(effect) {
    this.persistantEffect_.push(effect);
  };

  MonsterCard.prototype.addAttackEffectCard = function(card) {
    this.attackEffectCards_.push(card);
  };

  MonsterCard.prototype.addDefenceEffectCard = function(card) {
    this.defenceEffectCards_.push(card);
  };

  MonsterCard.prototype.trushAttackEffectCards = function() {
    if (this.attackEffectCards_.length === 0) {
      return;
    }
    MonsterCard.dispatchRemoveEvent(this.attackEffectCards_);
    this.attackEffectCards_ = [];
  };

  MonsterCard.prototype.trushDefenceEffectCards = function() {
    if (this.defenceEffectCards_.length === 0) {
      return;
    }
    MonsterCard.dispatchRemoveEvent(this.defenceEffectCards_);
    this.defenceEffectCards_ = [];
  };

  MonsterCard.prototype.hasPersistantEffect = function(effect) {
    return this.persistantEffect_.indexOf(effect) >= 0;
  };

  MonsterCard.prototype.getBase = function() {
    return this.evolutedBase_;
  };

  MonsterCard.prototype.getAllBase = function() {
    var result = [];
    if (!!this.evolutedBase_) {
      result.push(this.evolutedBase_);
      if (!!this.evolutedBase_.getBase()) {
        result.push(this.evolutedBase_.getBase());
      }
    }
    return result;
  };

  MonsterCard.prototype.backToBench = function() {
    this.status_ = [];

    this.overwrittenWeak_ = null;
    this.overwrittenRegist_ = null;
  };

  MonsterCard.prototype.backToHand = function() {
    this.backToBench();

    this.type_ = this.originalType_;
    this.persistantEffect_ = [];
  };

  MonsterCard.prototype.evolute = function(base) {

    this.evolutedBase_ = base;

    this.damage_ = base.damage_;
    this.energy_ = base.energy_;
    base.damage_ = 0;
    base.energy_ = [];
    base.status_ = [];
  };

  MonsterCard.prototype.degenerate = function() {

    var base = this.evolutedBase_;

    base.damage_ = this.damage_;
    base.energy_ = this.energy_;
    this.damage_ = 0;
    this.energy_ = [];
    this.status_ = [];

    this.effect_ = [];
    this.persistantEffect_ = [];
    this.type_ = this.originalType_;
    this.overwrittenWeak_ = null;
    this.overwrittenRegist_ = null;

    return base;
  };

  MonsterCard.prototype.canAttack = function() {
    if (this.status_.some(function(state) {
      return state === Const.Status.SLEEP || state === Const.Status.PARALYSIS;
    })) {
      return false;
    };
    if (this.getEffectCount(Const.Effect.CANT_ATTACK) > 0) {
      return false;
    }
    var energies = UtilFunc.mapEnergyToArray(this.getEnergy(), this);
    if (!!this.skill1 && this.skill1.satisfy(energies)) {
      return true;
    }
    if (!!this.skill2 && this.skill2.satisfy(energies)) {
      return true;
    }
    return false;
  };

  MonsterCard.prototype.canEscape = function() {
    if (this.status_.some(function(state) {
      return state === Const.Status.SLEEP || state === Const.Status.PARALYSIS;
    })) {
      return false;
    };
    if (this.getEffectCount(Const.Effect.CANT_ESCAPE) > 0) {
      return false;
    }
    return UtilFunc.checkEnoughEnergy(this.getEscapeCost(), UtilFunc.mapEnergyToArray(this.energy_, this));
  };

  MonsterCard.prototype.attacked = function(skill) {
    this.atattackedSkill_ = skill || null;
  };

  MonsterCard.prototype.returnAttackedSkill = function() {
    return this.atattackedSkill_;
  };

})(jQuery);