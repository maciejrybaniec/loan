angular.module('bsApp', [
    'bsApp.main',
    'bsApp.track',
    'bsApp.notification',
    'bsApp.compare-service',
    'ui-rangeSlider',
    'ui-notification',
  ])
  .constant('appConfig', {
    'apiUrl': 'http://macryb.usermd.net/api',
  });
