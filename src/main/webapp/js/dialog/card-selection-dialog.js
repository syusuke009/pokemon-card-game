(function($){

  CardSelectionDialog = function() {
    this.$defer_ = null;

    this.cardMap_;
    this.requireCount_;
  };


  CardSelectionDialog.prototype.show = function(list, requireCount) {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(480).width(400);
    $('.dialog-header').text('カード選択');
    var $content = $('.dialog-content').html(this.createContentDom_(requireCount, list));
    var $buttons = $('.dialog-buttons').html(this.createButtonsDom_());

    this.cardMap_ = {};
    list.forEach(function(e) {
      this.cardMap_[e.trnId] = e;
    }.bind(this));
    this.requireCount_ = requireCount;

    this.bindEvents_($content, $buttons);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  CardSelectionDialog.prototype.close = function() {
    this.unbindEvents_($('.dialog-content'), $('.dialog-buttons'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');

    var result = [];
    $('.dialog-content').find('.checked').parent().each(function(idx, row) {
      result.push(this.cardMap_[$(row).attr('data-trn-id')]);
    }.bind(this));
    this.$defer_.resolve(result);
  };

  CardSelectionDialog.prototype.createContentDom_ = function(requireCount, list) {
    var html = '';
    list.forEach(function(c) {
      html += '<div class="row" data-trn-id="'+ c.trnId +'">' +
          '<div class="checkbox"></div><span class="caption">' + c.name + '</span>' +
          '</div>';
    });
    return '<div class="card-selection-container">' +
        '<div class="required-area"><span class="label">選ぶ枚数：</span>' + requireCount + '</div><div class="list-area">' +
        html + '</div></div>';
  };

  CardSelectionDialog.prototype.createButtonsDom_ = function() {
    return '<button class="btn clear-btn">クリア</button><button class="btn btn-primary ok-btn disabled">決定</button></div>';
  };

  CardSelectionDialog.prototype.bindEvents_ = function($content, $buttons) {
    $content.on(FormComponents.EventType.CHANGE_CHECKED, this.onChangeChecked_.bind(this));
    $content.on('click', '.row', this.onClickRow_.bind(this));
    $buttons.on('click', '.clear-btn', this.onClickClear_.bind(this));
    $buttons.on('click', '.ok-btn', this.onClickOk_.bind(this));
  };

  CardSelectionDialog.prototype.unbindEvents_ = function($content, $buttons) {
    $content.off();
    $buttons.off();
  };

  CardSelectionDialog.prototype.refreshCheckboxControl_ = function() {

    var count = $('.dialog-content').find('.checked').length;

    var $okBtn = $('.dialog-buttons').find('.ok-btn');
    if (this.requireCount_ === count) {
      $okBtn.removeClass('disabled');
      $('.dialog-content').find('.checkbox').each(function(idx, checkbox) {
        var $checkbox = $(checkbox);
        if (!$checkbox.hasClass('checked')) {
          $checkbox.addClass('disabled');
        }
      });
    } else {
      if (!$okBtn.hasClass('disabled')) {
        $okBtn.addClass('disabled');
      }
      $('.dialog-content').find('.checkbox').removeClass('disabled');
    }
  };

  CardSelectionDialog.prototype.onChangeChecked_ = function(e) {
    this.refreshCheckboxControl_();
  };

  CardSelectionDialog.prototype.onClickRow_ = function(e) {
    if ($(e.target).hasClass('checkbox')) {
      return;
    }
    $(e.currentTarget).find('.checkbox').click();
  };

  CardSelectionDialog.prototype.onClickClear_ = function(e) {
    $('.dialog-content').find('.checkbox').removeClass('checked');
    this.refreshCheckboxControl_();
  };

  CardSelectionDialog.prototype.onClickOk_ = function(e) {
    if ($(e.target).hasClass('disabled')) return;
    this.close();
  };

})(jQuery);
