import Ember from 'ember';
import layout from '../templates/components/street-view';

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

  visibleDidChanged: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      var panorama = this.get('panorama');
      panorama.setVisible(this.get('visible'));
    });
  }.observes('visible'),

  latLngDidChanged: function() {
    var panorama = this.get('panorama');
    var radius = this.get('radius');
    var service = new google.maps.StreetViewService();
    var position = new google.maps.LatLng(this.get('lat'), this.get('lng'));

    service.getPanoramaByLocation(position, radius, function(result, status) {
      if (status === google.maps.StreetViewStatus.OK) {
        panorama.setPosition(position);
        panorama.setVisible(true);
      } else {
        Ember.Logger.warn('Street view: ', status);
        panorama.setVisible(false);
      }
    });
  }.observes('lat', 'lng'),

  initStreetView: function() {
    var position = new google.maps.LatLng(this.get('lat'), this.get('lng'));

    var options = {
      position: position,
      addressControl: this.get('addressControl'),
      clickToGo: this.get('clickToGo'),
      disableDefaultUI: this.get('disableDefaultUI'),
      disableDoubleClickZoom: this.get('disableDoubleClickZoom'),
      enableCloseButton: this.get('enableCloseButton'),
      imageDateControl: this.get('imageDateControl'),
      linksControl: this.get('linksControl'),
      panControl: this.get('panControl'),
      scrollwheel: this.get('scrollwheel'),
      visible: this.get('visible'),
      zoomControl: this.get('zoomControl')
    };

    var panorama = new google.maps.StreetViewPanorama(
      this.$('div.street-view-canvas')[0],
      options
    );

    this.set('panorama', panorama);
  }.on('didInsertElement'),

  destroyStreetView: function() {
    this.set('panorama', null);
  }.on('willDestroyElement')
});
