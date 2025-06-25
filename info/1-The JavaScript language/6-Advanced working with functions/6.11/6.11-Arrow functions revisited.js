// -----

// ## Funções de Seta Revisitadas

// Vamos revisitar as funções de seta.

// As funções de seta não são apenas um "atalho" para escrever coisas pequenas. Elas possuem algumas características muito específicas e úteis.

// JavaScript está cheio de situações em que precisamos escrever uma pequena função que é executada em outro lugar.

// Por exemplo:

//   * `arr.forEach(func)` – `func` é executada por `forEach` para cada item do array.
//   * `setTimeout(func)` – `func` é executada pelo agendador embutido.

// ...e há mais.

// Está na própria essência do JavaScript criar uma função e passá-la para algum lugar.

// E nessas funções, geralmente não queremos sair do contexto atual. É aí que as funções de seta são úteis.

// -----

// ### Funções de Seta Não Têm "this"

// Como lembramos do capítulo [Object methods, "this"](https://javascript.info/object-methods), as funções de seta não possuem `this`. Se `this` é acessado, ele é retirado do exterior.

// Por exemplo, podemos usá-lo para iterar dentro de um método de objeto:

// ```javascript
// let group = {
//   title: "Nosso Grupo",
//   students: ["João", "Pedro", "Alice"],

//   showList() {
//     this.students.forEach(
//       student => alert(this.title + ': ' + student)
//     );
//   }
// };

// group.showList();
// ```

// Aqui no `forEach`, a função de seta é usada, então `this.title` nela é exatamente o mesmo que no método externo `showList`. Ou seja: `group.title`.

// Se usássemos uma função "regular", haveria um erro:

// ```javascript
// let group = {
//   title: "Nosso Grupo",
//   students: ["João", "Pedro", "Alice"],

//   showList() {
//     this.students.forEach(function(student) {
//       // Erro: Não é possível ler a propriedade 'title' de undefined
//       alert(this.title + ': ' + student);
//     });
//   }
// };

// group.showList();
// ```

// O erro ocorre porque `forEach` executa funções com `this=undefined` por padrão, então a tentativa de acessar `undefined.title` é feita.

// Isso não afeta as funções de seta, porque elas simplesmente não têm `this`.

// -----

// ### Funções de Seta Não Podem Ser Executadas com `new`

// Não ter `this` naturalmente significa outra limitação: funções de seta não podem ser usadas como construtores. Elas não podem ser chamadas com `new`.

// -----

// ### Funções de Seta VS `bind`

// Há uma diferença sutil entre uma função de seta `=>` e uma função regular chamada com `.bind(this)`:

//   * `.bind(this)` cria uma "versão vinculada" da função.
//   * A seta `=>` não cria nenhuma vinculação. A função simplesmente não tem `this`. A pesquisa de `this` é feita exatamente da mesma forma que uma pesquisa de variável regular: no ambiente léxico externo.

// -----

// ### Funções de Seta Não Têm "arguments"

// As funções de seta também não possuem a variável `arguments`.

// Isso é ótimo para decoradores, quando precisamos encaminhar uma chamada com o `this` e `arguments` atuais.

// Por exemplo, `defer(f, ms)` obtém uma função e retorna um invólucro em torno dela que atrasa a chamada em `ms` milissegundos:

// ```javascript
// function defer(f, ms) {
//   return function() {
//     setTimeout(() => f.apply(this, arguments), ms);
//   };
// }

// function sayHi(who) {
//   alert('Olá, ' + who);
// }

// let sayHiDeferred = defer(sayHi, 2000);
// sayHiDeferred("João"); // Olá, João após 2 segundos
// ```

// O mesmo sem uma função de seta seria assim:

// ```javascript
// function defer(f, ms) {
//   return function(...args) {
//     let ctx = this;
//     setTimeout(function() {
//       return f.apply(ctx, args);
//     }, ms);
//   };
// }
// ```

// Aqui tivemos que criar variáveis adicionais `args` e `ctx` para que a função dentro de `setTimeout` pudesse usá-las.

// -----

// ### Resumo

// Funções de seta:

//   * Não têm `this`.
//   * Não têm `arguments`.
//   * Não podem ser chamadas com `new`.

// Elas também não possuem `super`, mas ainda não estudamos isso. Veremos no capítulo [Herança de Classe](https://javascript.info/class-inheritance).

// Isso porque elas são feitas para pequenos pedaços de código que não têm seu próprio "contexto", mas sim trabalham no contexto atual. E elas realmente brilham nesse caso de uso.