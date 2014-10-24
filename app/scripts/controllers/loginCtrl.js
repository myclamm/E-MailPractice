angular.module('gmailApp')
	.factory('loginFactory', function($http,$location) {
		var loginSignupFunctions = {
			login: function(username,password) {
				if(!username || !password){
					return alert('Please enter a valid username and password');
				}
				var data = {
					username: username,
					password: password
				};
				return $http.post('/login',data);
			},
			checkIfLogged: function() {
				if(localStorage.getItem('username') != 'null'){
					$location.path('/main')
				}
			},
			logout: function() {
				localStorage.setItem('username','null')
				console.log('You just logged out! username is now ',localStorage.getItem('username'))
				$location.path('/')
			},
			signup: function(username, password) {
				var data = {
					username: username,
					password: password
				}
				return $http.post('/signup',data);
			}


		}
		return loginSignupFunctions;
	})
	.controller('loginCtrl', function($scope,loginFactory,$window,$location,$state) {
		loginFactory.checkIfLogged();
		$scope.login = function(username,password) {
			return loginFactory.login(username,password)
			.success(function(data){
				if(data === 'Wrong password') {
					alert('Wrong username or password, try again');
				} else {
					localStorage.setItem('username',data)
					console.log('just set localStorage.username to',data,"will now send u to main page")
					$location.path('/main')
					// $state.go('main.inbox')
				}
			})
			.error(function(error){
				console.log('error',error)
			})
		};
		$scope.signup = function(username, password) {
			return loginFactory.signup(username, password)
			.success(function(data) {
				console.log('haaaaaaay',data);
				if(data === 'Already taken'){
					alert('username is taken, try again')
				} else {
					localStorage.setItem('username',data)
					$location.path('/main')	
				}
			})
			.error(function(error) {
				console.log('sign up error', error)
			})
		}
		$scope.logout = loginFactory.logout;
		
	});