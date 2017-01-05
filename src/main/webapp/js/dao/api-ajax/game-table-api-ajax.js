(function($) {

  GameTableApiAjax = function(opt_apiConfig) {
    this.apiConfig_ = opt_apiConfig || this.resolveApiConfig_();
    this.baseUrl_ = this.apiConfig_['apiUrl'] + '/api/' + this.apiConfig_['apiVersion'] + '/';
  };

  GameTableApiAjax.prototype.resolveApiConfig_ = function() {
    var href = $(location).attr('href');
    if (href.indexOf('localhost') > -1) {
      return {
        'apiUrl': 'http://localhost:8080',
        'apiVersion': 'v1'
      }
    } else {
      // deployed environment
      return {
        'apiUrl': 'https://pokemon-card-server-game-table.herokuapp.com',
        'apiVersion': 'v1'
      }
    }
  };

  GameTableApiAjax.prototype.get = function(apiPath, parameters) {
    return $.ajax({
      'type': 'GET',
      'url': this.baseUrl_ + apiPath,
      'data': parameters
    });
  };

  GameTableApiAjax.prototype.post = function(apiPath, parameters) {
    return $.ajax({
      'type': 'POST',
      'url': this.baseUrl_ + apiPath,
      'data': parameters
    });
  };

})(jQuery);
