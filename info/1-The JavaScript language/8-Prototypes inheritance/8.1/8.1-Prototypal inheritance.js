// -----

// ## Herança de Prototipos

// Em programação, frequentemente queremos pegar algo e estendê-lo.

// Por exemplo, temos um objeto `user` com suas propriedades e métodos, e queremos criar `admin` e `guest` como variantes ligeiramente modificadas dele. Gostaríamos de reutilizar o que temos em `user`, não copiar/reimplementar seus métodos, apenas construir um novo objeto sobre ele.

// A **herança de protótipos** é um recurso da linguagem que ajuda nisso.

// -----

// ### [[Prototype]]

// Em JavaScript, objetos têm uma propriedade especial oculta `[[Prototype]]` (conforme nomeado na especificação), que é `null` ou referencia outro objeto. Esse objeto é chamado de "um protótipo":

// ```mermaid
// graph TD
//     A[objeto] -->|"[[Prototype]]"| B[protótipo];
// ```

// Quando lemos uma propriedade de um `objeto`, e ela está faltando, o JavaScript a pega automaticamente do protótipo. Em programação, isso é chamado de "herança de protótipos". E em breve estudaremos muitos exemplos dessa herança, bem como recursos mais interessantes da linguagem construídos sobre ela.

// A propriedade `[[Prototype]]` é interna e oculta, mas existem muitas maneiras de defini-la.

// Uma delas é usar o nome especial `__proto__`, assim:

// ```javascript
// let animal = {
//   eats: true
// };
// let rabbit = {
//   jumps: true
// };

// rabbit.__proto__ = animal; // define rabbit.[[Prototype]] = animal
// ```

// Agora, se lermos uma propriedade de `rabbit`, e ela estiver faltando, o JavaScript a pegará automaticamente de `animal`.

// Por exemplo:

// ```javascript
// let animal = {
//   eats: true
// };
// let rabbit = {
//   jumps: true
// };

// rabbit.__proto__ = animal; // (*)

// // agora podemos encontrar ambas as propriedades em rabbit:
// alert( rabbit.eats ); // true (**)
// alert( rabbit.jumps ); // true
// ```

// Aqui a linha `(*)` define `animal` como o protótipo de `rabbit`.

// Então, quando `alert` tenta ler a propriedade `rabbit.eats` `(**)`, ela não está em `rabbit`, então o JavaScript segue a referência `[[Prototype]]` e a encontra em `animal` (olhe de baixo para cima):

// ```mermaid
// graph TD
//     A[rabbit] -->|[[Prototype]]| B[animal];
//     B -- eats: true --> C[propriedade];
//     A -- jumps: true --> D[propriedade];
// ```

// Aqui podemos dizer que "`animal` é o protótipo de `rabbit`" ou "`rabbit` herda prototipicamente de `animal`".

// Então, se `animal` tiver muitas propriedades e métodos úteis, eles se tornam automaticamente disponíveis em `rabbit`. Tais propriedades são chamadas de "herdadas".

// Se tivermos um método em `animal`, ele pode ser chamado em `rabbit`:

// ```javascript
// let animal = {
//   eats: true,
//   walk() {
//     alert("Caminhada animal");
//   }
// };

// let rabbit = {
//   jumps: true,
//   __proto__: animal
// };

// // walk é tirado do protótipo
// rabbit.walk(); // Caminhada animal
// ```

// O método é automaticamente retirado do protótipo, assim:

// ```mermaid
// graph TD
//     A[rabbit] -->|chamada walk()| B[método walk() em animal];
//     B -- this = rabbit --> C[execução];
// ```

// A cadeia de protótipos pode ser mais longa:

// ```javascript
// let animal = {
//   eats: true,
//   walk() {
//     alert("Caminhada animal");
//   }
// };

// let rabbit = {
//   jumps: true,
//   __proto__: animal
// };

// let longEar = {
//   earLength: 10,
//   __proto__: rabbit
// };

// // walk é tirado da cadeia de protótipos
// longEar.walk(); // Caminhada animal
// alert(longEar.jumps); // true (de rabbit)
// ```

// Agora, se lermos algo de `longEar`, e estiver faltando, o JavaScript o procurará em `rabbit`, e depois em `animal`.

// Existem apenas duas limitações:

// 1.  As referências não podem formar círculos. O JavaScript lançará um erro se tentarmos atribuir `__proto__` em um círculo.
// 2.  O valor de `__proto__` pode ser um objeto ou `null`. Outros tipos são ignorados.

// Também pode ser óbvio, mas ainda assim: pode haver apenas um `[[Prototype]]`. Um objeto não pode herdar de dois outros.

