(function($){

  EnergyTransDialog = function(type) {
    this.$defer_ = null;
    this.type_ = type;
    this.field_ = null;
    this.typeCode_ = '1000' + Const.Types.indexOf(type);
  };

  var CARD_TEMPLATE = '{{#list}}' +
      '<div class="trans-card-unit" data-id="{{trnId}}">' +
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

  EnergyTransDialog.prototype.show = function(field) {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(580).width(1000);
    $('.dialog-header').text('エネルギー移動');
    var $content = $('.dialog-content').html(this.createContentDom_(field));
    var $buttons = $('.dialog-buttons').html(this.createButtonsDom_());

    this.field_ = field;
    this.initialRender_($content);

    this.bindEvents_($content, $buttons);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  EnergyTransDialog.prototype.close = function() {
    var $content = $('.dialog-content');
    this.unbindEvents_($content, $('.dialog-buttons'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');

    var energyStack = [];
    var $units = $content.find('.trans-card-unit');
    $.each($units, function(idx, unit) {
      var $unit = $(unit);
      var card = this.searchCard_($unit.attr('data-id'));
      var reduction = $unit.find('.empty-trans-target').length;
      var tmpStack = [];
      var energies = card.getEnergy();
      for (var i = 0; i < energies.length; i++) {
        if (tmpStack.length >= reduction) {
          break;
        }
        var e = energies[i];
        if (e.code == this.typeCode_) {
          tmpStack.push(e);
        }
      }
      $.each(tmpStack, function(idx, e) {
        card.removeEnergy(e);
        energyStack.push(e);
      });
    }.bind(this));
    $.each($units, function(idx, unit) {
      var $unit = $(unit);
      var card = this.searchCard_($unit.attr('data-id'));
      var addition = $unit.find('.transfer-field .trans-target').length;
      var gifts = energyStack.splice(0, addition);
      $.each(gifts, function(idx, e) {
        card.addEnergy(e);
      });
    }.bind(this));

    this.$defer_.resolve(this.field_);
  };

  EnergyTransDialog.prototype.createContentDom_ = function(field) {
    var html = '';
    html += Hogan.compile(CARD_TEMPLATE).render({'list':[field.getBattleMonster()]});
    html += Hogan.compile(CARD_TEMPLATE).render({'list':field.getBench()});
    html += '<div class="dragging cost ' + this.type_ + '">';
    return '<div class="trans-container">' + html + '</div>';
  };

  EnergyTransDialog.prototype.createButtonsDom_ = function(require) {
    var btnClass = Array.isArray(require) ? '' : ''
    return '<button class="btn btn-primary ok-btn">決定</button></div>';
  };

  EnergyTransDialog.prototype.initialRender_ = function($content) {
    this.renderInner_(this.field_.getBattleMonster(), $content);
    $.each(this.field_.getBench(), function(idx, c) {
      this.renderInner_(c, $content);
    }.bind(this));
  };

  EnergyTransDialog.prototype.renderInner_ = function(card, $content) {
    var $cards = $content.find('.trans-card-unit');
    $.each($cards, function(idx, dom) {
      var $card = $(dom);
      if ($card.attr('data-id') !== card.trnId) {
        return;
      }
      var originalHtml = '';
      var energies = card.getEnergy();
      for (var i = 0; i < energies.length; i++) {
        var energy = energies[i];
        if (energy.code != this.typeCode_) {
          continue;
        }
        originalHtml += this.getTransTargetHtml_();
      }
      $card.find('.original-field').html(originalHtml);
    }.bind(this));
  };

  EnergyTransDialog.prototype.getTransTargetHtml_ = function() {
    return '<div class="trans-target cost ' + this.type_ + ' draggable"></div>';
  };

  EnergyTransDialog.prototype.getEmptyTransTargetHtml_ = function(cls) {
    return '<div class="trans-target empty-trans-target"></div>';
  };

  EnergyTransDialog.prototype.bindEvents_ = function($content, $buttons) {
    $content.on('mousedown', '.draggable', this.onDragstart_.bind(this));
    $content.on('mousemove', this.onDragging_.bind(this));
    $content.on('mouseup', this.onDragend_.bind(this));
    $content.on('selectstart', function(e) {
      return false;
    });
    $buttons.on('click', '.ok-btn', this.onClickOk_.bind(this));
  };

  EnergyTransDialog.prototype.unbindEvents_ = function($content, $buttons) {
    $content.off();
    $buttons.off();
  };

  EnergyTransDialog.prototype.onDragstart_ = function(e) {
    var $target = $(e.currentTarget);
    if (!this.canTrans_($target)) {
      return;
    }
    $target.addClass('deactive');
    var $dragging = $target.closest('.trans-container').find('.dragging');
    $dragging.addClass('active');
    this.showDroppable_($target);
    $dragging.offset({top:e.pageY-11,left:e.pageX-11});
  };

  EnergyTransDialog.prototype.onDragging_ = function(e) {
    var $target = $(e.currentTarget);
    var $dragging = $target.find('.dragging.active');
    $dragging.offset({top:e.pageY-11,left:e.pageX-11});
  };

  EnergyTransDialog.prototype.onDragend_ = function(e) {
    var $container = $(e.currentTarget);
    var $dragging = $container.find('.dragging');
    $dragging.removeClass('active');

    var target = $(document.elementFromPoint(e.clientX, e.clientY));
    var $dropped = target.hasClass('trans-card-unit') ? target : target.closest('.trans-card-unit');
    if ($dropped.hasClass('droppable')) {
      var $transfer = $container.find('.deactive');
      $transfer.removeClass('deactive');

      var $original = $transfer.closest('.original-field');
      var $emptyTargets = $dropped.find('.empty-trans-target');
      if ($original.length > 0) {
        var $altTransfer = $original.parent().find('.transfer-field .trans-target');
        if ($altTransfer.length > 0) {
          $original.append($altTransfer.eq(0));
        } else {
          $original.append(this.getEmptyTransTargetHtml_());
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

  EnergyTransDialog.prototype.onClickOk_ = function(e) {
    if ($(e.target).hasClass('disabled')) return;
    this.close();
  };

  EnergyTransDialog.prototype.canTrans_ = function($target) {
    if (!!this.targetTrnId_) {
      var $unit = $target.closest('.trans-card-unit');
      if ($unit.attr('data-id') !== this.targetTrnId_) {
        return true;
      }
      return $unit.find('.transfer-field .trans-target').length > 0;
    }
    return true;
  };

  EnergyTransDialog.prototype.showDroppable_ = function($dragtarget) {
    var $target = $dragtarget.closest('.trans-card-unit');
    var $units = $target.closest('.trans-container').find('.trans-card-unit');
    $.each($units, function(idx, unit) {
      if (unit === $target[0]) {
        return;
      }
      var $unit = $(unit);
      $unit.addClass('droppable');
    }.bind(this));
  };

  EnergyTransDialog.prototype.hideDroppable_ = function() {
    var $units = $('.trans-container').find('.trans-card-unit');
    $units.removeClass('droppable');
    $units.removeClass('undroppable');
  };

  EnergyTransDialog.prototype.searchCard_ = function(trnId) {
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
