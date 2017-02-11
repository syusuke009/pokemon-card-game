(function($){

  ReorderDialog = function() {
    this.$defer_ = null;

    this.list_ = null;
  };


  ReorderDialog.prototype.show = function(list) {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(380).width(400);
    $('.dialog-header').text('カードの並び替え');

    this.list_ = list;

    var $content = $('.dialog-content').html(this.createContentDom_());
    var $buttons = $('.dialog-buttons').html(this.createButtonsDom_());

    this.bindEvents_($content, $buttons);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  ReorderDialog.prototype.close = function() {
    this.unbindEvents_($('.dialog-content'), $('.dialog-buttons'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');

    this.$defer_.resolve(this.list_);
  };

  ReorderDialog.prototype.createContentDom_ = function() {
    var html = '';
    $.each(this.list_, function(idx, c) {
      html += '<div class="row" data-idx="'+ idx +'">' +
          '<span class="caption">' + (idx + 1) + '. ' + c.name + '</span>' +
          '<button class="btn up-btn '+ (idx === 0 ? 'invisible' : '') +'">▲</button>' +
          '<button class="btn down-btn '+ (idx === this.list_.length - 1 ? 'invisible' : '') +'">▼</button>' +
          '</div>';
    }.bind(this));
    return '<div class="reorder-container">' +
        '<div class="list-area">' + html + '</div></div>';
  };

  ReorderDialog.prototype.createButtonsDom_ = function() {
    return '<button class="btn btn-primary ok-btn">決定</button></div>';
  };

  ReorderDialog.prototype.bindEvents_ = function($content, $buttons) {
    $content.on('click', '.up-btn', this.onClickUp_.bind(this));
    $content.on('click', '.down-btn', this.onClickDown_.bind(this));
    $buttons.on('click', '.ok-btn', this.onClickOk_.bind(this));
  };

  ReorderDialog.prototype.unbindEvents_ = function($content, $buttons) {
    $content.off();
    $buttons.off();
  };

  ReorderDialog.prototype.onClickUp_ = function(e) {
    var idx = Number($(e.currentTarget).closest('.row').attr('data-idx'));
    var temp = this.list_[idx];
    this.list_[idx] = this.list_[idx - 1];
    this.list_[idx - 1] = temp;
    $('.dialog-content').html(this.createContentDom_());
  };

  ReorderDialog.prototype.onClickDown_ = function(e) {
    var idx = Number($(e.currentTarget).closest('.row').attr('data-idx'));
    var temp = this.list_[idx];
    this.list_[idx] = this.list_[idx + 1];
    this.list_[idx + 1] = temp;
    $('.dialog-content').html(this.createContentDom_());

  };

  ReorderDialog.prototype.onClickOk_ = function(e) {
    this.close();
  };

})(jQuery);
