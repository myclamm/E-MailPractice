angular.module('gmailApp')
	.factory('inboxFactory', function($http, $state, singleMailFactory) {
		var inboxFunctions = {
			generateInbox: function(username) {
				var data = {
					username: username
				}
				return $http.post('/inbox',data)
			},
			openMail: function(mail) {
				
				singleMailFactory.from = mail.from;
				singleMailFactory.subject = mail.subject;
				singleMailFactory.text = mail.text;
				console.log(mail)
				$state.go('main.singleMail');
			}
		}
		return inboxFunctions
	})
	.controller('inboxCtrl', function($scope, inboxFactory, $window) {
		var username = localStorage.getItem('username');
		inboxFactory.generateInbox(username)
			.success(function(data) {
				//data is currently an array of objects

				$scope.inboxItems = data;
				console.log('the data: ',data)
			})
			.error(function(error) {
				console.log('inbox generation error',error)
			})
		$scope.openMail = inboxFactory.openMail;
	})