angular.module('tdd.cadastro', []);

angular.module('tdd.cadastro').config(function($locationProvider, $routeProvider){
    $routeProvider
    .when('/cadastrar', {
    	controller : 'CadastroController',
    	templateUrl :'../modulos/cadastro/view.html'
    });
});