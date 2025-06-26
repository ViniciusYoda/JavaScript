// -----

// ## Mixins

// Em JavaScript, podemos herdar de apenas um único objeto. Um objeto pode ter apenas um `[[Prototype]]`, e uma classe só pode estender outra classe.

// No entanto, essa limitação pode ser um problema. Por exemplo, se temos uma classe `StreetSweeper` (Varredor de Rua) e uma classe `Bicycle` (Bicicleta) e queremos combiná-las para criar uma `StreetSweepingBicycle` (Bicicleta Varredora de Rua). Ou, se temos uma classe `User` e uma classe `EventEmitter` que implementa a geração de eventos, e gostaríamos de adicionar a funcionalidade de `EventEmitter` à `User`, para que nossos usuários possam emitir eventos.

// Existe um conceito que pode ajudar aqui, chamado **"mixins"**.

// Conforme definido na Wikipédia, um **mixin** é uma classe que contém métodos que podem ser usados por outras classes sem a necessidade de herdar delas.

// Em outras palavras, um mixin fornece métodos que implementam um certo comportamento, mas não o usamos sozinho; nós o utilizamos para adicionar esse comportamento a outras classes.

// -----

// ### Um Exemplo de Mixin

// A maneira mais simples de implementar um mixin em JavaScript é criar um objeto com métodos úteis, para que possamos facilmente mesclá-los no protótipo de qualquer classe.

// Por exemplo, o mixin `sayHiMixin` é usado aqui para adicionar algumas funcionalidades de "fala" à classe `User`:

// ```javascript
// // mixin
// let sayHiMixin = {
//   sayHi() {
//     alert(`Olá ${this.name}`);
//   },
//   sayBye() {
//     alert(`Tchau ${this.name}`);
//   }
// };

// // uso:
// class User {
//   constructor(name) {
//     this.name = name;
//   }
// }

// // copia os métodos
// Object.assign(User.prototype, sayHiMixin);

// // agora User pode dizer olá
// new User("Cara").sayHi(); // Olá Cara!
// ```

// Não há herança envolvida, apenas uma simples cópia de métodos. Assim, `User` pode herdar de outra classe e também incluir o mixin para "misturar" os métodos adicionais, como este:

// ```javascript
// class User extends Person {
//   // ...
// }

// Object.assign(User.prototype, sayHiMixin);
// ```

// Mixins podem até usar herança internamente.

// Por exemplo, aqui `sayHiMixin` herda de `sayMixin`:

// ```javascript
// let sayMixin = {
//   say(phrase) {
//     alert(phrase);
//   }
// };

// let sayHiMixin = {
//   __proto__: sayMixin, // (ou poderíamos usar Object.setPrototypeOf para definir o protótipo aqui)

//   sayHi() {
//     // chama o método pai
//     super.say(`Olá ${this.name}`); // (*)
//   },
//   sayBye() {
//     super.say(`Tchau ${this.name}`); // (*)
//   }
// };

// class User {
//   constructor(name) {
//     this.name = name;
//   }
// }

// // copia os métodos
// Object.assign(User.prototype, sayHiMixin);

// // agora User pode dizer olá
// new User("Cara").sayHi(); // Olá Cara!
// ```

// É importante notar que a chamada ao método pai `super.say()` de `sayHiMixin` (nas linhas marcadas com `(*)`) procura o método no **protótipo desse mixin**, não na classe.

// Aqui está o diagrama (veja a parte direita):

// ```mermaid
// graph TD
//     subgraph "Classes"
//         A[User] -->|prototype| B[User.prototype]
//         B -->|[[Prototype]]| C[Person.prototype]
//     end

//     subgraph "Mixins"
//         D[sayHiMixin] -->|__proto__| E[sayMixin]
//         F[Método sayHi de sayHiMixin] -->|[[HomeObject]]| D
//         G[Método sayBye de sayHiMixin] -->|[[HomeObject]]| D
//     end

//     B -- Object.assign --> F
//     B -- Object.assign --> G

//     F -- super.say() --> E
//     G -- super.say() --> E

//     style A fill:#f9f,stroke:#333,stroke-width:2px
//     style B fill:#f9f,stroke:#333,stroke-width:2px
//     style C fill:#f9f,stroke:#333,stroke-width:2px
//     style D fill:#ccf,stroke:#333,stroke-width:2px
//     style E fill:#ccf,stroke:#333,stroke-width:2px
//     style F fill:#9cf,stroke:#333,stroke-width:2px
//     style G fill:#9cf,stroke:#333,stroke-width:2px
// ```

// Isso ocorre porque os métodos `sayHi` e `sayBye` foram inicialmente criados em `sayHiMixin`. Então, mesmo que tenham sido copiados, a propriedade interna `[[HomeObject]]` deles referencia `sayHiMixin`, conforme mostrado na imagem acima.

