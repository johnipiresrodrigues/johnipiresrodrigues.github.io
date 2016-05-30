angular.module('tdd.app').config(function($httpProvider){
	$httpProvider.interceptors.push("interceptor");
});