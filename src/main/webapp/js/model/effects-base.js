(function($){

  EffectsBase = {};

  EffectsBase.poison = function(param) {
    var $defer = $.Deferred();
    param.defender.addStatus(Const.Status.POISON);
    $defer.resolve();
    return $defer.promise();
  };

  EffectsBase.poisonByCoinToss = function(param) {
    var $defer = $.Deferred();
    var dialog = new CoinTossDialog();
    dialog.show().then(function(response){
      if (response[0]) {
        param.defender.addStatus(Const.Status.POISON);
      }
      $defer.resolve();
    });
    return $defer.promise();
  };
})(jQuery);
