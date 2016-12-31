(function($){

  PlayFieldView = function(){
    this.$element_ = $('#pray-field');
  };

  PlayFieldView.EventType = {
    SELECT_HAND: 'select-hand',
    SELECT_BENCH: 'select-bench',
    SELECT_BATTLE_MONSTER: 'select-battle-monster'
  };

  PlayFieldView.prototype.getElement = function(){
    return this.$element_;
  };

  PlayFieldView.prototype.render = function(myModel, rivalModel, turn){
    this.redraw(myModel, rivalModel, turn);

    this.enterDocument();
  };

  PlayFieldView.prototype.redraw = function(myModel, rivalModel, turn){
    var viewpoint = turn.whoseTurn();
    this.renderInner_(this.$element_.find('#my-area'), myModel, viewpoint === Const.Viewpoint.ME);
    this.renderInner_(this.$element_.find('#rival-area'), rivalModel, viewpoint === Const.Viewpoint.RIVAL);
  };


  PlayFieldView.prototype.renderInner_ = function($view, model, isSelfTurn){
    $view.find('.rest-card-count').text('残 ' + model.getDeck().size());

    var sideTmpl = Hogan.compile($('#card-list-template').text());
    $view.find('.side').html(sideTmpl.render({'list':model.getSide()}));

    var openedTmpl = Hogan.compile($('#opened-card-template').text());
    $view.find('.hands').html(openedTmpl.render({'list':model.getHands().getAll()}));

    var battleMonster = model.getBattleMonster();
    if (battleMonster !== null) {
      $view.find('.battle-monster').html(openedTmpl.render({'list':[battleMonster]}));
    }

    var battleMonster = model.getBattleMonster();
    $view.find('.bench').html(openedTmpl.render({'list':model.getBench()}));

    var trush = model.getTrush();
    if (!trush.isEmpty()) {
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
})(jQuery);
