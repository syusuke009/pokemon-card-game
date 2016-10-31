(function($){

  Skill = {};

  Skill = function(key, mst) {
    this.code = key;
    this.name = mst.name;
    this.cost = mst.cost;
    this.damage = mst.damage;
    this.damageCaption = mst.damageCaption || mst.damage;
    this.description = mst.description;
    this.effect = mst.effect;
    this.timing = mst.timing;

    this.dir = 'energy';
  };

  Skill.prototype.satisfy = function(energy) {
    return UtilFunc.checkEnoughEnergy(this.cost, energy);
  };
})(jQuery);