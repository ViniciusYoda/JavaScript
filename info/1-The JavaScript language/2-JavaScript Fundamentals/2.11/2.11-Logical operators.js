// Os operadores lógicos

// Existem quatro operadores lógicos em JavaScript: ||(OR), &&(E), !(Não, não), ??(Coalescimento de carvão) Aqui nós cobrimos os três primeiros, o ??O operador está no próximo artigo.

// Embora sejam chamados de “lógicos”, podem ser aplicados a valores de qualquer tipo, não apenas booleanos. O resultado também pode ser de qualquer tipo.

// Vamos ver os detalhes.
// | | (OR)

// O operador “OR” é representado com dois símbolos de linha verticais:

// result = a || b;

// Na programação clássica, o OR lógico destina-se a manipular apenas os valores booleanos. Se algum de seus argumentos é true, ele retorna true, caso contrário, ele retorna false- A . (í a questão: es. , , , íntepeo. . E. . es. sobre a questão

// Em JavaScript, o operador é um pouco mais complicado e mais poderoso. Mas primeiro, vamos ver o que acontece com os valores booleanos.

// Existem quatro combinações lógicas possíveis:

// alert( true || true );   // true
// alert( false || true );  // true
// alert( true || false );  // true
// alert( false || false ); // false

// Como podemos ver, o resultado é sempre trueExceto pelo caso quando ambos os operandos são false- A . (í a questão: es. , , , íntepe

// Se um operando não é booleano, é convertido em um booleano para a avaliação.

// Por exemplo, o número 1É tratado como true, o número de 0Como a false:

// if (1 || 0) { // works just like if( true || false )
//   alert( 'truthy!' );
// }

// Na maioria das vezes, ou ||é usado em um ifdeclaração para testar se alguma das condições da dada é true- A . (í a questão: es. , , , íntepe

// Por exemplo:

// let hour = 9;

// if (hour < 10 || hour > 18) {
//   alert( 'The office is closed.' );
// }

// Podemos passar mais condições:

// let hour = 12;
// let isWeekend = true;

// if (hour < 10 || hour > 18 || isWeekend) {
//   alert( 'The office is closed.' ); // it is the weekend
// }

// OU "||" encontra o primeiro valor verdadeiro

// A lógica descrita acima é um pouco clássica. Agora, vamos trazer os recursos “extras” do JavaScript.

// O algoritmo estendido funciona da seguinte forma.

// Dados vários valores OR’ed:

// result = value1 || value2 || value3;

// O OU ||O operador faz o seguinte:

//     Avalia os operandos da esquerda para a direita.
//     Para cada operando, converte-o em booleano. Se o resultado for true, pára e retorna o valor original desse operando.
//     Se todos os operandos foram avaliados (ou seja, todos foram false), retorna o último operando.

// Um valor é retornado em sua forma original, sem a conversão.

// Em outras palavras, uma cadeia de ou ||retorna o primeiro valor verdadeiro ou o último se nenhum valor de verdade for encontrado.

// Por exemplo:

// alert( 1 || 0 ); // 1 (1 is truthy)

// alert( null || 1 ); // 1 (1 is the first truthy value)
// alert( null || 0 || 1 ); // 1 (the first truthy value)

// alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)

// Isso leva a algum uso interessante em comparação com um “ouro puro, clássico, apenas booleano”.

//     Obtendo o primeiro valor verdadeiro de uma lista de variáveis ou expressões.

//     Por exemplo, nós temos firstName,, , - A , de pé sobre o que sobre o rodeas de rodeas de rodeas de rodeas de rodeas, de , de conta. , de lastNameE a nickNamevariáveis, todas opcionais (ou seja, podem ser indefinidas ou ter valores falsos).

//     Vamos usar OU ||para escolher aquele que tem os dados e mostrá-los (ou "Anonymous"se nada definir):

// let firstName = "";
// let lastName = "";
// let nickName = "SuperCoder";

// alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder

// Se todas as variáveis fossem falsas, "Anonymous"- Apareça-me.

// Avaliação de curto-circuito.

// Outra característica do OR ||O operador é a chamada avaliação do “circuito curto”.

// Isso significa que ||processa seus argumentos até que o primeiro valor veracidade seja alcançado, e então o valor é retornado imediatamente, sem sequer tocar no outro argumento.

// A importância desse recurso se torna óbvia se um operando não é apenas um valor, mas uma expressão com um efeito colateral, como uma atribuição de variáveis ou uma chamada de função.

// No exemplo abaixo, apenas a segunda mensagem é impressa:

