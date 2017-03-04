(function($){

  CardDisclosureDialog = function() {
    this.$defer_ = null;

  };


  CardDisclosureDialog.prototype.show = function(cards, title) {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(280).width(Math.max(400, (108 * cards.length)));
    $('.dialog-header').text(title);
    var $content = $('.dialog-content').html(this.createContentDom_(cards));
    var $buttons = $('.dialog-buttons').html(this.createButtonsDom_());

    this.bindEvents_($content, $buttons);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  CardDisclosureDialog.prototype.close = function() {
    this.unbindEvents_($('.dialog-content'), $('.dialog-buttons'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');

    this.$defer_.resolve();
  };

  CardDisclosureDialog.prototype.createContentDom_ = function(cards) {
    var openedTmpl = Hogan.compile($('#opened-card-template').text());
    return '<div class="card-disclosure-dialog-container">' + openedTmpl.render({'list':cards}) + '</div>';
  };

  CardDisclosureDialog.prototype.createButtonsDom_ = function() {
    return '<button class="btn close-btn">閉じる</button></div>';
  };

  CardDisclosureDialog.prototype.bindEvents_ = function($content, $buttons) {
    $buttons.on('click', '.close-btn', this.onClickClose_.bind(this));
  };

  CardDisclosureDialog.prototype.unbindEvents_ = function($content, $buttons) {
    $buttons.off();
  };

  CardDisclosureDialog.prototype.onClickClose_ = function(e) {
    this.close();
  };

})(jQuery);
