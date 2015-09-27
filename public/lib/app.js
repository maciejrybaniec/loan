angular.module('bsApp', ['bsApp.main', 'ui-rangeSlider'])
  .constant('appConfig', {
    'apiUrl': 'http://localhost:8000/api',
  });
