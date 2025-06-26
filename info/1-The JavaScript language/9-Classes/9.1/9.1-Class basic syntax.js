// -----

// ## Sintaxe Básica de Classes

// > Em programação orientada a objetos, uma **classe** é um modelo de código de programa extensível para criar objetos, fornecendo valores iniciais para o estado (variáveis de membro) e implementações de comportamento (funções ou métodos de membro).
// >
// > — Wikipedia

// Na prática, muitas vezes precisamos criar vários objetos do mesmo tipo, como usuários, ou bens, ou o que quer que seja.

// Como já sabemos do capítulo [Construtor, operador "new"](https://javascript.info/constructor-new), `new function` pode ajudar com isso.

// Mas no JavaScript moderno, existe uma construção "class" mais avançada, que introduz ótimos novos recursos úteis para a programação orientada a objetos.

// -----

// ### A Sintaxe "class"

// A sintaxe básica é:

// ```javascript
// class MyClass {
//   // métodos da classe
//   constructor() { ... }
//   method1() { ... }
//   method2() { ... }
//   method3() { ... }
//   // ...
// }
// ```

// Então, use `new MyClass()` para criar um novo objeto com todos os métodos listados.

// O método `constructor()` é chamado automaticamente por `new`, então podemos inicializar o objeto ali.

// Por exemplo:

// ```javascript
// class User {

//   constructor(name) {
//     this.name = name;
//   }

//   sayHi() {
//     alert(this.name);
//   }
// }

// // Uso:
// let user = new User("John");
// user.sayHi();
// ```

// Quando `new User("John")` é chamado:

// 1.  Um novo objeto é criado.
// 2.  O `constructor` é executado com o argumento fornecido e o atribui a `this.name`.
// 3.  ...Então podemos chamar métodos do objeto, como `user.sayHi()`.

// -----

// #### Sem vírgula entre métodos de classe

// Uma armadilha comum para desenvolvedores iniciantes é colocar uma vírgula entre os métodos da classe, o que resultaria em um erro de sintaxe.

// A notação aqui não deve ser confundida com literais de objeto. Dentro da classe, nenhuma vírgula é necessária.

// -----

// ### O que é uma classe?

// Então, o que exatamente é uma **`class`**? Não é uma entidade de linguagem inteiramente nova, como se poderia pensar.

// Vamos desvendar qualquer mágica e ver o que uma classe realmente é. Isso ajudará a entender muitos aspectos complexos.

// Em JavaScript, uma classe é um tipo de função.

// Aqui, dê uma olhada:

// ```javascript
// class User {
//   constructor(name) { this.name = name; }
//   sayHi() { alert(this.name); }
// }

// // prova: User é uma função
// alert(typeof User); // function
// ```

// O que a construção `class User {...}` realmente faz é:

// 1.  Cria uma função chamada `User`, que se torna o resultado da declaração da classe. O código da função é retirado do método `constructor` (assumido vazio se não escrevermos tal método).
// 2.  Armazena métodos de classe, como `sayHi`, em `User.prototype`.

// Após a criação do objeto `new User`, quando chamamos seu método, ele é retirado do protótipo, exatamente como descrito no capítulo **F.prototype**. Assim, o objeto tem acesso aos métodos da classe.

// Podemos ilustrar o resultado da declaração `class User` como:

// ```mermaid
// graph TD
//     A[função User] -->|propriedade "prototype"| B[User.prototype];
//     B -- constructor: User, sayHi: function --> C[métodos e construtor];
// ```

// Aqui está o código para inspecioná-lo:

// ```javascript
// class User {
//   constructor(name) { this.name = name; }
//   sayHi() { alert(this.name); }
// }

// // class é uma função
// alert(typeof User); // function

// // ...ou, mais precisamente, o método construtor
// alert(User === User.prototype.constructor); // true

// // Os métodos estão em User.prototype, por exemplo:
// alert(User.prototype.sayHi); // o código do método sayHi

// // existem exatamente dois métodos no protótipo
// alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
// ```

// -----

// ### Não é apenas açúcar sintático

