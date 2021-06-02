(function($){

  DamageSwapDialog = function(opt_arg) {
    this.$defer_ = null;

    if (Const.Types.indexOf(opt_arg) >= 0) {
      this.type_ = opt_arg;
    } else if (!isNaN(Number(opt_arg))) {
      this.limit_ = Number(opt_arg);
    } else if (typeof opt_arg === 'string') {
      this.targetTrnId_ = opt_arg;
    }

    this.field_ = null;
  };

  var CARD_TEMPLATE = '{{#list}}' +
      '<div class="swap-card-unit" data-id="{{trnId}}">' +
      '  <div class="card {{type_}}">' +
      '    <div class="type-area">' +
      '      <span class="type-mark"></span>' +
      '      <span class="kind-caption">{{kindCaption}}</span>' +
      '    </div>' +
      '    <img class="card-img img-{{kind}}" src="img/{{dir}}/{{code}}.jpg" />' +
      '    <div class="name-area">{{name}}</div>' +
      '  </div>' +
      '  <div class="fixed-field">' +
      '  </div>' +
      '  <div class="original-field">' +
      '  </div>' +
      '  <div class="transfer-field">' +
      '  </div>' +
      '</div>' +
      '{{/list}}';

  DamageSwapDialog.prototype.show = function(field) {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(580).width(1000);
    $('.dialog-header').text('ダメージ移動');
    var $content = $('.dialog-content').html(this.createContentDom_(field));
    var $buttons = $('.dialog-buttons').html(this.createButtonsDom_());

    this.field_ = field;
    this.initialRender_($content);

    this.bindEvents_($content, $buttons);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  DamageSwapDialog.prototype.close = function() {
    var $content = $('.dialog-content');
    this.unbindEvents_($content, $('.dialog-buttons'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');

    var $units = $content.find('.swap-card-unit');
    $.each($units, function(idx, unit) {
      var $unit = $(unit);
      var card = this.searchCard_($unit.attr('data-id'));
      var restore = $unit.find('.empty-swap-target').length * 10;
      var damage = $unit.find('.transfer-field .swap-target').length * 10;
      card.hurt(damage - restore);
    }.bind(this));

    this.$defer_.resolve(this.field_);
  };

  DamageSwapDialog.prototype.createContentDom_ = function(field) {
    var html = '';
    html += Hogan.compile(CARD_TEMPLATE).render({'list':[field.getBattleMonster()]});
    html += Hogan.compile(CARD_TEMPLATE).render({'list':field.getBench()});
    html += '<div class="dragging damage-counter">';
    return '<div class="swap-container">' + html + '</div>';
  };

  DamageSwapDialog.prototype.createButtonsDom_ = function(require) {
    var btnClass = Array.isArray(require) ? '' : ''
    return '<button class="btn btn-primary ok-btn">決定</button></div>';
  };

  DamageSwapDialog.prototype.initialRender_ = function($content) {
    this.renderInner_(this.field_.getBattleMonster(), $content);
    $.each(this.field_.getBench(), function(idx, c) {
      this.renderInner_(c, $content);
    }.bind(this));
  };

  DamageSwapDialog.prototype.renderInner_ = function(card, $content) {
    var $cards = $content.find('.swap-card-unit');
    $.each($cards, function(idx, dom) {
      var $card = $(dom);
      if ($card.attr('data-id') !== card.trnId) {
        return;
      }
      $card.find('.fixed-field').html('<span>HP: ' + card.hp + '</span>');
      var originalHtml = '';
      for (var i = 0; i < card.getDamageCount(); i++) {
        originalHtml += this.getSwapTargetHtml_('damage-counter');
      }
      $card.find('.original-field').html(originalHtml);
    }.bind(this));
  };

  DamageSwapDialog.prototype.getSwapTargetHtml_ = function(cls) {
    return '<div class="swap-target ' + cls + ' draggable"></div>';
  };

  DamageSwapDialog.prototype.getEmptySwapTargetHtml_ = function(cls) {
    return '<div class="swap-target empty-swap-target"></div>';
  };

  DamageSwapDialog.prototype.bindEvents_ = function($content, $buttons) {
    $content.on('mousedown', '.draggable', this.onDragstart_.bind(this));
    $content.on('mousemove', this.onDragging_.bind(this));
    $content.on('mouseup', this.onDragend_.bind(this));
    $content.on('selectstart', function(e) {
      return false;
    });
    $buttons.on('click', '.ok-btn', this.onClickOk_.bind(this));
  };

  DamageSwapDialog.prototype.unbindEvents_ = function($content, $buttons) {
    $content.off();
    $buttons.off();
  };

  DamageSwapDialog.prototype.onDragstart_ = function(e) {
    var $target = $(e.currentTarget);
    if (!this.canSwap_($target)) {
      return;
    }
    $target.addClass('deactive');
    var $dragging = $target.closest('.swap-container').find('.dragging');
    $dragging.addClass('active');
    this.showDroppable_($target);
    $dragging.offset({top:e.pageY-11,left:e.pageX-11});
  };

  DamageSwapDialog.prototype.onDragging_ = function(e) {
    var $target = $(e.currentTarget);
    var $dragging = $target.find('.dragging.active');
    $dragging.offset({top:e.pageY-11,left:e.pageX-11});
  };

  DamageSwapDialog.prototype.onDragend_ = function(e) {
    var $container = $(e.currentTarget);
    var $dragging = $container.find('.dragging');
    $dragging.removeClass('active');

    var target = $(document.elementFromPoint(e.clientX, e.clientY));
    var $dropped = target.hasClass('swap-card-unit') ? target : target.closest('.swap-card-unit');
    if ($dropped.hasClass('droppable')) {
      var $transfer = $container.find('.deactive');
      $transfer.removeClass('deactive');

      var $original = $transfer.closest('.original-field');
      var $emptyTargets = $dropped.find('.empty-swap-target');
      if ($original.length > 0) {
        var $altTransfer = $original.parent().find('.transfer-field .swap-target');
        if ($altTransfer.length > 0) {
          $original.append($altTransfer.eq(0));
        } else {
          $original.append(this.getEmptySwapTargetHtml_());
        }
      }
      if ($emptyTargets.length > 0) {
        $emptyTargets.eq(0).before($transfer);
        $emptyTargets.eq(0).remove();
      } else {
        $dropped.find('.transfer-field').append($transfer);
      }
      $container.find('.dragging').removeClass('active');
    } else {
      $container.find('.deactive').removeClass('deactive');
      $container.find('.dragging').removeClass('active');
    }
    this.hideDroppable_();
  };

  DamageSwapDialog.prototype.onClickOk_ = function(e) {
    if ($(e.target).hasClass('disabled')) return;
    this.close();
  };

  DamageSwapDialog.prototype.canSwap_ = function($target) {
    if (this.limit_ > 0) {
      if ($target.closest('.transfer-field').length > 0) {
        return true;
      }
      var transfered = 0;
      var $transfers = $target.closest('.swap-container').find('.transfer-field');
      $.each($transfers, function(idx, transfer) {
        transfered += $(transfer).find('.swap-target').length;
      });
      return this.limit_  > transfered;
    }
    if (!!this.targetTrnId_) {
      var $unit = $target.closest('.swap-card-unit');
      if ($unit.attr('data-id') !== this.targetTrnId_) {
        return true;
      }
      return $unit.find('.transfer-field .swap-target').length > 0;
    }
    return true;
  };

  DamageSwapDialog.prototype.showDroppable_ = function($dragtarget) {
    var $target = $dragtarget.closest('.swap-card-unit');
    var $units = $target.closest('.swap-container').find('.swap-card-unit');
    $.each($units, function(idx, unit) {
      if (unit === $target[0]) {
        return;
      }
      var $unit = $(unit);
      var trnId = $unit.attr('data-id');
      var card = this.searchCard_(trnId);
      if (!!this.targetTrnId_) {
        if (trnId === this.targetTrnId_) {
          if ((card.hp / 10) === $unit.find('.damage-counter').length + 1) {
            $unit.addClass('undroppable');
          } else {
            $unit.addClass('droppable');
          }
        } else {
          if ($unit.find('.original-field .empty-swap-target').length > 0) {
            $unit.addClass('droppable');
          } else {
            $unit.addClass('undroppable');
          }
        }
        return;
      }
      if (!this.limit_) {
        if ((card.hp / 10) === $unit.find('.damage-counter').length + 1) {
          $unit.addClass('undroppable');
        } else {
          $unit.addClass('droppable');
        }
        return;
      }
      $unit.addClass('droppable');
    }.bind(this));
  };

  DamageSwapDialog.prototype.hideDroppable_ = function() {
    var $units = $('.swap-container').find('.swap-card-unit');
    $units.removeClass('droppable');
    $units.removeClass('undroppable');
  };

  DamageSwapDialog.prototype.searchCard_ = function(trnId) {
    var monster = this.field_.getBattleMonster();
    if (monster.trnId === trnId) {
      return monster;
    }
    var result = null;
    $.each(this.field_.getBench(), function(idx, card) {
      if (card.trnId === trnId) {
        result = card;
      }
    });
    if (!result) {
      throw 'Not found trnId=' + trnId;
    }
    return result;
  };
})(jQuery);