// -----

// ### `__proto__` é um getter/setter histórico para `[[Prototype]]`

// É um erro comum de desenvolvedores novatos não saber a diferença entre esses dois.

// Por favor, note que `__proto__` **não é o mesmo** que a propriedade interna `[[Prototype]]`. É um getter/setter para `[[Prototype]]`. Mais tarde, veremos situações em que isso importa, por enquanto vamos apenas manter isso em mente, enquanto construímos nosso entendimento da linguagem JavaScript.

// A propriedade `__proto__` é um pouco desatualizada. Ela existe por razões históricas, o JavaScript moderno sugere que devemos usar as funções `Object.getPrototypeOf`/`Object.setPrototypeOf` em vez disso, que obtêm/definem o protótipo. Também abordaremos essas funções mais tarde.

// Pela especificação, `__proto__` deve ser suportado apenas por navegadores. Na verdade, todos os ambientes, incluindo o lado do servidor, suportam `__proto__`, então estamos bastante seguros usando-o.

// Como a notação `__proto__` é um pouco mais intuitivamente óbvia, nós a usamos nos exemplos.

// -----

// ### Escrita não usa protótipo

// O protótipo é usado apenas para ler propriedades.

// Operações de escrita/exclusão funcionam diretamente com o objeto.

// No exemplo abaixo, atribuímos seu próprio método `walk` a `rabbit`:

// ```javascript
// let animal = {
//   eats: true,
//   walk() {
//     /* este método não será usado por rabbit */
//   }
// };

// let rabbit = {
//   __proto__: animal
// };

// rabbit.walk = function() {
//   alert("Coelho! Pula-pula!");
// };

// rabbit.walk(); // Coelho! Pula-pula!
// ```

// De agora em diante, a chamada `rabbit.walk()` encontra o método imediatamente no objeto e o executa, sem usar o protótipo:

// ```mermaid
// graph TD
//     A[rabbit] -->|chamada walk()| B[método walk() em rabbit];
//     B -- this = rabbit --> C[execução];
// ```

// Propriedades acessoras são uma exceção, pois a atribuição é tratada por uma função setter. Portanto, escrever em tal propriedade é, na verdade, o mesmo que chamar uma função.

// Por essa razão, `admin.fullName` funciona corretamente no código abaixo:

// ```javascript
// let user = {
//   name: "John",
//   surname: "Smith",

//   set fullName(value) {
//     [this.name, this.surname] = value.split(" ");
//   },

//   get fullName() {
//     return `${this.name} ${this.surname}`;
//   }
// };

// let admin = {
//   __proto__: user,
//   isAdmin: true
// };

// alert(admin.fullName); // John Smith (*)

// // o setter dispara!
// admin.fullName = "Alice Cooper"; // (**)

// alert(admin.fullName); // Alice Cooper, estado de admin modificado
// alert(user.fullName); // John Smith, estado de user protegido
// ```

// Aqui na linha `(*)` a propriedade `admin.fullName` tem um getter no protótipo `user`, então ela é chamada. E na linha `(**)` a propriedade tem um setter no protótipo, então ele é chamado.

// -----

// ### O valor de "this"

// Uma pergunta interessante pode surgir no exemplo acima: qual é o valor de `this` dentro de `set fullName(value)`? Onde as propriedades `this.name` e `this.surname` são escritas: em `user` ou `admin`?

// A resposta é simples: **`this` não é afetado por protótipos de forma alguma.**

// Não importa onde o método é encontrado: em um objeto ou seu protótipo. Em uma chamada de método, `this` é sempre o objeto antes do ponto.

// Então, a chamada do setter `admin.fullName=` usa `admin` como `this`, não `user`.

// Isso é, na verdade, algo super importante, porque podemos ter um objeto grande com muitos métodos, e ter objetos que herdam dele. E quando os objetos que herdam executam os métodos herdados, eles modificarão apenas seus próprios estados, não o estado do objeto grande.

// Por exemplo, aqui `animal` representa um "armazenamento de métodos", e `rabbit` o utiliza.

// A chamada `rabbit.sleep()` define `this.isSleeping` no objeto `rabbit`:

// ```javascript
// // animal tem métodos
// let animal = {
//   walk() {
//     if (!this.isSleeping) {
//       alert(`Eu ando`);
//     }
//   },
//   sleep() {
//     this.isSleeping = true;
//   }
// };

// let rabbit = {
//   name: "Coelho Branco",
//   __proto__: animal
// };

// // modifica rabbit.isSleeping
// rabbit.sleep();

