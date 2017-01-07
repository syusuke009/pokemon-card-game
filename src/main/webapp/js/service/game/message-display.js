(function($){

  var view = new MessageWindowView();

  MessageDisplay = {};

  MessageDisplay.println = function(message) {
    view.println(message);
    RequestSignalSender.displayPrintln(message);
  };

  MessageDisplay.clear = function() {
    view.clear();
    RequestSignalSender.displayClear();
  };

  MessageDisplay.newSentence = function(message) {
    MessageDisplay.clear();
    MessageDisplay.println(message);
  };

})(jQuery);