// Às vezes, as pessoas dizem que `class` é um "açúcar sintático" (sintaxe projetada para facilitar a leitura, mas que não introduz nada de novo), porque poderíamos realmente declarar a mesma coisa sem usar a palavra-chave `class`:

// ```javascript
// // reescrevendo a classe User em funções puras

// // 1. Cria a função construtora
// function User(name) {
//   this.name = name;
// }

// // um protótipo de função tem a propriedade "constructor" por padrão,
// // então não precisamos criá-la

// // 2. Adiciona o método ao protótipo
// User.prototype.sayHi = function() {
//   alert(this.name);
// };

// // Uso:
// let user = new User("John");
// user.sayHi();
// ```

// O resultado desta definição é aproximadamente o mesmo. Então, de fato, há razões pelas quais `class` pode ser considerado um açúcar sintático para definir um construtor juntamente com seus métodos de protótipo.

// Ainda assim, existem diferenças importantes.

// Primeiro, uma função criada por `class` é rotulada por uma propriedade interna especial `[[IsClassConstructor]]: true`. Portanto, não é inteiramente o mesmo que criá-la manualmente.

// A linguagem verifica essa propriedade em vários lugares. Por exemplo, ao contrário de uma função regular, ela deve ser chamada com `new`:

// ```javascript
// class User {
//   constructor() {}
// }

// alert(typeof User); // function
// User(); // Erro: Class constructor User cannot be invoked without 'new'
// ```

// Além disso, uma representação em string de um construtor de classe na maioria dos motores JavaScript começa com "class...".

// ```javascript
// class User {
//   constructor() {}
// }

// alert(User); // class User { ... }
// ```

// Existem outras diferenças, veremos em breve.

// 1.  **Os métodos de classe não são enumeráveis**. Uma definição de classe define o sinalizador `enumerable` como `false` para todos os métodos no `"prototype"`.
//     Isso é bom, porque se fizermos um `for..in` sobre um objeto, geralmente não queremos seus métodos de classe.
// 2.  **Classes sempre usam `strict`**. Todo o código dentro da construção da classe está automaticamente em modo estrito.

// Além disso, a sintaxe `class` traz muitos outros recursos que exploraremos mais tarde.

// -----

// ### Expressão de Classe

// Assim como as funções, as classes podem ser definidas dentro de outra expressão, passadas, retornadas, atribuídas, etc.

// Aqui está um exemplo de uma expressão de classe:

// ```javascript
// let User = class {
//   sayHi() {
//     alert("Olá");
//   }
// };
// ```

// Semelhante às Expressões de Função Nomeadas, as expressões de classe podem ter um nome.

// Se uma expressão de classe tiver um nome, ele será visível apenas dentro da classe:

// ```javascript
// // "Expressão de Classe Nomeada"
// // (não existe tal termo na especificação, mas é semelhante à Expressão de Função Nomeada)
// let User = class MyClass {
//   sayHi() {
//     alert(MyClass); // O nome MyClass é visível apenas dentro da classe
//   }
// };

// new User().sayHi(); // funciona, mostra a definição de MyClass
// alert(MyClass); // erro, o nome MyClass não é visível fora da classe
// ```

// Podemos até mesmo criar classes dinamicamente "sob demanda", assim:

// ```javascript
// function makeClass(phrase) {
//   // declara uma classe e a retorna
//   return class {
//     sayHi() {
//       alert(phrase);
//     }
//   };
// }

// // Cria uma nova classe
// let User = makeClass("Olá");
// new User().sayHi(); // Olá
// ```

// -----

// ### Getters/Setters

// Assim como os objetos literais, as classes podem incluir getters/setters, propriedades computadas, etc.

// Aqui está um exemplo para `user.name` implementado usando `get`/`set`:

// ```javascript
// class User {

//   constructor(name) {
//     // invoca o setter
//     this.name = name;
//   }

//   get name() {
//     return this._name;
//   }

//   set name(value) {
//     if (value.length < 4) {
//       alert("O nome é muito curto.");
//       return;
//     }
//     this._name = value;
//   }
// }

