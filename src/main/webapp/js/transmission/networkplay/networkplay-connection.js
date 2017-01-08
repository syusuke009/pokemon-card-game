var networkplay = networkplay || {};

(function($){

  networkplay.NetworkplayConnection = function() {
    this.connectionUuid_ = this.assignConnectionUuid_();
    this.initConnection_();
  };

  networkplay.NetworkplayConnection.CONFIG_ = {
    webSocketURL: 'ws://pokemon-card-networkplay.herokuapp.com'
  };

  networkplay.NetworkplayConnection.prototype.initConnection_ = function() {
    this.websocket_ = new WebSocket(networkplay.NetworkplayConnection.CONFIG_.webSocketURL);
  };

  networkplay.NetworkplayConnection.prototype.addOnOpenAction = function(actionFunc, opt_context) {
    this.websocket_.onopen =  function(event) {
      actionFunc.call(opt_context || this, event);
    };
  };

  networkplay.NetworkplayConnection.prototype.addOnMessageAction = function(actionFunc, opt_context) {
    this.websocket_.onmessage = function(message) {
      actionFunc.call(opt_context || this, JSON.parse(message.data));
    };
  };

  networkplay.NetworkplayConnection.prototype.sendData = function(data) {
    this.websocket_.send(JSON.stringify(data));
  };

  networkplay.NetworkplayConnection.prototype.closeConnection = function() {
    this.websocket_.close();
  };

  networkplay.NetworkplayConnection.prototype.assignConnectionUuid_ = function() {
    var json = localStorage.getItem('pokemon-card');
    var data;
    if (!!json) {
      data = JSON.parse(json);
    } else {
      data = {};
    }

    if (!!data['networkplayConnectionUuid'] && data['networkplayConnectionUuid'] !== '') {
      return data['networkplayConnectionUuid'];
    } else {
      var networkplayConnectionUuid = new UUID().toString();
      console.log('New networkplayConnectionUuid is assigned: ' + networkplayConnectionUuid);
      this.storeConnectionUuid_(networkplayConnectionUuid, data);
      return networkplayConnectionUuid;
    }
  };

  networkplay.NetworkplayConnection.prototype.storeConnectionUuid_ = function(uuid, data) {
    data['networkplayConnectionUuid'] = uuid;
    localStorage.setItem('pokemon-card', JSON.stringify(data));
  };

  networkplay.NetworkplayConnection.prototype.getConnectionUuid = function() {
    return this.connectionUuid_;
  };
})(jQuery);


// TODO move to other file
// ====================================================
// UUID class
// ====================================================
(function(){
  UUID = function() {
    // @see http://codedehitokoto.blogspot.jp/2012/01/javascriptuuid.html
    this.uuid = [
      (((1+Math.random())*0x10000)|0).toString(16).substring(1),
      (((1+Math.random())*0x10000)|0).toString(16).substring(1),
      (((1+Math.random())*0x10000)|0).toString(16).substring(1),
      (((1+Math.random())*0x10000)|0).toString(16).substring(1),
      (((1+Math.random())*0x10000)|0).toString(16).substring(1),
      (((1+Math.random())*0x10000)|0).toString(16).substring(1),
      (((1+Math.random())*0x10000)|0).toString(16).substring(1),
      (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    ].join('');
  };

  UUID.prototype.toString = function() {
    return this.uuid;
  };
})();