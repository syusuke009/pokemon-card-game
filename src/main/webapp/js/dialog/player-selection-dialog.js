(function($){

  PlayerSelectionDialog = function() {
    this.$defer_ = null;

    this.viewpoint_;
  };


  PlayerSelectionDialog.prototype.show = function(turn) {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(116).width(400);
    $('.dialog-header').text('対象プレーヤー選択');

    var $content = $('.dialog-content').html(this.createContentDom_());
    $('.dialog-buttons').addClass('hidden');

    this.viewpoint_ = turn.whoseTurn();

    this.bindEvents_($content);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  PlayerSelectionDialog.prototype.close = function() {
    this.unbindEvents_($('.dialog-content'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');

    $('.dialog-buttons').removeClass('hidden');

    this.$defer_.resolve(this.viewpoint_);
  };

  PlayerSelectionDialog.prototype.createContentDom_ = function() {
    return '<div class="player-selection-container">' +
      '<button class="btn me-btn">じぶん</button>' +
      '<button class="btn rival-btn">あいて</button>' +
      '</div>';
  };

  PlayerSelectionDialog.prototype.bindEvents_ = function($content) {
    $content.on('click', '.me-btn', this.onClickMe_.bind(this));
    $content.on('click', '.rival-btn', this.onClickRival_.bind(this));
  };

  PlayerSelectionDialog.prototype.unbindEvents_ = function($content) {
    $content.off();
  };

  PlayerSelectionDialog.prototype.onClickMe_ = function(e) {
    this.close();
  };

  PlayerSelectionDialog.prototype.onClickRival_ = function(e) {
    this.viewpoint_ = UtilFunc.reverseViewpoint(this.viewpoint_);
    this.close();
  };


})(jQuery);
