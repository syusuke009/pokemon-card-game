(function($){

  Effects = {};

  Effects.skill_1_1 = function($defer, param) {
    var d = param.attacker.getDamage();
    if (d > 0) {
      param.attacker.hurt(-10);
    }
    $defer.resolve();
  };

})(jQuery);
