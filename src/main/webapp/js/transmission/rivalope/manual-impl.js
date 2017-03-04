(function($){

  RivalOperationManualImpl = function() {
  };

  RivalOperationManualImpl.prototype = $.extend({}, RivalOperation.prototype);

  RivalOperationManualImpl.prototype.turnChange = function() {
    RequestSignalReceiver.turnChange();
  };

  RivalOperationManualImpl.prototype.initialDrawn = function(f, cnt) {
    var supplier = new DeckSupplier(new CardMstDao(), new SkillDao());
    var deckDao = new DeckDao();

    var rivalField = new PlayField(supplier.supply(deckDao.get('user2'), Const.Viewpoint.RIVAL));
    var controller = app.controller_;
    var redrawCnt = controller.setupper_.stanbyHands_(rivalField);

    RequestSignalReceiver.initialDrawn(rivalField, redrawCnt);
  };

  RivalOperationManualImpl.prototype.syncModel = function(model) {
    // RequestSignalReceiver.syncModel(model);
  };

  RivalOperationManualImpl.prototype.selectBattleMonster = function($defer, selectables) {
    var controller = app.controller_;
    controller.view_.drawSelectable(selectables);
    controller.onSelectInterceptor_.forGoBattle($defer);
  };

  RivalOperationManualImpl.prototype.disclose = function(cards, description) {
    //
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