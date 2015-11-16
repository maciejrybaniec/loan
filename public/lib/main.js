'use strict';

angular.module('bsApp.main', ['bsApp.compare-service', 'bsApp.provider-service', 'ui-rangeSlider'])
  .controller('CompareCtrl', ['$scope', 'compareService', 'providerService', function($scope, compareService, providerService) {

    /* Default collections */
    $scope.searchArguments = {};
    $scope.visibleDetails = [];
    $scope.loanProviders = [];

    $scope.firstTimeBorrow = false;
    $scope.providersLoad = false;
    $scope.compareTrigger = false;
    $scope.showDetailsNotification = false;
    $scope.notificationDetails = {};
    /**
     * Initialize default values for popup notifications
     * @method setDefaultNotificationsValue
     */
    $scope.setDefaultNotificationsValue = function() {
      $scope.notifications = {
        conditions: false,
        email: '',
      };

      $scope.allowFormSend = true;
      $scope.notificationError = {};
    };
    /**
     * Initialize default values for loan slider
     * @method setDefaultSliderValues
     */
    $scope.setDefaultSliderValues = function() {
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
    };
    /**
     * Handle provider details email notification
     * {string} [index] element index
     * @method onSendDetails
     */
    $scope.onSendDetails = function(index) {
      $scope.notificationDetails = $scope.loanProviders[index];
      $scope.setDefaultNotificationsValue();
      $scope.showDetailsNotification = true;
    };
    /**
     * Called when user want to close popup notifications
     * @method onClosePopup
     */
    $scope.onClosePopup = function() {
      $scope.showDetailsNotification = false;
    };
    $scope.onSendMessage = function() {
      $scope.notificationError = {};
      if ($scope.allowFormSend && $scope.isValidPopupForm()) {
        var promise = providerService.sendDetailsNotification($scope.notifications.email, $scope.notificationDetails.provider);
        $scope.allowFormSend = false;
        promise.then(function(responseData) {
          
          $scope.showDetailsNotification = false;
          $scope.allowFormSend = true;
        });
      }
    };
    /**
     * Validate popup form
     * @method isValidPopupForm
     */
    $scope.isValidPopupForm = function() {
      var regex = $scope.regexMail();
      var isValid = true;

      if ($scope.notifications.email.length === 0 || regex.exec($scope.notifications.email) === null) {
        $scope.notificationError.email = 'Wprowadzono niepoprawny adres e-mail';
        isValid = false;
      }

      if ($scope.notifications.conditions === false) {
        $scope.notificationError.conditions = 'Musisz zaakceptować powyższe warunki użytkowania';
        isValid = false;
      }

      return isValid;
    };
    /**
     * Return regex for email
     * @method regexMail
     */
    $scope.regexMail = function() {
      return /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    };
    /**
     * Handle provider details render
     * {string} [index] element index
     * {object} [event] event object
     * @method toggleDetails
     */
    $scope.toggleDetails = function(index, event) {
      var currentTarget = event.currentTarget;

      var dataRender = currentTarget.getAttribute('data-render');
      var providerName = currentTarget.getAttribute('data-provider');
      var parentElement = currentTarget.parentNode.nodeName;

      if (!JSON.parse(dataRender)) {
        $scope.getProviderDetails(currentTarget, index, providerName);
      } else {
        $scope.setDetailClass(index);
      }
    };
    /**
     * Get details data for provider
     * {object} [element] DOM element
     * {string} [index] element index
     * {string} [providerName] provider name
     * @method getProviderDetails
     */
    $scope.getProviderDetails = function(element, index, providerName) {
      var promise = providerService.getProviderDetail(providerName);

      promise.then(function(providerData) {
        element.setAttribute('data-render', true);
        $scope.setDetailClass(index);
        $scope.extendProvider(providerName, providerData);
      });
    };
    /**
     * Extend provider object for details
     * {string} [providerName] provider name
     * {object} [providerData] provider details
     * @method extendProvider
     */
    $scope.extendProvider = function(providerName, providerData) {
      var index = providerService.findProvider($scope.loanProviders, 'provider', providerName);
      $scope.loanProviders[index]['details'] = providerData;
    };
    /**
     * Set proper class for provider element
     * {string} [index] element index
     * @method setDetailClass
     */
    $scope.setDetailClass = function(index) {
      $scope.visibleDetails[index] = $scope.visibleDetails[index] == 'bs-visible-details' ? '' : 'bs-visible-details';
    };
    /**
     * Called when user compare loan providers
     * @method onLoanCompare
     */
    $scope.onLoanCompare = function() {
      var body = document.getElementsByTagName('body')[0];
      body.setAttribute('data-compare', true);
      $scope.visibleDetails = [];

      var requestObject = {
        'time': $scope.time.value,
        'amount': $scope.amount.value,
        'firstTimeBorrow': $scope.firstTimeBorrow,
      };

      $scope.compareTrigger = true;
      $scope.providersLoad = true;
      compareService.getLoanProviders(requestObject, $scope.onCompareReturn);
    };
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
    };
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

    $scope.setDefaultSliderValues();
    $scope.setDefaultNotificationsValue();
  }]);
