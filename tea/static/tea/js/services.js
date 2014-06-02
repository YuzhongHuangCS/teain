'use strict';

/* Services */
// var baseurl = 'http://2.teeshirt.sinaapp.com/';
var baseurl = 'http://218.244.131.160:8000/';

angular.module('tshirt', ['ngResource']).
factory('tshirt', function($resource) {
    return $resource(baseurl + 'api/:action/:start/:limit/', {}, {
        index: {
            method: 'GET',
            params: {
                action: 'get_cloth_list',
                start: 1,
                limit: 6
            },
            isArray: true
        },
        flow: {
            method: 'GET',
            params: {
                action: 'get_cloth_list',
                start: 1,
                limit: 10
            },
            isArray: true
        },
        detail: {
            method: 'GET',
            params: {
                action: 'get_cloth',
                start: 1,
            },
            isArray: true
        },
        size: {
            method: 'GET',
            params: {
                action: 'get_cloth_sizes',
                start: 1,
            },
            isArray: true
        }
    })
});

angular.module('account', ['ngResource']).
factory('account', function($resource) {
    return $resource(baseurl + 'accounts/:action/', {}, {
        register: {
            method: 'GET',
            params: {
                action: 'register',
            },
            isArray: false
        },
        login: {
            method: 'GET',
            params: {
                action: 'login',
            },
            isArray: false
        }
    })
});
