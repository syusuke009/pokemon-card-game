(function($){

  DeckEditView = function(regulation){
    this.$element_ = $('#deck-edit-screen');
    this.regulation_ = regulation;
  };

  DeckEditView.EventType = {
      ADD_TO_DECK: 'add-to-deck',
      REMOVE_FROM_DECK: 'remove-from-deck',
      SAVE: 'save',
      REVERT: 'revert',
      EXIT: 'exit'
  };

  DeckEditView.prototype.getElement = function(){
    return this.$element_;
  };

  DeckEditView.prototype.render = function(){
    this.enterDocument();
  };

  DeckEditView.prototype.redraw = function(holding, deck){
    var $view = this.$element_;
    var holdingTmpl = Hogan.compile($('#holding-list-template').text());
    $view.find('.holding-card-list').html(holdingTmpl.render({'list':holding}));
    var holdingTmpl = Hogan.compile($('#deck-list-template').text());
    $view.find('.deck-card-list').html(holdingTmpl.render({'list':deck}));

    var $saveBtn = $view.find('.save-btn');
    var $count = $view.find('.deck-card-number .count');
    var $errorMessage = $view.find('.error-message-area');
    $count.removeClass('less enough much');
    $saveBtn.addClass('disabled');
    $errorMessage.show();
    var count = deck.length;
    var deckCount = this.regulation_.deckCount();
    if (count < deckCount) {
      $count.addClass('less');
      $errorMessage.find('.error-message').text('デッキが ' + deckCount + ' 枚に達していません');
    } else if (count > deckCount) {
      $count.addClass('much');
      $errorMessage.find('.error-message').text('デッキが ' + deckCount + ' 枚を超えています');
    } else if (!this.containsBaseMonster_(deck)) {
      $errorMessage.find('.error-message').text('デッキに たねポケモン が入っていません');
    } else {
      $count.addClass('enough');
      $saveBtn.removeClass('disabled');
      $errorMessage.hide();
    }
    $count.text(count);
  };

  DeckEditView.prototype.enterDocument = function(){
    this.$element_.on('click', '.revert-btn', this.onRevertClick_.bind(this));
    this.$element_.on('click', '.save-btn', this.onSaveClick_.bind(this));
    this.$element_.on('click', '.exit-btn', this.onExitClick_.bind(this));
    this.$element_.on('click', '.add-btn', this.onAddClick_.bind(this));
    this.$element_.on('click', '.remove-btn', this.onRemoveClick_.bind(this));
  };

  DeckEditView.prototype.onSaveClick_ = function(e) {
    var $target = $(e.currentTarget);
    if ($target.hasClass('disabled')) {
      return;
    }
    this.$element_.trigger(DeckEditView.EventType.SAVE);
  };

  DeckEditView.prototype.onRevertClick_ = function(e) {
    this.$element_.trigger(DeckEditView.EventType.REVERT);
  };

  DeckEditView.prototype.onExitClick_ = function(e) {
    this.$element_.trigger(DeckEditView.EventType.EXIT);
  };

  DeckEditView.prototype.onAddClick_ = function(e) {
    var $target = $(e.currentTarget);
    if ($target.hasClass('disabled')) {
      return;
    }
    var data = $target.attr('data-code');
    this.$element_.trigger(DeckEditView.EventType.ADD_TO_DECK, data);
  };

  DeckEditView.prototype.onRemoveClick_ = function(e) {
    var $target = $(e.currentTarget);
    if ($target.hasClass('disabled')) {
      return;
    }
    var data = $target.attr('data-code');
    this.$element_.trigger(DeckEditView.EventType.REMOVE_FROM_DECK, data);
  };

  DeckEditView.prototype.containsBaseMonster_ = function(deck) {
    return deck.some(function(card) {
      return UtilFunc.isBaseMonster(card.kind);
    });
  };

})(jQuery);
