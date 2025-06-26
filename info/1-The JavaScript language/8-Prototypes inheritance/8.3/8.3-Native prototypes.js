// -----

// ## Protótipos Nativos

// A propriedade `"prototype"` é amplamente utilizada pelo próprio núcleo do JavaScript. Todas as funções construtoras embutidas a utilizam.

// Primeiro, veremos os detalhes e, em seguida, como usá-la para adicionar novas capacidades a objetos embutidos.

// -----

// ### Object.prototype

// Vamos supor que exibimos um objeto vazio:

// ```javascript
// let obj = {};
// alert( obj ); // "[object Object]" ?
// ```

// Onde está o código que gera a string `"[object Object]"`? É um método `toString` embutido, mas onde ele está? O `obj` está vazio\!

// ...Mas a notação curta `obj = {}` é o mesmo que `obj = new Object()`, onde `Object` é uma função construtora de objeto embutida, com seu próprio `prototype` referenciando um objeto enorme com `toString` e outros métodos.

// Aqui está o que está acontecendo:

// ```mermaid
// graph TD
//     A[obj] -->|[[Prototype]]| B[Object.prototype];
//     B -- toString() --> C[método toString];
// ```

// Quando `new Object()` é chamado (ou um objeto literal `{...}` é criado), o `[[Prototype]]` dele é definido para `Object.prototype` de acordo com a regra que discutimos no capítulo anterior:

// ```mermaid
// graph TD
//     A[função construtora Object] -->|propriedade "prototype"| B[Object.prototype];
//     C[new Object()] -->|[[Prototype]]| B;
// ```

// Então, quando `obj.toString()` é chamado, o método é retirado de `Object.prototype`.

// Podemos verificar isso assim:

// ```javascript
// let obj = {};
// alert(obj.__proto__ === Object.prototype); // true
// alert(obj.toString === obj.__proto__.toString); //true
// alert(obj.toString === Object.prototype.toString); //true
// ```

// Observe que não há mais `[[Prototype]]` na cadeia acima de `Object.prototype`:

// ```javascript
// alert(Object.prototype.__proto__); // null
// ```

// -----

// ### Outros Protótipos Embutidos

// Outros objetos embutidos como `Array`, `Date`, `Function` e outros também mantêm métodos em protótipos.

// Por exemplo, quando criamos um array `[1, 2, 3]`, o construtor `new Array()` padrão é usado internamente. Então `Array.prototype` se torna seu protótipo e fornece métodos. Isso é muito eficiente em termos de memória.

// Pela especificação, todos os protótipos embutidos têm `Object.prototype` no topo. É por isso que algumas pessoas dizem que "tudo herda de objetos".

// Aqui está a imagem geral (para 3 embutidos caberem):

// ```mermaid
// graph TD
//     A[Function.prototype] -->|__proto__| B[Object.prototype];
//     C[Array.prototype] -->|__proto__| B;
//     D[Date.prototype] -->|__proto__| B;
//     B -->|__proto__| E[null];
// ```

// Vamos verificar os protótipos manualmente:

// ```javascript
// let arr = [1, 2, 3];

// // ele herda de Array.prototype?
// alert( arr.__proto__ === Array.prototype ); // true

// // depois de Object.prototype?
// alert( arr.__proto__.__proto__ === Object.prototype ); // true

// // e null no topo.
// alert( arr.__proto__.__proto__.__proto__ ); // null
// ```

// Alguns métodos em protótipos podem se sobrepor, por exemplo, `Array.prototype` tem seu próprio `toString` que lista elementos separados por vírgula:

// ```javascript
// let arr = [1, 2, 3]
// alert(arr); // 1,2,3 <-- o resultado de Array.prototype.toString
// ```

// Como vimos antes, `Object.prototype` também tem `toString`, mas `Array.prototype` está mais próximo na cadeia, então a variante do array é usada.

// Ferramentas no navegador, como o console do desenvolvedor do Chrome, também mostram herança (pode ser necessário usar `console.dir` para objetos embutidos):

// (A imagem /article/native-prototypes/console\_dir\_array.png está corrompida e não pode ser exibida)

// Outros objetos embutidos também funcionam da mesma forma. Até mesmo funções – elas são objetos de um construtor `Function` embutido, e seus métodos (`call`/`apply` e outros) são retirados de `Function.prototype`. As funções também têm seu próprio `toString`.

// ```javascript
// function f() {}
// alert(f.__proto__ == Function.prototype); // true
// alert(f.__proto__.__proto__ == Object.prototype); // true, herdam de objetos
// ```

// -----

// ### Primitivos

