angular.module('bsApp', [
    'ui-rangeSlider',
    'ui-notification',
    'bsApp.main',
    'bsApp.track',
    'bsApp.notification',
    'bsApp.compare-service',
    'bsApp.RatingDirective',
  ])
  .constant('appConfig', {
    'apiUrl': 'http://bankierski.pl/api',
  });
