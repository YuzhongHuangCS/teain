'use strict';

/* Controllers */

var teaControllers = angular.module('teaControllers', []);

teaControllers.controller('indexController', ['$scope', '$http',
    function($scope, $http){
        var send = 'http://127.0.0.1:8000/tea/api/get_cloth_list/1/6/';
        $http.get(send).success(function(data){
            for (var i = data.length - 1; i >= 0; i--) {
                data[i].fields.img_src = '/media/' + data[i].fields.img_src;
            };
            $scope.clothes = data;
            //console.log(data);
        })
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
        $scope.clothes = tshirt.flow({start: 1, limit: 12});
    }
]);