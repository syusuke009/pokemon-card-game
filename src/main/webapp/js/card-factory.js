(function($){

  CardFactory = {};

  CardFactory.create = function(key, c) {
    switch(c.kind) {
    case '1':
    case '2':
    case '3':
      return new MonsterCard(key, c);
    case 'goods':
    case 'supporter':
      return new TrainerCard(key, c);
    case 'energy':
    case 'energy-sp':
      return new EnergyCard(key, c);
    default:
      return null;
    }
  };
})(jQuery);