// Como `super` procura métodos pai em `[[HomeObject]].[[Prototype]]`, isso significa que ele pesquisa `sayHiMixin.[[Prototype]]`.

// -----

// ### EventMixin

// Agora, vamos criar um mixin para a vida real.

// Uma característica importante de muitos objetos de navegador (por exemplo) é que eles podem gerar eventos. Eventos são uma ótima maneira de "transmitir informações" para quem quiser. Então, vamos criar um mixin que nos permite adicionar facilmente funções relacionadas a eventos a qualquer classe/objeto.

// O mixin fornecerá um método `.trigger(name, [...data])` para "gerar um evento" quando algo importante acontecer. O argumento `name` é o nome do evento, opcionalmente seguido por argumentos adicionais com dados do evento.

// Também terá o método `.on(name, handler)` que adiciona a função `handler` como ouvinte para eventos com o nome dado. Ele será chamado quando um evento com o `name` dado for acionado e receberá os argumentos da chamada `.trigger`.

// ...E o método `.off(name, handler)` que remove o ouvinte `handler`.

// Após adicionar o mixin, um objeto `user` será capaz de gerar um evento `"login"` quando o visitante fizer login. E outro objeto, digamos, `calendar`, pode querer ouvir esses eventos para carregar o calendário para a pessoa logada.

// Ou, um `menu` pode gerar o evento `"select"` quando um item de menu é selecionado, e outros objetos podem atribuir manipuladores para reagir a esse evento. E assim por diante.

// Aqui está o código:

// ```javascript
// let eventMixin = {
//   /**
//    * Assina um evento, uso:
//    * menu.on('select', function(item) { ... }
//   */
//   on(eventName, handler) {
//     if (!this._eventHandlers) this._eventHandlers = {};
//     if (!this._eventHandlers[eventName]) {
//       this._eventHandlers[eventName] = [];
//     }
//     this._eventHandlers[eventName].push(handler);
//   },

//   /**
//    * Cancela a assinatura, uso:
//    * menu.off('select', handler)
//    */
//   off(eventName, handler) {
//     let handlers = this._eventHandlers?.[eventName];
//     if (!handlers) return;
//     for (let i = 0; i < handlers.length; i++) {
//       if (handlers[i] === handler) {
//         handlers.splice(i--, 1);
//       }
//     }
//   },

//   /**
//    * Gera um evento com o nome e dados fornecidos
//    * this.trigger('select', data1, data2);
//    */
//   trigger(eventName, ...args) {
//     if (!this._eventHandlers?.[eventName]) {
//       return; // nenhum manipulador para este nome de evento
//     }

//     // chama os manipuladores
//     this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
//   }
// };
// ```

//   * `.on(eventName, handler)` – atribui a função `handler` para ser executada quando o evento com esse nome ocorrer. Tecnicamente, existe uma propriedade `_eventHandlers` que armazena um array de manipuladores para cada nome de evento, e ele simplesmente a adiciona à lista.
//   * `.off(eventName, handler)` – remove a função da lista de manipuladores.
//   * `.trigger(eventName, ...args)` – gera o evento: todos os manipuladores de `_eventHandlers[eventName]` são chamados, com uma lista de argumentos `...args`.

// Uso:

// ```javascript
// // Cria uma classe
// class Menu {
//   choose(value) {
//     this.trigger("select", value);
//   }
// }

// // Adiciona o mixin com métodos relacionados a eventos
// Object.assign(Menu.prototype, eventMixin);

// let menu = new Menu();

// // adiciona um manipulador, para ser chamado na seleção:
// menu.on("select", value => alert(`Valor selecionado: ${value}`));

// // aciona o evento => o manipulador acima é executado e mostra:
// // Valor selecionado: 123
// menu.choose("123");
// ```

// Agora, se quisermos que qualquer código reaja a uma seleção de menu, podemos ouvi-lo com `menu.on(...)`.

// E o mixin `eventMixin` torna fácil adicionar esse comportamento a quantas classes quisermos, sem interferir na cadeia de herança.

// -----

// ### Resumo

//   * **Mixin** – é um termo genérico de programação orientada a objetos: uma classe que contém métodos para outras classes.
//   * Algumas outras linguagens permitem herança múltipla. JavaScript não suporta herança múltipla, mas mixins podem ser implementados copiando métodos para o protótipo.
//   * Podemos usar mixins como uma forma de aumentar uma classe adicionando múltiplos comportamentos, como o tratamento de eventos que vimos acima.
//   * Mixins podem se tornar um ponto de conflito se sobrescreverem acidentalmente métodos de classe existentes. Portanto, geralmente deve-se pensar bem sobre a nomenclatura dos métodos de um mixin, para minimizar a probabilidade de isso acontecer.