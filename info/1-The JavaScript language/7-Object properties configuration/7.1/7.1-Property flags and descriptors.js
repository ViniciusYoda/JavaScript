// -----

// ## Sinalizadores e Descritores de Propriedades

// Como sabemos, objetos podem armazenar propriedades.

// Até agora, uma propriedade era um simples par "chave-valor" para nós. Mas uma propriedade de objeto é, na verdade, algo mais flexível e poderoso.

// Neste capítulo, estudaremos opções de configuração adicionais, e no próximo veremos como transformá-las invisivelmente em funções getter/setter.

// -----

// ### Sinalizadores de Propriedade

// As propriedades de objeto, além de um **valor**, possuem três atributos especiais (os chamados "sinalizadores"):

//   * **`writable`** – se `true`, o valor pode ser alterado, caso contrário, é somente leitura.
//   * **`enumerable`** – se `true`, então listado em loops, caso contrário, não listado.
//   * **`configurable`** – se `true`, a propriedade pode ser excluída e esses atributos podem ser modificados, caso contrário, não.

// Ainda não os vimos, porque geralmente eles não aparecem. Quando criamos uma propriedade "da maneira usual", todos eles são `true`. Mas também podemos alterá-los a qualquer momento.

// Primeiro, vamos ver como obter esses sinalizadores.

// O método `Object.getOwnPropertyDescriptor` permite consultar a informação **completa** sobre uma propriedade.

// A sintaxe é:

// ```javascript
// let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
// ```

//   * `obj`: O objeto do qual obter informações.
//   * `propertyName`: O nome da propriedade.

// O valor retornado é um objeto chamado "descritor de propriedade": ele contém o valor e todos os sinalizadores.

// Por exemplo:

// ```javascript
// let user = {
//   name: "John"
// };

// let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

// alert( JSON.stringify(descriptor, null, 2 ) );
// /* descritor de propriedade:
// {
//   "value": "John",
//   "writable": true,
//   "enumerable": true,
//   "configurable": true
// }
// */
// ```

// Para alterar os sinalizadores, podemos usar `Object.defineProperty`.

// A sintaxe é:

// ```javascript
// Object.defineProperty(obj, propertyName, descriptor)
// ```

//   * `obj`, `propertyName`: O objeto e sua propriedade para aplicar o descritor.
//   * `descriptor`: Objeto descritor de propriedade a ser aplicado.

// Se a propriedade existe, `defineProperty` atualiza seus sinalizadores. Caso contrário, ele cria a propriedade com o valor e os sinalizadores fornecidos; nesse caso, se um sinalizador não for fornecido, ele é assumido como `false`.

// Por exemplo, aqui uma propriedade `name` é criada com todos os sinalizadores `false`:

// ```javascript
// let user = {};

// Object.defineProperty(user, "name", {
//   value: "John"
// });

// let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

// alert( JSON.stringify(descriptor, null, 2 ) );
// /*
// {
//   "value": "John",
//   "writable": false,
//   "enumerable": false,
//   "configurable": false
// }
// */
// ```

// Compare-o com `user.name` "normalmente criado" acima: agora todos os sinalizadores são `false`. Se não for isso que queremos, é melhor defini-los como `true` no `descriptor`.

// Agora vamos ver os efeitos dos sinalizadores por exemplo.

// -----

// ### Não Escrevível (`Non-writable`)

// Vamos tornar `user.name` não escrevível (não pode ser reatribuído) alterando o sinalizador `writable`:

// ```javascript
// let user = {
//   name: "John"
// };

// Object.defineProperty(user, "name", {
//   writable: false
// });

// user.name = "Pete"; // Erro: Não é possível atribuir a uma propriedade somente leitura 'name'
// ```

// Agora, ninguém pode mudar o nome do nosso usuário, a menos que apliquem seu próprio `defineProperty` para sobrescrever o nosso.

// -----

// #### Erros aparecem apenas no modo estrito

// No modo não estrito, nenhum erro ocorre ao escrever em propriedades não escrevíveis e afins. Mas a operação ainda não terá sucesso. As ações que violam sinalizadores são apenas ignoradas silenciosamente no modo não estrito.

// Aqui está o mesmo exemplo, mas a propriedade é criada do zero:

// ```javascript
// let user = { };

// Object.defineProperty(user, "name", {
//   value: "John",
//   // para novas propriedades, precisamos listar explicitamente o que é true
//   enumerable: true,
//   configurable: true
// });

// alert(user.name); // John
// user.name = "Pete"; // Erro
// ```

// -----

// ### Não Enumerável (`Non-enumerable`)

// Agora vamos adicionar um `toString` personalizado ao `user`.

// Normalmente, um `toString` embutido para objetos não é enumerável, ele não aparece em `for..in`. Mas se adicionarmos um `toString` próprio, por padrão ele aparece em `for..in`, assim:

// ```javascript
// let user = {
//   name: "John",
//   toString() {
//     return this.name;
//   }
// };

// // Por padrão, ambas as nossas propriedades são listadas:
// for (let key in user) alert(key); // name, toString
// ```

// Se não gostarmos disso, podemos definir `enumerable: false`. Então ele não aparecerá em um loop `for..in`, assim como o embutido:

// ```javascript
// let user = {
//   name: "John",
//   toString() {
//     return this.name;
//   }
// };

// Object.defineProperty(user, "toString", {
//   enumerable: false
// });

