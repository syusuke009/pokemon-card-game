(function($){

  ApplicationView = function() {
    this.$element_ = $(document.body);
    this.field_ = new PlayFieldView();
    this.detail_ = new DetailAreaView();
  };

  ApplicationView.EventType = {
    SELECT_CARD: 'select-card',
    ASSIGN_BATTLE: 'assign-battle',
    ASSIGN_BENCH: 'assign-bench',
    EVOLUTE: DetailAreaView.EventType.EVOLUTE,
    USE: DetailAreaView.EventType.USE,
    ATTACH_ENERGY: DetailAreaView.EventType.ATTACH,
    ATTACK: DetailAreaView.EventType.ATTACK,
    ESCAPE: DetailAreaView.EventType.ESCAPE,
    TURN_END: DetailAreaView.EventType.TURN_END
  };

  ApplicationView.prototype.getElement = function() {
    return this.$element_;
  };

  ApplicationView.prototype.renderField = function(model) {
    var myField = model.getField(Const.Viewpoint.ME);
    var rivalField = model.getField(Const.Viewpoint.RIVAL);
    this.field_.render(myField, rivalField);
  };

  ApplicationView.prototype.redrawField = function(model) {
    var myField = model.getField(Const.Viewpoint.ME);
    var rivalField = model.getField(Const.Viewpoint.RIVAL);
    this.field_.redraw(myField, rivalField);
  };

  ApplicationView.prototype.drawSelectable = function(selectable) {
    this.field_.drawSelectable(selectable);
  };

  ApplicationView.prototype.resetSelectable = function() {
    this.field_.resetSelectable();
  };

  ApplicationView.prototype.renderDetail = function() {
    this.detail_.render();
  };

  ApplicationView.prototype.redrawDetail = function(card, area, control) {
    this.detail_.redraw(card, area, control);
  };

  ApplicationView.prototype.enterDocument = function() {
    this.bindEvents_();
  };

  ApplicationView.prototype.bindEvents_ = function() {
    this.field_.getElement().on(PlayFieldView.EventType.SELECT_HAND, this.onSelectHand_.bind(this));
    this.field_.getElement().on(PlayFieldView.EventType.SELECT_BENCH, this.onSelectBench_.bind(this));
    this.field_.getElement().on(PlayFieldView.EventType.SELECT_BATTLE_MONSTER, this.onSelectBattleMonster_.bind(this));

    this.detail_.getElement().on(DetailAreaView.EventType.TO_BATTLE, this.onToBattle_.bind(this));
    this.detail_.getElement().on(DetailAreaView.EventType.TO_BENCH, this.onToBench_.bind(this));
  };

  ApplicationView.prototype.onSelectHand_ = function(e, target) {
    var data = {};
    data.trnId = $(target).attr('data-id');
    data.area = Const.Area.HAND;
    data.element = target;
    this.$element_.trigger(ApplicationView.EventType.SELECT_CARD, data);
  };

  ApplicationView.prototype.onSelectBench_ = function(e, target) {
    var data = {};
    data.trnId = $(target).attr('data-id');
    data.area = Const.Area.BENCH;
    data.element = target;
    this.$element_.trigger(ApplicationView.EventType.SELECT_CARD, data);
  };

  ApplicationView.prototype.onSelectBattleMonster_ = function(e, target) {
    var data = {};
    data.trnId = $(target).attr('data-id');
    data.area = Const.Area.BATTLE_MONSTER;
    data.element = target;
    this.$element_.trigger(ApplicationView.EventType.SELECT_CARD, data);
  };

  ApplicationView.prototype.onToBattle_ = function(e, trnId) {
    this.$element_.trigger(ApplicationView.EventType.ASSIGN_BATTLE, trnId);
  };

  ApplicationView.prototype.onToBench_ = function(e, trnId) {
    this.$element_.trigger(ApplicationView.EventType.ASSIGN_BENCH, trnId);
  };
})(jQuery);