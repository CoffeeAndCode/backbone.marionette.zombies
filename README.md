# Marionette: Zombies

Monitor objects in your [Backbone Marionette](http://marionettejs.com/)
application to determine what is not being cleaned up properly.


## Installation

Include the `backbone.marionette.zombies.js` file on the page after the
`Backbone` and `Marionette` libraries. This library should be added before
any of your application code is called to ensure that all `Views` will
be monitored.


## Usage

A `zombies` property will be added to the `window` that will track what
views have been created, then remove their entries when the view's `close`
method is called.

Since we don't keep any references to objects, we won't introduce any more
zombies. However, it's probably best to only use this library during
development and to remove it when your site is in production.
