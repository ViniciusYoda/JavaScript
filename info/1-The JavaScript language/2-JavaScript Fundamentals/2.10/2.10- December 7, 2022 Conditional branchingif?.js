// Ramificação condicional: if, '?'
// Às vezes, precisamos realizar ações diferentes com base em condições diferentes.

// Para fazer isso, podemos usar a ifinstrução e o operador condicional ?, que também é chamado de operador “ponto de interrogação”.

// A declaração “se”
// A if(...)instrução avalia uma condição entre parênteses e, se o resultado for true, executa um bloco de código.

// Por exemplo:

// let year = prompt('In which year was ECMAScript-2015 specification published?', '');

// if (year == 2015) alert( 'You are right!' );
// No exemplo acima, a condição é uma verificação de igualdade simples ( year == 2015), mas pode ser muito mais complexa.

// Se quisermos executar mais de uma instrução, temos que envolver nosso bloco de código entre chaves:

// if (year == 2015) {
//   alert( "That's correct!" );
//   alert( "You're so smart!" );
// }
// Recomendamos envolver seu bloco de código com chaves {}sempre que usar uma ifinstrução, mesmo que haja apenas uma instrução para executar. Isso melhora a legibilidade.

// Conversão booleana
// A if (…)instrução avalia a expressão entre parênteses e converte o resultado em um booleano.

// Vamos relembrar as regras de conversão do capítulo Conversões de Tipo :

// Um número 0, uma string vazia "", null, undefined, e NaNtodos se tornam false. Por isso, são chamados de valores "falsos".
// Outros valores se tornam true, por isso são chamados de “verdadeiros”.
// Portanto, o código sob essa condição nunca seria executado:

// if (0) { // 0 is falsy
//   ...
// }
// …e dentro desta condição – sempre estará:

// if (1) { // 1 is truthy
//   ...
// }
// Também podemos passar um valor booleano pré-avaliado para if, assim:

// let cond = (year == 2015); // equality evaluates to true or false

// if (cond) {
//   ...
// }
// A cláusula “else”
// A ifinstrução pode conter um bloco opcional else. Ela é executada quando a condição é falsa.

// Por exemplo:

// let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

// if (year == 2015) {
//   alert( 'You guessed it right!' );
// } else {
//   alert( 'How can you be so wrong?' ); // any value except 2015
// }
// Várias condições: “else if”
// Às vezes, gostaríamos de testar diversas variantes de uma condição. A else ifcláusula nos permite fazer isso.

// Por exemplo:

// let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

// if (year < 2015) {
//   alert( 'Too early...' );
// } else if (year > 2015) {
//   alert( 'Too late' );
// } else {
//   alert( 'Exactly!' );
// }
// No código acima, o JavaScript primeiro verifica year < 2015. Se for falso, ele avança para a próxima condição year > 2015. Se também for falso, ele mostra o último alert.

// Pode haver mais else ifblocos. O final elseé opcional.

// Operador condicional '?'
// Às vezes, precisamos atribuir uma variável dependendo de uma condição.

// Por exemplo:

// let accessAllowed;
// let age = prompt('How old are you?', '');

// if (age > 18) {
//   accessAllowed = true;
// } else {
//   accessAllowed = false;
// }

// alert(accessAllowed);
// O chamado operador “condicional” ou “ponto de interrogação” nos permite fazer isso de uma forma mais curta e simples.

// O operador é representado por um ponto de interrogação ?. Às vezes, é chamado de "ternário", pois possui três operandos. Na verdade, é o único operador em JavaScript com essa quantidade.

// A sintaxe é:

// let result = condition ? value1 : value2;
// O conditioné avaliado: se for verdadeiro, então value1é retornado, caso contrário – value2.

// Por exemplo:

// let accessAllowed = (age > 18) ? true : false;
// Tecnicamente, podemos omitir os parênteses em torno de age > 18. O operador de ponto de interrogação tem baixa precedência, por isso é executado após a comparação >.

// Este exemplo fará a mesma coisa que o anterior:

// // the comparison operator "age > 18" executes first anyway
// // (no need to wrap it into parentheses)
// let accessAllowed = age > 18 ? true : false;
// Mas os parênteses tornam o código mais legível, por isso recomendamos usá-los.

// Observe:
// No exemplo acima, você pode evitar usar o operador de ponto de interrogação porque a comparação em si retorna true/false:

// // the same
// let accessAllowed = age > 18;
// Vários '?'
// Uma sequência de operadores de ponto de interrogação ?pode retornar um valor que depende de mais de uma condição.

// Por exemplo:

// let age = prompt('age?', 18);

// let message = (age < 3) ? 'Hi, baby!' :
//   (age < 18) ? 'Hello!' :
//   (age < 100) ? 'Greetings!' :
//   'What an unusual age!';

// alert( message );
// Pode ser difícil entender o que está acontecendo no início. Mas, após uma análise mais aprofundada, podemos ver que se trata apenas de uma sequência comum de testes:

// O primeiro ponto de interrogação verifica se age < 3.
// Se verdadeiro, retorna 'Hi, baby!'. Caso contrário, continua para a expressão após os dois pontos “:”, verificando age < 18.
// Se for verdade, retorna 'Hello!'. Caso contrário, continua para a expressão após os próximos dois pontos ":", verificando age < 100.
// Se for verdade, retorna 'Greetings!'. Caso contrário, continua para a expressão após os últimos dois pontos ":", retornando 'What an unusual age!'.
// Veja como isso fica usando if..else:

// if (age < 3) {
//   message = 'Hi, baby!';
// } else if (age < 18) {
//   message = 'Hello!';
// } else if (age < 100) {
//   message = 'Greetings!';
// } else {
//   message = 'What an unusual age!';
// }
// Uso não tradicional de '?'
// Às vezes, o ponto de interrogação ?é usado como substituição para if:

// let company = prompt('Which company created JavaScript?', '');

// (company == 'Netscape') ?
//    alert('Right!') : alert('Wrong.');
// Dependendo da condição company == 'Netscape', a primeira ou a segunda expressão após o ?é executada e mostra um alerta.

// Não atribuímos um resultado a uma variável aqui. Em vez disso, executamos códigos diferentes dependendo da condição.

// Não é recomendado usar o operador de ponto de interrogação dessa maneira.

// A notação é mais curta que a declaração equivalente if, o que agrada a alguns programadores. Mas é menos legível.

// Aqui está o mesmo código usado ifpara comparação:

// let company = prompt('Which company created JavaScript?', '');

// if (company == 'Netscape') {
//   alert('Right!');
// } else {
//   alert('Wrong.');
// }
// Nossos olhos examinam o código verticalmente. Blocos de código que abrangem várias linhas são mais fáceis de entender do que um longo conjunto de instruções horizontais.

// O objetivo do operador de ponto de interrogação ?é retornar um valor ou outro, dependendo de sua condição. Use-o exatamente para isso. Use-o ifquando precisar executar diferentes ramificações de código.