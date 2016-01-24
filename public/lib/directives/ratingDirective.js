angular.module('bsApp.RatingDirective', [])
  .directive('ratingElement', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.rating = attrs.rating;
      },
      templateUrl: '/lib/templates/rating-element.html'
    };
  })
