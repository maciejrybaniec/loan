angular.module('bsApp.RatingDirective', [])
  .directive('ratingElement', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.rating = attrs.rating;
      },
      templateUrl: '/assets/templates/rating-element.html'
    };
  })
