'use strict';

angular.module('bsApp.main', ['ui-rangeSlider'])
  .controller('CompareCtrl', ['$scope', function($scope) {

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

    $scope.increaseAmount = function() {
      if ($scope.amount.value !== $scope.amount.maxValue) {
        $scope.amount.value += $scope.amount.minValue;
      }
    };

    $scope.decreaseAmount = function() {
      if ($scope.amount.value !== $scope.amount.minValue) {
        $scope.amount.value -= $scope.amount.minValue;
      }
    };

    $scope.increaseTime = function() {
      if ($scope.time.value !== $scope.time.maxValue) {
        $scope.time.value += $scope.time.minValue;
      }
    };

    $scope.decreaseTime = function() {
      if ($scope.time.value !== $scope.time.minValue) {
        $scope.time.value -= $scope.time.minValue;
      }
    };


  }]);
