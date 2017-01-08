(function($){

  MenuController = function() {
    this.$element_ = $('.main-screen')
  };

  MenuController.prototype.ready = function() {
    this.bindEvents_();
    this.participateNetworkplayArcade_();
  };

  MenuController.prototype.bindEvents_ = function() {
    this.$element_.on('click', '.game-btn', this.onClickGameStart_.bind(this));
    this.$element_.on('click', '.deck-btn', this.onClickDeckEdit_.bind(this));
  };

  // TODO refactoring
  MenuController.prototype.participateNetworkplayArcade_ = function() {
    var userName = window.location.search.match(/userName=(.*?)(&|$)/)[1];
    if (!userName || userName === '') {
      return;
    }
    var gameCoordinator = new networkplay.Matchmaker(userName);
    if (gameCoordinator.connect()) {
      gameCoordinator.participate();
      gameCoordinator.getElement().on(networkplay.Matchmaker.EventType.OTHER_USER_PARTICIPATE,
        function(event, data) {
          $('<li class="networkplay-participant menu-btn">' +
            '  <button class="btn networkplay-send-game-req" ' +
            '          data-connection-uuid="' + data['connectionUuid'] + '"' +
            '          data-user-name="' + data['userName'] + '">' +
            data['userName'] + ' と対戦する' +
            '</button>' +
            '</li>')
            .appendTo('.networkplay-participants');
        });
      gameCoordinator.getElement().on(networkplay.Matchmaker.EventType.RECEIVE_GAME_REQUEST, function(event, data) {
        if (window.confirm(data['userName'] + 'から対戦依頼が届きました。対戦を開始しますか?')) {
          gameCoordinator.acceptGameRequest(data);
        } else {
          gameCoordinator.declineGameRequest(data['gameUuid']);
        }
      });
      this.$element_.on('click', '.networkplay-participants', function(event) {
        var $target = $(event.target);
        if ($target.hasClass('networkplay-send-game-req')) {
          var request = gameCoordinator.sendGameRequest($target.data('userName'),
            $target.data('connectionUuid'),
            'ぼくとポケモンカード対戦しよう！');
          if (request !== null) {
            request.promise().done(function(data) {
              gameCoordinator.startNewGame(data);
            }).fail(function(error) {
              console.log(error);
              alert('対戦依頼が断られました');
            });
          }
        }
      });
    }
  };

  MenuController.prototype.onClickGameStart_ = function(e) {
    window.location.href = './pokemon-card.html';
  };

  MenuController.prototype.onClickDeckEdit_ = function(e) {
    window.location.href = './deck-edit.html';
  };

})(jQuery);
