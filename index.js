/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-street-view',

  contentFor: function (type, config) {
    var options = config.emberStreetView || {includeGoogleScriptTag: true};

    if (type === 'head' && options.includeGoogleScriptTag) {
      return '<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?v=3"></script>';
    }
  }
};
