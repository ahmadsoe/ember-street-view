import Ember from 'ember';
import layout from '../templates/components/street-view';

const {
  get: get,
  set: set,
  on,
  observer
} = Ember;

export default Ember.Component.extend({
  layout: layout,

  lat: 0,
  lng: 0,

  // default options
  addressControl: true,
  clickToGo: true,
  disableDefaultUI: true,
  disableDoubleClickZoom: true,
  enableCloseButton: false,
  imageDateControl: false,
  linksControl: true,
  panControl: true,
  scrollwheel: true,
  visible: true,
  zoomControl: true,

  radius: 50,
  panorama: null,

  visibleDidChanged: observer('visible', function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      var panorama = get(this, 'panorama');
      panorama.setVisible(get(this, 'visible'));
    });
  }),

  latLngDidChanged: observer('lat', 'lng', function() {
    var panorama = get(this, 'panorama');
    var radius = get(this, 'radius');
    var service = new google.maps.StreetViewService();
    var position = new google.maps.LatLng(get(this, 'lat'), get(this, 'lng'));

    service.getPanoramaByLocation(position, radius, function(result, status) {
      if (status === google.maps.StreetViewStatus.OK) {
        panorama.setPosition(position);
        panorama.setVisible(true);
      } else {
        Ember.Logger.warn('Street view: ', status);
        panorama.setVisible(false);
      }
    });
  }),

  initStreetView: on('didInsertElement', function() {
    var position = new google.maps.LatLng(get(this, 'lat'), get(this, 'lng'));

    var options = {
      position: position,
      addressControl: get(this, 'addressControl'),
      clickToGo: get(this, 'clickToGo'),
      disableDefaultUI: get(this, 'disableDefaultUI'),
      disableDoubleClickZoom: get(this, 'disableDoubleClickZoom'),
      enableCloseButton: get(this, 'enableCloseButton'),
      imageDateControl: get(this, 'imageDateControl'),
      linksControl: get(this, 'linksControl'),
      panControl: get(this, 'panControl'),
      scrollwheel: get(this, 'scrollwheel'),
      visible: get(this, 'visible'),
      zoomControl: get(this, 'zoomControl')
    };

    var panorama = new google.maps.StreetViewPanorama(
      this.$('div.street-view-canvas')[0],
      options
    );

    set(this, 'panorama', panorama);
  }),

  destroyStreetView: on('willDestroyElement', function() {
    set(this, 'panorama', null);
  })
});