// // Agora nosso toString desaparece:
// for (let key in user) alert(key); // name
// ```

// Propriedades não enumeráveis também são excluídas de `Object.keys`:

// ```javascript
// alert(Object.keys(user)); // name
// ```

// -----

// ### Não Configurável (`Non-configurable`)

// O sinalizador não configurável (`configurable:false`) às vezes é predefinido para objetos e propriedades embutidos.

// Uma propriedade não configurável não pode ser excluída, seus atributos não podem ser modificados.

// Por exemplo, `Math.PI` é não escrevível, não enumerável e não configurável:

// ```javascript
// let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

// alert( JSON.stringify(descriptor, null, 2 ) );
// /*
// {
//   "value": 3.141592653589793,
//   "writable": false,
//   "enumerable": false,
//   "configurable": false
// }
// */
// ```

// Assim, um programador é incapaz de alterar o valor de `Math.PI` ou sobrescrevê-lo.

// ```javascript
// Math.PI = 3; // Erro, porque tem writable: false
// // delete Math.PI também não funcionará
// ```

// Também não podemos mudar `Math.PI` para ser `writable` novamente:

// ```javascript
// // Erro, por causa de configurable: false
// Object.defineProperty(Math, "PI", { writable: true });
// ```

// Não há absolutamente nada que possamos fazer com `Math.PI`.

// Tornar uma propriedade não configurável é um caminho sem volta. Não podemos revertê-la com `defineProperty`.

// **Por favor, note**: `configurable: false` impede a alteração dos sinalizadores de propriedade e sua exclusão, enquanto permite alterar seu valor.

// Aqui `user.name` é não configurável, mas ainda podemos alterá-lo (pois é escrevível):

// ```javascript
// let user = {
//   name: "John"
// };

// Object.defineProperty(user, "name", {
//   configurable: false
// });

// user.name = "Pete"; // funciona bem
// delete user.name; // Erro
// ```

// E aqui tornamos `user.name` uma constante "selada para sempre", assim como o `Math.PI` embutido:

// ```javascript
// let user = {
//   name: "John"
// };

// Object.defineProperty(user, "name", {
//   writable: false,
//   configurable: false
// });

// // não será possível alterar user.name ou seus sinalizadores
// // tudo isso não funcionará:
// user.name = "Pete";
// delete user.name;
// Object.defineProperty(user, "name", { value: "Pete" });
// ```

// -----

// #### A única mudança de atributo possível: `writable: true` → `false`

// Existe uma pequena exceção sobre a mudança de sinalizadores.

// Podemos mudar `writable: true` para `false` para uma propriedade não configurável, assim impedindo sua modificação de valor (para adicionar outra camada de proteção). Não o contrário, no entanto.

// -----

// ### Object.defineProperties

// Existe um método `Object.defineProperties(obj, descriptors)` que permite definir muitas propriedades de uma vez.

// A sintaxe é:

// ```javascript
// Object.defineProperties(obj, {
//   prop1: descriptor1,
//   prop2: descriptor2
//   // ...
// });
// ```

// Por exemplo:

// ```javascript
// Object.defineProperties(user, {
//   name: { value: "John", writable: false },
//   surname: { value: "Smith", writable: false },
//   // ...
// });
// ```

// Assim, podemos definir muitas propriedades de uma vez.

// -----

// ### Object.getOwnPropertyDescriptors

// Para obter todos os descritores de propriedade de uma vez, podemos usar o método `Object.getOwnPropertyDescriptors(obj)`.

// Juntamente com `Object.defineProperties`, ele pode ser usado como uma forma de clonagem de objeto "sensível a sinalizadores":

// ```javascript
// let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
// ```

// Normalmente, quando clonamos um objeto, usamos uma atribuição para copiar propriedades, assim:

// ```javascript
// for (let key in user) {
//   clone[key] = user[key]
// }
// ```

// ...Mas isso não copia os sinalizadores. Então, se quisermos um clone "melhor", `Object.defineProperties` é preferível.

// Outra diferença é que `for..in` ignora propriedades simbólicas e não enumeráveis, mas `Object.getOwnPropertyDescriptors` retorna **todos** os descritores de propriedade, incluindo os simbólicos e não enumeráveis.

// -----

// ### Selando um objeto globalmente

// Descritores de propriedade funcionam no nível de propriedades individuais.

// Existem também métodos que limitam o acesso a todo o objeto:

//   * `Object.preventExtensions(obj)`: Proíbe a adição de novas propriedades ao objeto.
//   * `Object.seal(obj)`: Proíbe a adição/remoção de propriedades. Define `configurable: false` para todas as propriedades existentes.
//   * `Object.freeze(obj)`: Proíbe a adição/remoção/alteração de propriedades. Define `configurable: false`, `writable: false` para todas as propriedades existentes.

// E também existem testes para eles:

//   * `Object.isExtensible(obj)`: Retorna `false` se a adição de propriedades for proibida, caso contrário, `true`.
//   * `Object.isSealed(obj)`: Retorna `true` se a adição/remoção de propriedades for proibida, e todas as propriedades existentes tiverem `configurable: false`.
//   * `Object.isFrozen(obj)`: Retorna `true` se a adição/remoção/alteração de propriedades for proibida, e todas as propriedades atuais forem `configurable: false`, `writable: false`.

// Esses métodos são raramente usados na prática.