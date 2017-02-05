(function($){

  EnergySelectionDialog = function() {
    this.$defer_ = null;

    this.energyMap_;
    this.require_;
  };


  EnergySelectionDialog.prototype.show = function(energies, require) {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(480).width(400);
    $('.dialog-header').text('エネルギー選択');
    var $content = $('.dialog-content').html(this.createContentDom_(require, energies));
    var $buttons = $('.dialog-buttons').html(this.createButtonsDom_(require));

    this.energyMap_ = {};
    energies.forEach(function(e) {
      this.energyMap_[e.trnId] = e;
    }.bind(this));
    this.require_ = require;

    this.bindEvents_($content, $buttons);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  EnergySelectionDialog.prototype.close = function() {
    this.unbindEvents_($('.dialog-content'), $('.dialog-buttons'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');

    var result = [];
    $('.dialog-content').find('.checked').parent().each(function(idx, row) {
      result.push(this.energyMap_[$(row).attr('data-trn-id')]);
    }.bind(this));
    this.$defer_.resolve(result);
  };

  EnergySelectionDialog.prototype.createContentDom_ = function(require, energies) {
    var requiretypes = '';
    if (Array.isArray(require)) {
      require.forEach(function(t) {
        requiretypes += '<div class="cost ' + t + '"></div>';
      });
    } else {
      requiretypes += '<div class="cost ' + require + '"></div><span>:無制限</span>';
    }
    var html = '';
    var filter = Array.isArray(require) ? require : [require];
    energies.filter(function(e) {
      return filter.indexOf(e.type) >= 0 || filter.indexOf('normal') >= 0;
    }).forEach(function(e) {
      var costtypes = '';
      for (var i = 0; i < e.value; i++) {
        costtypes += '<div class="cost ' + e.type + '" data-type="' + e.type + '"></div>';
      }
      html += '<div class="row" data-trn-id="'+ e.trnId +'">' +
          '<div class="checkbox"></div><span class="caption">' + e.name + '</span>' +
          '<div class="types">' + costtypes + '</div>' +
          '</div>';
    });
    return '<div class="energy-selection-container">' +
        '<div class="required-area"><span class="label">必要なエネルギー</span>' + requiretypes + '</div><div class="list-area">' +
        html + '</div></div>';
  };

  EnergySelectionDialog.prototype.createButtonsDom_ = function(require) {
    var btnClass = Array.isArray(require) ? 'disabled' : ''
    return '<button class="btn clear-btn">クリア</button><button class="btn btn-primary ok-btn ' + btnClass + '">決定</button></div>';
  };

  EnergySelectionDialog.prototype.bindEvents_ = function($content, $buttons) {
    $content.on(FormComponents.EventType.CHANGE_CHECKED, this.onChangeChecked_.bind(this));
    $content.on('click', '.row', this.onClickRow_.bind(this));
    $buttons.on('click', '.clear-btn', this.onClickClear_.bind(this));
    $buttons.on('click', '.ok-btn', this.onClickOk_.bind(this));
  };

  EnergySelectionDialog.prototype.unbindEvents_ = function($content, $buttons) {
    $content.off();
    $buttons.off();
  };

  EnergySelectionDialog.prototype.refreshCheckboxControl_ = function() {

    var provide = [];
    $('.dialog-content').find('.checked').parent().each(function(idx, row) {
      $(row).find('.cost').each(function(idx, elm) {
        provide.push($(elm).attr('data-type'));
      });
    });

    var $okBtn = $('.dialog-buttons').find('.ok-btn');
    if (Array.isArray(this.require_)) {
      if (UtilFunc.checkEnoughEnergy(this.require_, provide)) {
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
    }
  };

  EnergySelectionDialog.prototype.onChangeChecked_ = function(e) {
    this.refreshCheckboxControl_();
  };

  EnergySelectionDialog.prototype.onClickRow_ = function(e) {
    if ($(e.target).hasClass('checkbox')) {
      return;
    }
    $(e.currentTarget).find('.checkbox').click();
  };

  EnergySelectionDialog.prototype.onClickClear_ = function(e) {
    $('.dialog-content').find('.checkbox').removeClass('checked');
    this.refreshCheckboxControl_();
  };

  EnergySelectionDialog.prototype.onClickOk_ = function(e) {
    if ($(e.target).hasClass('disabled')) return;
    this.close();
  };

})(jQuery);
