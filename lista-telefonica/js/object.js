var pedro = {
  nome: "Pedro",
  idade: 16
};
console.log(pedro);

//Factory Function

var criarPessoa = function (nome, idade) {
  return {
    nome: nome,
    idade: idade
  };
};

var maria = criarPessoa("Maria", 26);
console.log(maria);

//Constructor Function

var Pessoa = function (nome, idade) {
  this.nome = nome;
  this.idade = idade;
}

var otavio = new Pessoa("Otávio", 35);
console.log(otavio);