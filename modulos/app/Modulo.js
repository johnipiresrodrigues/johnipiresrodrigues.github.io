angular.module('tdd.app', ['ngRoute']);

angular.module('tdd.app').config(function($locationProvider, $routeProvider){
    $routeProvider
    .when('/app/:id', {
    	controller : 'AppController',
    	templateUrl :'../modulos/app/view.html'
    });
});