//     true || alert("not printed");
//     false || alert("printed");

//     Na primeira linha, o ou ||O operador interrompe a avaliação imediatamente ao ver true, então o alert- Não é correr.

//     Por vezes, as pessoas usam este recurso para executar comandos apenas se a condição na parte esquerda for falsa.

// & & e (AND)

// O operador AND está representado com duas ampersand &&:

// result = a && b;

// Na programação clássica, e devoluções truese ambos os operandos são verdadeiros e falseDescotado o contrário:

// alert( true && true );   // true
// alert( false && true );  // false
// alert( true && false );  // false
// alert( false && false ); // false

// Um exemplo com if:

// let hour = 12;
// let minute = 30;

// if (hour == 12 && minute == 30) {
//   alert( 'The time is 12:30' );
// }

// Assim como com OR, qualquer valor é permitido como um operando de AND:

// if (1 && 0) { // evaluated as true && false
//   alert( "won't work, because the result is falsy" );
// }

// E “&&” encontra o primeiro valor falso

// Dados os múltiplos valores E’ed:

// result = value1 && value2 && value3;

// O E o E &&O operador faz o seguinte:

//     Avalia os operandos da esquerda para a direita.
//     Para cada operando, converte-o a um booleano. Se o resultado for false, pára e retorna o valor original desse operando.
//     Se todos os operandos foram avaliados (ou seja, todos foram verazes), retorna o último operando.

// Em outras palavras, E retorna o primeiro valor falsiciário ou o último valor se nenhum foi encontrado.

// As regras acima são semelhantes às OR. A diferença é que E retorna o primeiro valor falsicioso enquanto OU retorna o primeiro verdadeiro.

// Exemplos de informações:

// // if the first operand is truthy,
// // AND returns the second operand:
// alert( 1 && 0 ); // 0
// alert( 1 && 5 ); // 5

// // if the first operand is falsy,
// // AND returns it. The second operand is ignored
// alert( null && 5 ); // null
// alert( 0 && "no matter what" ); // 0

// Também podemos passar vários valores em uma fileira. Veja como o primeiro falsy é devolvido:

// alert( 1 && 2 && null && 3 ); // null

// Quando todos os valores são verdadeiros, o último valor é retornado:

// alert( 1 && 2 && 3 ); // 3, the last one

// A precedência de e &&é mais alto que o OR ||

// A precedência de E &&O operador é mais alto que o OR ||- A . (í a questão: es.

// Então o código a && b || c && dÉ essencialmente o mesmo que se &&As expressões estavam entre parênteses: (a && b) || (c && d)- A . (í a questão: es. , , ,
// Não substitua ifCom a sua informação ||ou a &&

// Por vezes, as pessoas usam o AND &&Operador como uma “maneira mais curta de escrever” if)

// Por exemplo:

// let x = 1;

// (x > 0) && alert( 'Greater than zero!' );

// A ação na parte certa de &&Executaria somente se a avaliação chegar a ele. Isto é, apenas se (x > 0)É verdade.

// Basicamente, temos um análogo para:

// let x = 1;

// if (x > 0) alert( 'Greater than zero!' );

// Embora, a variante com &&Parece mais curto, ifÉ mais óbvio e tende a ser um pouco mais legível. Por isso, recomendamos usar cada construção para sua finalidade: usar ifSe nós queremos ife usar &&Se quisermos e.
// ! - A este - Alusiva, (Não)

// O operador booleano NOT é representado com um sinal de exclamação !- A . (í a questão: es. , , , íntepeo. . E. . es

// A sintaxe é muito simples:

// result = !value;

// O operador aceita um único argumento e faz o seguinte:

//     Converte o operando em tipo booleano: true/false- A . (í a questão: es. , , , íntepeo.
//     Retorna o valor inverso.

// Por exemplo:

// alert( !true ); // false
// alert( !0 ); // true

// Um duplo não !!às vezes é usado para converter um valor em tipo booleano:

// alert( !!"non-empty string" ); // true
// alert( !!null ); // false

// Ou seja, o primeiro não converte o valor em booleano e retorna o inverso, e o segundo não o inversa novamente. No final, temos uma conversão de valor para boom.

// Há uma maneira um pouco mais detalhada de fazer a mesma coisa – um built-in BooleanA função:

// alert( Boolean("non-empty string") ); // true
// alert( Boolean(null) ); // false

// A precedência de não !é o mais alto de todos os operadores lógicos, por isso ele sempre executa primeiro, antes &&ou a ||- A . (í a questão: es. , , , íntepeo. . E. . es. sobre