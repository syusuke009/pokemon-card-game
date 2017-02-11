(function($){

  SkillDao = function() {
    this.mst_ = SkillList;
  };

  SkillDao.prototype.get = function(code) {
    return this.mst_[code];
  };

})(jQuery);
