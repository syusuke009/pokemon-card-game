(function($){

  var view = new MessageWindowView();

  MessageDisplay = {};

  MessageDisplay.println = function(message, opt_msgForSend) {
    if (!!message) {
      view.println(message);
    }
    RequestSignalSender.displayPrintln(opt_msgForSend || message);
  };

  MessageDisplay.clear = function() {
    view.clear();
    RequestSignalSender.displayClear();
  };

  MessageDisplay.newSentence = function(message, opt_msgForSend) {
    MessageDisplay.clear();
    MessageDisplay.println(message, opt_msgForSend);
  };

})(jQuery);