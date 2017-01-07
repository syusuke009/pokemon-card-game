(function($){

  RivalOperationManualImpl = function() {
  };

  RivalOperationManualImpl.prototype = $.extend({}, RivalOperation.prototype);

  RivalOperationManualImpl.prototype.turnChange = function() {
    RequestSignalReceiver.turnChange();
  };

  RivalOperationManualImpl.prototype.syncModel = function(model) {
    // RequestSignalReceiver.syncModel(model);
  };

  RivalOperationManualImpl.prototype.selectBattleMonster = function($defer, selectables) {
    var controller = app.controller_;
    controller.view_.drawSelectable(selectables);
    controller.onSelectInterceptor_.forGoBattle($defer);
  };

  RivalOperationManualImpl.prototype.displayClear = function(message) {
    // RequestSignalReceiver.displayClear(message);
  };
  RivalOperationManualImpl.prototype.displayPrintln = function(message) {
    // RequestSignalReceiver.displayPrintln(message);
  };

  RivalOperationManualImpl.prototype.gameset = function(viewpoint) {
    // RequestSignalReceiver.gameset(viewpoint);
  };

})(jQuery);