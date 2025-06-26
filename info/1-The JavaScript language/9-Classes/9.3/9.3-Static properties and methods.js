// -----

// ## Propriedades e Métodos Estáticos

// Podemos também atribuir um método à classe como um todo. Tais métodos são chamados de **estáticos**.

// Em uma declaração de classe, eles são precedidos pela palavra-chave `static`, assim:

// ```javascript
// class User {
//   static staticMethod() {
//     alert(this === User);
//   }
// }

// User.staticMethod(); // true
// ```

// Isso, na verdade, faz o mesmo que atribuí-lo como uma propriedade diretamente:

// ```javascript
// class User { }

// User.staticMethod = function() {
//   alert(this === User);
// };

// User.staticMethod(); // true
// ```

// O valor de `this` na chamada `User.staticMethod()` é o próprio construtor da classe `User` (a regra do "objeto antes do ponto").

// Geralmente, métodos estáticos são usados para implementar funções que pertencem à classe como um todo, mas não a qualquer objeto particular dela.

// Por exemplo, temos objetos `Article` e precisamos de uma função para compará-los.

// Uma solução natural seria adicionar o método estático `Article.compare`:

// ```javascript
// class Article {
//   constructor(title, date) {
//     this.title = title;
//     this.date = date;
//   }

//   static compare(articleA, articleB) {
//     return articleA.date - articleB.date;
//   }
// }

// // uso
// let articles = [
//   new Article("HTML", new Date(2019, 1, 1)),
//   new Article("CSS", new Date(2019, 0, 1)),
//   new Article("JavaScript", new Date(2019, 11, 1))
// ];

// articles.sort(Article.compare);

// alert( articles[0].title ); // CSS
// ```

// Aqui o método `Article.compare` está "acima" dos artigos, como um meio de compará-los. Não é um método de um artigo, mas sim de toda a classe.

// Outro exemplo seria um método de "fábrica".

// Digamos que precisamos de várias maneiras de criar um artigo:

//   * Criar por parâmetros dados (título, `date`, etc).
//   * Criar um artigo vazio com a data de hoje.
//   * ...ou de alguma outra forma.

// A primeira maneira pode ser implementada pelo construtor. E para a segunda, podemos criar um método estático da classe.

// Como `Article.createTodays()` aqui:

// ```javascript
// class Article {
//   constructor(title, date) {
//     this.title = title;
//     this.date = date;
//   }

//   static createTodays() {
//     // lembre-se, this = Article
//     return new this("Artigo de hoje", new Date());
//   }
// }

// let article = Article.createTodays();
// alert( article.title ); // Artigo de hoje
// ```

// Agora, toda vez que precisamos criar um artigo de hoje, podemos chamar `Article.createTodays()`. Mais uma vez, esse não é um método de um artigo, mas um método da classe inteira.

// Métodos estáticos também são usados em classes relacionadas a bancos de dados para pesquisar/salvar/remover entradas do banco de dados, assim:

// ```javascript
// // assumindo que Article é uma classe especial para gerenciar artigos
// // método estático para remover o artigo por id:
// Article.remove({id: 12345});
// ```

// -----

// ### Métodos estáticos não estão disponíveis para objetos individuais

// Métodos estáticos são chamáveis em classes, não em objetos individuais.

// Por exemplo, o seguinte código não funcionará:

// ```javascript
// // ...
// article.createTodays(); /// Erro: article.createTodays não é uma função
// ```

// -----

// ### Propriedades estáticas

// **Uma adição recente**

// Esta é uma adição recente à linguagem. Os exemplos funcionam no Chrome mais recente.

// Propriedades estáticas também são possíveis, elas se parecem com propriedades de classe regulares, mas precedidas por `static`:

// ```javascript
// class Article {
//   static publisher = "Ilya Kantor";
// }

// alert( Article.publisher ); // Ilya Kantor
// ```

// Isso é o mesmo que uma atribuição direta a `Article`:

// ```javascript
// Article.publisher = "Ilya Kantor";
// ```

// -----

// ### Herança de propriedades e métodos estáticos

// Propriedades e métodos estáticos são herdados.

// Por exemplo, `Animal.compare` e `Animal.planet` no código abaixo são herdados e acessíveis como `Rabbit.compare` e `Rabbit.planet`:

// ```javascript
// class Animal {
//   static planet = "Terra";

//   constructor(name, speed) {
//     this.speed = speed;
//     this.name = name;
//   }

//   run(speed = 0) {
//     this.speed += speed;
//     alert(`${this.name} corre com velocidade ${this.speed}.`);
//   }

//   static compare(animalA, animalB) {
//     return animalA.speed - animalB.speed;
//   }
// }

// // Herda de Animal
// class Rabbit extends Animal {
//   hide() {
//     alert(`${this.name} se esconde!`);
//   }
// }

// let rabbits = [
//   new Rabbit("Coelho Branco", 10),
//   new Rabbit("Coelho Preto", 5)
// ];

// rabbits.sort(Rabbit.compare);

// rabbits[0].run(); // Coelho Preto corre com velocidade 5.
// alert(Rabbit.planet); // Terra
// ```

// Agora, quando chamamos `Rabbit.compare`, o `Animal.compare` herdado será chamado.

// Como isso funciona? Novamente, usando protótipos. Como você já deve ter adivinhado, `extends` dá a `Rabbit` a referência `[[Prototype]]` para `Animal`.

// ```mermaid
// graph TD
//     A[função Rabbit] -->|[[Prototype]]| B[função Animal];
//     C[Rabbit.prototype] -->|[[Prototype]]| D[Animal.prototype];
// ```

// Então, `Rabbit extends Animal` cria duas referências `[[Prototype]]`:

// 1.  A função `Rabbit` herda prototipicamente da função `Animal`.
// 2.  `Rabbit.prototype` herda prototipicamente de `Animal.prototype`.

// Como resultado, a herança funciona tanto para métodos regulares quanto estáticos.

// Aqui, vamos verificar isso por código:

// ```javascript
// class Animal {}
// class Rabbit extends Animal {}

// // para estáticos
// alert(Rabbit.__proto__ === Animal); // true

// // para métodos regulares
// alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
// ```

// -----

// ### Resumo

//   * **Métodos estáticos** são usados para a funcionalidade que pertence à classe "como um todo". Não se relaciona a uma instância concreta da classe.

//       * Por exemplo, um método para comparação `Article.compare(article1, article2)` ou um método de fábrica `Article.createTodays()`.
//       * Eles são rotulados pela palavra `static` na declaração da classe.

//   * **Propriedades estáticas** são usadas quando gostaríamos de armazenar dados de nível de classe, também não vinculados a uma instância.

//   * A sintaxe é:

//     ```javascript
//     class MyClass {
//       static property = ...;

//       static method() {
//         // ...
//       }
//     }
//     ```

//   * Tecnicamente, a declaração `static` é o mesmo que atribuir à própria classe:

//     ```javascript
//     MyClass.property = ...
//     MyClass.method = ...
//     ```

//   * Propriedades e métodos estáticos são herdados.

//       * Para `class B extends A`, o protótipo da própria classe `B` aponta para `A`: `B.[[Prototype]] = A`. Então, se um campo não for encontrado em `B`, a busca continua em `A`.