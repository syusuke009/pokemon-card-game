(function($){

  TrainerCard = {};

  TrainerCard = function(key, mst) {
    this.trnId = key.id;
    this.code = String(key.cardCode);
    this.kind = mst.kind;
    this.kindCaption = TrainerCard.KindCaption[this.kind];
    this.type = 'trainer';
    this.typeCaption = '道';
    this.name = mst.name;
    this.description = mst.description;
    this.effect = mst.effect;
    this.pendingTrush = mst.pendingTrush;
    this.isDummyMonster = mst.isDummyMonster;

    this.dir = 'trainer';
  };

  TrainerCard.prototype.isSupporter = function() {
    return this.kind === 'supporter';
  };

  TrainerCard.KindCaption = {
    'goods': 'グッズ',
    'supporter': 'サポーター'
  };
})(jQuery);