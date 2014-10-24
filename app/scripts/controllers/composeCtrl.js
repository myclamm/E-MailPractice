angular.module('gmailApp')
	.factory('composeFactory', function ($http) {
		var composeFunctions = {
			send: function (address,subject,text,username) {
				var data = {
					address: address,
					subject: subject,
					text: text,
					username: username
				}
				return $http.post('/compose',data);
			}
		}
		return composeFunctions;
	})
	.controller('composeCtrl', function($scope, composeFactory, $window, $state) {
		$scope.send = function (address,subject,text) {
			var username = localStorage.getItem('username');
			return composeFactory.send(address,subject,text,username)
				.success(function (data) {
					console.log(data)
					$state.go('main.inbox')
				})
				.error(function (error) {
					console.log('compose error ',error)
				})
		}
	})