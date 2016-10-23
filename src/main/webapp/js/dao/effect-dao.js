(function($){

  EffectDao = function() {
    this.mst_ = Effects;
  };

  EffectDao.prototype.get = function(code) {
    return this.mst_[code];
  };

})(jQuery);
