'use strict';

/* Controllers */

var teaControllers = angular.module('teaControllers', []);
var baseurl = 'http://218.244.131.160:8000';

teaControllers.controller('indexController', ['$scope', '$http',
    function($scope, $http) {
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
        //init functions
        var path = baseurl + '/api/get_cloth/' + $routeParams.itemID + '/';
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
            for (var i = imgNodes.length - 1; i >= 0; i--) {
                imgNodes[i].className = '';
            };
            $event.target.className = 'selected';
            for (var i = window.imgs.length - 1; i >= 0; i--) {
                if (window.imgs[i].pk === img.pk) {
                    $scope.cloth.fields.img_src = window.imgs[i].fields.img_src;
                    break;
                }
            };
        }
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

teaControllers.controller('flowController', ['$scope', 'index',
    function($scope, tshirt) {

        function loadPage(pageID) {
            window.pages = pageID;
            var container = document.querySelector('#flow');
            var block = document.createElement('div')
            block.setAttribute('class', 'block');
            block.setAttribute('ng-repeat', 'cloth in clothes1');
            block.setAttribute('ng-include', "'partials/tea-flow-block.html'");
            container.appendChild(block);

            $scope.clothes1 = tshirt.flow({
                start: 1,
                limit: 6
            });
            $scope.$watch("clothes1", function() {
                console.log("Changed an input");
            }, true)
            console.log($scope.clothes1);
            $scope.$apply;
        }
        loadPage(1);
        /*
        window.pages = 1;
        loadPage(window.pages);
        window.onscroll = function(event) {
            if ((window.pages * window.innerHeight - window.scrollY) < 0) {
                //alert(window.pages);
                if (window.pages <= 7) {
                    loadPage(++window.pages)
                }

            }
        }*/
    }
]);