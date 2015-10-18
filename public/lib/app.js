angular.module('bsApp', ['bsApp.main', 'bsApp.compare-service', 'ui-rangeSlider'])
  .constant('appConfig', {
    'apiUrl': 'http://localhost:8000/api',
  });
