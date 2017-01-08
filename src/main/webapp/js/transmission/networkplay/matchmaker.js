// require arcade-websocket-connection.js

var networkplay = networkplay || {};

(function($) {

  networkplay.Matchmaker = function(userName) {
    this.$element_ = $('.networkplay-matchmaker');
    this.userName_ = userName;
    this.waitingGameRequest_ = null;
  };

  networkplay.Matchmaker.prototype.getElement = function() {
    return this.$element_;
  };

  networkplay.Matchmaker.ActionType = {
    ENTER_ARCADE: 'enter-arcade',
    EXIST_ARCADE: 'exist-arcade',
    SEND_GAME_REQUEST: 'send-game-request',
    ACCEPT_GAME_REQUEST: 'accept-game-request',
    REJECT_GAME_REQUEST: 'reject-game-request'
  };

 networkplay.Matchmaker.EventType = {
    OTHER_USER_PARTICIPATE: 'other-user-participate',
    OTHER_USER_LEAVE: 'exist-arcade',
    RECEIVE_GAME_REQUEST: 'send-game-request',
    ACCEPTED_GAME_REQUEST: 'accepted-game-request',
    REJECTED_GAME_REQUEST: 'rejected-game-request'
  };

 networkplay.Matchmaker.prototype.connect = function() {
    try {
      this.connection_ = new networkplay.NetworkplayConnection();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

 networkplay.Matchmaker.prototype.participate = function() {
    this.connection_.addOnOpenAction(this.enterArcade_, this);
    this.connection_.addOnMessageAction(this.dispatchMessage_, this);
    window.addEventListener('unload', this.existArcade_.bind(this));
  };

 networkplay.Matchmaker.prototype.leave = function() {
    this.existArcade_();
  };

 networkplay.Matchmaker.prototype.enterArcade_ = function() {
    this.connection_.sendData({
      'actionType': networkplay.Matchmaker.ActionType.ENTER_ARCADE,
      'userName': this.userName_,
      'connectionUuid': this.connection_.getConnectionUuid()
    });
  };

 networkplay.Matchmaker.prototype.existArcade_ = function() {
    this.connection_.sendData({
      'actionType':networkplay.Matchmaker.ActionType.EXIST_ARCADE,
      'userName': this.userName_,
      'connectionUuid': this.connection_.getConnectionUuid()
    });
    this.connection_.closeConnection();
  };

 networkplay.Matchmaker.prototype.dispatchMessage_ = function(arcadeMessage) {
    if (arcadeMessage['connectionUuid'] === this.connection_.getConnectionUuid()) {
      // ignore own message
      return;
    }
    switch (arcadeMessage['actionType']) {
      case networkplay.Matchmaker.ActionType.ENTER_ARCADE:
        this.onOtherUserParticipate_(arcadeMessage);
        break;
      case networkplay.Matchmaker.ActionType.EXIST_ARCADE:
        this.onOtherUserLeave_(arcadeMessage);
        break;
      case networkplay.Matchmaker.ActionType.SEND_GAME_REQUEST:
        this.onReceiveGameRequest_(arcadeMessage);
        break;
      case networkplay.Matchmaker.ActionType.ACCEPT_GAME_REQUEST:
        this.onAcceptedGameRequest_(arcadeMessage);
        break;
      case networkplay.Matchmaker.ActionType.REJECT_GAME_REQUEST:
        this.onRejectedGameRequest_(arcadeMessage);
        break;
    }
  };

 networkplay.Matchmaker.prototype.onOtherUserParticipate_ = function(data) {
    this.getElement().trigger(networkplay.Matchmaker.EventType.OTHER_USER_PARTICIPATE, data);
  };

 networkplay.Matchmaker.prototype.onOtherUserLeave_ = function(data) {
    this.getElement().trigger(networkplay.Matchmaker.EventType.OTHER_USER_LEAVE, data);
  };

 networkplay.Matchmaker.prototype.onReceiveGameRequest_ = function(data) {
    if (data['targetUserConnectionUuid'] === this.connection_.getConnectionUuid()) {
      this.getElement().trigger(networkplay.Matchmaker.EventType.RECEIVE_GAME_REQUEST, data);
    }
  };

 networkplay.Matchmaker.prototype.onAcceptedGameRequest_ = function(data) {
    if (!!this.waitingGameRequest_ && data['gameUuid'] === this.waitingGameRequest_.gameUuid) {
      this.waitingGameRequest_.resolve(data);
      this.waitingGameRequest_ = null;
    }
  };

 networkplay.Matchmaker.prototype.onRejectedGameRequest_ = function(data) {
    if (!!this.waitingGameRequest_ && data['gameUuid'] === this.waitingGameRequest_.gameUuid) {
      this.waitingGameRequest_.reject(data);
      this.waitingGameRequest_ = null;
    }
  };

 networkplay.Matchmaker.prototype.sendGameRequest = function(targetUserName, targetUserConnectionUuid, greeting) {
    if (this.waitingGameRequest_ !== null) {
      // TODO cancel existing request?
      return null;
    }
    var gameUuid = new UUID().toString();
    this.connection_.sendData({
      'actionType':networkplay.Matchmaker.ActionType.SEND_GAME_REQUEST,
      'userName': this.userName_,
      'connectionUuid': this.connection_.getConnectionUuid(),
      'targetUserName': targetUserName,
      'targetUserConnectionUuid': targetUserConnectionUuid,
      'gameUuid': gameUuid,
      'greeting': greeting
    });
    this.waitingGameRequest_ = new $.Deferred();
    this.waitingGameRequest_.targetUserName = targetUserName;
    this.waitingGameRequest_.targetUserConnectionUuid = targetUserConnectionUuid;
    this.waitingGameRequest_.gameUuid = gameUuid;
    return this.waitingGameRequest_;
  };

 networkplay.Matchmaker.prototype.acceptGameRequest = function(data) {
    this.connection_.sendData({
      'actionType':networkplay.Matchmaker.ActionType.ACCEPT_GAME_REQUEST,
      'userName': this.userName_,
      'connectionUuid': this.connection_.getConnectionUuid(),
      'gameUuid': data['gameUuid']
    });
   this.startNewGame(data);
  };

 networkplay.Matchmaker.prototype.declineGameRequest = function(gameUuid) {
    this.connection_.sendData({
      'actionType':networkplay.Matchmaker.ActionType.REJECT_GAME_REQUEST,
      'userName': this.userName_,
      'connectionUuid': this.connection_.getConnectionUuid(),
      'gameUuid': gameUuid
    });
  };

  networkplay.Matchmaker.prototype.startNewGame = function(data) {
    window.location.href = './pokemon-card.html' +
      '?networkplay=true' +
      '&gameUuid=' + data['gameUuid'] +
      '&oppositeUserConnectionUuid=' + data['connectionUuid'] +
      '&oppositeUserName=' + data['userName'];
  }
})(jQuery);
