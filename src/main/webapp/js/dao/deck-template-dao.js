(function($) {

  DeckTemplateDao = function() {
    this.gamaTableApiAjax_ = new GameTableApiAjax();
  };

  DeckTemplateDao.prototype.getTemplates = function() {
    return this.gamaTableApiAjax_.get('deck/templates');
  };

  DeckTemplateDao.prototype.getTemplateCards = function(deckCode) {
    return this.gamaTableApiAjax_.get('deck/templates/' + deckCode + '/cards');
  };

})(jQuery);
