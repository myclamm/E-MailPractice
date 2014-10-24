'use strict';

angular
  .module('gmailApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login")
    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .state('main', {
        url:'/main',
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      })
        .state('main.inbox', {
          url:'/inbox',
          templateUrl: 'views/inbox.html',
          controller: 'inboxCtrl'
        })
        .state('main.outbox', {
          url:'/outbox',
          templateUrl: 'views/outbox.html',
          controller: 'outboxCtrl'
        })
        .state('main.trash', {
          url:'/trash',
          templateUrl: 'views/trash.html',
          controller: 'trashCtrl'
        })
        .state('main.compose', {
          url:'/compose',
          templateUrl: 'views/compose.html',
          controller: 'composeCtrl'
        })
        .state('main.singleMail', {
          url:'/singleMail',
          templateUrl: 'views/singleMail.html',
          controller: 'singleMailCtrl'
        })
  });
