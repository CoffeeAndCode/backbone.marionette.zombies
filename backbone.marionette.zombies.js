(function(Backbone, Marionette, window) {
  'use strict';

  var windowProperty = 'zombies';
  var zombies = {
    views: new Backbone.Collection()
  };

  var constructor = Marionette.View;
  var properties = {
    prototype: Marionette.View.prototype
  };
  _.each(_.keys(Marionette.View), function(key) {
    properties[key] = Marionette.View[key];
  });

  Marionette.View = function() {
    var result = constructor.apply(this, arguments);
    var attributes = { id: this.cid };

    if (typeof this.template === 'string') {
      attributes.template = this.template;
    }

    zombies.views.push(new Backbone.Model(attributes));
    return result;
  };
  _.each(properties, function(value, key) {
    Marionette.View[key] = value;
  });

  var destroy = Marionette.View.prototype.destroy;
  Marionette.View.prototype.destroy = function() {
    var result = destroy.apply(this, arguments);
    zombies.views.remove(zombies.views.get(this.cid));
    return result;
  };

  if (!_.has(window, windowProperty)) {
    window[windowProperty] = zombies;
  } else {
    console.warn('window.' + windowProperty + ' property already exists, unable to provide access');
  }
})(Backbone, Marionette, window);
