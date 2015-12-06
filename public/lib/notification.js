'use strict';

angular.module('bsApp.notification', ['ui-notification'])
  .config(function(NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'bottom'
    });
  })
  .controller('NotificationCtrl', ['$scope', 'Notification', function($scope, Notification) {
    $scope.$on('notification', function(event, message) {
      Notification[message.type](message.message);
    });
  }]);