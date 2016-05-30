angular.module('tdd.meusapps').controller('MeusAppsController', 
	function($rootScope, $scope, $location, $http, $window){ 
	$scope.aplicativo = {};
	$scope.retorno = {};
	$scope.paginas = [];
	$scope.mostrarLista = false;
	$scope.moedas = 0;

	 var load = function(){
		console.log('Load() - Listar');
		$('body').removeClass('sidebar-open');
		validarLogin();
		buscarMoedas();
		listar(1);
		$scope.paginacao = false;
	 };

	 var validarLogin = function(){
	 	var perfil = angular.fromJson(localStorage.getItem('profile'));
	 	if(!perfil){
	 		$window.location.href = '/';
	 	}else{
	 		$scope.profile = perfil;
	 	}
	 };
	 

	var listar = function(paginaAtual){
		console.log('listar()');
		$scope.limit = 12;
		$scope.pg = paginaAtual;
		var usuario = $scope.usuario;

		var url = $scope.profile.url + 'api/meusapps';
		
		var data =  {};
		data.id =  $scope.profile.id;
		data.token = $scope.profile.token;
		data.local = $scope.profile.language;
		data.limit = $scope.limit;
		data.offset =  (paginaAtual - 1) * $scope.limit;

		var config = {
			headers : {
				'content-type': 'application/json; charset=UTF-8'
			}
		}
		
		$(".modal").show();
		$http.post(url, data, config)
		.success(function (data, status, headers, config) {
			$(".modal").hide();
			$scope.retorno.sucesso = true;
			console.log(data);
			$scope.aplicativos = data.docs;
			paginacao(data.total);
			/*delay(function(){
				console.log('sucesso ao chamar ' + new Date());
				listar(1);
			}, 120000 );*/
		})
		.error(function (data, status, header, config) {
			$(".modal").hide();
			console.log("Erro : " + data );
			if(!data){
				data = {};
				data.message = 'Ocorreu um erro em nossos servidores, por favor tente novamente em alguns instantes.';
			}
			$scope.retorno.erro = true;
			$scope.retorno.mensagem = data.message;
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
	
	var buscarMoedas = function(){
		console.log('buscarMoedas()');
		var usuario = $scope.usuario;

		var url = $scope.profile.url + 'api/buscarmoedas';
		
		var data =  {};
		data.id =  $scope.profile.id;
		data.token = $scope.profile.token;
		
		$http.post(url, data)
		.success(function (data, status, headers, config) {
			console.log('Sucesso buscarMoedas');
			$scope.moedas = data.moeda;
		})
		.error(function (data, status, header, config) {
			console.log('Erro buscarMoedas');
		});
		
	};

	var transferirMoedas = function(aplicativo){
		console.log('cadastrarMoedas');
		console.log(aplicativo.nome);
		aplicativo.erro = false;

		var quantidade = parseInt(aplicativo.quantidade);
		if ($scope.moedas < quantidade){
			aplicativo.erro = true;
			aplicativo.mensagem = "Você não tem moedas suficientes. Você tem apenas " + $scope.moedas +" moeda(s)"
			return;
		}

		var url = $scope.profile.url + 'api/transferirmoedas';
		
		var data =  {};
		data.id =  $scope.profile.id;
		data.token = $scope.profile.token;
		data.quantidade = aplicativo.quantidade;
        data.idApp = aplicativo._id;
		
		$http.post(url, data)
		.success(function (data, status, headers, config) {
			console.log('Sucesso buscarMoedas');
			load();
		})
		.error(function (data, status, header, config) {
			console.log('Erro buscarMoedas');
		});
	};

	var recuperarMoedas = function(aplicativo){
		console.log('recuperarMoedas');
		console.log(aplicativo.nome);
		aplicativo.erro = false;

		var url = $scope.profile.url + 'api/recuperarmoedas';
		
		var data =  {};
		data.id =  $scope.profile.Ka;
		data.token = $scope.profile.id_token;
        data.idApp = aplicativo._id;
		
		$http.post(url, data)
		.success(function (data, status, headers, config) {
			console.log('Sucesso buscarMoedas');
			load();
		})
		.error(function (data, status, header, config) {
			console.log('Erro buscarMoedas');
		});
	};

	var paginacao = function(total){
		$scope.paginas = [];
		/** Paginacao **/
		$scope.qtdPag = Math.ceil (total / $scope.limit);

		//$lim = 3;
	    $scope.lim = 3;

	    //$inicio = ((($pg - $lim) > 1) ? $pg - $lim : 1);
	    $scope.inicio = ((($scope.pg - $scope.lim) > 1) ? ($scope.pg - $scope.lim) : 1);
	    
	    //$fim =          ((($pg+$lim)          < $qtdPag)       ? $pg+$lim : $qtdPag);
	    $scope.fim = ((($scope.pg + $scope.lim) < $scope.qtdPag) ?  $scope.pg + $scope.lim : $scope.qtdPag);
		
		//if($qtdPag > 1 && $pg <= $qtdPag){
		if($scope.qtdPag > 1 && $scope.pg <= $scope.qtdPag){
			//for($i = $inicio; $i <= $fim; $i++){
			for(var i = $scope.inicio; i <= $scope.fim; i++){
			   var pagina ={};
			   if(i === $scope.pg){
				   pagina.selecionado = 'active';
			   }else{
			   	    pagina.selecionado = '';
			   }
			   pagina.index = i;
			   $scope.paginas.push(pagina);
			   
			}
			$scope.paginacao = true;
		}
	};
	
	/**Iniciar tela **/
	load();
	$scope.listar = listar;
	$scope.transferirMoedas = transferirMoedas;
	$scope.recuperarMoedas = recuperarMoedas;
});