// let user = new User("John");
// alert(user.name); // John

// user = new User(""); // O nome é muito curto.
// ```

// Tecnicamente, essa declaração de classe funciona criando getters e setters em `User.prototype`.

// -----

// #### Nomes computados [...]

// Aqui está um exemplo com um nome de método computado usando colchetes `[...]`:

// ```javascript
// class User {
//   ['say' + 'Hi']() {
//     alert("Olá");
//   }
// }

// new User().sayHi();
// ```

// Tais recursos são fáceis de lembrar, pois se assemelham aos de objetos literais.

// -----

// ### Campos de Classe

// **Navegadores antigos podem precisar de um polyfill**

// Campos de classe são uma adição recente à linguagem.

// Anteriormente, nossas classes tinham apenas métodos.

// "Campos de classe" é uma sintaxe que permite adicionar quaisquer propriedades.

// Por exemplo, vamos adicionar a propriedade `name` à `class User`:

// ```javascript
// class User {
//   name = "John";

//   sayHi() {
//     alert(`Olá, ${this.name}!`);
//   }
// }

// new User().sayHi(); // Olá, John!
// ```

// Então, apenas escrevemos " `=` " na declaração, e é isso.

// A diferença importante dos campos de classe é que eles são definidos em objetos individuais, não em `User.prototype`:

// ```javascript
// class User {
//   name = "John";
// }

// let user = new User();
// alert(user.name); // John
// alert(User.prototype.name); // undefined
// ```

// Também podemos atribuir valores usando expressões mais complexas e chamadas de função:

// ```javascript
// class User {
//   name = prompt("Nome, por favor?", "John");
// }

// let user = new User();
// alert(user.name); // John
// ```

// -----

// #### Criando métodos vinculados com campos de classe

// Como demonstrado no capítulo [Vinculação de Função](https://javascript.info/bind), as funções em JavaScript têm um `this` dinâmico. Ele depende do contexto da chamada.

// Então, se um método de objeto for passado e chamado em outro contexto, `this` não será mais uma referência ao seu objeto.

// Por exemplo, este código mostrará `undefined`:

// ```javascript
// class Button {
//   constructor(value) {
//     this.value = value;
//   }

//   click() {
//     alert(this.value);
//   }
// }

// let button = new Button("olá");
// setTimeout(button.click, 1000); // undefined
// ```

// O problema é chamado de "perda de `this`".

// Existem duas abordagens para corrigi-lo, conforme discutido no capítulo [Vinculação de Função](https://javascript.info/bind):

// 1.  Passar uma função wrapper, como `setTimeout(() => button.click(), 1000)`.
// 2.  Vincular o método ao objeto, por exemplo, no construtor.

// Campos de classe fornecem outra sintaxe, bastante elegante:

// ```javascript
// class Button {
//   constructor(value) {
//     this.value = value;
//   }

//   click = () => {
//     alert(this.value);
//   }
// }

// let button = new Button("olá");
// setTimeout(button.click, 1000); // olá
// ```

// O campo de classe `click = () => {...}` é criado por objeto, há uma função separada para cada objeto `Button`, com `this` dentro dela referenciando esse objeto. Podemos passar `button.click` para qualquer lugar, e o valor de `this` sempre estará correto.

// Isso é especialmente útil em ambiente de navegador, para ouvintes de eventos.

// -----

// ### Resumo

// A sintaxe básica da classe se parece com isto:

// ```javascript
// class MyClass {
//   prop = value; // propriedade

//   constructor(...) { // construtor
//     // ...
//   }

//   method(...) {} // método

//   get something(...) {} // método getter
//   set something(...) {} // método setter

//   [Symbol.iterator]() {} // método com nome computado (símbolo aqui)
//   // ...
// }
// ```

// `MyClass` é tecnicamente uma função (aquela que fornecemos como `constructor`), enquanto métodos, getters e setters são escritos em `MyClass.prototype`.

// Nos próximos capítulos, aprenderemos mais sobre classes, incluindo herança e outros recursos.