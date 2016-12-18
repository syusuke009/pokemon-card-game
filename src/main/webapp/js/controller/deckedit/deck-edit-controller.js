(function($){

  DeckEditController = function() {
    this.holdingDao_ = new HoldingCardDao();
    this.cardMstDao_ = new CardMstDao();
    this.skillDao_ = new SkillDao();
    this.deckDao_ = new DeckDao();

    this.regulation_ = new RegulationChecker();
    this.view_ = new DeckEditView(this.regulation_);

    this.idNum_ = 0;
    this.holding_;
    this.deck_;

    this.userId_ = Const.UserIdKey;
  };

  DeckEditController.prototype.ready = function() {
    this.view_.enterDocument();
    this.bindEvents_();

    this.holding_ = this.holdingDao_.getHoldingCards();
    this.reset_();
  };

  DeckEditController.prototype.bindEvents_ = function() {
    this.view_.getElement().on(DeckEditView.EventType.SAVE, this.onSave_.bind(this));
    this.view_.getElement().on(DeckEditView.EventType.REVERT, this.onRevert_.bind(this));
    this.view_.getElement().on(DeckEditView.EventType.EXIT, this.onExit_.bind(this));
    this.view_.getElement().on(DeckEditView.EventType.ADD_TO_DECK, this.onAdd_.bind(this));
    this.view_.getElement().on(DeckEditView.EventType.REMOVE_FROM_DECK, this.onRemove_.bind(this));
  };

  DeckEditController.prototype.onAdd_ = function(e, code) {
    this.putOnDeck_(code);
  };

  DeckEditController.prototype.onRemove_ = function(e, code) {
    this.pullOutFromDeck_(code);
  };

  DeckEditController.prototype.onRevert_ = function(e) {
    this.reset_();
  };

  DeckEditController.prototype.onSave_ = function(e) {
    var deckArr = $.map(this.deck_, function(card, idx) {
      return Number(card.code);
    });
    this.deckDao_.register(this.userId_, this.deck_);
  };

  DeckEditController.prototype.onExit_ = function(e) {
    window.location.href = './index.html';
  };

  DeckEditController.prototype.putOnDeck_ = function(code) {
    this.deck_.push(this.createCard_(code, 'deck', this.idNum_++));

    var limit = this.regulation_.sameCard();
    $.each(this.holding_, function(idx, hold) {
      if (code === hold.code) {
        hold.rest = hold.rest - 1;
        hold.disabled = limit === (hold.total - hold.rest) ? 'disabled' : '';
      }
    }.bind(this));

    this.sortDeck_();
    this.view_.redraw(this.holding_, this.deck_);
  };

  DeckEditController.prototype.pullOutFromDeck_ = function(code) {
    var idx = this.deck_.findIndex(function(card){
      return card.code === code;
    });
    this.deck_.splice(idx, 1);

    $.each(this.holding_, function(idx, hold) {
      if (code === hold.code) {
        hold.rest = hold.rest + 1;
      }
    }.bind(this));

    this.view_.redraw(this.holding_, this.deck_);
  };

  DeckEditController.prototype.reset_ = function() {
    var deckCodes = this.deckDao_.get(this.userId_);
    this.deck_ = [];

    var limit = this.regulation_.sameCard();
    var cardCount = {};
    $.each(deckCodes, function(idx, code) {
      var cnt = cardCount[code] || 0;
      cnt++;
      cardCount[code] = cnt;
      this.deck_.push(this.createCard_(code, 'deck', this.idNum_++));
    }.bind(this));
    $.each(this.holding_, function(idx, hold) {
      var code = hold.code;
      var cnt = cardCount[code] || 0;
      hold.rest = hold.total - cnt;
      hold.disabled = limit === cnt ? 'disabled' : '';
      hold.card = this.createCard_(code, 'holding', code);
    }.bind(this));

    this.view_.redraw(this.holding_, this.deck_);
  };

  DeckEditController.prototype.createCard_ = function(code, prefix, id) {
    var key = {};
    key.id = prefix + '-' + id;
    key.cardCode = code;
    var card = this.cardMstDao_.get(code);
    if (!!card.skill1 && (typeof card.skill1 === 'string')) {
      var skill1 = this.skillDao_.get(card.skill1.replace('skill_',''));
      card.skill1 = new Skill(card.skill1, skill1);
    }
    if (!!card.skill2 && (typeof card.skill2 === 'string')) {
      var skill2 = this.skillDao_.get(card.skill2.replace('skill_',''));
      card.skill2 = new Skill(card.skill2, skill2);
    }
    return CardFactory.create(key, card);
  };

  DeckEditController.prototype.sortDeck_ = function() {
    this.deck_.sort(function(a, b) {
      return Number(a.code) - Number(b.code);
    });
  };

})(jQuery);
