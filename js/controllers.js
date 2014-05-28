'use strict';

/* Controllers */

var teaControllers = angular.module('teaControllers', []);

teaControllers.controller('indexController', ['$scope', 'tshirt',
    function($scope, tshirt) {
        $scope.clothes = tshirt.index();
    }
]);

teaControllers.controller('detailController', ['$scope', '$routeParams', 'tshirt',
    function($scope, $routeParams, tshirt) {
        $scope.clothes = tshirt.detail({
            start: $routeParams.itemID
        });
        $scope.sizes = tshirt.size({
            start: $routeParams.itemID
        });
    }
]);

teaControllers.controller('loginController', ['$scope', '$http',
    function($scope, $http) {
        $scope.register = function() {
            var send = 'http://2.teeshirt.sinaapp.com/accounts/register?id=' + $scope.info.id + '&password=' + $scope.info.password + '&email=' + $scope.info.email;
            $http.get(send).success(function(data) {
                if (data == 'ok') {
                    alert('注册成功');
                    window.location.href = '#/';
                } else {
                    alert('注册失败');
                }
            });
        }
    }
]);

teaControllers.controller('flowController', ['$scope', 'tshirt',
    function($scope, tshirt) {
        $scope.clothes = tshirt.flow({start: 1, limit: 9});
    }
]);