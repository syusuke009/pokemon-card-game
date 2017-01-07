(function($){

  EffectDao = function() {
    this.mst_ = Effects;
  };

  EffectDao.prototype.getSkillEffect = function(code) {
    return this.mst_[code];
  };

  EffectDao.prototype.getTrainerEffect = function(code) {
    return this.mst_['trainer_effect_' + code];
  };

  EffectDao.prototype.getTrainerUseCondition = function(code) {
    return this.mst_['trainer_condition_' + code];
  };

})(jQuery);
