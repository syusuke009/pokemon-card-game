(function($){

  CardListDialog = function() {
    this.$defer_ = null;

  };


  CardListDialog.prototype.show = function(list, title) {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(480).width(400);
    $('.dialog-header').text(title);
    var $content = $('.dialog-content').html(this.createContentDom_(list));
    var $buttons = $('.dialog-buttons').html(this.createButtonsDom_());

    this.bindEvents_($content, $buttons);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  CardListDialog.prototype.close = function() {
    this.unbindEvents_($('.dialog-content'), $('.dialog-buttons'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');

    var result = [];
    $('.dialog-content').find('.checked').parent().each(function(idx, row) {
      result.push(this.cardMap_[$(row).attr('data-trn-id')]);
    }.bind(this));
    this.$defer_.resolve(result);
  };

  CardListDialog.prototype.createContentDom_ = function(list) {
    var html = '';
    list.forEach(function(c) {
      html += '<div class="row" data-trn-id="'+ c.trnId +'">' +
          '<span class="caption">' + c.name + '</span>' +
          '</div>';
    });
    return '<div class="card-list-dialog-container"><div class="list-area">' + html + '</div></div>';
  };

  CardListDialog.prototype.createButtonsDom_ = function() {
    return '<button class="btn close-btn">閉じる</button></div>';
  };

  CardListDialog.prototype.bindEvents_ = function($content, $buttons) {
    $buttons.on('click', '.close-btn', this.onClickClose_.bind(this));
  };

  CardListDialog.prototype.unbindEvents_ = function($content, $buttons) {
    $buttons.off();
  };

  CardListDialog.prototype.onClickClose_ = function(e) {
    this.close();
  };

})(jQuery);
