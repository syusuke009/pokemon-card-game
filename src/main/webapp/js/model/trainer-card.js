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
    this.effect = mst.effect;

    this.dir = 'trainer';
  };

  TrainerCard.KindCaption = {
    'goods': 'グッズ',
    'supporter': 'サポーター'
  };
})(jQuery);