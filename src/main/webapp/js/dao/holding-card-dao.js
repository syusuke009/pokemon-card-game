(function($){

  HoldingCardDao = function() {
  };

  HoldingCardDao.prototype.getHoldingCards = function() {
    var holding = [];
    $.each(CardList, function(key, o){
      var obj = {};
      obj.code = key;
      obj.total = 99;
      holding.push(obj);
    }.bind(this));
    return holding;
  };

})(jQuery);
