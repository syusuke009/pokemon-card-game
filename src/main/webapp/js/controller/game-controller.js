(function($) {

  GameController = function() {
    this.view_ = new ApplicationView();
    this.actionButtonController_ = new ActionButtonController();
    this.battleController_ = new BattleController();
    this.pokemonCheck_ = new PokemonChecker();

    this.model_ = new GameModel();

    this.effectDao_ = new EffectDao();
    this.onSelectInterceptor_ = new CardSelectInterceptor();
  };

  GameController.prototype.ready = function() {
    var supplier = new DeckSupplier(new CardMstDao(), new SkillDao());
    var deckDao = new DeckDao();

    this.model_.setField(Const.Viewpoint.ME ,new PlayField(supplier.supply(deckDao.get('user1'), Const.Viewpoint.ME)));
    this.model_.setField(Const.Viewpoint.RIVAL, new PlayField(supplier.supply(deckDao.get('user2'), Const.Viewpoint.RIVAL)));

    new GameSetupper(false).setup(this.model_);

    this.view_.enterDocument();
    this.view_.renderField(this.model_);
    this.view_.renderDetail();

    this.bindEvents_();
  };

  GameController.prototype.bindEvents_ = function() {
    this.view_.getElement().on(ApplicationView.EventType.SELECT_CARD, this.onSelectCard_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.ASSIGN_BATTLE, this.onAssignBattle_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.ASSIGN_BENCH, this.onAssignBench_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.EVOLUTE, this.onEvolute_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.USE, this.onUseTrainer_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.ATTACH_ENERGY, this.onAttachEnergy_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.ATTACK, this.onAttack_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.ESCAPE, this.onEscape_.bind(this));
    this.view_.getElement().on(ApplicationView.EventType.TURN_END, this.turnEnd.bind(this));

    Effects.getEventTarget().on(Effects.EventType.REQUEST_SELECT, this.onRequestSelect_.bind(this));
    Effects.getEventTarget().on(Effects.EventType.REQUEST_REDRAW_FIELD, this.onRequestRedrawField_.bind(this));
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
      if (!bool) {
        return;
      }
    }
    var control = this.actionButtonController_.control(card, this.model_, data.area);
    this.view_.redrawDetail(card, data.area, control);
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
    var control = this.actionButtonController_.control(card, this.model_, Const.Area.BATTLE_MONSTER);
    this.view_.redrawDetail(card, Const.Area.BATTLE_MONSTER, control);
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
    var control = this.actionButtonController_.control(card, this.model_, Const.Area.BENCH);
    this.view_.redrawDetail(card, Const.Area.BENCH, control);
  };

  GameController.prototype.onEvolute_ = function(e, trnId) {
    var viewpoint = UtilFunc.getViewpoint(trnId);
    var field = this.model_.getField(viewpoint);
    var card = field.selectHand(trnId);
    var selectables = UtilFunc.findEvolutionBase(card, field, this.model_.getTurn());

    this.view_.drawSelectable(selectables);

    this.onSelectInterceptor_.forEvolution(trnId);
  };

  GameController.prototype.onUseTrainer_ = function(e, trnId) {
    var viewpoint = UtilFunc.getViewpoint(trnId);
    var field = this.model_.getField(viewpoint);
    var card = field.pickHand(trnId);

    if (card.isSupporter()) {
      this.model_.getTurn().useSupporter();
    }

    var func = this.effectDao_.getTrainerTarget(card.code);
    if (!!func) {
      var selectables = func(this.model_);
      this.view_.drawSelectable(selectables);

      var effectFunc = this.effectDao_.getTrainerEffect(card.code);
      this.onSelectInterceptor_.forUseTrainer(effectFunc);
    } else {
      var bool = this.effectDao_.getTrainerEffect(card.code)(this.model_);
      field.getTrush().trush(card);
      if (bool !== false) {
        this.view_.redrawField(this.model_);
      }
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

    this.onSelectInterceptor_.forEnergyAttach(trnId);
  };

  GameController.prototype.onAttack_ = function(e, trnId) {
    var viewpoint = UtilFunc.getViewpoint(trnId);
    var field = this.model_.getField(viewpoint);
    var dialog = new SkillSelectionDialog();
    var promise = dialog.show(field.getBattleMonster());
    promise.then(function(obj) {
      if (!!obj) {
        return this.battleController_.battle(this.model_, obj);
      }
      return $.Deferred().reject().promise();
    }.bind(this)).then(function(res) {
      this.turnEnd();
    }.bind(this), function(res) {
      // do nothing
    });
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
        this.model_.escape(viewpoint);
        this.view_.redrawField(this.model_);
      }.bind(this));

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
      this.gameset(UtilFunc.reverseViewpoint(viewpoint));
    }
    var card = deck.draw();
    field.addHand(card);
    this.view_.redrawField(this.model_);
  };

  GameController.prototype.turnEnd = function() {
    var turn = this.model_.getTurn();
    var myField = this.model_.getField(Const.Viewpoint.ME);
    var rivalField = this.model_.getField(Const.Viewpoint.RIVAL);
    if (turn.isSetupTurn()) {
      if (!myField.getBattleMonster()) {
        MessageDisplay.println('自分のバトルモンスターを出してください');
        return;
      }
      if (!rivalField.getBattleMonster()) {
        MessageDisplay.println('相手のバトルモンスターを出してください');
        return;
      }
      this.model_.nextTurn();
      this.turnStart();
      return;
    }
    var $defer = this.pokemonCheck_.check(this.model_);
    $defer.then(function(res){
      var $deferMyBattle = this.exchangeIfDying_(this.model_, Const.Viewpoint.ME);
      var $deferRivalBattle = this.exchangeIfDying_(this.model_, Const.Viewpoint.RIVAL);
      return $.when($deferMyBattle, $deferRivalBattle);
    }.bind(this)).then(function(my, rival){
      // side clear
      var mySide = myField.getSide();
      var rivalSide = rivalField.getSide();
      if (mySide.length === 0 && rivalSide.length === 0) this.gameset(null);
      if (mySide.length === 0) this.gameset(Const.Viewpoint.ME);
      if (rivalSide.length === 0) this.gameset(Const.Viewpoint.RIVAL);
      // no monster
      if (!my && !rival) this.gameset(null);
      if (!my) this.gameset(Const.Viewpoint.RIVAL);
      if (!rival) this.gameset(Const.Viewpoint.ME);

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
    this.view_.drawSelectable(selectables);
    this.onSelectInterceptor_.forGoBattle($defer);
    return $defer.promise();
  };

  GameController.prototype.gameset = function(winner, reason) {
    var message = !!winner ? winner + 'の勝利！' : '引き分け';
    MessageDisplay.println(message);
    throw message;
  };
})(jQuery);