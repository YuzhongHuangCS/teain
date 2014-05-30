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

        /*function loadPage(pageID) {
            window.pages = pageID;
            var container = document.querySelector('#flow');
            var block = document.createElement('div')
            block.setAttribute('class', 'block');
            block.setAttribute('ng-repeat', 'cloth in clothes');
            block.setAttribute('ng-include', "'partials/tea-flow-block.html'");
            container.appendChild(block);
            setTimeout(function() {
                $scope.clothes = tshirt.flow({
                    start: 1,
                    limit: 6
                });
                $scope.$apply();
            }, 1000);
        }
        loadPage(1);*/

        function loadPage(pageID) {
            switch (pageID) {
                case 1:
                    $scope.clothes1 = tshirt.flow({
                        start: pageID * 6 - 5,
                        limit: 6
                    });
                    break;

                case 2:
                    $scope.clothes2 = tshirt.flow({
                        start: pageID * 6 - 5,
                        limit: 6
                    });
                    break;

                case 3:
                    $scope.clothes3 = tshirt.flow({
                        start: pageID * 6 - 5,
                        limit: 6
                    });
                    break;

                case 4:
                    $scope.clothes4 = tshirt.flow({
                        start: pageID * 6 - 5,
                        limit: 6
                    });
                    break;

                case 5:
                    $scope.clothes5 = tshirt.flow({
                        start: pageID * 6 - 5,
                        limit: 6
                    });
                    break;

                case 6:
                    $scope.clothes6 = tshirt.flow({
                        start: pageID * 6 - 5,
                        limit: 6
                    });
                    break;
            }

        }
        window.pages = 1;
        loadPage(window.pages);
        window.onscroll = function(event) {
            if ((window.pages * window.innerHeight - window.scrollY) < 0) {
                //alert(window.pages);
                if (window.pages <= 7) {
                    loadPage(++window.pages)
                }

            }
        }
    }
]);