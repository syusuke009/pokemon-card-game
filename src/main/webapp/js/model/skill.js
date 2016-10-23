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
    var stock = {};
    $.each(energy, function(idx, e) {
      var count = !!stock[e] ? stock[e] : 0;
      stock[e] = count + 1;
    });

    var normalCostCount = 0;
    $.each(this.cost, function(idx, e) {
      if (e === 'normal') {
        normalCostCount++;
        return;
      }
      var count = stock[e];
      stock[e] = count - 1;
    });

    var satisfyRequiredType = true;
    var extraCount = 0;
    $.each(stock, function(key, cnt) {
      if (cnt < 0) {
        satisfyRequiredType = false;
      }
      extraCount += cnt;
    });
    return satisfyRequiredType && normalCostCount <= extraCount;
  };
})(jQuery);