(function($){

  TypeSelectionDialog = function() {
    this.$defer_ = null;

  };


  TypeSelectionDialog.prototype.show = function(types) {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(380).width(200);
    $('.dialog-header').text('タイプ選択');
    var $content = $('.dialog-content').html(this.createContentDom_(types));
    var $buttons = $('.dialog-buttons').html(this.createButtonsDom_());

    this.bindEvents_($content, $buttons);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  TypeSelectionDialog.prototype.close = function() {
    this.unbindEvents_($('.dialog-content'), $('.dialog-buttons'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');

    this.$defer_.resolve($('.dialog-content').find('.checked').closest('.row').attr('data-type'));
  };

  TypeSelectionDialog.prototype.createContentDom_ = function(types) {
    var html = '';
    $.each(types, function(idx, type) {
      html += '<div class="row"  data-type="' + type + '">' +
          '<div class="checkbox"></div>' +
          '<span><span class="cost ' + type + '"></span>' +
          '<span class="caption">' + UtilFunc.getTypeCaption(type) + 'タイプ</span></span>'+
          '</div>';
    });
    return '<div class="type-selection-container">' + html + '</div>';
  };

  TypeSelectionDialog.prototype.createButtonsDom_ = function(require) {
    var btnClass = Array.isArray(require) ? '' : ''
    return '<button class="btn btn-primary ok-btn disabled">決定</button></div>';
  };

  TypeSelectionDialog.prototype.bindEvents_ = function($content, $buttons) {
    $content.on(FormComponents.EventType.CHANGE_CHECKED, this.onChangeChecked_.bind(this));
    $content.on('click', '.row', this.onClickRow_.bind(this));
    $buttons.on('click', '.ok-btn', this.onClickOk_.bind(this));
  };

  TypeSelectionDialog.prototype.unbindEvents_ = function($content, $buttons) {
    $content.off();
    $buttons.off();
  };

  TypeSelectionDialog.prototype.refreshCheckboxControl_ = function(e) {
    var $okBtn = $('.dialog-buttons').find('.ok-btn');
    if ($('.dialog-content').find('.checked').length > 0) {
      $okBtn.removeClass('disabled');

      $('.dialog-content').find('.checked').each(function(idx, cb) {
        if (cb === e.target) {
          return;
        }
        $(cb).removeClass('checked');
      });
    } else {
      $okBtn.addClass('disabled');
    }
  };

  TypeSelectionDialog.prototype.onChangeChecked_ = function(e) {
    this.refreshCheckboxControl_(e);
  };

  TypeSelectionDialog.prototype.onClickRow_ = function(e) {
    if ($(e.target).hasClass('checkbox')) {
      return;
    }
    $(e.currentTarget).find('.checkbox').click();
  };

  TypeSelectionDialog.prototype.onClickOk_ = function(e) {
    if ($(e.target).hasClass('disabled')) return;
    this.close();
  };

})(jQuery);
