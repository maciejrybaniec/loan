angular.module('bsApp', ['bsApp.main', 'bsApp.track','bsApp.compare-service', 'ui-rangeSlider'])
  .constant('appConfig', {
    'apiUrl': 'http://macryb.usermd.net/api',
  });
