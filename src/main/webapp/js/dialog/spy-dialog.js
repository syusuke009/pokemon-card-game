(function($){

  SpyDialog = function() {
    this.$defer_ = null;
    this.myField_ = null;
    this.rivalField_ = null;
    this.spyResult_ = null;
  };

  var CARD_TEMPLATE = '{{#list}}' +
      '<div class="spy-target-card" data-id="{{trnId}}">' +
      '  <div class="card {{type_}}">' +
      '    <div class="type-area">' +
      '      <span class="type-mark"></span>' +
      '      <span class="kind-caption">{{kindCaption}}</span>' +
      '    </div>' +
      '    <img class="card-img img-{{kind}}" src="img/{{dir}}/{{code}}.jpg" />' +
      '    <div class="name-area">{{name}}</div>' +
      '  </div>' +
      '</div>' +
      '{{/list}}';

  var OPTION_TEMPLATE = '{{#count}}' +
      '<option value="{{val}}">{{val}}</option>' +
      '{{/count}}';

  SpyDialog.prototype.show = function(myfield, rivalField) {
    $('.dialog-backdrop').addClass('open');
    $('.dialog-window').addClass('open').height(400).width(400);
    $('.dialog-header').text('スパイ');
    var $content = $('.dialog-content').html(this.createContentDom_());
    var $buttons = $('.dialog-buttons').html(this.createButtonsDom_());

    this.myField_ = myfield;
    this.rivalField_ = rivalField;

    this.bindEvents_($content, $buttons);

    this.$defer_ = $.Deferred();
    return this.$defer_.promise();
  };

  SpyDialog.prototype.close = function() {
    var $content = $('.dialog-content');
    this.unbindEvents_($content, $('.dialog-buttons'));
    $('.dialog-backdrop').removeClass('open');
    $('.dialog-window').removeClass('open');

    this.$defer_.resolve(this.spyResult_);
  };

  SpyDialog.prototype.createContentDom_ = function() {
    var html = '';
    html += '<div class="spy-target">';
    html += '  <select class="spy-area">';
    html += '    <option value="1">自分の山札</option>';
    html += '    <option value="2">自分のサイド</option>';
    html += '    <option value="3">相手の山札</option>';
    html += '    <option value="4">相手のサイド</option>';
    html += '    <option value="5">相手の手札</option>';
    html += '  </select>';
    html += '  <span>の</span>';
    html += '  <span class="opt-deck">1番上</span>';
    html += '  <select class="opt-side hidden">';
    html += '  </select>';
    html += '  <select class="opt-hand hidden">';
    html += '  </select>';
    html += '  <span class="opt-side opt-hand hidden">枚目</span>';
    html += '</div>';
    html += '<div class="spy-result">';
    html += '</div>';
    return '<div class="spy-container">' + html + '</div>';
  };

  SpyDialog.prototype.createButtonsDom_ = function(require) {
    var btnClass = Array.isArray(require) ? '' : ''
    return '<button class="btn btn-primary ok-btn">決定</button><button class="btn close-btn hidden">閉じる</button></div>';
  };

  SpyDialog.prototype.bindEvents_ = function($content, $buttons) {
    $content.on('change', '.spy-area', this.onChangeSpyArea_.bind(this));
    $buttons.on('click', '.ok-btn', this.onClickOk_.bind(this));
    $buttons.on('click', '.close-btn', this.onClickClose_.bind(this));
  };

  SpyDialog.prototype.unbindEvents_ = function($content, $buttons) {
    $content.off();
    $buttons.off();
  };

  SpyDialog.prototype.onChangeSpyArea_ = function(e) {
    var val = $(e.target).val();
    switch (val) {
    case '1':
    case '3':
      $('.opt-side').addClass('hidden');
      $('.opt-hand').addClass('hidden');
      $('.opt-deck').removeClass('hidden');
      break;
    case '2':
      $('.opt-deck').addClass('hidden');
      $('.opt-hand').addClass('hidden');
      $('.opt-side').removeClass('hidden');
      $('select.opt-side').html(this.createNumberOptionDom_(this.myField_.getSide().length));
      break;
    case '4':
      $('.opt-deck').addClass('hidden');
      $('.opt-hand').addClass('hidden');
      $('.opt-side').removeClass('hidden');
      $('select.opt-side').html(this.createNumberOptionDom_(this.rivalField_.getSide().length));
      break;
    case '5':
      $('.opt-deck').addClass('hidden');
      $('.opt-side').addClass('hidden');
      $('.opt-hand').removeClass('hidden');
      $('select.opt-hand').html(this.createNumberOptionDom_(this.rivalField_.getHands().size()));
      break;
    }
  };

  SpyDialog.prototype.createNumberOptionDom_ = function(size) {
    var html = '';
    for (var i = 1; i <= size; i++) {
      html += '<option value="' + i + '">' + i +'</option>';
    }
    return html;
  };

  SpyDialog.prototype.onClickOk_ = function(e) {
    if ($(e.target).hasClass('disabled')) return;
    $(e.target).addClass('hidden');
    var $result = $('.spy-result');
    var card = null;
    var seq = 0;
    switch ($('.spy-area').val()) {
    case '1':
      card = this.myField_.getDeck().turnUp()[0];
      this.myField_.getDeck().putOn([card]);
      break;
    case '2':
      seq = Number($('.opt-side').val());
      card = this.myField_.getSide()[seq - 1];
      break;
    case '3':
      card = this.rivalField_.getDeck().turnUp()[0];
      this.rivalField_.getDeck().putOn([card]);
      break;
    case '4':
      seq = Number($('.opt-side').val());
      card = this.rivalField_.getSide()[seq - 1];
      break;
    case '5':
      seq = Number($('.opt-hand').val());
      card = this.rivalField_.getHands().getAll()[seq - 1];
      break;
    }
    this.spyResult_ = card;
    var html = Hogan.compile(CARD_TEMPLATE).render({'list':[card]});
    $result.html(html);
    $('.spy-target select').prop('disabled', true);
    $('.close-btn').removeClass('hidden');
  };

  SpyDialog.prototype.onClickClose_ = function(e) {
    if ($(e.target).hasClass('disabled')) return;
    this.close();
  };

})(jQuery);
