angular.module('gmailApp')
	.factory('singleMailFactory', function () {
		var singleMailAttributes = {
			from: '',
			subject: '',
			text: ''
		}
		return singleMailAttributes
	})
	.controller('singleMailCtrl', function ($scope, singleMailFactory, composeFactory) {
		$scope.from = singleMailFactory.from
		$scope.subject = singleMailFactory.subject
		$scope.text= singleMailFactory.text
		$scope.reply = function(address,subject,text){
			var username = localStorage.getItem('username');
			return composeFactory.send(address,subject,text,username);
		}
	})