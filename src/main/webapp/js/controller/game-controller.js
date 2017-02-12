(function($) {

  GameController = function() {
    this.view_ = new ApplicationView();
    this.actionButtonController_ = new ActionButtonController();
    this.battleController_ = new BattleController();
    this.pokemonCheck_ = new PokemonChecker();

    this.effectDao_ = new EffectDao();
    this.onSelectInterceptor_ = new CardSelectInterceptor();

    this.regulation_ = new RegulationModel();
    this.setupper_ = new GameSetupper(this.regulation_);

    RequestSignalReceiver.setController(this);
    RequestSignalSender.setOperation();

    this.model_;
    this.selectingData_;
  };

  GameController.prototype.ready = function() {
    this.setupGame_();

    this.view_.enterDocument();
    this.bindEvents_();
  };

  GameController.prototype.setupGame_ = function() {

    this.setupper_.setup(Const.Viewpoint.ME).then(function(model) {
      this.model_ = model;

      this.view_.redrawField(this.model_);

      this.view_.myHands(true);
      this.view_.rivalHands(true);
    }.bind(this));

  };

  GameController.prototype.bindEvents_ = function() {
    this.view_.getElement().on(ApplicationView.EventType.SELECT_CARD, this.onSelectCard_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.HOVER_CARD, this.onHoverCard_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.LEAVE_CARD, this.onLeaveCard_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.CLICK_TRUSH, this.onClickTrush_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.ASSIGN_BATTLE, this.onAssignBattle_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.ASSIGN_BENCH, this.onAssignBench_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.EVOLUTE, this.onEvolute_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.USE, this.onUseTrainer_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.ATTACH_ENERGY, this.onAttachEnergy_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.ATTACK, this.onAttack_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.ESCAPE, this.onEscape_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.TURN_END, this.turnEnd.bind(this));

    Effects.getEventTarget().on(Effects.EventType.REQUEST_SELECT, this.onRequestSelect_.bind(this));
    Effects.getEventTarget().on(Effects.EventType.REQUEST_SELECT_SIGNAL_SEND, this.onRequestSelectSignalSend_.bind(this));
    Effects.getEventTarget().on(Effects.EventType.REQUEST_REDRAW_FIELD, this.onRequestRedrawField_.bind(this));

    this.view_.getElement().on(ApplicationView.EventType.SURRENDER, this.onSurrender_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.GAME_START, this.onGameStart_.bind(this));
  };

  GameController.prototype.onSelectCard_ = function(e, data) {
    var viewpoint = UtilFunc.getViewpoint(data.trnId);
    var field = this.model_.getField(viewpoint);
    var card = field.selectFrom(data.area, data.trnId);
    if (this.onSelectInterceptor_.canIntercept()) {
      if (!$(data.element).hasClass('selectable')) {
        return;
      }
      var bool = this.onSelectInterceptor_.intercept(data, this.model_);
      this.onSelectInterceptor_.clear();
      this.view_.resetSelectable();
      this.view_.redrawField(this.model_);
      this.view_.redrawDetail(card, data.area);
      if (!bool) {
        return;
      }
    }
    var control = this.actionButtonController_.control(card, this.model_, data.area);
    this.view_.redrawButtons(data.area, control);

    this.selectingData_ = data;
    this.view_.renderSelecting(data.trnId);
  };

  GameController.prototype.onHoverCard_ = function(e, data) {
    if (!!this.selectingData_ && this.selectingData_.trnId === data.trnId) {
      return;
    }
    var viewpoint = UtilFunc.getViewpoint(data.trnId);
    var field = this.model_.getField(viewpoint);
    var card = field.selectFrom(data.area, data.trnId);
    this.view_.redrawDetail(card, data.area);
    this.view_.hideButtons();
  };

  GameController.prototype.onLeaveCard_ = function(e) {
    if (!!this.selectingData_) {
      var data = this.selectingData_;
      var viewpoint = UtilFunc.getViewpoint(data.trnId);
      var field = this.model_.getField(viewpoint);
      var card = field.selectFrom(data.area, data.trnId);
      if (!card) {
        return;
      }
      this.view_.redrawDetail(card, data.area);
      var control = this.actionButtonController_.control(card, this.model_, data.area);
      this.view_.redrawButtons(data.area, control);
    } else {
      this.view_.hideDetail();
    }
  };

  GameController.prototype.onClickTrush_ = function(e, element) {
    var viewpoint = UtilFunc.getViewpoint($(element).attr('data-id'));
    var trush = this.model_.getField(viewpoint).getTrush();
    new CardListDialog().show(trush.getAll(), 'トラッシュのカード');
  };

  GameController.prototype.onAssignBattle_ = function(e, trnId) {
    var viewpoint = UtilFunc.getViewpoint(trnId);
    var field = this.model_.getField(viewpoint);
    var card = field.pickHand(trnId);
    if (card === null) {
      card = field.pickBench(trnId);
    }
    if (card !== null) {
      field.setBattleMonster(card);
      this.model_.getTurn().newAssign(trnId);
    }
    this.view_.redrawField(this.model_);
    this.view_.redrawDetail(card, Const.Area.BATTLE_MONSTER);
  };

  GameController.prototype.onAssignBench_ = function(e, trnId) {
    var viewpoint = UtilFunc.getViewpoint(trnId);
    var field = this.model_.getField(viewpoint);
    var card = field.pickHand(trnId);
    if (card !== null) {
      field.putBench(card);
      this.model_.getTurn().newAssign(trnId);
    }
    this.view_.redrawField(this.model_);
    this.view_.redrawDetail(card, Const.Area.BENCH);
  };

  GameController.prototype.onEvolute_ = function(e, trnId) {
    var viewpoint = UtilFunc.getViewpoint(trnId);
    var field = this.model_.getField(viewpoint);
    var card = field.selectHand(trnId);
    var selectables = UtilFunc.findEvolutionBase(card, field, this.model_.getTurn());

    this.view_.drawSelectable(selectables);

    this.view_.drawSelectable(selectables);
    (viewpoint === Const.Viewpoint.ME ? this.view_.myHands : this.view_.rivalHands).call(this.view_, false);
    this.onSelectInterceptor_.forEvolution(trnId).then(function() {
      (viewpoint === Const.Viewpoint.ME ? this.view_.myHands : this.view_.rivalHands).call(this.view_, true);
    }.bind(this));
  };

  GameController.prototype.onUseTrainer_ = function(e, trnId) {
    var viewpoint = UtilFunc.getViewpoint(trnId);
    var field = this.model_.getField(viewpoint);
    var card = field.pickHand(trnId);

    if (card.isSupporter()) {
      this.model_.getTurn().useSupporter();
    }

    var bool = this.effectDao_.getTrainerEffect(card.code)(this.model_, card);

    if (!card.pendingTrush) {
      field.getTrush().trush(card);
    }

    this.view_.clearSelecting();
    this.selectingData_ = null;
    if (bool !== false) {
      this.view_.redrawField(this.model_);
    }
  };

  GameController.prototype.onAttachEnergy_ = function(e, trnId) {
    var viewpoint = UtilFunc.getViewpoint(trnId);
    var field = this.model_.getField(viewpoint);

    var selectables = [];
    selectables.push(field.getBattleMonster().trnId);
    $.each(field.getBench(), function(idx, c) {
      selectables.push(c.trnId);
    });

    this.view_.drawSelectable(selectables);
    (viewpoint === Const.Viewpoint.ME ? this.view_.myHands : this.view_.rivalHands).call(this.view_, false);
    this.onSelectInterceptor_.forEnergyAttach(trnId).then(function() {
      (viewpoint === Const.Viewpoint.ME ? this.view_.myHands : this.view_.rivalHands).call(this.view_, true);
    }.bind(this));
  };

  GameController.prototype.onAttack_ = function(e, trnId) {
    var viewpoint = UtilFunc.getViewpoint(trnId);
    var field = this.model_.getField(viewpoint);
    var dialog = new SkillSelectionDialog(this.model_);
    dialog.show(field.getBattleMonster()).then(function(obj) {
      if (!!obj) {
        return this.battleController_.battle(this.model_, obj);
      }
      return $.Deferred().resolve(false).promise();
    }.bind(this)).then(function(res) {
      if (res) {
        this.turnEnd();
      }
    }.bind(this), function(res) {
      this.turnEnd();
    }.bind(this));
  };

  GameController.prototype.onEscape_ = function(e, trnId) {
    var viewpoint = UtilFunc.getViewpoint(trnId);
    var field = this.model_.getField(viewpoint);

    var escaped = field.getBattleMonster();

    var afterTrushed = function(trushed){

      trushed.forEach(function(c) {
        escaped.removeEnergy(c);
      });

      var selectables = field.getBench().map(function(c) {
        return c.trnId;
      });

      this.view_.drawSelectable(selectables);

      var $defer = $.Deferred();
      this.onSelectInterceptor_.forGoBattle($defer);
      $defer.promise().then(function() {
        field.putBench(escaped);
        this.model_.getTurn().escape();
        this.view_.redrawField(this.model_);
      }.bind(this));

      MessageDisplay.println('『もどれっ！ ' + escaped.name + '！』', 'あいては ' + escaped.name + ' を ひっこめた');
    }.bind(this);

    if (escaped.escapeCost.length === 0) {
      afterTrushed([]);
    } else {
      var dialog = new EnergySelectionDialog();
      dialog.show(escaped.getEnergy(), escaped.escapeCost).then(afterTrushed);
    }
  };

  GameController.prototype.onRequestSelect_ = function(e, selectables, $defer) {
    this.view_.drawSelectable(selectables);
    this.onSelectInterceptor_.forEffect($defer);
  };

  GameController.prototype.onRequestSelectSignalSend_ = function(e, selectables, $defer) {
    RequestSignalSender.selectBattleMonster(selectables, $defer);
  };

  GameController.prototype.onRequestRedrawField_ = function(e) {
    this.view_.redrawField(this.model_);
  };

  GameController.prototype.onRequestRedrawDetail_ = function(e, card, area) {
    var control = this.actionButtonController_.control(card, this.model_, area);
    this.view_.redrawDetail(card, area, control);
  };

  GameController.prototype.turnStart = function() {
    var viewpoint = this.model_.getTurn().whoseTurn();
    var field = this.model_.getField(viewpoint || Const.Viewpoint.ME);
    var deck = field.getDeck();
    if (deck.isEmpty()) {
      this.gameset(UtilFunc.reverseViewpoint(viewpoint), 'デッキがなくなりカードがドローできなくなりました');
    }
    var card = deck.draw();
    field.addHand(card);
    this.view_.redrawField(this.model_);

    (viewpoint === Const.Viewpoint.ME ? this.view_.myHands : this.view_.rivalHands).call(this.view_, true);
    (viewpoint === Const.Viewpoint.ME ? this.view_.rivalHands : this.view_.myHands).call(this.view_, false);
  };

  GameController.prototype.turnEnd = function() {
    var turn = this.model_.getTurn();
    var myField = this.model_.getField(Const.Viewpoint.ME);
    var rivalField = this.model_.getField(Const.Viewpoint.RIVAL);
    if (turn.isSetupTurn()) {
      if (!myField.getBattleMonster()) {
        alert('自分の場にバトルポケモンがいません');
        return;
      }
      if (!rivalField.getBattleMonster()) {
        alert('相手の場にバトルポケモンがいません');
        return;
      }
      this.model_.nextTurn();
      this.turnStart();
      return;
    }
    this.pokemonCheck_.check(this.model_).then(function(res){
      // side clear
      var mySide = myField.getSide();
      var rivalSide = rivalField.getSide();
      if (mySide.length === 0 && rivalSide.length === 0) this.gameset(null, 'おたがいのサイドを全てとりました');
      if (mySide.length === 0) this.gameset(Const.Viewpoint.ME, 'じぶんのサイドを全てとりました');
      if (rivalSide.length === 0) this.gameset(Const.Viewpoint.RIVAL, 'あいてがサイドを全てとりました');

      return this.exchangeIfDying_(this.model_, Const.Viewpoint.ME).then(function(my) {
        var $deferRivalBattle = this.exchangeIfDying_(this.model_, Const.Viewpoint.RIVAL);
        return $.when($.Deferred().resolve(my).promise(), $deferRivalBattle);
      }.bind(this));
    }.bind(this)).then(function(my, rival){
      // no monster
      if (!my && !rival) this.gameset(null, 'おたがいのポケモンが全滅しました');
      if (!my) this.gameset(Const.Viewpoint.RIVAL, 'あなたのポケモンが全滅しました');
      if (!rival) this.gameset(Const.Viewpoint.ME, 'あいてのポケモンが全滅しました');

      this.view_.hideDetail();
      this.model_.nextTurn();
      this.turnStart();
    }.bind(this));
  };

  GameController.prototype.exchangeIfDying_ = function(model, viewpoint) {
    var $defer = $.Deferred();
    var field = model.getField(viewpoint);
    if (!!field.getBattleMonster()) {
      return $defer.resolve(true).promise();
    }
    var selectables = field.getBench().map(function(c) {
      return c.trnId;
    });
    if (selectables.length === 0) {
      $defer.resolve(false)
      return $defer.promise();
    }
    MessageDisplay.println('　');
    if (viewpoint === Const.Viewpoint.ME) {
      this.view_.drawSelectable(selectables);
      this.onSelectInterceptor_.forGoBattle($defer);
    } else {
      RequestSignalSender.selectBattleMonster(selectables, $defer);
    }
    return $defer.promise();
  };

  GameController.prototype.gameset = function(winner, reason) {
    this.view_.redrawField(this.model_);
    this.view_.gameset();
    MessageDisplay.println('　');
    MessageDisplay.println(reason);
    var message = !!winner ? (winner === Const.Viewpoint.ME ? 'あなた' : 'あいて') + ' の勝利！' : '引き分け';
    MessageDisplay.println(message);
    throw message;
  };

  GameController.prototype.onSurrender_ = function(e) {
    this.gameset(Const.Viewpoint.RIVAL, '降参しました');
  };

  GameController.prototype.onGameStart_ = function(e) {
    this.view_.gamestart();
    MessageDisplay.clear();
    this.setupGame_();
  };
})(jQuery);