angular.module('tdd.listar', []);

angular.module('tdd.listar').config(function($locationProvider, $routeProvider){
    $routeProvider
    .when('/listar', {
    	controller : 'ListarController',
    	templateUrl :'../modulos/listar/view.html'
    })
    .when('/', {
    	controller : 'ListarController',
    	templateUrl :'../modulos/listar/view.html'
    });
});