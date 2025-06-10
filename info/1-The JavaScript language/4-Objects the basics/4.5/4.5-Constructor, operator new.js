// Claro! Aqui está a tradução completa e adaptada para o português do conteúdo sobre **"funções construtoras" e o operador `new`** em JavaScript:

// ---

// ## Construtor e o operador `new`

// A sintaxe regular `{...}` permite criar um único objeto. Mas, frequentemente, precisamos criar **vários objetos parecidos**, como diversos usuários, itens de menu etc.

// Isso pode ser feito usando **funções construtoras** e o **operador `new`**.

// ---

// ### Função Construtora

// Funções construtoras são tecnicamente **funções normais**. Mas seguem duas convenções:

// 1. São nomeadas com a **primeira letra maiúscula**.
// 2. Devem ser chamadas **apenas com o operador `new`**.

// Por exemplo:

// ```javascript
// function Usuario(nome) {
//   this.nome = nome;
//   this.eAdmin = false;
// }

// let usuario = new Usuario("João");

// alert(usuario.nome); // João
// alert(usuario.eAdmin); // false
// ```

// Quando uma função é executada com `new`, o que acontece é:

// 1. Um novo objeto vazio é criado e atribuído a `this`.
// 2. O corpo da função é executado. Normalmente, ele modifica o `this`, adicionando propriedades.
// 3. O valor de `this` é retornado automaticamente.

// Ou seja, `new Usuario("João")` é equivalente a:

// ```javascript
// function Usuario(nome) {
//   // this = {}; (implicitamente)

//   this.nome = nome;
//   this.eAdmin = false;

//   // return this; (implicitamente)
// }
// ```

// Assim, o código `let usuario = new Usuario("João")` tem o mesmo resultado que:

// ```javascript
// let usuario = {
//   nome: "João",
//   eAdmin: false
// };
// ```

// Agora, se quisermos criar outros usuários, podemos usar `new Usuario("Ana")`, `new Usuario("Carlos")` etc. Muito mais curto e legível do que escrever cada objeto manualmente.

// Esse é o principal propósito dos **construtores** – permitir a **criação reutilizável de objetos**.

// ---

// ### Qualquer função pode ser construtora?

// Tecnicamente, **qualquer função (exceto arrow functions)** pode ser usada como construtora. A convenção da letra maiúscula no nome é só um **acordo para indicar** que a função deve ser usada com `new`.

// ---

// ### `new function() { ... }`

// Se tivermos várias linhas de código para criar um **único objeto complexo**, podemos envolver esse código em uma função imediatamente executada com `new`, assim:

// ```javascript
// let usuario = new function() {
//   this.nome = "Maria";
//   this.eAdmin = false;

//   // ...outros códigos de criação
// };
// ```

// Essa função não pode ser reutilizada depois, pois não é salva em nenhum lugar. Serve apenas para **encapsular a lógica de criação de um único objeto**.

// ---

// ### Verificar se foi chamado com `new`: `new.target` (avançado)

// Dentro de uma função, podemos verificar se ela foi chamada com `new` usando a propriedade especial `new.target`.

// ```javascript
// function Usuario() {
//   alert(new.target);
// }

// Usuario();      // undefined
// new Usuario();  // function Usuario { ... }
// ```

// Com isso, podemos forçar que a função sempre se comporte como um construtor:

// ```javascript
// function Usuario(nome) {
//   if (!new.target) {
//     return new Usuario(nome); // força o uso de new
//   }

//   this.nome = nome;
// }

// let maria = Usuario("Maria");
// alert(maria.nome); // Maria
// ```

// Essa técnica é usada às vezes em bibliotecas para permitir chamadas com ou sem `new`.

// ---

// ### Retorno em funções construtoras

// Normalmente, funções construtoras **não usam `return`**. Elas configuram `this`, que é retornado automaticamente.

// Mas se houver um `return`, as regras são:

// * Se retornar um **objeto**, este será o valor final.
// * Se retornar um **primitivo (número, string, etc.)**, ele será **ignorado**, e `this` será retornado.

// Exemplo com retorno de objeto:

// ```javascript
// function UsuarioGrande() {
//   this.nome = "João";
//   return { nome: "Godzilla" }; // este objeto será retornado
// }

// alert( new UsuarioGrande().nome ); // Godzilla
// ```

// Exemplo com retorno vazio (ou primitivo):

// ```javascript
// function UsuarioPequeno() {
//   this.nome = "João";
//   return; // retorna `this`
// }

// alert( new UsuarioPequeno().nome ); // João
// ```

// ---

// ### Omissão de parênteses

// É possível omitir os parênteses ao usar `new` com funções sem argumentos:

// ```javascript
// let usuario = new Usuario;
// // é o mesmo que:
// let usuario = new Usuario();
// ```

// Apesar de permitido, **não é uma prática recomendada**, pois pode gerar confusão.

// ---

// ### Métodos em funções construtoras

// Construtores podem ter **métodos** também:

// ```javascript
// function Usuario(nome) {
//   this.nome = nome;

//   this.dizerOi = function() {
//     alert("Meu nome é: " + this.nome);
//   };
// }

// let joao = new Usuario("João");
// joao.dizerOi(); // Meu nome é: João
// ```

// O objeto criado será algo como:

// ```javascript
// {
//   nome: "João",
//   dizerOi: function() { ... }
// }
// ```

// ---

// ### Resumo

// * **Funções construtoras** são funções normais, mas com **primeira letra maiúscula**.
// * Devem ser chamadas com o operador `new`, que:

//   1. Cria um novo objeto;
//   2. Executa o corpo da função com `this` sendo o novo objeto;
//   3. Retorna `this`, a não ser que um objeto seja retornado manualmente.
// * Permitem criar **vários objetos semelhantes** de forma fácil.
// * JavaScript possui construtores embutidos como `Date`, `Set`, etc.
// * No futuro, você pode usar **classes** para isso, que são uma forma mais moderna e poderosa de criar objetos.

// ---


