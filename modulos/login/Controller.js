angular.module('login').controller('LoginController', 
	function($rootScope, $scope, $location, $http, $window){

 	$scope.erro = false;
	var token;


	$scope.$on('event:google-plus-signin-success', function (event, authResult) {
      console.log('Signed in!');
      $scope.erro = false;
      token = authResult.id_token;
      gapi.client.load('plus', 'v1', apiClientLoaded);
    });

    function apiClientLoaded() {
        gapi.client.plus.people.get({userId: 'me'}).execute(function handleResponse(resp) {
        	console.log('handleResponse');

        	var data = {};
			data.token = token;
			
			data.id =  resp.id;
			data.language = resp.language;
			data.name = resp.displayName;
			data.image = resp.image.url;

        	var url = getUrl();
        	
        	var req = {
				method: 'POST',
				url: url + 'api/buscarusuario',
				data: data
			}

			$http(req).then(function(resp){
				console.log('Longin com sucesso');
				resp.data.url = getUrl();
				resp.data.token = token;
				$window.localStorage.setItem('profile', angular.toJson(resp.data));
				$window.location.href = 'dashboard';
			}, function(error){
				console.log(error);
				 $scope.erro = true;
			});
	    });
    }

    $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
      console.log('Not signed into Google Plus.');
      $scope.erro = true;
    });

   /*
	var onSuccess =  function(googleUser) {
		var profile = googleUser.getBasicProfile();
		
		// The ID token you need to pass to your backend:
		var id_token = googleUser.getAuthResponse().id_token;
		profile.id_token = id_token;
		profile.url = getUrl();
		$window.localStorage.setItem('profile', angular.toJson(profile));

		console.log('ID: ' + profile.getId());
		console.log('Name: ' + profile.getName());

		angular.url = 'johni';
		$window.location.href = 'dashboard';
	};		
	*/

	var getUrl = function() {
		console.log('getUrl');
		
		var url = '';
		
		switch(2) {
	    case 1:
	        url = 'http://localhost:8001/';
	        break;
	    case 2:
	    	var horaAtual = new Date().getHours();
	    	if(horaAtual >= 0 && horaAtual <= 12){
	        	url = 'https://tdd-api-am.herokuapp.com/'
	    	}else{
	    		url = 'https://tdd-api-pm.herokuapp.com/'
	    	} 
	        break;
		}
		return url;
	};

});