angular.module('gmailApp')
	.factory('singleMailFactory', function () {
		var singleMailAttributes = {
			from: '',
			subject: '',
			text: ''
		}
		return singleMailAttributes
	})
	.controller('singleMailCtrl', function ($scope, singleMailFactory) {
		$scope.from = singleMailFactory.from
		$scope.subject = singleMailFactory.subject
		$scope.text= singleMailFactory.text
	})