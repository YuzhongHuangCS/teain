'use strict';

/* js wirte for teain
 * design and code by Yuzo
 */

/* App Module */

var teaApp = angular.module('tea', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'teaControllers'
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
        when('/register', {
            templateUrl: '/static/tea/partials/tea-register.html',
            controller: 'registerController'
        }).
        when('/login', {
            templateUrl: '/static/tea/partials/tea-login.html',
            controller: 'loginController'
        }).
        when('/flow', {
            templateUrl: '/static/tea/partials/tea-flow.html',
            controller: 'flowController'
        }).
        when('/raise', {
            templateUrl: '/static/tea/partials/tea-raise.html',
            controller: 'raiseController'
        }).
        when('/ucenter', {
            templateUrl: '/static/tea/partials/tea-ucenter.html',
            controller: 'ucenterController'
        }).
        when('/weibo', {
            templateUrl: '/static/tea/partials/tea-weibo.html',
            controller: 'weiboController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

teaApp.run(function($rootScope, $cookies) {
    //app range initalize
    window.baseurl = '';
    //stoke update
    $rootScope.$on('$routeChangeSuccess', function(event, current) {
        //console.log(event, current);
        var total = document.querySelectorAll('.entry');
        angular.element(total).removeClass('selected');
    });
    //addPrefix function
    window.addPrefix = function addPrefix(data) {
        for (var i = data.length - 1; i >= 0; i--) {
            data[i].fields.img_src = baseurl + '/media/' + data[i].fields.img_src;
        };
        return data;
    }
    //myAlert function
    window.myAlert = function myAlert(text) {
        var target = document.querySelector('#myAlert');
        angular.element(target).html(text);

        angular.element(target).css('display', 'block');
        setTimeout(function() {
            angular.element(target).css('opacity', '0.9');
        }, 50);

        function fadeOut() {
            angular.element(target).css('opacity', '0');
            setTimeout(function() {
                angular.element(target).css('display', 'none');
            }, 800);
        };

        setTimeout(function() {
            fadeOut();
        }, 3000);
        target.addEventListener('click', function() {
            fadeOut();
        });
    }
    //change text of the login button
    if ($cookies.username) {
        var target = document.querySelector('#toRegister');
        angular.element(target).text($cookies.username);
    }
    //toRegister function
    window.toRegister = function toRegister() {
        //console.log($cookies);
        if ($cookies.username) {
            if (confirm("退出当前账户？")) {
                //buggy?
                //$cookies.username = "";
                document.cookie = 'username=';
                window.location.reload();
            };
        } else {
            window.location.href = '#/register';
        }
    }
});

/* Controllers */

var teaControllers = angular.module('teaControllers', []);

teaControllers.controller('indexController', ['$scope', '$http', '$cookies',
    function($scope, $http, $cookies) {
        var path = baseurl + '/api/get_cloth_list/1/6/';
        //console.log(path);
        $http.get(path).success(function(data) {
            $scope.clothes = addPrefix(data);
            //control welcome banner
            if (!$cookies.username) {
                var target = document.querySelector('#welcome')
                angular.element(target).css('display', 'block');
            }
        });
    }
]);

teaControllers.controller('detailController', ['$scope', '$routeParams', '$http', '$cookies',
    function($scope, $routeParams, $http, $cookies) {
        //init functions
        var path = baseurl + '/api/get_cloth/' + $routeParams.itemID + '/';
        //console.log(path);
        $http.get(path).success(function(data) {
            $scope.cloth = addPrefix(data)[0];
        });

        var path = baseurl + '/api/get_cloth_sizes/' + $routeParams.itemID + '/';
        $http.get(path).success(function(data) {
            $scope.sizes = data;
        });

        var path = baseurl + '/api/get_cloth_imgs/' + $routeParams.itemID + '/';
        $http.get(path).success(function(data) {
            $scope.imgs = addPrefix(data);
            angular.element(document).ready(function() {
                var clickEvent = document.createEvent("MouseEvents");
                clickEvent.initEvent("click", true, true);
                document.querySelector('.imgs img').dispatchEvent(clickEvent);
            });
        });

        var path = baseurl + '/api/get_cloth_descs/' + $routeParams.itemID + '/';
        $http.get(path).success(function(data) {
            $scope.descs = addPrefix(data);
        });

        //interact functions
        $scope.changeImg = function(img, $event) {
            var imgNodes = document.querySelectorAll('.imgs img')
            angular.element(imgNodes).removeClass('selected');
            angular.element($event.target).addClass('selected');
            //$event.target.className = 'selected';
            for (var i = $scope.imgs.length - 1; i >= 0; i--) {
                if ($scope.imgs[i].pk === img.pk) {
                    $scope.cloth.fields.img_src = $scope.imgs[i].fields.img_src;
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

        //purchase functions
        $scope.num = 1;
        //get csrf
        var path = baseurl + '/api/make_order/';
        $http.get(path);
        //buyButton
        $scope.buy = function buy(clothID, num) {
            var postData = {
                user_id: $cookies.userID,
                cloth_id: clothID,
                num: num,
                csrfmiddlewaretoken: $cookies.csrftoken
            }

            var config = {
                method: 'POST',
                url: path,
                data: postData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                }
            }

            $http(config).success(function(data) {
                if (data == 'ok') {
                    myAlert('<span class="icon-ok-sign"></span> 购买成功');
                } else {
                    myAlert('<span class="icon-minus-sign"></span> 购买失败');
                }
            });
        }
    }
]);

teaControllers.controller('registerController', ['$scope', '$http', '$cookies',
    function($scope, $http, $cookies) {
        var current = document.querySelector('#toRegister');
        angular.element(current).addClass('selected');

        //get csrf
        var path = baseurl + '/accounts/register/';
        $http.get(path);

        $scope.checkMust = function checkMust($event) {
            //console.log($event.target);
            var target = angular.element($event.target);
            if (target.val()) {
                target.removeClass('invalid');
                target.addClass('valid');
            } else {
                target.removeClass('valid');
                target.addClass('invalid');
            }
        }


        $scope.register = function register() {
            $scope.info.csrfmiddlewaretoken = $cookies.csrftoken;

            var config = {
                method: 'POST',
                url: path,
                data: $scope.info,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                }
            }

            $http(config).success(function(data) {
                if (data == 'ok') {
                    myAlert('<span class="icon-ok-sign"></span> 注册成功');
                    var path = baseurl + '/accounts/userinfo/';
                    $http.get(path).success(function(data) {
                        //console.log(data);
                        $cookies.username = data[0].fields.username;
                        $cookies.userID = data[0].pk;
                        setTimeout(function() {
                            window.location.href = '/';
                        }, 1000)
                    })
                } else {
                    myAlert('<span class="icon-minus-sign"></span> 注册失败');
                }
            });
        }
    }
]);

teaControllers.controller('loginController', ['$scope', '$http', '$cookies',
    function($scope, $http, $cookies) {
        var current = document.querySelector('#toRegister');
        angular.element(current).addClass('selected');

        //get csrf
        var path = baseurl + '/accounts/login/';
        $http.get(path);

        $scope.checkMust = function checkMust($event) {
            //console.log($event.target);
            var target = angular.element($event.target);
            if (target.val()) {
                target.removeClass('invalid');
                target.addClass('valid');
            } else {
                target.removeClass('valid');
                target.addClass('invalid');
            }
        }

        $scope.login = function login() {
            $scope.info.csrfmiddlewaretoken = $cookies.csrftoken;

            var config = {
                method: 'POST',
                url: path,
                data: $scope.info,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                }
            }

            $http(config).success(function(data) {
                if (data == 'ok') {
                    myAlert('<span class="icon-ok-sign"></span> 登录成功');
                    var path = baseurl + '/accounts/userinfo/';
                    $http.get(path).success(function(data) {
                        //console.log(data);
                        $cookies.username = data[0].fields.username;
                        $cookies.userID = data[0].pk;
                        setTimeout(function() {
                            window.location.href = '/';
                        }, 1000)
                    })
                } else {
                    myAlert('<span class="icon-minus-sign"></span> 登录失败');
                }
            });
        }
    }
]);

teaControllers.controller('flowController', ['$scope', '$http',
    function($scope, $http) {
        var current = document.querySelector('#entry');
        angular.element(current).addClass('selected');

        $scope.orderProp = 'fields.end_date';
        $scope.reverse = 1;

        $scope.quantity = 6;
        //$scope.$watch('quantity');

        var path = baseurl + '/api/get_cloth_list/1/100/';

        $http.get(path).success(function(data) {
            $scope.clothes = addPrefix(data);
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

teaControllers.controller('raiseController', ['$scope', '$http',
    function($scope, $http) {
        var current = document.querySelector('#raise');
        angular.element(current).addClass('selected');

        //bind click
        var img = document.querySelector('#preview');
        angular.element(img).on('click', function(event) {
            //console.log(event);
            var clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("click", true, true);
            document.querySelector('#raiseFile').dispatchEvent(clickEvent);
        });

        //preview function
        window.previewImage = function previewImage(file) {
            //console.log(file.files.item(0));
            if (file.files.item(0).size > 10485760) {
                alert('这个图有点大。。。');
                return false;
            }
            switch (file.files.item(0).type) {
                case 'image/pjpeg':
                    ;
                case 'image/jpeg':
                    ;
                case 'image/png':
                    ;
                case 'image/x-png':
                    ;
                case 'image/gif':
                    break;
                default:
                    alert('这个是图吗。。。');
                    return false;
            }
            var MAXWIDTH = 128;
            var MAXHEIGHT = 128;
            var div = document.querySelector('#preview');

            div.innerHTML = '<img id=imghead>';
            var img = document.querySelector('#imghead');
            img.onload = function() {
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width = rect.width;
                img.height = rect.height;
                //img.style.marginLeft = rect.left+'px';
                img.style.marginTop = rect.top + 'px';
            }
            var reader = new FileReader();
            reader.onload = function(evt) {
                img.src = evt.target.result;
            }
            reader.readAsDataURL(file.files[0]);
        }

        function clacImgZoomParam(maxWidth, maxHeight, width, height) {
            var param = {
                top: 0,
                left: 0,
                width: width,
                height: height
            };
            var rateWidth, rateHeight;

            if (width > maxWidth || height > maxHeight) {
                rateWidth = width / maxWidth;
                rateHeight = height / maxHeight;

                if (rateWidth > rateHeight) {
                    param.width = maxWidth;
                    param.height = Math.round(height / rateWidth);
                } else {
                    param.width = Math.round(width / rateHeight);
                    param.height = maxHeight;
                }
            }

            param.left = Math.round((maxWidth - param.width) / 2);
            param.top = Math.round((maxHeight - param.height) / 2);
            return param;
        }
    }
]);

teaControllers.controller('ucenterController', ['$scope', '$http',
    function($scope, $http) {
        var current = document.querySelector('#ucenter');
        angular.element(current).addClass('selected');

        var path = '/api/get_user_orders/';

        $http.get(path).success(function(data) {
            $scope.orders = data;
        });
    }
]);

teaControllers.controller('weiboController', ['$scope', '$http',
    function($scope, $http) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = false;
        s.src = 'http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=2037499622';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);

        angular.element(document).ready(function() {
            WB2.anyWhere(function(W) {
                W.widget.connectButton({
                    id: "wb_connect_btn",
                    type: '3,2',
                    callback: {
                        login: function(o) {
                            alert(o.screen_name)
                        },
                        logout: function() {
                            alert('logout');
                        }
                    }
                });
            });
        });
    }
]);