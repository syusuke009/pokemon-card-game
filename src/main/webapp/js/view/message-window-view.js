(function($){

  MessageWindowView = function() {
    this.$element_ = $('.message-window');
  };

  MessageWindowView.EventType = {
    SELECT_CARD: 'select-card',
    ASSIGN_BATTLE: 'assign-battle',
    ASSIGN_BENCH: 'assign-bench',
    EVOLUTE: DetailAreaView.EventType.EVOLUTE,
    USE: DetailAreaView.EventType.USE,
    ATTACH_ENERGY: DetailAreaView.EventType.ATTACH,
    ATTACK: DetailAreaView.EventType.ATTACK,
    ESCAPE: DetailAreaView.EventType.ESCAPE,
    TURN_END: DetailAreaView.EventType.TURN_END
  };

  MessageWindowView.prototype.getElement = function() {
    return this.$element_;
  };

  MessageWindowView.prototype.println = function(message) {
    var html = '<div class="sentence">' + message + '</div>';
    this.$element_.append(html);
  };

  MessageWindowView.prototype.clear = function() {
    this.$element_.children().remove();
  };

})(jQuery);