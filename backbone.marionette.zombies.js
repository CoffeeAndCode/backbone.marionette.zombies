(function(Backbone, window) {
  'use strict';

  var windowProperty = 'zombies';
  var zombies = {
    views: new Backbone.Collection()
  };

  var constructor = Backbone.Marionette.View.prototype.constructor;
  Backbone.Marionette.View.prototype.constructor = function() {
    var result = constructor.apply(this, arguments);
    var attributes = { id: this.cid };

    if (typeof this.template === 'string') {
      attributes.template = this.template;
    }

    zombies.views.push(new Backbone.Model(attributes));
    return result;
  };

  var close = Backbone.Marionette.View.prototype.close;
  Backbone.Marionette.View.prototype.close = function() {
    var result = close.apply(this, arguments);
    zombies.views.remove(zombies.views.get(this.cid));
    return result;
  };

  if (!_.has(window, windowProperty)) {
    window.zombies = zombies;
  } else {
    console.warn('window.' + windowProperty + ' property already exists, unable to provide access');
  }
})(Backbone, window);
