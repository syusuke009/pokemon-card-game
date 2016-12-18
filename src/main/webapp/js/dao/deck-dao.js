(function($){

  DeckDao = function() {
  };

  DeckDao.prototype.get = function(userId) {
    var json = localStorage.getItem('pokemon-card');
    if (!!json) {
      var data = JSON.parse(json);
      return data.deck;
    }
    return MyDeck;
  };

  DeckDao.prototype.register = function(userId, deckArr) {
    var deckCodes = deckArr.map(function(c) {
      return Number(c.code);
    });
    var json = localStorage.getItem('pokemon-card');
    var data;
    if (!!json) {
      data = JSON.parse(json);
    } else {
      data = {};
    }
    data.deck = deckCodes;
    localStorage.setItem('pokemon-card', JSON.stringify(data));
  };

})(jQuery);
