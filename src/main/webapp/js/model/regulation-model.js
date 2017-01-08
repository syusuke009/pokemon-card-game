(function($){

  RegulationModel = function(opt_isHalf) {
    this.isHalf_ = opt_isHalf === true;
  };

  RegulationModel.prototype.deckCount = function() {
    return this.isHalf_ ? 30 : 60;
  };

  RegulationModel.prototype.sideCount = function() {
    return this.isHalf_ ? 3 : 6;
  };

  RegulationModel.prototype.sameCard = function() {
    return this.isHalf_ ? 2 : 4;
  };

})(jQuery);