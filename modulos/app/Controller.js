angular.module('tdd.app').controller('AppController', 
	function($route, $rootScope, $scope, $location, $http, $window, $routeParams){ 
	$scope.aplicativo = {};
	$scope.retorno = {};
	$scope.fecharRow = true;

	$scope.mostrarMensagens = false;
	$scope.mostrarApp = false;
	
	
	 var load = function(){
	 	$scope.mostrarMensagens = false;
	 	$scope.mostrarApp = false;
	 	var anuncio = localStorage.getItem('anuncio');
	 	if(anuncio != $routeParams.id){
	 		console.log('anuncio ');
	 		localStorage.setItem('anuncio', $routeParams.id );
	 		$window.location.reload();
	 	}
	 	
		console.log('App Load() ' + $routeParams.id);
		$('body').removeClass('sidebar-open');
	 	$scope.profile = angular.fromJson(localStorage.getItem('profile')); 
		$scope.retorno.erro = false;
		$scope.retorno.sucesso = false;
		buscar();
	 };

	 var validarLogin = function(){
	 	var perfil = angular.fromJson(localStorage.getItem('profile'));
	 	if(!perfil){
	 		$window.location.href = '/';
	 	}
	 };
	 
	var buscar = function(){
		$scope.retorno.erro = false;
		$scope.retorno.sucesso = false;
		console.log('buscar');
		var usuario = $scope.usuario;

		var url = $scope.profile.url + 'api/buscaraplicativo';
		var data =  {};
		data.idApp = $routeParams.id;
		data.id =  $scope.profile.id;
		data.token = $scope.profile.token;
		
		$(".modal").show();
		$http.post(url, data)
		.success(function (data, status, headers, config) {
			$(".modal").hide();
			if(data){
				$scope.mostrarApp = true;
				$scope.aplicativo = data;
			}else{
				$scope.mostrarMensagens = true;
				$scope.retorno.sucesso = false;
				$scope.classe = 'alert-danger';
				$scope.classeSpan = 'glyphicon glyphicon-remove';
				$scope.retorno.mensagem = 'Você já baixou este aplicativo.';
			}
			
		})
		.error(function (data, status, header, config) {
			$(".modal").hide();
			console.log("Erro : " + data );
			if(!data){
				data = {};
				data.message = 'Error: Tente novamente em alguns minutos...';
			}

			$scope.mostrarMensagens = true;
			$scope.retorno.sucesso = false;
			$scope.classe = 'alert-danger';
			$scope.classeSpan = 'glyphicon glyphicon-remove';
			$scope.retorno.mensagem = data.message;
		});
		
	};

	$scope.irParaPlay = function(){
            $window.open('https://play.google.com/store/apps/details?id=' + $scope.aplicativo.pacote, '_blank');
     };

    $scope.ganharMoeda = function(){
		$scope.retorno.erro = false;
		$scope.retorno.sucesso = false;
		console.log('retirarMoeda');
		var usuario = $scope.usuario;

		var url = $scope.profile.url + 'api/ganharmoeda';
		var data =  {};
		data.idApp =  $routeParams.id;
		data.id = $scope.profile.id;
		data.token =  $scope.profile.token;
		data.pacote = $scope.aplicativo.pacote.toLowerCase();
		data.locale = $scope.profile.user.language.toLowerCase(); //Arrumar o login para pegar locale
		
		$(".modal").show();
		$http.post(url, data)
		.success(function (data, status, headers, config) {
			$(".modal").hide();
			$scope.mostrarApp = false;
			$scope.mostrarMensagens = true;
			$scope.retorno.sucesso = false;
			$scope.classe = 'alert-success';
			$scope.classeSpan = 'glyphicon glyphicon-ok';
			$scope.retorno.mensagem = 'Parabens Você ganhou 1 (Uma) Moeda';

			delay(function(){
				console.log('Baixou, sera redirecionado...');
				$window.location.href = '/dashboard';
			}, 2000 );
		})
		.error(function (data, status, header, config) {
			$(".modal").hide();
			console.log("Erro : " + data );
			if(!data){
				data = {};
				data.message = 'Erro no servidor, volte mais tarde...';
			}
			$scope.mostrarApp = false;
			$scope.mostrarMensagens = true;
			$scope.retorno.sucesso = false;
			$scope.classe = 'alert-info';
			$scope.classeSpan = 'glyphicon glyphicon-info-sign';
			$scope.retorno.mensagem = data.message;
			
			delay(function(){
				console.log('Baixou, sera redirecionado...');
				$window.location.href = '/dashboard';
			}, 4000 );
		});
		
	};

	var delay = ( function() {
	    var timer = 0;
	    return function(callback, ms) {
	        clearTimeout (timer);
	        timer = setTimeout(callback, ms);
		};
	})();

	/*delay(function(){
				console.log('sucesso ao chamar ' + new Date());
				listar(1);
	}, 120000 );*/
	
	/**Iniciar tela **/
	validarLogin();
	load();

	//"angular": "angularjs#^1.5.3",
	//"angular": "^1.5.5"
});