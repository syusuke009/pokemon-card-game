(function($){

  Skill = function(key, mst) {
    this.code = key;
    this.name = mst.name;
    this.cost = mst.cost;
    this.damage = Number(mst.damage || 0);
    this.damageCaption = mst.damageCaption || mst.damage;
    this.description = mst.description;
    this.effect = mst.effect;
    this.timing = mst.timing;
  };

  Skill.prototype.satisfy = function(energy) {
    return UtilFunc.checkEnoughEnergy(this.cost, energy);
  };
})(jQuery);