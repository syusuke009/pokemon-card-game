(function($){

  PlayFieldView = function(){
    this.$element_ = $('#pray-field');
  };

  PlayFieldView.EventType = {
    SELECT_HAND: 'select-hand',
    SELECT_BENCH: 'select-bench',
    SELECT_BATTLE_MONSTER: 'select-battle-monster',
    HOVER_CARD: 'hover-card',
    LEAVE_CARD: 'leave-card'
  };

  PlayFieldView.prototype.getElement = function(){
    return this.$element_;
  };

  PlayFieldView.prototype.redraw = function(myModel, rivalModel, turn){
    var viewpoint = turn.whoseTurn();
    this.renderInner_(this.$element_.find('#my-area'), myModel, viewpoint === Const.Viewpoint.ME);
    this.renderInner_(this.$element_.find('#rival-area'), rivalModel, viewpoint === Const.Viewpoint.RIVAL);
  };


  PlayFieldView.prototype.renderInner_ = function($view, field, isSelfTurn){
    $view.find('.rest-card-count').text('残 ' + field.getDeck().size());

    var sideTmpl = Hogan.compile($('#card-list-template').text());
    $view.find('.side').html(sideTmpl.render({'list':field.getSide()}));

    var openedTmpl = Hogan.compile($('#opened-card-template').text());
    $view.find('.hands').html(openedTmpl.render({'list':field.getHands().getAll()}));

    var battleMonster = field.getBattleMonster();
    if (battleMonster === null) {
      $view.find('.battle-monster').html('');
      $view.find('.hp-barometer').html('');
      $view.find('.energy-barometer').html('');
    } else {
      $view.find('.battle-monster').html(openedTmpl.render({'list':[battleMonster]}));
      $view.find('.hp-barometer').html(this.hpBarometer_(battleMonster));
      $view.find('.energy-barometer').html(this.energyBarometer_(battleMonster));
    }

    $view.find('.bench').html(openedTmpl.render({'list':field.getBench()}));

    var trush = field.getTrush();
    if (trush.isEmpty()) {
      $view.find('.trush').html('');
    } else {
      $view.find('.trush').html(openedTmpl.render({'list':[trush.getTop()]}));
    }

    if (isSelfTurn) {
      $view.find('.turn-indicator').removeClass('hidden');
    } else {
      $view.find('.turn-indicator').addClass('hidden');
    }
  };

  PlayFieldView.prototype.drawSelectable = function(selectable) {
    var $cards = this.$element_.find('.card');
    $.each($cards, function(idx, c) {
      var $card = $(c);
      if ($card.hasClass('rear')) {
        return;
      }
      var id = $card.attr('data-id');
      if (selectable.indexOf(id) >= 0) {
        $card.addClass('selectable');
      } else {
        $card.addClass('unselectable');
      }
    });
  };

  PlayFieldView.prototype.resetSelectable = function() {
    var $selectables = this.$element_.find('.selectable');
    $selectables.removeClass('selectable');
    var $unselectables = this.$element_.find('.unselectable');
    $unselectables.removeClass('unselectable');
  };

  PlayFieldView.prototype.renderSelecting = function(trnId) {
    var $cards = this.$element_.find('.card');
    $.each($cards, function(idx, c) {
      var $card = $(c);
      if ($card.hasClass('rear')) {
        return;
      }
      if (trnId === $card.attr('data-id')) {
        $card.addClass('selecting');
      } else {
        $card.removeClass('selecting');
      }
    });
  };

  PlayFieldView.prototype.clearSelecting = function() {
    this.$element_.find('.selecting').removeClass('selecting');
  };

  PlayFieldView.prototype.enterDocument = function() {
    this.$element_.on('click', '.hands .card', function(e){
      this.$element_.trigger(PlayFieldView.EventType.SELECT_HAND, e.currentTarget);
    }.bind(this));
    this.$element_.on('click', '.bench .card', function(e){
      this.$element_.trigger(PlayFieldView.EventType.SELECT_BENCH, e.currentTarget);
    }.bind(this));
    this.$element_.on('click', '.battle-monster .card', function(e){
      this.$element_.trigger(PlayFieldView.EventType.SELECT_BATTLE_MONSTER, e.currentTarget);
    }.bind(this));
    this.$element_.on('mouseenter', '.card', function(e) {
      var $target = $(e.currentTarget);
      if ($target.hasClass('rear') || $target.hasClass('unselectable')) {
        return;
      }
      var data = {};
      data.trnId = $target.attr('data-id');
      data.element = e.currentTarget;
      if ($target.parents('.hands').length > 0) {
        data.area = Const.Area.HAND;
      } else if ($target.parents('.bench').length > 0) {
        data.area = Const.Area.BENCH;
      } else if ($target.parents('.battle-monster').length > 0) {
        data.area = Const.Area.BATTLE_MONSTER;
      } else {
        return;
      }
      this.$element_.trigger(PlayFieldView.EventType.HOVER_CARD, data);
    }.bind(this));
    this.$element_.on('mouseleave', '.card', function(e) {
      this.$element_.trigger(PlayFieldView.EventType.LEAVE_CARD);
    }.bind(this));
    this.$element_.on('click', '.hands-toggle-btn', function(e) {
      var $field = $(e.currentTarget).parents('.player-field');
      var isShownHands = $field.find('.hands-float-area').hasClass('shown');
      var func = isShownHands ? this.hideHands_ : this.showHands_;
      func.call(this, $field);
    }.bind(this));
    this.$element_.on('click', '.hands-operator', function(e) {
      this.scrollHands_($(e.currentTarget));
    }.bind(this));
  };

  PlayFieldView.prototype.myHands = function(isShownHands) {
    var $field = this.$element_.find('#my-field');
    var func = isShownHands ? this.showHands_ : this.hideHands_;
    func.call(this, $field);
  };

  PlayFieldView.prototype.rivalHands = function(isShownHands) {
    var $field = this.$element_.find('#rival-field');
    var func = isShownHands ? this.showHands_ : this.hideHands_;
    func.call(this, $field);
  };

  PlayFieldView.prototype.showHands_ = function($field) {
    $field.find('.hands-toggle-btn').text('－');
    $field.find('.hands-float-area').addClass('shown');
  };

  PlayFieldView.prototype.hideHands_ = function($field) {
    $field.find('.hands-toggle-btn').text('＋');
    $field.find('.hands-float-area').removeClass('shown');
  };

  PlayFieldView.prototype.scrollHands_ = function($target) {
    var $field = $target.parents('.player-field');
    var isLeft = $target.hasClass('left-operator');
    var $container = $field.find('.hand-cards-container');
    $container.animate({scrollLeft:$container.scrollLeft() + (isLeft ? - 336 : 336)}, 300);
  };

  PlayFieldView.prototype.hpBarometer_ = function(monster) {
    var barometer = '<div class="barometer-caption">HP:</div><div class="hp-barometer-container">';
    var rest = (monster.hp / 10) - monster.getDamageCount();
    for (var i = 0; i < rest; i++) {
      barometer += '<span class="hp-rest"></span>';
    }for (var i = 0; i < monster.getDamageCount(); i++) {
      barometer += '<span class="hp-empty"></span>';
    }
    return barometer + '</div>';
  };

  PlayFieldView.prototype.energyBarometer_ = function(monster) {
    var barometer = '<div class="barometer-caption">ｴﾈ:</div><div class="hp-barometer-container">';
    var energies = monster.getEnergy();
    $.each(UtilFunc.mapEnergyToArray(energies), function(idx, type) {
      barometer += '<span class="cost ' + type + '"></span>';
    });
    return barometer + '</div>';
  };
})(jQuery);
