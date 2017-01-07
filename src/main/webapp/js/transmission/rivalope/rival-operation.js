(function($){

  RivalOperation = function() {
  };

  var abstractMethod = function() {
    throw 'this method is not overridden';
  };

  RivalOperation.prototype.turnChange = abstractMethod;

  RivalOperation.prototype.selectBattleMonster = abstractMethod;

  RivalOperation.prototype.displayClear = abstractMethod;
  RivalOperation.prototype.displayPrintln = abstractMethod;

})(jQuery);