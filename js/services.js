'use strict';

/* Services */
var baseurl = 'http://218.244.131.160:8000';

var teaModule = angular.module('teaServices', []);
teaModule.factory('clothes', ['$http', function($http) {
    var path = baseurl + '/api/get_cloth_list/1/6/';
    $http.get(path).success(function(data) {
        console.log(data);
        return data;
    });
}])