(function(Backbone, window) {
  'use strict';

  if (!_.has(window, 'zombies')) {
    window.zombies = {
      models: {},
      views: {}
    };
  }

  var constructor = Backbone.Marionette.View.prototype.constructor;
  Backbone.Marionette.View.prototype.constructor = function() {
    var result = constructor.apply(this, arguments);
    window.zombies.views[this.cid] = 1;
    return result;
  };

  var close = Backbone.Marionette.View.prototype.close;
  Backbone.Marionette.View.prototype.close = function() {
    var result = close.apply(this, arguments);
    window.zombies.views[this.cid]--;
    if (window.zombies.views[this.cid] === 0) {
      delete window.zombies.views[this.cid];
    }
    return result;
  };
})(Backbone, window);
