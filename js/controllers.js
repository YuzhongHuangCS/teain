'use strict';

/* Controllers */

var teaControllers = angular.module('teaControllers', []);
var baseurl = 'http://218.244.131.160:8000';

teaControllers.controller('indexController', ['$scope', '$http',
    function($scope, $http) {
        var total = document.querySelectorAll('.entry');
        angular.element(total).removeClass('selected');

        var path = baseurl + '/api/get_cloth_list/1/6/';
        $http.get(path).success(function(data) {
            for (var i = data.length - 1; i >= 0; i--) {
                data[i].fields.img_src = baseurl + '/media/' + data[i].fields.img_src;
            };
            $scope.clothes = data;
        });
    }
]);

teaControllers.controller('detailController', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        var total = document.querySelectorAll('.entry');
        angular.element(total).removeClass('selected');

        //init functions
        var path = baseurl + '/api/get_cloth/' + $routeParams.itemID + '/';
        console.log(path);
        $http.get(path).success(function(data) {
            data[0].fields.img_src = baseurl + '/media/' + data[0].fields.img_src;
            $scope.cloth = data[0];
        });

        var path = baseurl + '/api/get_cloth_sizes/' + $routeParams.itemID + '/';
        $http.get(path).success(function(data) {
            $scope.sizes = data;
        });

        var path = baseurl + '/api/get_cloth_imgs/' + $routeParams.itemID + '/';
        $http.get(path).success(function(data) {
            for (var i = data.length - 1; i >= 0; i--) {
                data[i].fields.img_src = baseurl + '/media/' + data[i].fields.img_src;
            };
            $scope.imgs = data;
            window.imgs = data;
            angular.element(document).ready(function() {
                var clickEvent = document.createEvent("MouseEvents");
                clickEvent.initEvent("click", true, true);
                document.querySelector('.imgs img').dispatchEvent(clickEvent);
            });
        });

        var path = baseurl + '/api/get_cloth_descs/' + $routeParams.itemID + '/';
        $http.get(path).success(function(data) {
            for (var i = data.length - 1; i >= 0; i--) {
                data[i].fields.img_src = baseurl + '/media/' + data[i].fields.img_src;
            };
            $scope.descs = data;
        });

        //interact functions
        $scope.changeImg = function(img, $event) {
            var imgNodes = document.querySelectorAll('.imgs img')
            angular.element(imgNodes).removeClass('selected');
            angular.element($event.target).addClass('selected');
            //$event.target.className = 'selected';
            for (var i = window.imgs.length - 1; i >= 0; i--) {
                if (window.imgs[i].pk === img.pk) {
                    $scope.cloth.fields.img_src = window.imgs[i].fields.img_src;
                    break;
                }
            };
        }
        $scope.changeSize = function(size, $event) {
            var sizeNodes = document.querySelectorAll('.sizes li');
            //console.log(sizeNodes);
            angular.element(sizeNodes).removeClass('selected');
            angular.element($event.target).addClass('selected');
        }
    }
]);

teaControllers.controller('loginController', ['$scope', '$http',
    function($scope, $http) {
        var total = document.querySelectorAll('.entry');
        angular.element(total).removeClass('selected');

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

teaControllers.controller('flowController', ['$scope', '$http',
    function($scope, $http) {
        var total = document.querySelectorAll('.entry');
        angular.element(total).removeClass('selected');
        var current = document.querySelector('#entry');
        angular.element(current).addClass('selected');

        $scope.orderProp = 'fields.end_date';
        $scope.reverse = 1;

        $scope.quantity = 6;
        //$scope.$watch('quantity');

        var path = baseurl + '/api/get_cloth_list/1/100/';

        $http.get(path).success(function(data) {
            for (var i = data.length - 1; i >= 0; i--) {
                data[i].fields.img_src = baseurl + '/media/' + data[i].fields.img_src;
            };
            $scope.clothes = data;
        });

        var pageID = 1;
        window.onscroll = function(event) {
            //console.log(pageID * window.innerHeight - window.scrollY);
            if ((pageID * window.innerHeight + pageID * 25 - window.scrollY) < 25) {
                $scope.quantity = (++pageID) * 6;
                //force refresh data!!
                $scope.$digest();
            }
        }

        //interact functions
        $scope.changeStroke = function($event) {
            var orderNodes = document.querySelectorAll('.order-selector');
            angular.element(orderNodes).removeClass('selected');
            angular.element($event.target).addClass('selected');
        }
        $scope.changeFlag = function($event) {
            var flagNodes = document.querySelectorAll('.reverse-flag');
            angular.element(flagNodes).removeClass('selected');
            angular.element($event.target).addClass('selected');
        }
    }
]);