(function($){

  CardBundle = function(arr) {
    this.bundle_ = arr || [];
  };

  CardBundle.prototype.add = function(card) {
    this.bundle_.push(card);
  };

  CardBundle.prototype.getAll = function() {
    return this.bundle_;
  };

  CardBundle.prototype.isEmpty = function() {
    return this.bundle_.length === 0;
  };

  CardBundle.prototype.size = function() {
    return this.bundle_.length;
  };

  CardBundle.prototype.select = function(trnId) {
    return this.bundle_.find(function(e){
      return (e.trnId === trnId);
    });
  };

  CardBundle.prototype.pick = function(trnId) {
    var idx = this.bundle_.findIndex(function(e){
      return (e.trnId === trnId);
    });
    if (idx < 0) return null;
    return this.bundle_.splice(idx, 1)[0];
  };

  CardBundle.prototype.replace = function(from, to) {
    var idx = this.bundle_.findIndex(function(e){
      return (e.trnId === from.trnId);
    });
    if (idx < 0) return null;
    return this.bundle_[idx] = to;
  };

})(jQuery);