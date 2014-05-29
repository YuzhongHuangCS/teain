'use strict';

/* js wirte for teain
 * design and code by Yuzo
 */

/* App Module */

var teaApp = angular.module('tea', [
    'ngRoute',
    'ngAnimate',
    'teaControllers',
    'tshirt',
    'account'
]);

teaApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/static/tea/partials/tea-index.html',
            controller: 'indexController'
        }).
        when('/item/:itemID', {
            templateUrl: '/static/tea/partials/tea-item.html',
            controller: 'detailController'
        }).
        when('/login', {
            templateUrl: '/static/tea/partials/tea-login.html',
            controller: 'loginController'
        }).
        when('/flow', {
            templateUrl: '/static/tea/partials/tea-flow.html',
            controller: 'flowController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);