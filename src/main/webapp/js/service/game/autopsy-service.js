(function($){

  AutopsyService = {};

  AutopsyService.process = function(model, viewpoint) {
    var field = model.getField(viewpoint);
    var isDead = function(c) {
      return c.hp <= c.getDamageCount() * 10;
    };
    var count = 0;
    var monster = field.getBattleMonster();
    if (isDead(monster)) {
      monster.trush();
      field.setBattleMonster(null);
      if (!monster.isDummy) {
        count++;
      }
      MessageDisplay.println(monster.name + ' は たおれた！');
    }
    var dead = [];
    $.each(field.getBench(), function(idx, card) {
      if (isDead(card)) {
        dead.push(card.trnId);
        if (!card.isDummy) {
          count++;
        }
        MessageDisplay.println(card.name + ' は たおれた！');
      }
    });
    $.each(dead, function(idx, id) {
      field.pickBench(id).trush();
    });
    AutopsyService.getSide_(model.getField(UtilFunc.reverseViewpoint(viewpoint)), count);
  };

  AutopsyService.getSide_ = function(field, count) {
    for (var i = 0; i < count; i++) {
      var side = field.pickSide();
      if (side === null) {
        break;
      }
      field.addHand(side);
    }
  };

})(jQuery);