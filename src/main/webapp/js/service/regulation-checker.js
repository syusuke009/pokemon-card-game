(function($){

  RegulationChecker = function(opt_isHalf) {
    this.isHalf_ = opt_isHalf === true;
  };

  RegulationChecker.prototype.deckCount = function() {
    return this.isHalf_ ? 30 : 60;
  };

  RegulationChecker.prototype.sideCount = function() {
    return this.isHalf_ ? 3 : 6;
  };

  RegulationChecker.prototype.sameCard = function() {
    return this.isHalf_ ? 2 : 4;
  };

})(jQuery);