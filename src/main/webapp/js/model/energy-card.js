(function($){

  EnergyCard = {};

  EnergyCard = function(key, mst) {
    this.trnId = key.id;
    this.code = String(key.cardCode);
    this.kind = mst.kind;
    this.kindCaption = 'エネルギー';
    this.type_ = mst.type;
    this.typeCaption = UtilFunc.getTypeCaption(this.getType());
    this.name = mst.name;
    this.value = mst.value;
    this.description = mst.description;

    this.dir = 'energy';

    this.originalCard = null;
  };

  EnergyCard.prototype.getType = function() {
    return this.type_;
  };

})(jQuery);