(function($){

  var view = new MessageWindowView();

  MessageDisplay = {};

  MessageDisplay.println = function(message) {
    view.println(message);
  };

  MessageDisplay.newSentence = function(message) {
    view.clear();
    view.println(message);
  };

})(jQuery);