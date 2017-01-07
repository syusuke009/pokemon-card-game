(function($){

  RequestSignalReceiver = {};

  RequestSignalReceiver.controller_ = null;

  RequestSignalReceiver.setController = function(gameController){
    RequestSignalReceiver.controller_ = gameController;
  };

  RequestSignalReceiver.turnChange = function() {
    RequestSignalReceiver.controller_.turnEnd();
  };

  RequestSignalReceiver.syncModel = function(model) {
    RequestSignalReceiver.controller_.model_ = model;
    RequestSignalReceiver.controller_.view_.redrawField(model);
  };

  RequestSignalReceiver.selectBattleMonster = function(trnId) {
    var data = {};
    data.area = Const.Area.BENCH;
    data.trnId = trnId;
    RequestSignalReceiver.controller_.onSelectCard(null, data);
  };

  RequestSignalReceiver.displayClear = function() {
    MessageDisplay.clear();
  };
  RequestSignalReceiver.displayPrintln = function(message) {
    MessageDisplay.println(message);
  };

  RequestSignalReceiver.gameset = function(viewpoint) {
    RequestSignalReceiver.controller_.gameset(viewpoint);
  };

})(jQuery);