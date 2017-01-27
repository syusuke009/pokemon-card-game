(function($){

  BattleController = function() {
    this.effectDao_ = new EffectDao();
    this.calculator_ = new DamageCalculator();
  };

  BattleController.prototype.battle = function(model, skillKey) {
    var $defer = $.Deferred();

    var turn = model.getTurn();
    var attackerField = model.getField(turn.whoseTurn());
    var attacker = attackerField.getBattleMonster();
    var defenderField = model.getField(UtilFunc.reverseViewpoint(turn.whoseTurn()));
    var defender = defenderField.getBattleMonster();
    var skill = attacker[skillKey];

    turn.attacked();

    return this.blindProcess_(attacker, skill).then(function() {
      return this.confusionProcess_(attacker);
    }.bind(this), this.rejectProcess_).then(function() {
      return this.battle_(skill, attacker, defender, model);
    }.bind(this), this.rejectProcess_);

  };

  BattleController.prototype.rejectProcess_ = function() {
    return $.Deferred().reject().promise();
  };

  BattleController.prototype.blindProcess_ = function(attacker, skill) {
    var $defer = $.Deferred();
    if (attacker.getStatus().indexOf(Const.Status.BLIND) >= 0) {
      var dialog = new CoinTossDialog();
      return dialog.show().then(function(response){
        if (response[0]) {
          $defer.resolve();
        } else {
          MessageDisplay.newSentence(attacker.name + ' の ' + skill.name + '！');
          MessageDisplay.println('しかし ワザはしっぱいした');
          $defer.reject();
        }
        return $defer.promise();
      });
    }
    return $defer.resolve(true).promise();
  };

  BattleController.prototype.confusionProcess_ = function(attacker) {
    var $defer = $.Deferred();
    if (attacker.getStatus().indexOf(Const.Status.CONFUSION) >= 0) {
      var dialog = new CoinTossDialog();
      dialog.show().then(function(response){
        if (response[0]) {
          $defer.resolve();
        } else {
          MessageDisplay.newSentence(attacker.name + ' は こんらんしてじぶんをこうげきした！');
          MessageDisplay.println(attacker.name + ' に 30 ダメージ！');
          attacker.hurt(30);
          $defer.reject();
        }
      });
      return $defer.promise();
    }
    return $defer.resolve().promise();
  };

  BattleController.prototype.battle_ = function(skill, attacker, defender, model) {
    if (defender.getDefenceEffect()[Const.Status.MATCHLESS]) {
      $defer.resolve(true);
      return $defer.promise();
    }

    MessageDisplay.newSentence(attacker.name + ' の ' + skill.name + '！');
    return this.processBeforeDamage_(skill, attacker, defender)
        .then(function(){
          return this.calculator_.calculate(skill, attacker, defender, model);
        }.bind(this))
        .then(this.processAfterDamage_.bind(this));
  };

  BattleController.prototype.processBeforeDamage_ = function(skill, attacker, defender) {
    var $defer = $.Deferred();

    if (skill.timing === Const.EffectTiming.BEFORE_DAMAGE) {
      var effect = this.effectDao_.getSkillEffect(skill.effect);
      var param = {};
      param.attacker = attacker;
      param.defender = defender;
      effect(param).then(function(){
        $defer.resolve();
      });
    } else {
      $defer.resolve();
    }

    return $defer.promise();
  };

  BattleController.prototype.processAfterDamage_ = function(response) {
    var $defer = $.Deferred();

    response.defender.hurt(response.damage);

    if (response.skill.timing === Const.EffectTiming.AFTER_DAMAGE) {
      var effect = this.effectDao_.getSkillEffect(response.skill.effect);
      var param = {};
      param.damage = response.damage;
      param.attacker = response.attacker;
      param.defender = response.defender;
      param.model = response.model;
      effect(param).then(function(){
        $defer.resolve(true);
      });
    } else {
      $defer.resolve(true);
    }
    return $defer.promise();
  };

})(jQuery);