// alert(rabbit.isSleeping); // true
// alert(animal.isSleeping); // undefined (nenhuma propriedade assim no protótipo)
// ```

// A imagem resultante:

// ```mermaid
// graph TD
//     A[rabbit] -->|isSleeping: true| B[propriedade de rabbit];
//     A -->|[[Prototype]]| C[animal];
//     C -- walk(), sleep() --> D[métodos em animal];
// ```

// Se tivéssemos outros objetos, como `bird`, `snake`, etc., herdando de `animal`, eles também teriam acesso aos métodos de `animal`. Mas `this` em cada chamada de método seria o objeto correspondente, avaliado no momento da chamada (antes do ponto), não `animal`. Então, quando escrevemos dados em `this`, eles são armazenados nesses objetos.

// Como resultado, os métodos são compartilhados, mas o estado do objeto não é.

// -----

// ### Loop `for...in`

// O loop `for..in` itera sobre propriedades herdadas também.

// Por exemplo:

// ```javascript
// let animal = {
//   eats: true
// };

// let rabbit = {
//   jumps: true,
//   __proto__: animal
// };

// // Object.keys retorna apenas chaves próprias
// alert(Object.keys(rabbit)); // jumps

// // for..in itera sobre chaves próprias e herdadas
// for(let prop in rabbit) alert(prop); // jumps, depois eats
// ```

// Se não for isso que queremos, e gostaríamos de excluir propriedades herdadas, existe um método embutido `obj.hasOwnProperty(key)`: ele retorna `true` se `obj` tiver sua própria propriedade (não herdada) chamada `key`.

// Então podemos filtrar propriedades herdadas (ou fazer outra coisa com elas):

// ```javascript
// let animal = {
//   eats: true
// };

// let rabbit = {
//   jumps: true,
//   __proto__: animal
// };

// for(let prop in rabbit) {
//   let isOwn = rabbit.hasOwnProperty(prop);

//   if (isOwn) {
//     alert(`Nosso: ${prop}`); // Nosso: jumps
//   } else {
//     alert(`Herdado: ${prop}`); // Herdado: eats
//   }
// }
// ```

// Aqui temos a seguinte cadeia de herança: `rabbit` herda de `animal`, que herda de `Object.prototype` (porque `animal` é um objeto literal `{}`, então é por padrão), e então `null` acima dele:

// ```mermaid
// graph TD
//     A[rabbit] -->|__proto__| B[animal];
//     B -->|__proto__| C[Object.prototype];
//     C -->|__proto__| D[null];
// ```

// Note, há uma coisa engraçada. De onde vem o método `rabbit.hasOwnProperty`? Não o definimos. Olhando para a cadeia, podemos ver que o método é fornecido por `Object.prototype.hasOwnProperty`. Em outras palavras, é herdado.

// ...Mas por que `hasOwnProperty` não aparece no loop `for..in` como `eats` e `jumps`, se `for..in` lista propriedades herdadas?

// A resposta é simples: não é enumerável. Assim como todas as outras propriedades de `Object.prototype`, ele tem o sinalizador `enumerable:false`. E `for..in` lista apenas propriedades enumeráveis. É por isso que ele e o restante das propriedades de `Object.prototype` não são listados.

// -----

// ### Quase todos os outros métodos de obtenção de chave/valor ignoram propriedades herdadas

// Quase todos os outros métodos de obtenção de chave/valor, como `Object.keys`, `Object.values` e assim por diante, ignoram propriedades herdadas.

// Eles operam apenas no próprio objeto. Propriedades do protótipo **não** são levadas em consideração.

// -----

// ### Resumo

// Em JavaScript, todos os objetos têm uma propriedade oculta `[[Prototype]]` que é outro objeto ou `null`.

//   * Podemos usar `obj.__proto__` para acessá-lo (um getter/setter histórico, existem outras maneiras, que serão abordadas em breve).
//   * O objeto referenciado por `[[Prototype]]` é chamado de "protótipo".
//   * Se quisermos ler uma propriedade de `obj` ou chamar um método, e ele não existir, o JavaScript tenta encontrá-lo no protótipo.
//   * Operações de escrita/exclusão agem diretamente no objeto, elas não usam o protótipo (assumindo que é uma propriedade de dados, não um setter).
//   * Se chamarmos `obj.method()`, e o `method` for retirado do protótipo, `this` ainda se refere a `obj`. Então os métodos sempre funcionam com o objeto atual, mesmo que sejam herdados.
//   * O loop `for..in` itera sobre suas próprias propriedades e as herdadas. Todos os outros métodos de obtenção de chave/valor operam apenas no próprio objeto.