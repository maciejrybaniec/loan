'use strict';

angular.module('bsApp.notification', ['ui-notification'])
  .config(['NotificationProvider', function(NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'bottom'
    });
  }])
  .controller('NotificationCtrl', ['$scope', '$timeout', 'Notification', function($scope, $timeout, Notification) {

    var popularLoanProviders = [
      'Vivus',
      'NetCredit',
      'Filarum',
      'Kobieta z Kasą',
      'Ferratum Bank',
      'SohoCredit',
      'EkspresKasa'
    ];

   var loanActionTime = ['chwilę temu', '5 minut temu', '10 minut temu', '15 minut temu', 'w tej chwili'];
   var loanAmount = [400, 500, 600, 800, 900, 1100, 1500, 2100, 2700, 3000];
   var notificationDelay = Math.floor((Math.random() * 100) + 1) * 1000;

   $timeout(function() {
     var messageTime = Math.floor((Math.random() * loanActionTime.length) + 0);
     var messageAmount = Math.floor((Math.random() * loanAmount.length) + 0);
     var providerName = Math.floor((Math.random() * popularLoanProviders.length) + 0);

     Notification.info({
       delay: 5500,
       message: '<strong>' + loanActionTime[messageTime] + ' </strong> klient złożył wniosek o pożyczkę ' + loanAmount[messageAmount] + ' zł w <strong>' + popularLoanProviders[providerName] + '</strong>' ,
       positionY: 'bottom',
       positionX: 'left'
     });
   }, notificationDelay)

    $scope.$on('notification', function(event, message) {
      Notification[message.type](message.message);
    });
  }]);
