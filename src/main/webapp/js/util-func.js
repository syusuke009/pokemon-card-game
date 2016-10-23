(function($){

  UtilFunc = {};

  UtilFunc.isBaseMonster = function(kind){
    return String(kind) === '1';
  };

  UtilFunc.isEvolutionMonster = function(kind){
    return String(kind) === '2' || String(kind) === '3';
  };

  UtilFunc.isTrainer = function(kind){
    return String(kind) === 'goods' || String(kind) === 'supporter';
  };

  UtilFunc.isEnergy = function(kind){
    return String(kind) === 'energy' || String(kind) === 'energy-sp';
  };

  UtilFunc.existsBaseMonster = function(arr){
    return arr.some(function(card){
      return UtilFunc.isBaseMonster(card.kind);
    });
  };

  UtilFunc.getViewpoint = function(trnId) {
    if (trnId.indexOf(Const.Viewpoint.ME) === 0) {
      return Const.Viewpoint.ME;
    }
    return Const.Viewpoint.RIVAL;
  };

  UtilFunc.reverseViewpoint = function(viewpoint) {
    if (Const.Viewpoint.ME === viewpoint) {
      return Const.Viewpoint.RIVAL;
    }
    return Const.Viewpoint.ME;
  };

  UtilFunc.mapEnergyToArray = function(energies) {
    var arr = [];
    $.each(energies, function(idx, e) {
      var size = e.value;
      for (var i = 0; i < size; i++) {
        arr.push(e.type);
      }
    });
    arr.sort(function(a,b){
      var idxA = Const.Types.indexOf(a);
      var idxB = Const.Types.indexOf(b);
      if( idxA < idxB ) return -1;
      if( idxA > idxB ) return 1;
      return 0;
    });
    return arr;
  };

  UtilFunc.getTypeCaption = function(type) {
    switch(type) {
    case 'normal': return '無';
    case 'leaf': return '草';
    case 'fire': return '炎';
    case 'aqua': return '水';
    case 'thunder': return '雷';
    case 'fight': return '闘';
    case 'esper': return '超';
    default: return '';
    };
  };
})(jQuery);
