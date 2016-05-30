angular.module('tdd.meusapps', []);

angular.module('tdd.meusapps').config(function($locationProvider, $routeProvider){
    $routeProvider
    .when('/meusapps', {
    	controller : 'MeusAppsController',
    	templateUrl :'../modulos/meusapps/view.html'
    });
});