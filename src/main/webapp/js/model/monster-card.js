(function($){

  MonsterCard = {};

  MonsterCard = function(key, mst) {
    this.trnId = key.id;
    this.code = String(key.cardCode);
    this.kind = mst.kind;
    this.kindCaption = MonsterCard.KindCaption[this.kind];
    this.type = mst.type;
    this.typeCaption = UtilFunc.getTypeCaption(this.type);
    this.name = mst.name;
    this.hp = mst.hp;
    this.baseCardCode = mst.base;

    this.special = mst.special;
    this.skill1 = mst.skill1;
    this.skill2 = mst.skill2;

    this.escapeCost = mst.escape;
    this.weak = mst.weak;
    this.regist = mst.regist;

    this.damage_ = 0;
    this.status_ = [];
    this.energy_ = [];

    this.evolutedBase_ = null;

    this.dir = 'monster';
  };

  MonsterCard.KindCaption = {
    '1': 'たねポケモン',
    '2': '1進化ポケモン',
    '3': '2進化ポケモン'
  };

  MonsterCard.prototype.addEnergy = function(e) {
    this.energy_.push(e);
  };

  MonsterCard.prototype.getEnergy = function() {
    return this.energy_;
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

  MonsterCard.prototype.getDamageCount = function() {
    return this.damage_ / 10;
  };

  MonsterCard.prototype.getStatus = function() {
    return this.status_;
  };

  MonsterCard.prototype.setStatus = function(status) {
    this.status_ = status;
  };

  MonsterCard.prototype.addStatus = function(status) {
    if (this.status_.indexOf(status) >= 0) {
      return;
    }
    switch(status) {
    case Const.Status.POISON:
    case Const.Status.BURN:
      break;
    case Const.Status.SLEEP:
    case Const.Status.PARALYSIS:
    case Const.Status.CONFUSION:
      var idx = this.status_.indexOf(SLEEP);
      if (idx => 0) {
        this.status_.splice(idx, 1);
      }
      idx = this.status_.indexOf(PARALYSIS);
      if (idx => 0) {
        this.status_.splice(idx, 1);
      }
      idx = this.status_.indexOf(CONFUSION);
      if (idx => 0) {
        this.status_.splice(idx, 1);
      }
      break;
    }
    this.status_.push(status);
  };

  MonsterCard.prototype.escape = function() {
    this.status_ = [];
  };

  MonsterCard.prototype.evolute = function(base) {

    this.evolutedBase_ = base;

    this.damage_ = base.damage_;
    this.energy_ = base.energy_;
  };

  MonsterCard.prototype.canAttack = function() {
    var energies = UtilFunc.mapEnergyToArray(this.getEnergy());
    if (!!this.skill1 && this.skill1.satisfy(energies)) {
      return true;
    }
    if (!!this.skill2 && this.skill2.satisfy(energies)) {
      return true;
    }
    return false;
  };

  MonsterCard.prototype.canEscape = function() {
    return this.status_.every(function(state) {
      return state !== Const.Status.SLEEP && state !== Const.Status.PARALYSIS;
    });
  };
})(jQuery);