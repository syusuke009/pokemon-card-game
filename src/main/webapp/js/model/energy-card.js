(function($){

  EnergyCard = {};

  EnergyCard = function(key, mst) {
    this.trnId = key.id;
    this.code = String(key.cardCode);
    this.kind = mst.kind;
    this.kindCaption = 'エネルギー';
    this.type = mst.type;
    this.typeCaption = UtilFunc.getTypeCaption(this.type);
    this.name = mst.name;
    this.value = mst.value;

    this.dir = 'energy';
  };
})(jQuery);