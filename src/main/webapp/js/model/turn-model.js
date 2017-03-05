(function($){

  TurnModel = function(opt_turn) {
    this.viewpoint_;
    if (!opt_turn) {
      this.viewpoint_ = null;
    } else {
      this.viewpoint_ = UtilFunc.reverseViewpoint(opt_turn.viewpoint_);
    }

    this.wasAttacked_ = false;
    this.isUsedSupporter_ = false;
    this.isAttachedEnergy_ = false;
    this.newAssigned_ = [];
    this.escaped_ = false;

    this.useSpecialIds_ = [];

    this.turnCount_ = !!opt_turn ? opt_turn.turnCount_ + 1 : 0;

    this.prohibittedTrainerCount_ = !!opt_turn ? Math.max(opt_turn.prohibittedTrainerCount_ - 1, 0) : 0;
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
    this.wasAttacked_ = true;
  };

  TurnModel.prototype.wasAttacked = function() {
    return this.wasAttacked_;
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

  TurnModel.prototype.escape = function() {
    return this.escaped_ = true;
  };

  TurnModel.prototype.wasEscaped = function() {
    return this.escaped_;
  };

  TurnModel.prototype.useSpecial = function(card) {
    this.useSpecialIds_.push(card.trnId);
  };

  TurnModel.prototype.wasUsedSpecial = function(card) {
    return this.useSpecialIds_.indexOf(card.trnId) >= 0;
  };

  TurnModel.prototype.prohibitTrainer = function() {
    this.prohibittedTrainerCount_ = 2;
  };

  TurnModel.prototype.isProhibitedTrainer = function() {
    return this.prohibittedTrainerCount_ > 0;
  };
})(jQuery);