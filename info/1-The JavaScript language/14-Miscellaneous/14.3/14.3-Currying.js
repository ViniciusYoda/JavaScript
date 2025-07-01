// -----

// ## Currying

// Currying é uma técnica avançada de trabalho com funções. Ela é usada não apenas em JavaScript, mas também em outras linguagens.

// Currying é uma transformação de funções que converte uma função chamável como `f(a, b, c)` em chamável como `f(a)(b)(c)`.

// Currying não chama uma função. Apenas a transforma.

// Vamos ver um exemplo primeiro, para entender melhor do que estamos falando, e depois aplicações práticas.

// Vamos criar uma função auxiliar `curry(f)` que realiza o *currying* para uma função `f` de dois argumentos. Em outras palavras, `curry(f)` para uma função `f(a, b)` de dois argumentos a transforma em uma função que é executada como `f(a)(b)`:

// ```javascript
// function curry(f) { // curry(f) faz a transformação currying
//   return function(a) {
//     return function(b) {
//       return f(a, b);
//     };
//   };
// }

// // uso
// function sum(a, b) {
//   return a + b;
// }

// let curriedSum = curry(sum);
// alert( curriedSum(1)(2) ); // 3
// ```

// Como você pode ver, a implementação é simples: são apenas dois *wrappers*.

// O resultado de `curry(func)` é um *wrapper* `function(a)`.
// Quando é chamado como `curriedSum(1)`, o argumento é salvo no Ambiente Lexical, e um novo *wrapper* é retornado `function(b)`.
// Então este *wrapper* é chamado com `2` como argumento, e ele passa a chamada para a função `sum` original.

// Implementações mais avançadas de *currying*, como `_.curry` da biblioteca [lodash](https://www.google.com/search?q=https://lodash.com/docs/%23curry), retornam um *wrapper* que permite que uma função seja chamada tanto normalmente quanto parcialmente:

// ```javascript
// function sum(a, b) {
//   return a + b;
// }

// let curriedSum = _.curry(sum); // usando _.curry da biblioteca lodash
// alert( curriedSum(1, 2) ); // 3, ainda chamável normalmente
// alert( curriedSum(1)(2) ); // 3, chamada parcialmente
// ```

// -----

// ### Currying? Para quê?

// Para entender os benefícios, precisamos de um exemplo digno da vida real.

// Por exemplo, temos a função de registro `log(date, importance, message)` que formata e exibe a informação. Em projetos reais, tais funções têm muitos recursos úteis, como o envio de logs pela rede; aqui, usaremos apenas `alert`:

// ```javascript
// function log(date, importance, message) {
//   alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
// }
// ```

// Vamos aplicar *currying*\!

// ```javascript
// log = _.curry(log);
// ```

// Depois disso, `log` funciona normalmente:

// ```javascript
// log(new Date(), "DEBUG", "algum debug"); // log(a, b, c)
// ```

// ...Mas também funciona na forma *curried*:

// ```javascript
// log(new Date())("DEBUG")("algum debug"); // log(a)(b)(c)
// ```

// Agora podemos facilmente criar uma função de conveniência para logs atuais:

// ```javascript
// // logNow será a função parcial de log com o primeiro argumento fixo
// let logNow = log(new Date());

// // use-o
// logNow("INFO", "mensagem"); // [HH:mm] INFO mensagem
// ```

// Agora `logNow` é `log` com o primeiro argumento fixo, em outras palavras, "função parcialmente aplicada" ou "parcial" para abreviar.

// Podemos ir além e criar uma função de conveniência para logs de depuração atuais:

// ```javascript
// let debugNow = logNow("DEBUG");
// debugNow("mensagem"); // [HH:mm] DEBUG mensagem
// ```

// Então:

//   * Não perdemos nada após o *currying*: `log` ainda pode ser chamado normalmente.
//   * Podemos gerar facilmente funções parciais, como para os logs de hoje.

// -----

// ### Implementação avançada de curry

// Caso você queira entrar em detalhes, aqui está a implementação "avançada" de *curry* para funções com múltiplos argumentos que poderíamos usar acima.
// É bem curta:

// ```javascript
// function curry(func) {

//   return function curried(...args) {
//     if (args.length >= func.length) {
//       return func.apply(this, args);
//     } else {
//       return function(...args2) {
//         return curried.apply(this, args.concat(args2));
//       }
//     }
//   };
// }
// ```

// Exemplos de uso:

// ```javascript
// function sum(a, b, c) {
//   return a + b + c;
// }

// let curriedSum = curry(sum);
// alert( curriedSum(1, 2, 3) ); // 6, ainda chamável normalmente
// alert( curriedSum(1)(2,3) ); // 6, currying do 1º arg
// alert( curriedSum(1)(2)(3) ); // 6, currying completo
// ```

// O novo *curry* pode parecer complicado, mas é realmente fácil de entender.
// O resultado da chamada `curry(func)` é o *wrapper* `curried` que se parece com isto:

// ```javascript
// // func é a função a ser transformada
// function curried(...args) {
//   if (args.length >= func.length) { // (1)
//     return func.apply(this, args);
//   } else {
//     return function(...args2) { // (2)
//       return curried.apply(this, args.concat(args2));
//     }
//   }
// }
// ```

// Quando o executamos, há dois ramos de execução `if`:

// 1.  Se a contagem de `args` passados for igual ou maior do que a função original tem em sua definição (`func.length`), então basta passar a chamada para ela usando `func.apply`.
// 2.  Caso contrário, obtenha um parcial: ainda não chamamos `func`. Em vez disso, outro *wrapper* é retornado, que reaplicará `curried` fornecendo argumentos anteriores junto com os novos.

// Então, se o chamarmos, novamente, obteremos um novo parcial (se não houver argumentos suficientes) ou, finalmente, o resultado.

// -----

// #### Apenas funções de comprimento fixo

// O *currying* exige que a função tenha um número fixo de argumentos.
// Uma função que usa [parâmetros *rest*](https://www.google.com/search?q=https://javascript.info/rest-parameters-spread-syntax), como `f(...args)`, não pode ser *curried* desta forma.

// -----

// #### Um pouco mais do que currying

// Por definição, o *currying* deve converter `sum(a, b, c)` em `sum(a)(b)(c)`.
// Mas a maioria das implementações de *currying* em JavaScript são avançadas, como descrito: elas também mantêm a função chamável na variante de múltiplos argumentos.

// -----

// ### Resumo

// *Currying* é uma transformação que torna `f(a,b,c)` chamável como `f(a)(b)(c)`. As implementações em JavaScript geralmente mantêm a função chamável normalmente e retornam o parcial se a contagem de argumentos não for suficiente.

// *Currying* nos permite obter parciais facilmente. Como vimos no exemplo de registro, depois de aplicar *currying* à função universal de três argumentos `log(date, importance, message)`, obtemos parciais quando chamados com um argumento (como `log(date)`) ou dois argumentos (como `log(date, importance)`).