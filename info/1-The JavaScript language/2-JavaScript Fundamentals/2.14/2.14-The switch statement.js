// A estrutura switch é uma alternativa elegante e organizada para substituir múltiplas verificações com if. Quando precisamos comparar um mesmo valor com várias possibilidades, o switch torna o código mais legível e descritivo. Sua sintaxe básica consiste em blocos case que testam valores específicos, além de um bloco default opcional que cobre todos os casos restantes.

// Funciona assim: o valor passado para switch é comparado, usando igualdade estrita (===), com os valores definidos em cada case. Assim que uma correspondência é encontrada, a execução começa a partir daquele case e segue até encontrar um break — que encerra o bloco e impede que os próximos case sejam executados. Caso nenhuma correspondência ocorra, o código dentro de default será executado, se existir.

// Por exemplo, considere o seguinte código:

// javascript
// Copiar
// Editar
// let a = 2 + 2;

// switch (a) {
//   case 3:
//     alert('Muito pequeno');
//     break;
//   case 4:
//     alert('Exato!');
//     break;
//   case 5:
//     alert('Muito grande');
//     break;
//   default:
//     alert('Valor desconhecido');
// }
// Aqui, a vale 4, então o segundo case é executado e a mensagem “Exato!” é exibida. O break impede que as instruções dos demais case sejam executadas.

// Caso o break seja omitido, o código “cai” para os case seguintes, independentemente de seus valores, gerando uma execução contínua:

// javascript
// Copiar
// Editar
// let a = 2 + 2;

// switch (a) {
//   case 3:
//     alert('Muito pequeno');
//   case 4:
//     alert('Exato!');
//   case 5:
//     alert('Muito grande');
//   default:
//     alert('Valor desconhecido');
// }
// Neste caso, como não há break, veremos três mensagens na sequência: “Exato!”, “Muito grande” e “Valor desconhecido”.

// Tanto o valor no switch quanto os valores em cada case podem ser expressões complexas. Por exemplo:

// javascript
// Copiar
// Editar
// let a = "1";
// let b = 0;

// switch (+a) {
//   case b + 1:
//     alert('Isso funciona porque +a é 1, igual a b + 1');
//     break;
//   default:
//     alert('Isso não será exibido');
// }
// Isso mostra que podemos usar expressões dinâmicas tanto no valor testado quanto nos case.

// Também é possível agrupar diferentes case para que compartilhem o mesmo bloco de código:

// javascript
// Copiar
// Editar
// let a = 3;

// switch (a) {
//   case 4:
//     alert('Correto!');
//     break;

//   case 3:
//   case 5:
//     alert('Errado!');
//     alert('Que tal rever a tabuada?');
//     break;

//   default:
//     alert('Resultado inesperado');
// }
// Neste exemplo, tanto 3 quanto 5 acionam a mesma sequência de instruções.

// Por fim, é importante destacar que o switch utiliza comparação estrita. Isso significa que o tipo do valor também precisa coincidir. Observe:

// javascript
// Copiar
// Editar
// let arg = prompt("Digite um valor:");

// switch (arg) {
//   case '0':
//   case '1':
//     alert('Zero ou um');
//     break;
//   case '2':
//     alert('Dois');
//     break;
//   case 3:
//     alert('Nunca será executado!');
//     break;
//   default:
//     alert('Valor desconhecido');
// }
// Mesmo que o usuário digite “3”, o valor retornado por prompt será uma string, e não o número 3. Como case 3 espera um número, ele nunca será executado — o default será acionado.

// Portanto, o switch é ideal quando temos muitas comparações contra o mesmo valor, e sua clareza é aumentada quando usado com cuidado — especialmente lembrando da comparação estrita e do uso criterioso de break.