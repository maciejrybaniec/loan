'use strict';

angular.module('bsApp.track', ['ngCookies'])
  .controller('TrackCtrl', ['$scope', '$cookies', function($scope, $cookies) {
    $scope.showCookieLaw = false;
    /**
     * Check if need to show cookie law info
     * @method isAcceptedCookieLaw
     */
    $scope.isAcceptedCookieLaw = function() {
      var cookieInfo = $cookies.get('bsCookieInfo');
      if (cookieInfo === undefined) {
        $scope.showCookieLaw = true;
      }
    };
    /**
     * Called when user close cookie info law
     * @method onCloseCookies
     */
    $scope.onCloseCookies = function() {
      $scope.showCookieLaw = false;
    };
    /**
     * Called when user accept cookie info law
     * @method onAcceptCookies
     */
    $scope.onAcceptCookies = function() {
      $cookies.put('bsCookieInfo', true);
      $scope.showCookieLaw = false;
    };
    
    /* Initialize cookie law info */
    $scope.isAcceptedCookieLaw();
  }]);
