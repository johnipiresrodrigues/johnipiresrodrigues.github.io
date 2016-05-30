angular.module('tdd.navbar').controller('NavBarController', function($scope, $location, $http, $window){
	 console.log("NavBarController");


	 var load = function(){
	 	$scope.profile = angular.fromJson(localStorage.getItem('profile')); 
	 };

	 var validarLogin = function(){
	 	var perfil = angular.fromJson(localStorage.getItem('profile'));
	 	if(!perfil){
	 		$window.location.href = '/';
	 	}
	 };

	 validarLogin();
	 load();
});