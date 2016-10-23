(function($){

  DeckSupplier = function(cardMstDao, skillDao) {
    this.cardMstDao_ = cardMstDao;
    this.skillDao_ = skillDao;
  };

  DeckSupplier.prototype.supply = function(json, prefix) {
    var deckArr = $.map(json, function(code, idx){
      var key = {};
      key.id = prefix + '-' + idx;
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
    }.bind(this));

    var deck = new Deck(deckArr);
    deck.shuffle();
    return deck;
  };

})(jQuery);