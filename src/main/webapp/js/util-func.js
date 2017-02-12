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

  UtilFunc.existsBaseMonster = function(hands){
    return hands.getAll().some(function(card){
      return UtilFunc.isBaseMonster(card.kind);
    });
  };

  UtilFunc.findEvolutionBase = function(evolution, field, turn) {
    var result = field.getBench().filter(function(c){
      return c.code === evolution.baseCardCode && !turn.isNewAssignedMonster(c.trnId);
    });
    var battleMonster = field.getBattleMonster();
    if (battleMonster !== null) {
      if (battleMonster.code === evolution.baseCardCode && !turn.isNewAssignedMonster(battleMonster.trnId)) {
        result.push(battleMonster);
      }
    }
    return result.map(function(c){
      return c.trnId;
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

  UtilFunc.mapToTrnId = function(cards) {
    return cards.map(function(c) {
      return c.trnId;
    });
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

  UtilFunc.checkEnoughEnergy = function(require, provide) {
    var stock = {};
    provide.forEach(function(e) {
      var count = !!stock[e] ? stock[e] : 0;
      stock[e] = count + 1;
    });

    var normalCostCount = 0;
    require.forEach(function(e) {
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
    if (satisfyRequiredType && normalCostCount <= extraCount) {
      return true;
    }
    if (stock["rainbow"] >= require.length) {
      return true;
    }
    return false;

  };

  UtilFunc.calculateExtraEnergy = function(require, provide, type) {
    var stock = {};
    provide.forEach(function(e) {
      var count = !!stock[e] ? stock[e] : 0;
      stock[e] = count + 1;
    });

    var normalCostCount = 0;
    require.forEach(function(e) {
      if (e === 'normal') {
        normalCostCount++;
        return;
      }
      var count = stock[e];
      stock[e] = count - 1;
    });

    var specificTypeCount = 0;
    var otherTypeCount = 0;
    $.each(stock, function(key, val) {
      if (key === type) {
        specificTypeCount += val;
      } else {
        otherTypeCount += val;
      }
    });
    if (otherTypeCount >= normalCostCount) {
      return specificTypeCount;
    }
    var lackNormalCount = normalCostCount - otherTypeCount;
    if (lackNormalCount > specificTypeCount) {
      return 0;
    }
    return specificTypeCount - lackNormalCount;
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
