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

  PlayFieldView.prototype.render = function(myModel, rivalModel){
    this.redraw(myModel, rivalModel);

    this.enterDocument();
  };

  PlayFieldView.prototype.redraw = function(myModel, rivalModel){
    this.renderInner_(this.$element_.find('#my-area'), myModel);
    this.renderInner_(this.$element_.find('#rival-area'), rivalModel);
  };


  PlayFieldView.prototype.renderInner_ = function($view, model){
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
    this.$element_.find('.hands').on('click', '.card', function(e){
      this.$element_.trigger(PlayFieldView.EventType.SELECT_HAND, e.currentTarget);
    }.bind(this));
    this.$element_.find('.bench').on('click', '.card', function(e){
      this.$element_.trigger(PlayFieldView.EventType.SELECT_BENCH, e.currentTarget);
    }.bind(this));
    this.$element_.find('.battle-monster').on('click', '.card', function(e){
      this.$element_.trigger(PlayFieldView.EventType.SELECT_BATTLE_MONSTER, e.currentTarget);
    }.bind(this));
  };

})(jQuery);
