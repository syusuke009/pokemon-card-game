(function($){

  CardSelectInterceptor =  function(){
    this.obj_ = null;
    this.func_ = null;
    this.defer_ = null;
  };

  CardSelectInterceptor.prototype.canIntercept = function() {
    return !!this.func_;
  };

  CardSelectInterceptor.prototype.clear = function() {
    this.obj_ = null;
    this.func_ = null;
    if (!!this.defer_) {
      this.defer_.reject();
      this.defer_ = null;
    }
  };

  CardSelectInterceptor.prototype.intercept = function(eventdata, model) {
    if (this.canIntercept()) {
      var result = this.func_(this.obj_, eventdata, model);
      if (!!this.defer_) {
        this.defer_.resolve();
      }
      return result;
    }
    return true;
  };

  CardSelectInterceptor.prototype.forEnergyAttach = function(energyTrnId) {
    this.defer_ = $.Deferred();
    this.obj_ = energyTrnId;
    this.func_ = function(energyTrnId, eventdata, model) {
      var viewpoint = UtilFunc.getViewpoint(eventdata.trnId);
      var field = model.getField(viewpoint);
      var monster = field.selectFrom(eventdata.area, eventdata.trnId);
      var energy = field.pickHand(energyTrnId);
      monster.addEnergy(energy);
      model.getTurn().attachEnergy();
      MessageDisplay.newSentence(monster.name + ' に ' + energy.name + ' が つけられた');
      return true;
    };
    return this.defer_.promise();
  };

  CardSelectInterceptor.prototype.forEvolution = function(evolutionTrnId) {
    this.defer_ = $.Deferred();
    this.obj_ = evolutionTrnId;
    this.func_ = function(evolutionTrnId, eventdata, model) {
      var viewpoint = UtilFunc.getViewpoint(eventdata.trnId);
      var field = model.getField(viewpoint);
      var base = field.selectFrom(eventdata.area, eventdata.trnId);
      var evoluted = field.pickHand(evolutionTrnId);
      evoluted.evolute(base);
      field.override(eventdata.area, base, evoluted);
      model.getTurn().newAssign(evolutionTrnId);
      MessageDisplay.newSentence('・・・おや!? ' + base.name + ' の ようすが・・・！');
      MessageDisplay.println(base.name + ' は ' + evoluted.name + ' に しんかした！');
      return true;
    };
    return this.defer_.promise();
  };

  CardSelectInterceptor.prototype.forGoBattle = function($defer) {
    this.obj_ = $defer;
    this.func_ = function($defer, eventdata, model) {
      var viewpoint = UtilFunc.getViewpoint(eventdata.trnId);
      var field = model.getField(viewpoint);
      var monster = field.pickBench(eventdata.trnId);
      field.setBattleMonster(monster);
      $defer.resolve(true);
      MessageDisplay.println('『いけっ！ ' + monster.name + '！』', 'あいては ' + monster.name + ' を くりだした！');
      return true;
    };
  };

  CardSelectInterceptor.prototype.forUseTrainer = function(effectFunc) {
    this.obj_ = effectFunc;
    this.func_ = function(effectFunc, eventdata, model) {
      effectFunc(eventdata, model);
      return true;
    };
  };

  CardSelectInterceptor.prototype.forEffect = function($defer) {
    this.obj_ = $defer;
    this.func_ = function($defer, eventdata, model) {
      $defer.resolve(eventdata);
      return false;
    };
  };

})(jQuery);