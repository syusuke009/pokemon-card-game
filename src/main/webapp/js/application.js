(function($){

  Application = function(mode) {
    window.app = this;
    switch(mode) {
    case 'menu':
      this.controller_ = new MenuController();
      break;
    case 'game':
      this.controller_ = new GameController();
      break;
    case 'deck':
      this.controller_ = new DeckEditController();
      break;
    }

    this.controller_.ready();
  };


})(jQuery);
