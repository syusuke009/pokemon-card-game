(function($){

  CoinTossDialog = function() {
    this.$defer_ = null;
    this.result_ = [];
  };


  CoinTossDialog.prototype.show = function() {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(480).width(400);
    $('.dialog-header').text('コイントス');
    var $content = $('.dialog-content').html(this.createContentDom_());
    var $buttons = $('.dialog-buttons').html(this.createButtonsDom_());

    this.bindEvents_($buttons);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  CoinTossDialog.prototype.close = function() {
    this.unbindEvents_($('.dialog-buttons'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');
    this.$defer_.resolve(this.result_);
  };

  CoinTossDialog.prototype.createContentDom_ = function() {
    return '<div class="coin-toss-container">' +
        '<div class="target-coin coin front"></div>' +
        '<div class="explanation"><div class="row"><div class="coin front"></div><span>おもて</span></div>' +
        '<div class="row"><div class="coin rear"></div><span>うら</span></div></div>' +
        '</div>';
  };

  CoinTossDialog.prototype.createButtonsDom_ = function() {
    return '<div class="coin-toss-buttons"><button class="btn btn-primary toss-btn">トス</button><button class="btn close-btn hidden">閉じる</button></div></div>';
  };

  CoinTossDialog.prototype.bindEvents_ = function($buttons) {
    $buttons.on('click', '.toss-btn', this.onClickToss_.bind(this));
    $buttons.on('click', '.close-btn', this.onClickClose_.bind(this));
  };

  CoinTossDialog.prototype.unbindEvents_ = function($buttons) {
    $buttons.off();
  };

  CoinTossDialog.prototype.onClickToss_ = function(e) {
    $('.dialog-buttons').find('.toss-btn').addClass('invisible');
    this.toss_($('.dialog-content').find('.target-coin'), this.$defer_);
  };

  CoinTossDialog.prototype.onClickClose_ = function(e) {
    this.close();
  };

  CoinTossDialog.prototype.toss_ = function($coin, $defer) {
    $coin.removeClass('front');
    $coin.addClass('spin');
    $coin.addClass('toss');
    setTimeout(function() {
      $coin.removeClass('spin');
      $coin.removeClass('toss');
      var val = !!Math.floor(Math.random() * 2);
      $coin.addClass(val ? 'front' : 'rear')
      this.result_.push(val);
      $('.dialog-buttons').find('.close-btn').removeClass('hidden');
    }.bind(this), 1000);
  };
})(jQuery);
