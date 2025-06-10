// Aqui está o texto adaptado para o português:

// ## Métodos de primitivos

// JavaScript nos permite trabalhar com valores primitivos (strings, números, etc.) como se fossem objetos. Eles também fornecem métodos para serem chamados como tal. Estudaremos isso em breve, mas primeiro veremos como funciona porque, é claro, os valores primitivos não são objetos (e aqui deixaremos isso ainda mais claro).

// Vamos analisar as principais distinções entre valores primitivos e objetos.

// ### Um valor primitivo

// * É um valor de um tipo primitivo.
// * Existem 7 tipos primitivos: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` e `undefined`.

// ### Um objeto

// * É capaz de armazenar múltiplos valores como propriedades.
// * Pode ser criado com `{}`, por exemplo: `{name: "John", age: 30}`. Existem outros tipos de objetos em JavaScript: funções, por exemplo, são objetos.
// * Uma das melhores coisas sobre objetos é que podemos armazenar uma função como uma de suas propriedades.

// ```javascript
// let john = {
//   name: "John",
//   sayHi: function() {
//     alert("Oi, amigo!");
//   }
// };

// john.sayHi(); // Oi, amigo!
// ```

// Então, aqui criamos um objeto `john` com o método `sayHi`.

// Muitos objetos embutidos já existem, como aqueles que trabalham com datas, erros, elementos HTML, etc. Eles têm diferentes propriedades e métodos.

// Mas, essas funcionalidades vêm com um custo!

// Objetos são "mais pesados" que valores primitivos. Eles exigem recursos adicionais para suportar a sua maquinaria interna.

// ### Um valor primitivo como um objeto

// Aqui está o paradoxo enfrentado pelo criador do JavaScript:

// * Há muitas coisas que se gostaria de fazer com um valor primitivo, como uma string ou um número. Seria ótimo acessá-los usando métodos.
// * Os valores primitivos devem ser o mais rápidos e leves possível.

// A solução parece um pouco estranha, mas aqui está:

// * Os valores primitivos ainda são primitivos. Um único valor, como desejado.
// * A linguagem permite o acesso a métodos e propriedades de strings, números, booleanos e símbolos.
// * Para que isso funcione, um "objeto invólucro" especial que fornece a funcionalidade extra é criado e, em seguida, é destruído.

// Os "objetos invólucro" são diferentes para cada tipo primitivo e são chamados de: `String`, `Number`, `Boolean`, `Symbol` e `BigInt`. Assim, eles fornecem diferentes conjuntos de métodos.

// Por exemplo, existe um método de string `str.toUpperCase()` que retorna a `str` em maiúsculas.

// Veja como funciona:

// ```javascript
// let str = "Olá";
// alert( str.toUpperCase() ); // OLÁ
// ```

// Simples, certo? Aqui está o que realmente acontece em `str.toUpperCase()`:

// 1.  A string `str` é um valor primitivo. Então, no momento de acessar sua propriedade, um objeto especial é criado que conhece o valor da string e possui métodos úteis, como `toUpperCase()`.
// 2.  Esse método é executado e retorna uma nova string (mostrada por `alert`).
// 3.  O objeto especial é destruído, deixando o valor primitivo `str` sozinho.

// Assim, os valores primitivos podem fornecer métodos, mas ainda permanecem leves.

// O motor JavaScript otimiza esse processo. Ele pode até mesmo pular a criação do objeto extra. Mas ainda deve aderir à especificação e se comportar como se criasse um.

// Um número tem seus próprios métodos, por exemplo, `toFixed(n)` arredonda o número para a precisão dada:

// ```javascript
// let n = 1.23456;
// alert( n.toFixed(2) ); // 1.23
// ```

// Veremos métodos mais específicos nos capítulos `Numbers` e `Strings`.

// ### Construtores `String`/`Number`/`Boolean` são apenas para uso interno

// Algumas linguagens como Java nos permitem criar explicitamente "objetos invólucro" para valores primitivos usando uma sintaxe como `new Number(1)` ou `new Boolean(false)`.

// Em JavaScript, isso também é possível por razões históricas, mas é **altamente não recomendado**. As coisas ficarão confusas em vários lugares.

// Por exemplo:

// ```javascript
// alert( typeof 0 ); // "number"
// alert( typeof new Number(0) ); // "object"!
// ```

// Objetos são sempre verdadeiros em `if`, então aqui o alerta aparecerá:

// ```javascript
// let zero = new Number(0);
// if (zero) { // zero é verdadeiro, porque é um objeto
//   alert( "zero é verdadeiro!?!" );
// }
// ```

// Por outro lado, usar as mesmas funções `String`/`Number`/`Boolean` sem `new` é totalmente válido e útil. Elas convertem um valor para o tipo correspondente: para uma string, um número ou um booleano (primitivo).

// Por exemplo, isso é totalmente válido:

// ```javascript
// let num = Number("123"); // converter uma string para número
// ```

// ### `null`/`undefined` não possuem métodos

// Os valores primitivos especiais `null` e `undefined` são exceções. Eles não possuem "objetos invólucro" correspondentes e não fornecem métodos. Em certo sentido, são "os mais primitivos".

// Uma tentativa de acessar uma propriedade de tal valor resultaria no erro:

// ```javascript
// alert(null.test); // erro
// ```

// ### Resumo

// Valores primitivos, exceto `null` e `undefined`, fornecem muitos métodos úteis. Estudaremos esses nos próximos capítulos.

// Formalmente, esses métodos funcionam por meio de objetos temporários, mas os motores JavaScript são bem ajustados para otimizá-los internamente, então não são caros de chamar.