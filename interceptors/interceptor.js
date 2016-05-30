angular.module('tdd.app').factory("interceptor", function( $q, $window){
	return{
		request : function(config){
			var perfil = angular.fromJson(localStorage.getItem('profile')); 
			
			if(config.data){
				config.data.token = perfil.token,
				config.data.id = perfil.id
			}
			return config;
		},

		responseError: function(error) {
			if (error.status === 401 || error.status === 403) {
				 $window.location = '/';
			}
			return $q.reject(error);	
		}
	};
});