(function($){

  CardMstDao = function() {
    this.mst_ = CardList;
  };

  CardMstDao.prototype.get = function(code) {
    return this.mst_[code];
  };

})(jQuery);
