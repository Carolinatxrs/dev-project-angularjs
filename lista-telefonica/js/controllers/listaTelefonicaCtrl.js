angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatos, operadoras, serialGenerator) {
  $scope.app = "Lista Telefonica";
  $scope.contatos = contatos.data;
  $scope.operadoras = operadoras.data;

  var init = function () {
    calcularImpostos($scope.contatos);
    generateSerial($scope.contatos);
  };

  var calcularImpostos = function (contatos) {
    contatos.forEach(function (contato) {
      contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco);
    });
  };

  var generateSerial = function (contatos) {
    contatos.forEach(function (item) {
      item.serial = serialGenerator.generate();
    })
  };

  /* var carregarContatos = function () {
    contatosAPI.getContatos().then(function (response) {
      $scope.contatos = response.data;
    }).catch(function onError(response) {
      $scope.message = "Não foi possível carregar os dados";
      // console.log("Error: ", response);
    });
  }; */

  $scope.adicionarContato = function (contato) {
    contato.serial = serialGenerator.generate();
    contatosAPI.saveContato(contato).then(function (response) {
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
      carregarContatos();//depende da performace
      /*$scope.contatos.push(angular.copy(contatos)); //outra forma de chamar*/
    });
  };
  $scope.apagarContatos = function (contatos) {
    $scope.contatos = contatos.filter(function (contato) {
      if (!contato.selecionado) return contato;
    });
    $scope.verificarContatoSelecionado($scope.contatos);
  };
  var counter = 0;
  $scope.verificarContatoSelecionado = function (contatos) {
    console.log(counter++);
    $scope.hasContatoSelecionado = contatos.some(function (contato) {
      return contato.selecionado; /*pecorre o array e retorna os true*/
    });
  };
  $scope.ordenarPor = function (campo) {
    $scope.criterioDeOrdenacao = campo;
    $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
  };

  var calcularImposto = function (preco) {
    var imposto = 1.2;
    return preco * imposto;
  };

  init();
});