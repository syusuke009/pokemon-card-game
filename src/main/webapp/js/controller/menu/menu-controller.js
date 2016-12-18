(function($){

  MenuController = function() {
    this.$element_ = $('.main-screen')
  };

  MenuController.prototype.ready = function() {
    this.bindEvents_();
  };

  MenuController.prototype.bindEvents_ = function() {
    this.$element_.on('click', '.game-btn', this.onClickGameStart_.bind(this));
    this.$element_.on('click', '.deck-btn', this.onClickDeckEdit_.bind(this));
  };

  MenuController.prototype.onClickGameStart_ = function(e) {
    window.location.href = './pokemon-card.html';
  };

  MenuController.prototype.onClickDeckEdit_ = function(e) {
    window.location.href = './deck-edit.html';
  };

})(jQuery);
