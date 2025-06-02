//lista de numeros já sorteados
let listaDeNumeros = [];
//contador de tentativas do usuario
let tentativas = 1;
//variavel para alterar o numero maximo de possibilidades do jogo
let limiteDeNumeroSorteado = 10;
//variavel para armazenar o numero gerado da funcao
let numeroAleatorio = gerarNumero();

//funcao que gera um numero aleatorio para o jogo
function gerarNumero() {
  //variavel criada para que se possa acrescentar os numeros sorteados na nossa lista, evitando repetir os numeros sorteados
  let numeroEscolhido = parseInt(Math.random() * limiteDeNumeroSorteado + 1);
  if (listaDeNumeros.includes(numeroEscolhido)) {
    return gerarNumero();
  } else {
    listaDeNumeros.push(numeroEscolhido);
    //apenas para acompanharmos os numeros na nossa lista em tempo real
    console.log(listaDeNumeros);
    return numeroEscolhido;
  }
}

//funcao para exibir mensagens na tela
function exibirMensagem(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  //teste de uso da biblioteca Web Speech para usar voz no projeto
  // if ("speechSynthesis" in window) {
  //   let utterance = new SpeechSynthesisUtterance(texto);
  //   utterance.lang = "pt-BR";
  //   utterance.rate = 1.2;
  //   window.speechSynthesis.speak(utterance);
  // } else {
  //   console.log("Web Speech API não suportada neste navegador.");
  // }
}

//funcao que exige a mensagem inicial de jogo
function mensagemInicial() {
  exibirMensagem("h1", "Jogo do número secreto");
  exibirMensagem("p", `Digite um número de 1 a ${limiteDeNumeroSorteado}`);
}

//chamando a mensagem inicial
mensagemInicial();

//funcao que realiza o chute do usuario ao clicar no botao "chutar"
function verificarChute() {
  //atribui o valor que o usuário digitou no input como o valor da variavel chute, para que seja armazenado e futuramente comparado com o número sorteado ao clicar no botao "Chutar"
  let chute = document.querySelector("input").value;

  //variavel criada para verificar o número de itens dentro da lista
  let quantidadeDeNumerosDaLista = listaDeNumeros.length;

  if (quantidadeDeNumerosDaLista == limiteDeNumeroSorteado) {
    listaDeNumeros = [];
  }

  //condicional para garantir que os números inseridos pelo usuário sejam válidos (entre 1 ao numero máximo estabelicido apenas)
  if (chute == "") {
    exibirMensagem("h1", "Número inexistente!");
    exibirMensagem("p", `Digite um número entre 1 a ${limiteDeNumeroSorteado}`);
    return;
  } else if (chute > limiteDeNumeroSorteado || chute == 0) {
    exibirMensagem("h1", "Número inválido!");
    exibirMensagem("p", `O número deve ser de 1 a ${limiteDeNumeroSorteado}`);
    //garente que se caso o usuário digitar um número que seja 0 ou exceda o limite máximo definido, o input volte a ficar limpo
    document.querySelector("input").value = "";
    return;
  }

  if (chute == numeroAleatorio) {
    exibirMensagem("h1", "Parabéns, você acertou!");
    //variavel criada sendo aplicada um operador ternário que só serve para situações baseada no resultado da função
    let palavraTentativa = tentativas == 1 ? "tentativa" : "tentativas";
    exibirMensagem("p", `Você conseguiu em ${tentativas} ${palavraTentativa}`);
    //remove o valor do input
    document.getElementById("reiniciar").removeAttribute("disabled");
    //desativa o botao de "Chutar" após o usuário acertar o número secreto, garantindo que ele não chute outros números sem antes iniciar um novo jogo
    document.getElementById("chutar").setAttribute("disabled", true);
  } else if (chute > numeroAleatorio) {
    exibirMensagem("h1", "Você errou!");
    exibirMensagem("p", `O número secreto é menor que ${chute}`);
  } else {
    exibirMensagem("h1", "Você errou!");
    exibirMensagem("p", `O número secreto é maior que ${chute}`);
  }

  tentativas++;
  limparInput();
}

//funcao para limpar o campo de input
function limparInput() {
  chute = document.querySelector("input");
  chute.value = "";
}

//funcao para o botao "Novo Jogo"
function novoJogo() {
  //gera a mensagem inicial do jogo, resetando o mesmo
  mensagemInicial();
  //gera um novo número aleatorio
  numeroAleatorio = gerarNumero();
  //volta as tentativas do usuário para 1
  tentativas = 1;
  //desativa a opcao de novo jogo novamente enquanto o usuário nao acertar o novo número secreto
  document.getElementById("reiniciar").setAttribute("disabled", true);
  //ativa a opcao de chute para o usuário ao iniciar um novo jogo
  document.getElementById("chutar").removeAttribute("disabled");

  //garante que eu veja o novo número secreto
  console.log(`Número secreto: ${numeroAleatorio}`);
}

//me mostra o número secreto
console.log(`Número secreto: ${numeroAleatorio}`);
