angular.module('tdd.listar').controller('ListarController', 
	function($rootScope, $scope, $location, $http, $window){ 
	$scope.aplicativo = {};
	$scope.retorno = {};
	$scope.paginas = [];
	$scope.mostrarLista = false;
	$scope.total = 0;


	 var load = function(){
		console.log('Load() - Listar');
		$('body').removeClass('sidebar-open');
		validarLogin();
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

		var url = $scope.profile.url + 'api/listaraplicacao';
		
		var data =  {};
		data.id =  $scope.profile.id;
		data.token = $scope.profile.token;
		data.local = $scope.profile.language;
		data.limit = $scope.limit;
		data.offset =  (paginaAtual - 1) * $scope.limit;
		
		$(".modal").show();
		var req = {
			method: 'POST',
			url: url,
			data: data
		}

		$http(req).then(function(resp){
			console.log(resp);
			$(".modal").hide();
			$scope.total = resp.data.total;
			$scope.retorno.sucesso = true;
			console.log(resp);
			$scope.aplicativos = resp.data.docs;
			paginacao(resp.data.total);
		}, function(error){
			console.log(error);
			$(".modal").hide();
		});
		/*
		$http.post(url, data, config)
		.success(function (data, status, headers, config) {
			$(".modal").hide();
			$scope.retorno.sucesso = true;
			console.log(data);
			$scope.aplicativos = data.docs;
			paginacao(data.total);

		})
		.error(function (data, status, header, config) {
			$(".modal").hide();
			console.log("Erro : " + data );
			if(!data){
				data = {};
				data.message = 'Deu merda, fuja daqui...';
			}
			$scope.retorno.erro = true;
			$scope.retorno.mensagem = data.message;
		});
		*/
		
	};
	
		/*delay(function(){
		console.log('sucesso ao chamar ' + new Date());
		listar(1);
	}, 120000 );*/
	var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
		};
	})();
	
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

	var getUrl = function() {
		console.log('getUrl');
		
		var url = '';
		
		switch(2) {
	    case 1:
	        url = 'http://localhost:8001/';
	        break;
	    case 2:
	        url = 'https://tdd-api.herokuapp.com/'
	        break;
		}
		return url;
	};

	$rootScope.url = getUrl();
	
	/**Iniciar tela **/
	load();
	$scope.listar = listar;
});