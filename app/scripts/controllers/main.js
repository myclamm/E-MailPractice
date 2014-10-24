'use strict';

angular.module('gmailApp')
  .factory('mainFactory', function($location) {
  	var mainPageFunctions = {
  		sendBackToLoginIfNotLoggedIn: function(){
  			if(localStorage.getItem('username') === 'null'){
  				console.log('nullllll')
  				$location.path('/')
  			}
  		}
  	}
  	return mainPageFunctions;
  })
  .controller('mainCtrl', function ($scope, mainFactory, $state) {
  	mainFactory.sendBackToLoginIfNotLoggedIn();
    $state.go('main.inbox');
  	$scope.currentUser = localStorage.getItem('username');
  });
