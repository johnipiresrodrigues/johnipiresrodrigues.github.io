angular.module('tdd.cadastro').controller('CadastroController', 
	function($rootScope, $scope, $location, $http, $window){ 
	$scope.aplicativo = {};
	$scope.retorno = {};
	$scope.mostrarMensagens = false;
	//alert-danger
	
	 var load = function(){
		console.log('Load()');
		$('body').removeClass('sidebar-open');
	 	$scope.profile = angular.fromJson(localStorage.getItem('profile')); 
		$scope.retorno.erro = false;
		$scope.retorno.sucesso = false;
		$scope.mostrarMensagens = false;
	 };

	 var validarLogin = function(){
	 	var perfil = angular.fromJson(localStorage.getItem('profile'));
	 	if(!perfil){
	 		$window.location.href = '/';
	 	}
	 };
	 
	 $scope.cadastrar = function(){
		console.log('cadastrar()');
		
		
		var data =  {};
		data.pacote = $scope.aplicativo.pacote;
		data.nome = $scope.aplicativo.nome;
		data.imagem = $scope.aplicativo.imagem;
		data.descricao = $scope.aplicativo.descricao;
		data.url = $scope.aplicativo.url;
		
		data.id =  $scope.profile.id;
		data.token = $scope.profile.token;
		data.local = $scope.profile.language;
		
		$(".modal").show();
		var url = $scope.profile.url + 'api/cadastraraplicacao';
		$http.post(url, data)
		.success(function (data, status, headers, config) {
			$(".modal").hide();
			$scope.mostrarMensagens = true;
			$scope.retorno.sucesso = false;
			$scope.classe = 'alert-success';
			$scope.classeSpan = 'glyphicon glyphicon-ok';
			$scope.retorno.mensagem = 'Cadastro efetuado com sucesso!, vá para Meus Apps e informe a quantidade de downloads que deseja para esse aplicativo';
		
			delay(function(){
				console.log('Baixou, sera redirecionado...');
				$window.location.href = '/#/meusapps';
			}, 3000 );
		})
		.error(function (data, status, header, config) {
			$(".modal").hide();
			console.log("Erro : " + data );
			if(!data){
				data = {};
				data.message = 'Ocorreu um  erro em nossos servidores, por favor tente novamente';
			}
			$scope.mostrarMensagens = true;
			$scope.retorno.sucesso = false;
			$scope.classe = 'alert-danger';
			$scope.classeSpan = 'glyphicon glyphicon-remove';
			$scope.retorno.mensagem = data.message;
		});
		 
	 };

	$scope.buscar = function(){
		$scope.retorno.erro = false;
		$scope.retorno.sucesso = false;
		$scope.mostrarMensagens = false;
		console.log('buscar');
		var usuario = $scope.usuario;

		var data =  {};
		data.pacote = $scope.aplicativo.pacote;
		data.local = $scope.profile.user.language.toLowerCase();
		
		$(".modal").show();
		var url = $scope.profile.url + 'api/detalhesaplicacao';
		$http.post(url, data)
		.success(function (data, status, headers, config) {
			$(".modal").hide();
			$scope.retorno.sucesso = true;
			console.log(data);
			$scope.aplicativo.nome = data.title;
			$scope.aplicativo.imagem = data.icon;
			$scope.aplicativo.descricao = getDescricao(data.description);
			$scope.aplicativo.url = data.url;
		})
		.error(function (data, status, header, config) {
			$(".modal").hide();
			console.log("Erro : " + data );
			if(!data){
				data = {};
				data.message = 'Tente novamente em alguns instantes...';
			}
			$scope.mostrarMensagens = true;
			$scope.classe = 'alert-danger';
			$scope.retorno.mensagem = data.message;
		});
		
	};
	
	var getDescricao = function(descricao){
		if(descricao.size < 200){
			return descricao + '...';
		}
		return descricao.substring(0,200) + '...';
	};
	
	var delay = ( function() {
	    var timer = 0;
	    return function(callback, ms) {
	        clearTimeout (timer);
	        timer = setTimeout(callback, ms);
		};
	})();
	
	/**Iniciar tela **/
	validarLogin();
	load();
});
