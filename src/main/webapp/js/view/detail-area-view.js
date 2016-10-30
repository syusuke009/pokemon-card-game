(function($){

  DetailAreaView = function(){
    this.$element_ = $('#detail-area');
    this.cardDetailRenderer_ = new CardDetailRenderer(this.$element_);
  };

  DetailAreaView.EventType = {
    TO_BATTLE: 'to-buttle',
    TO_BENCH: 'to-bench',
    EVOLUTE: 'evolute',
    USE: 'use',
    ATTACH: 'attach',
    ATTACK: 'attack',
    TURN_END: 'turn-end'
  };

  DetailAreaView.prototype.getElement = function(){
    return this.$element_;
  };

  DetailAreaView.prototype.render = function(){
    this.enterDocument();
  };

  DetailAreaView.prototype.redraw = function(card, area, control){
    this.cardDetailRenderer_.render(card);
    this.renderButtons_(control, area);
  };

  DetailAreaView.prototype.enterDocument = function(){
    this.$element_.on('click', '.to-battle-button', function(e){
      if ($(e.target).hasClass('disabled')) return;
      var $trnId = this.$element_.find('.detail-trn-id');
      this.$element_.trigger(DetailAreaView.EventType.TO_BATTLE, $trnId.val());
    }.bind(this));
    this.$element_.on('click', '.to-bench-button', function(e){
      if ($(e.target).hasClass('disabled')) return;
      var $trnId = this.$element_.find('.detail-trn-id');
      this.$element_.trigger(DetailAreaView.EventType.TO_BENCH, $trnId.val());
    }.bind(this));
    this.$element_.on('click', '.evolution-button', function(e){
      if ($(e.target).hasClass('disabled')) return;
      var $trnId = this.$element_.find('.detail-trn-id');
      this.$element_.trigger(DetailAreaView.EventType.EVOLUTE, $trnId.val());
    }.bind(this));
    this.$element_.on('click', '.use-button', function(e){
      if ($(e.target).hasClass('disabled')) return;
      var $trnId = this.$element_.find('.detail-trn-id');
      this.$element_.trigger(DetailAreaView.EventType.USE, $trnId.val());
    }.bind(this));
    this.$element_.on('click', '.attach-button', function(e){
      if ($(e.target).hasClass('disabled')) return;
      var $trnId = this.$element_.find('.detail-trn-id');
      this.$element_.trigger(DetailAreaView.EventType.ATTACH, $trnId.val());
    }.bind(this));

    this.$element_.on('click', '.attack-button', function(e){
      if ($(e.target).hasClass('disabled')) return;
      var $trnId = this.$element_.find('.detail-trn-id');
      this.$element_.trigger(DetailAreaView.EventType.ATTACK, $trnId.val());
    }.bind(this));

    this.$element_.on('click', '.turn-end-button', function(e){
      if ($(e.target).hasClass('disabled')) return;
      this.$element_.trigger(DetailAreaView.EventType.TURN_END);
    }.bind(this));
  };

  DetailAreaView.prototype.renderButtons_ = function(control, area){
    var $fromHandButtons = this.$element_.find('.from-hand');
    var $fromBattleButtons = this.$element_.find('.from-battle');
    var $trainerButtons = this.$element_.find('.trainer-buttons');
    var $energyButtons = this.$element_.find('.energy-buttons');
    switch (control.kind) {
    case 'base-monster':
    case 'evolution-monster':
      $trainerButtons.hide();
      $energyButtons.hide();
      switch (area){
      case Const.Area.HAND:
        $fromBattleButtons.hide();
        $fromHandButtons.show();
        this.switchDisabled_(control.toBattle, $fromHandButtons.find('.to-battle-button'));
        this.switchDisabled_(control.toBench, $fromHandButtons.find('.to-bench-button'));
        this.switchDisabled_(control.evolution, $fromHandButtons.find('.evolution-button'));
        break;
      case Const.Area.BATTLE_MONSTER:
        $fromHandButtons.hide();
        $fromBattleButtons.show();
        this.switchDisabled_(control.special, $fromBattleButtons.find('.special-button'));
        this.switchDisabled_(control.attack, $fromBattleButtons.find('.attack-button'));
        this.switchDisabled_(control.escape, $fromBattleButtons.find('.escape-button'));
        break;
      case Const.Area.BENCH:
        $fromHandButtons.show();
        $fromBattleButtons.show();
        this.switchDisabled_(control.toBattle, $fromHandButtons.find('.to-battle-button'));
        this.switchDisabled_(control.toBench, $fromHandButtons.find('.to-bench-button'));
        this.switchDisabled_(control.evolution, $fromHandButtons.find('.evolution-button'));
        this.switchDisabled_(control.special, $fromBattleButtons.find('.special-button'));
        this.switchDisabled_(control.attack, $fromBattleButtons.find('.attack-button'));
        this.switchDisabled_(control.escape, $fromBattleButtons.find('.escape-button'));
        break;
      };
      break;
    case 'trainer':
      $fromHandButtons.hide();
      $fromBattleButtons.hide();
      $energyButtons.hide();
      $trainerButtons.show();
      this.switchDisabled_(control.use, $trainerButtons.find('.use-button'));
      break;
    case 'energy':
      $fromHandButtons.hide();
      $fromBattleButtons.hide();
      $trainerButtons.hide();
      $energyButtons.show();
      this.switchDisabled_(control.attach, $energyButtons.find('.attach-button'));
      break;
    case 'none':
    default:
      $fromHandButtons.hide();
      $fromBattleButtons.hide();
      $trainerButtons.hide();
      $energyButtons.hide();
      break;
    }
  };

  DetailAreaView.prototype.switchDisabled_ = function(bool, $elm){
    if (bool) {
      $elm.removeClass('disabled');
    } else {
      $elm.addClass('disabled');
    }
  };


})(jQuery);
