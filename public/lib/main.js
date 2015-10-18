'use strict';

angular.module('bsApp.main', ['bsApp.compare-service', 'ui-rangeSlider'])
  .controller('CompareCtrl', ['$scope', 'compareService', function($scope, compareService) {
    /* Variables */
    $scope.amount = {
      value: 1000,
      maxValue: 10000,
      minValue: 100,
    };

    $scope.time = {
      value: 15,
      maxValue: 100,
      minValue: 1,
    };

    $scope.searchArguments = {};

    $scope.firstTimeBorrow = false;
    $scope.providersLoad = false;

    /**
     * Called when user compare loan providers
     * @method onLoanCompare
     */
    $scope.onLoanCompare = function() {
        var body = document.getElementsByTagName('body')[0];
        body.setAttribute('data-compare', true);

        var requestObject = {
          'time': $scope.time.value,
          'amount': $scope.amount.value,
          'firstTimeBorrow': $scope.firstTimeBorrow,
        };
        $scope.providersLoad = true;
        compareService.getLoanProviders(requestObject, $scope.onCompareReturn);
      }
      /**
       * Handle response from compare service
       * {object} [response] response object
       * @method onCompareReturn
       */
    $scope.onCompareReturn = function(response) {
      $scope.providersLoad = false;
      if (response === false) {

      } else {
        $scope.searchArguments.value = $scope.amount.value;
        $scope.searchArguments.time = $scope.time.value;
        $scope.loanProviders = response;
      }
    }

    /**
     * Called when user increment amount value
     * @method increaseAmount
     */
    $scope.increaseAmount = function() {
      if ($scope.amount.value !== $scope.amount.maxValue) {
        $scope.amount.value += $scope.amount.minValue;
      }
    };
    /**
     * Called when user decrement amount value
     * @method increaseAmount
     */
    $scope.decreaseAmount = function() {
      if ($scope.amount.value !== $scope.amount.minValue) {
        $scope.amount.value -= $scope.amount.minValue;
      }
    };
    /**
     * Called when user increment time value
     * @method increaseAmount
     */
    $scope.increaseTime = function() {
      if ($scope.time.value !== $scope.time.maxValue) {
        $scope.time.value += $scope.time.minValue;
      }
    };
    /**
     * Called when user decrement time value
     * @method increaseAmount
     */
    $scope.decreaseTime = function() {
      if ($scope.time.value !== $scope.time.minValue) {
        $scope.time.value -= $scope.time.minValue;
      }
    };
  }]);
