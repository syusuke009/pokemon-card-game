(function($){

  FormComponents = {};

  FormComponents.EventType = {
      CHANGE_CHECKED: 'form-components-change-checked'
  };

  FormComponents.bindComponentEvents = function() {
    $(document).on('click', '.checkbox', function(e) {
      var $target = $(e.target);
      if ($target.hasClass('disabled')) return;
      $target.toggleClass('checked');
      $target.trigger(FormComponents.EventType.CHANGE_CHECKED);
    });
  };

  FormComponents.bindComponentEvents();
})(jQuery);
