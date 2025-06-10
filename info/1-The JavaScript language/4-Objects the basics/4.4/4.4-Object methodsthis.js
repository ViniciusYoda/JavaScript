// Claro! Aqui está a tradução completa do conteúdo para o português:

// ---

// ## Métodos de objeto, `this`

// Objetos geralmente são criados para representar entidades do mundo real, como usuários, pedidos, entre outros:

// ```js
// let user = {
//   name: "John",
//   age: 30
// };
// ```

// E, no mundo real, um usuário pode realizar ações: selecionar algo no carrinho, fazer login, logout, etc.

// Essas ações são representadas em JavaScript por **funções dentro de propriedades**.

// ---

// ### Exemplos de métodos

// Para começar, vamos ensinar o usuário a dizer "olá":

// ```js
// let user = {
//   name: "John",
//   age: 30
// };

// user.sayHi = function() {
//   alert("Olá!");
// };

// user.sayHi(); // Olá!
// ```

// Aqui usamos uma **expressão de função** para criar uma função e atribuí-la à propriedade `user.sayHi` do objeto.

// Depois, podemos chamá-la como `user.sayHi()`. Agora o usuário consegue "falar"!

// Uma função que é uma propriedade de um objeto é chamada de **método**.

// Neste exemplo, temos o **método** `sayHi` do objeto `user`.

// Claro que também poderíamos usar uma função previamente declarada como método:

// ```js
// let user = {
//   // ...
// };

// function sayHi() {
//   alert("Olá!");
// }

// user.sayHi = sayHi;

// user.sayHi(); // Olá!
// ```

// ---

// ### Programação orientada a objetos

// Quando escrevemos nosso código usando objetos para representar entidades, isso é chamado de **programação orientada a objetos (POO)**.

// A POO é um campo amplo, com muitas questões interessantes. Como escolher as entidades certas? Como organizar a interação entre elas? Isso é parte da **arquitetura**, e há ótimos livros sobre o assunto, como:

// * *Design Patterns: Elements of Reusable Object-Oriented Software* (E. Gamma, R. Helm, R. Johnson, J. Vissides)
// * *Object-Oriented Analysis and Design with Applications* (G. Booch)

// ---

// ### Sintaxe reduzida para métodos

// Existe uma forma mais curta de declarar métodos em um objeto literal:

// ```js
// // As duas formas abaixo são equivalentes

// user = {
//   sayHi: function() {
//     alert("Olá");
//   }
// };

// user = {
//   sayHi() { // igual a "sayHi: function() {...}"
//     alert("Olá");
//   }
// };
// ```

// Como mostrado acima, podemos omitir a palavra `function` e apenas escrever `sayHi()`.

// Na prática, há diferenças sutis entre as duas formas (relacionadas à herança de objetos), mas para a maioria dos casos, a forma mais curta é preferida.

// ---

// ### `this` em métodos

// É comum que um método de objeto precise acessar as informações dentro do próprio objeto para funcionar corretamente.

// Por exemplo, o código dentro de `user.sayHi()` pode precisar acessar o nome do usuário.

// Para acessar o objeto, o método pode usar a palavra-chave `this`.

// O valor de `this` é o **objeto antes do ponto**, ou seja, o que foi usado para chamar o método.

// ```js
// let user = {
//   name: "John",
//   age: 30,

//   sayHi() {
//     alert(this.name); // "this" é o objeto atual
//   }
// };

// user.sayHi(); // John
// ```

// Durante a execução de `user.sayHi()`, o valor de `this` será `user`.

// Tecnicamente, é possível acessar o objeto diretamente pela variável externa:

// ```js
// let user = {
//   name: "John",
//   age: 30,

//   sayHi() {
//     alert(user.name); // usando "user" em vez de "this"
//   }
// };
// ```

// …Mas isso **não é confiável**. Se copiarmos `user` para outra variável (por exemplo, `admin = user`) e sobrescrevermos `user`, o código quebrará:

// ```js
// let user = {
//   name: "John",
//   age: 30,

//   sayHi() {
//     alert(user.name);
//   }
// };

// let admin = user;
// user = null;

// admin.sayHi(); // Erro: Cannot read property 'name' of null
// ```

// Se tivéssemos usado `this.name` em vez de `user.name`, o código funcionaria normalmente.

// ---

// ### `this` não é fixo (bound)

// Em JavaScript, a palavra-chave `this` se comporta de maneira diferente de muitas outras linguagens. Ela **pode ser usada em qualquer função**, mesmo que a função não pertença a um objeto.

// Veja este exemplo (válido, sem erro de sintaxe):

// ```js
// function sayHi() {
//   alert(this.name);
// }
// ```

// O valor de `this` é determinado **durante a execução**, com base em **como a função foi chamada**.

// Por exemplo:

// ```js
// let user = { name: "John" };
// let admin = { name: "Admin" };

// function sayHi() {
//   alert(this.name);
// }

// user.f = sayHi;
// admin.f = sayHi;

// user.f();   // John
// admin.f();  // Admin
// admin['f'](); // Admin
// ```

// A regra é simples: se `obj.f()` é chamado, então `this` é `obj` durante a execução da função `f`.

// ---

// ### Chamando sem um objeto: `this == undefined`

// Também podemos chamar a função **sem nenhum objeto**:

// ```js
// function sayHi() {
//   alert(this);
// }

// sayHi(); // undefined (em modo estrito)
// ```

// Nesse caso, `this` será `undefined` em **modo estrito**. Se tentarmos acessar `this.name`, haverá um erro.

// No modo **não estrito**, `this` será o objeto global (`window` no navegador). Esse é um comportamento antigo, que o `"use strict"` corrige.

// Esse tipo de chamada geralmente é um erro de programação. Se a função usa `this`, ela **espera ser chamada com contexto de objeto**.

// ---

// ### As consequências do `this` não fixo

// Se você vem de outra linguagem, pode estar acostumado com métodos que **sempre mantêm** o `this` vinculado ao objeto onde foram definidos.

// Em JavaScript, o `this` é **avaliado em tempo de execução**, com base no **objeto antes do ponto**, e **não** onde a função foi criada.

// Isso permite **reutilizar funções** entre objetos diferentes, mas também pode causar erros difíceis de rastrear.

// Nosso objetivo não é julgar se isso é bom ou ruim, mas **entender como usá-lo bem**.

// ---

// ### Funções arrow não têm `this`

// Funções arrow (`=>`) são especiais: **elas não têm seu próprio `this`**.

// Se `this` for usado dentro de uma arrow function, ele será herdado do contexto externo (de uma função normal ao redor, se houver).

// Exemplo:

// ```js
// let user = {
//   firstName: "Ilya",
//   sayHi() {
//     let arrow = () => alert(this.firstName);
//     arrow();
//   }
// };

// user.sayHi(); // Ilya
// ```

// Isso é útil quando **não queremos um novo `this`**, mas sim usar o `this` do contexto onde a arrow foi criada.

// ---

// ### Resumo

// * Funções armazenadas em propriedades de objetos são chamadas de **métodos**.
// * Métodos permitem que objetos “ajam” como em `objeto.fazAlgo()`.
// * Métodos podem acessar o próprio objeto usando `this`.
// * O valor de `this` é determinado **durante a execução**.
// * Quando uma função é declarada, ela pode usar `this`, mas esse `this` só terá valor quando a função for chamada.
// * Funções podem ser copiadas entre objetos.
// * Quando uma função é chamada na forma `objeto.metodo()`, o `this` será o objeto que está **antes do ponto**.
// * Funções arrow não têm `this` próprio. Elas herdam o `this` do escopo onde foram criadas.

// ---


