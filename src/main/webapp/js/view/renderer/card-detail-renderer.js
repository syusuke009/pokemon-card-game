(function($){

  CardDetailRenderer = function($elm){
    this.$element_ = $elm;
  };

  CardDetailRenderer.prototype.render = function(card){
    var $content = this.$element_.find('.detail-content');
    $content.removeClass();
    $content.addClass('detail-content')
    $content.addClass(card.type);

    var $trnId = this.$element_.find('.detail-trn-id');
    $trnId.val(card.trnId);
    var $name = this.$element_.find('.detail-name');
    $name.text(card.name);
    var $kind = this.$element_.find('.detail-kind-caption');
    $kind.text(card.kindCaption);
    var $img = this.$element_.find('.detail-img');
    $img.removeClass();
    $img.addClass('detail-img');
    $img.addClass('img-' + card.kind);
    $img.attr('src', 'img/' + card.dir + '/' + card.code + '.jpg');
    var $hp = this.$element_.find('.detail-max-hp');
    var $monsterInfo = this.$element_.find('.detail-monster-info');
    var $decription = this.$element_.find('.detail-description');

    switch(card.kind) {
    case '1':
    case '2':
    case '3':
      $monsterInfo.show();
      $decription.hide();
      this.rendererForMonster_(card, $hp);
      break;
    case 'goods':
    case 'supporter':
      $monsterInfo.hide();
      $hp.hide();
      $decription.show();
      this.rendererForTrainer_(card, $decription);
      break;
    case 'energy':
      $monsterInfo.hide();
      $hp.hide();
      $decription.hide();
      this.rendererForNormalEnergy_(card);
      break;
    case 'energy-sp':
      $monsterInfo.hide();
      $hp.hide();
      $decription.hide();
      this.rendererForSpecialEnergy_(card, $decription);
      break;
    }
  };

  CardDetailRenderer.prototype.rendererForMonster_ = function(card, $hp){
    $hp.show();
    $hp.text('HP: ' + card.hp);

    var $skill1 = this.$element_.find('.detail-skill1');
    if (!!card.skill1) {
      $skill1.show();
      this.$element_.find('.skill1-cost').html(this.createTypeHtml_(card.skill1.cost));
      this.$element_.find('.skill1-name').text(card.skill1.name);
      this.$element_.find('.skill1-description').text(card.skill1.description);
      this.$element_.find('.skill1-damage').text(card.skill1.damageCaption);
    } else {
      $skill1.hide();
    }

    var $skill2 = this.$element_.find('.detail-skill2');
    if (!!card.skill2) {
      $skill2.show();
      this.$element_.find('.skill2-cost').html(this.createTypeHtml_(card.skill2.cost));
      this.$element_.find('.skill2-name').text(card.skill2.name);
      this.$element_.find('.skill2-description').text(card.skill2.description);
      this.$element_.find('.skill2-damage').text(card.skill2.damageCaption);
    } else {
      $skill2.hide();
    }

    var $escape = this.$element_.find('.detail-escape-cost');
    $escape.html('<span class="label">にげる</span><span class="detail-escape-simbol">━</span>' +
        this.createTypeHtml_(card.escapeCost));
    var $weak = this.$element_.find('.detail-weak');
    var weakType = this.getType_(card.weak);
    var weakHtml = !weakType ? 'なし' : this.createTypeHtml_([weakType]) +
        '<span class="label">' + card.weak[weakType].replace('*', '×') + '</span>';
    $weak.html('<span class="label">弱点</span>' + weakHtml);

    var $regist = this.$element_.find('.detail-regist');
    var registType = this.getType_(card.regist);
    var registHtml = !registType ? 'なし' : this.createTypeHtml_([registType]) +
        '<span class="label">' + card.regist[registType].replace('-', '－') + '</span>'
    $regist.html('<span class="label">抵抗力</span>' + registHtml);

    var $energy = this.$element_.find('.detail-energy');
    var energyHtml = this.createTypeHtml_(UtilFunc.mapEnergyToArray(card.getEnergy()))
    $energy.html('<span class="label">エネルギー</span><div class="value-group">' + energyHtml + '</div>');

    var $damage = this.$element_.find('.detail-damage');
    var damageHtml = this.createDamageHtml_(card.getDamageCount());
    $damage.html('<span class="label">ダメージ</span><div class="value-group">' + damageHtml + '</div>');

    var status = card.getStatus();
    var $status = this.$element_.find('.detail-status');
    if (status.length > 0) {
      $status.show();
      var statusHtml = this.createStatusHtml_(status);
      $status.html('<span class="label">ステータス</span><div class="value-group">' + statusHtml + '</div>');
    } else {
      $status.hide();
    }

  };

  CardDetailRenderer.prototype.rendererForTrainer_ = function(card, $decription){
    $decription.text(card.description)
  };

  CardDetailRenderer.prototype.rendererForNormalEnergy_ = function(card){
  };

  CardDetailRenderer.prototype.rendererForSpecialEnergy_ = function(card, $decription) {
    this.rendererForTrainer_(card, $decription);
  };

  CardDetailRenderer.prototype.createTypeHtml_ = function(types){
    var result = '';
    $.each(types, function(idx, t){
      result += '<div class="cost ' + t + '"></div>';
    });
    return result;
  };

  CardDetailRenderer.prototype.getType_ = function (obj) {
    if (!obj) {
      return null;
    }
    for (t in obj) {
      var i = Const.Types.indexOf(t);
      if (i < 0) {
        continue;
      }
      return t;
    }
    throw 'Ilegal Type. ' + obj;
  };

  CardDetailRenderer.prototype.createDamageHtml_ = function(damage){
    var result = '';
    for (var i = 0; i < damage; i++) {
      result += '<div class="damage-counter"></div>';
    };
    return result;
  };

  CardDetailRenderer.prototype.createStatusHtml_ = function(status) {

    var result = '';
    $.each(status, function(idx, s) {
      result += '<div class="status ' + s + '"></div>';
    });
    return result;
  };

})(jQuery);
