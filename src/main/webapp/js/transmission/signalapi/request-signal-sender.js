(function($){

  RequestSignalSender = {};

  RequestSignalSender.operation_ = null;

  RequestSignalSender.setOperation = function(){
    RequestSignalSender.operation_ = new RivalOperationManualImpl();
  };

  RequestSignalSender.initialDrawn = function(field, redrawCount) {
    RequestSignalSender.operation_.initialDrawn(field, redrawCount);
  };

  RequestSignalSender.turnChange = function() {
    RequestSignalSender.operation_.turnChange();
  };

  RequestSignalSender.syncModel = function(model) {
    var data = $.extend({}, model);
    data.setField(Const.Viewpoint.ME, model.getField(Const.Viewpoint.RIVAL));
    data.setField(Const.Viewpoint.RIVAL, model.getField(Const.Viewpoint.ME));
    RequestSignalSender.operation_.syncModel(data);
  };

  RequestSignalSender.selectBattleMonster = function(selectables, $defer) {
    RequestSignalSender.operation_.selectBattleMonster($defer, selectables);
  };

  RequestSignalSender.displayClear = function(message) {
    RequestSignalSender.operation_.displayClear(message);
  };
  RequestSignalSender.displayPrintln = function(message) {
    RequestSignalSender.operation_.displayPrintln(message);
  };

  RequestSignalSender.gameset = function(viewpoint) {
    RequestSignalSender.operation_.gameset(UtilFunc.reverseViewpoint(viewpoint));
  };

})(jQuery);