// A coisa mais intrincada acontece com strings, números e booleanos.

// Como lembramos, eles não são objetos. Mas se tentarmos acessar suas propriedades, objetos invólucros temporários são criados usando construtores embutidos `String`, `Number` e `Boolean`. Eles fornecem os métodos e desaparecem.

// Esses objetos são criados invisivelmente para nós e a maioria dos motores os otimiza, mas a especificação descreve exatamente dessa forma. Os métodos desses objetos também residem em protótipos, disponíveis como `String.prototype`, `Number.prototype` e `Boolean.prototype`.

// -----

// #### Os valores `null` e `undefined` não têm invólucros de objeto

// Os valores especiais `null` e `undefined` se destacam. Eles não têm invólucros de objeto, portanto, métodos e propriedades não estão disponíveis para eles. E não há protótipos correspondentes.

// -----

// ### Alterando Protótipos Nativos

// Protótipos nativos podem ser modificados. Por exemplo, se adicionarmos um método a `String.prototype`, ele se torna disponível para todas as strings:

// ```javascript
// String.prototype.show = function() {
//   alert(this);
// };

// "BOOM!".show(); // BOOM!
// ```

// Durante o processo de desenvolvimento, podemos ter ideias para novos métodos embutidos que gostaríamos de ter, e podemos ser tentados a adicioná-los aos protótipos nativos. Mas essa é geralmente uma má ideia.

// **Importante:**

//   * Protótipos são globais, então é fácil ter um conflito. Se duas bibliotecas adicionarem um método `String.prototype.show`, uma delas estará sobrescrevendo o método da outra.

// Então, geralmente, modificar um protótipo nativo é considerado uma má ideia.

// Na programação moderna, há apenas um caso em que a modificação de protótipos nativos é aprovada. É o **polyfill**.

// Polyfilling é um termo para criar um substituto para um método que existe na especificação JavaScript, mas ainda não é suportado por um determinado motor JavaScript.

// Podemos então implementá-lo manualmente e preencher o protótipo embutido com ele.

// Por exemplo:

// ```javascript
// if (!String.prototype.repeat) { // se não houver tal método
//   // adicione-o ao protótipo

//   String.prototype.repeat = function(n) {
//     // repita a string n vezes

//     // na verdade, o código deveria ser um pouco mais complexo que isso
//     // (o algoritmo completo está na especificação)
//     // mas mesmo um polyfill imperfeito é frequentemente considerado bom o suficiente
//     return new Array(n + 1).join(this);
//   };
// }

// alert( "La".repeat(3) ); // LaLaLa
// ```

// -----

// ### Empréstimo de Protótipos

// No capítulo [Decorators and forwarding, call/apply](https://javascript.info/call-apply-decorators), falamos sobre o empréstimo de métodos.

// É quando pegamos um método de um objeto e o copiamos para outro.

// Alguns métodos de protótipos nativos são frequentemente emprestados.

// Por exemplo, se estamos criando um objeto tipo array, podemos querer copiar alguns métodos `Array` para ele.

// Ex:

// ```javascript
// let obj = {
//   0: "Olá",
//   1: "mundo!",
//   length: 2,
// };

// obj.join = Array.prototype.join;

// alert( obj.join(',') ); // Olá,mundo!
// ```

// Funciona porque o algoritmo interno do método `join` embutido se preocupa apenas com os índices corretos e a propriedade `length`. Ele não verifica se o objeto é de fato um array. Muitos métodos embutidos são assim.

// Outra possibilidade é herdar definindo `obj.__proto__` para `Array.prototype`, de modo que todos os métodos `Array` estejam automaticamente disponíveis em `obj`.

// Mas isso é impossível se `obj` já herda de outro objeto. Lembre-se, só podemos herdar de um objeto por vez.

// Emprestar métodos é flexível, permite misturar funcionalidades de diferentes objetos, se necessário.

// -----

// ### Resumo

// Todos os objetos embutidos seguem o mesmo padrão:

//   * Os métodos são armazenados no protótipo (`Array.prototype`, `Object.prototype`, `Date.prototype`, etc.)
//   * O próprio objeto armazena apenas os dados (itens do array, propriedades do objeto, a data)

// Primitivos também armazenam métodos em protótipos de objetos invólucros: `Number.prototype`, `String.prototype` e `Boolean.prototype`. Apenas `undefined` e `null` não têm objetos invólucros.

// Protótipos embutidos podem ser modificados ou preenchidos com novos métodos. Mas não é recomendado alterá-los. O único caso permissível é provavelmente quando adicionamos um novo padrão, mas ele ainda não é suportado pelo motor JavaScript.