(function($){

  CardSelectInterceptor =  function(){
    this.obj_ = null;
    this.func_ = null;
  };

  CardSelectInterceptor.prototype.canIntercept = function() {
    return !!this.func_;
  };

  CardSelectInterceptor.prototype.clear = function() {
    this.obj_ = null;
    this.func_ = null;
  };

  CardSelectInterceptor.prototype.intercept = function(eventdata, model) {
    if (this.canIntercept()) {
      return this.func_(this.obj_, eventdata, model);
    }
    return true;
  };

  CardSelectInterceptor.prototype.forEnergyAttach = function(energyTrnId) {
    this.obj_ = energyTrnId;
    this.func_ = function(energyTrnId, eventdata, model) {
      var viewpoint = UtilFunc.getViewpoint(eventdata.trnId);
      var field = model.getField(viewpoint);
      var monster = field.selectFrom(eventdata.area, eventdata.trnId);
      var energy = field.pickHand(energyTrnId);
      monster.addEnergy(energy);
      model.getTurn().attachEnergy();
      return true;
    };
  };


})(jQuery);