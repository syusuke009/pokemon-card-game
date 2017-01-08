// require arcade-websocket-connection.js

var networkplay = networkplay || {};

(function($) {

  networkplay.GameCoordinator = function() {
    this.$element_ = $('.networkplay-game-coordinator');
    var parseUrlParameter_ = networkplay.GameCoordinator.parseUrlParameter_;
    this.gameUuid_ = parseUrlParameter_('gameUuid');
    this.oppositeUserName_ = parseUrlParameter_('oppositeUserName');
    this.oppositeUserConnectionUuid_ = parseUrlParameter_('oppositeUserConnectionUuid');
    this.waitingResponse_ = null;
  };

  var ACTION_TYPE_PREFIX_ = 'networkplay-game-coordinator-action-type-';

  networkplay.GameCoordinator.ActionType = {
    ENTER_GAME: ACTION_TYPE_PREFIX_ + 'enter-game',
    EXIT_GAME: ACTION_TYPE_PREFIX_ + 'exit-game',
    BROADCAST_OPERATION: ACTION_TYPE_PREFIX_ + 'broadcast-operation',
    BROADCAST_OPERATION_AND_WAIT_RESPONSE: ACTION_TYPE_PREFIX_ + 'broadcast-operation-and-wait-response'
  };
  var ActionType = networkplay.GameCoordinator.ActionType;


  var EVENT_TYPE_PREFIX_ = 'networkplay-game-coordinator-event-type-';
  networkplay.GameCoordinator.EventType = {
    OPPOSITE_ENTER_GAME: EVENT_TYPE_PREFIX_ + 'opposite-enter-game',
    OPPOSITE_EXIT_GAME: EVENT_TYPE_PREFIX_ + 'opposite-exit-game',
    OPPOSITE_BROADCAST_OPERATION: EVENT_TYPE_PREFIX_ + 'opposite-broadcast-operation',
    OPPOSITE_BROADCAST_OPERATION_AND_WAIT_RESPONSE: EVENT_TYPE_PREFIX_ + 'broadcast-operation-and-wait-response'
  };
  var EventType = networkplay.GameCoordinator.EventType;

  networkplay.GameCoordinator.isNetworkplaying = function() {
    return networkplay.GameCoordinator.parseUrlParameter_('networkplay') === 'true'
      && !!networkplay.GameCoordinator.parseUrlParameter_('gameUuid');
  };

  networkplay.GameCoordinator.parseUrlParameter_ = function(parameterName) {
    var matched = window.location.search.match(parameterName + '=(.*?)(&|$)');
    return !!matched ? matched[1] : null;
  };

  networkplay.GameCoordinator.prototype.startGame = function() {
    try {
      // TODO use not websocket but WebRTC
      this.connection_ = new networkplay.NetworkplayConnection();
    } catch (error) {
      console.error(error);
      return false;
    }
    this.connection_.addOnOpenAction(this.enterGame_, this);
    this.connection_.addOnMessageAction(this.dispatchMessage_, this);
    window.addEventListener('unload', this.exitGame_.bind(this));
    return true;
  };

  networkplay.GameCoordinator.prototype.enterGame_ = function() {
    this.connection_.sendData({
      'actionType': ActionType.ENTER_GAME,
      'gameUuid': this.gameUuid_,
      'connectionUuid': this.connection_.getConnectionUuid()
    });
  };

  networkplay.GameCoordinator.prototype.exitGame_ = function() {
    this.connection_.sendData({
      'actionType': ActionType.EXIT_GAME,
      'gameUuid': this.gameUuid_,
      'connectionUuid': this.connection_.getConnectionUuid()
    });
    this.connection_.closeConnection();
  };

  networkplay.GameCoordinator.prototype.dispatchMessage_ = function(message) {
    if (message['gameUuid'] !== this.getGameUuid()) {
      // ignore other game
      return;
    }
    if (message['connectionUuid'] === this.connection_.getConnectionUuid()) {
      // ignore own message
      return;
    }
    switch (message['actionType']) {
      case ActionType.ENTER_GAME:
        this.onOppositeEnterGame_(message);
        break;
      case ActionType.EXIT_GAME:
        this.onOppositeExitGame_(message);
        break;
      case ActionType.BROADCAST_OPERATION:
        this.onOppositeBroadcastOperation_(message);
        break;
      case ActionType.BROADCAST_OPERATION_AND_WAIT_RESPONSE:
        this.onOppositeWaitResponse_(message);
        break;
    }
  };

  networkplay.GameCoordinator.prototype.onOppositeEnterGame_ = function(message) {
    console.log('Opposite user enter game');
    this.getElement().trigger(EventType.OPPOSITE_ENTER_GAME, message);
  };

  networkplay.GameCoordinator.prototype.onOppositeExitGame_ = function(message) {
    console.log('Opposite user exit game');
    this.getElement().trigger(EventType.OPPOSITE_EXIT_GAME, message);
  };

  networkplay.GameCoordinator.prototype.onOppositeBroadcastOperation_ = function(message) {
    if (this.waitingGameRequest_ !== null
      && this.waitingGameRequest_.operationUuid === message['operationUuid']) {
      this.waitingGameRequest_.resolve(message);
      this.waitingGameRequest_ = null;
    } else {
      this.getElement().trigger(EventType.OPPOSITE_BROADCAST_OPERATION, message);
    }
  };

  networkplay.GameCoordinator.prototype.onOppositeWaitResponse_ = function(message) {
    this.getElement().trigger(EventType.OPPOSITE_BROADCAST_OPERATION_AND_WAIT_RESPONSE, message);
  };

  networkplay.GameCoordinator.prototype.broadcastOperation = function(operationData) {
    this.connection_.sendData({
      'actionType': networkplay.GameCoordinator.ActionType.EXIT_GAME,
      'gameUuid': this.gameUuid_,
      'connectionUuid': this.connection_.getConnectionUuid(),
      'operationData': operationData,
      'operationUuid': new UUID().toString()
    });
  };

  networkplay.GameCoordinator.prototype.broadcastOperationAndWaitResponse = function(operationData) {
    if (this.waitingResponse_ !== null) {
      throw 'Already existing other waiting';
    }
    var operationUuid = new UUID().toString();
    this.connection_.sendData({
      'actionType': networkplay.GameCoordinator.ActionType.EXIT_GAME,
      'gameUuid': this.gameUuid_,
      'connectionUuid': this.connection_.getConnectionUuid(),
      'operationData': operationData,
      'operationUuid': operationUuid
    });
    this.waitingResponse_ = new $.Deferred();
    this.waitingResponse_.operationUuid = operationUuid;
    return this.waitingResponse_;
  };

  networkplay.GameCoordinator.prototype.getGameUuid = function() {
    return this.gameUuid_;
  };

  networkplay.GameCoordinator.prototype.getOppositeUserName = function() {
    return this.oppositeUserName_;
  };

  networkplay.GameCoordinator.prototype.getOppositeUserConnectionUuid = function() {
    return this.oppositeUserConnectionUuid_;
  };

  networkplay.GameCoordinator.prototype.getElement = function() {
    return this.$element_;
  };
})(jQuery);