(function($){

  TurnModel = function(opt_turn) {
    this.viewpoint_;
    if (!opt_turn) {
      this.viewpoint_ = null;
    } else {
      this.viewpoint_ = UtilFunc.reverseViewpoint(opt_turn.viewpoint_);
    }

    this.isAttacked_ = false;
    this.isUsedSupporter_ = false;
    this.isAttachedEnergy_ = false;
    this.newAssigned_ = [];

    this.turnCount_ = !!opt_turn ? opt_turn.turnCount_ + 1 : 0;
  };

  TurnModel.prototype.next = function() {
    return new TurnModel(this);
  };

  TurnModel.prototype.isSetupTurn = function() {
    return this.turnCount_ === 0;
  };

  TurnModel.prototype.isFirstTurn = function() {
    return this.turnCount_ === 1 || this.turnCount_ === 2;
  };

  TurnModel.prototype.allowAttack = function() {
    return this.turnCount_ > 1;
  };

  TurnModel.prototype.whoseTurn = function() {
    return this.viewpoint_;
  }

  TurnModel.prototype.attacked = function() {
    this.isAttacked_ = true;
  };

  TurnModel.prototype.isAttacked = function() {
    return this.isAttacked_;
  };

  TurnModel.prototype.useSupporter = function() {
    this.isUsedSupporter_ = true;
  };

  TurnModel.prototype.isUsedSupporter = function() {
    return this.isUsedSupporter_;
  };

  TurnModel.prototype.attachEnergy = function() {
    this.isAttachedEnergy_ = true;
  };

  TurnModel.prototype.isAttachedEnergy = function() {
    return this.isAttachedEnergy_;
  };

  TurnModel.prototype.newAssign = function(trnId) {
    return this.newAssigned_.push(trnId);
  };

  TurnModel.prototype.isNewAssignedMonster = function(trnId) {
    return this.newAssigned_.indexOf(trnId) >= 0;
  };
})(jQuery);