
// Claro! Aqui está a tradução completa e adaptada para o português do texto sobre o tipo **Symbol** em JavaScript:

// ---

// ## Tipo Symbol

// Pela especificação, apenas dois tipos primitivos podem ser usados como chaves de propriedades em objetos:

// * tipo **string**, ou
// * tipo **symbol**.

// Se usar outro tipo, como **number**, ele será automaticamente convertido para string. Por exemplo, `obj[1]` é o mesmo que `obj["1"]`, e `obj[true]` é o mesmo que `obj["true"]`.

// Até agora, só usamos strings.

// Agora vamos explorar os **symbols** e ver o que eles podem fazer por nós.

// ---

// ## Symbols

// Um **symbol** representa um identificador único.

// Um valor desse tipo pode ser criado usando `Symbol()`:

// ```js
// let id = Symbol();
// ```

// Ao criar um symbol, podemos dar a ele uma descrição (também chamada de nome do symbol), útil principalmente para depuração:

// ```js
// // id é um symbol com a descrição "id"
// let id = Symbol("id");
// ```

// Os symbols são garantidamente únicos. Mesmo que criemos vários symbols com exatamente a mesma descrição, eles são valores diferentes. A descrição é apenas um rótulo e não altera nada.

// Por exemplo, aqui temos dois symbols com a mesma descrição — eles não são iguais:

// ```js
// let id1 = Symbol("id");
// let id2 = Symbol("id");

// alert(id1 == id2); // false
// ```

// Se você conhece Ruby ou outra linguagem que também tenha algo chamado "symbols", não se confunda. Os symbols em JavaScript são diferentes.

// Resumindo, um **symbol** é um valor primitivo único com uma descrição opcional. Vamos ver onde podemos usá-los.

// ---

// ## Symbols não são convertidos automaticamente em string

// A maioria dos valores em JavaScript suporta conversão implícita para string. Por exemplo, podemos exibir quase qualquer valor com `alert` e funciona.

// Symbols são especiais: **eles não se convertem automaticamente para string**.

// Por exemplo, este código gera erro:

// ```js
// let id = Symbol("id");
// alert(id); // TypeError: Cannot convert a Symbol value to a string
// ```

// Isso é uma "proteção da linguagem" para evitar confusão, porque strings e symbols são fundamentalmente diferentes e não devem ser convertidos acidentalmente um no outro.

// Se quisermos mostrar um symbol, precisamos chamar explicitamente `.toString()`:

// ```js
// let id = Symbol("id");
// alert(id.toString()); // Symbol(id), agora funciona
// ```

// Ou acessar apenas a descrição:

// ```js
// let id = Symbol("id");
// alert(id.description); // id
// ```

// ---

// ## Propriedades "ocultas"

// Symbols permitem criar propriedades "ocultas" em objetos, que nenhuma outra parte do código pode acessar ou sobrescrever acidentalmente.

// Por exemplo, se trabalhamos com objetos `user` que pertencem a um código de terceiros, e queremos adicionar identificadores a eles.

// Vamos usar uma chave do tipo symbol para isso:

// ```js
// let user = { // objeto do código de terceiros
//   name: "John"
// };

// let id = Symbol("id");

// user[id] = 1;

// alert(user[id]); // conseguimos acessar o dado usando o symbol como chave
// ```

// ### Qual a vantagem de usar `Symbol("id")` ao invés da string `"id"`?

// Como os objetos `user` pertencem a outro código, é inseguro adicionar campos com strings, porque podemos afetar comportamentos já definidos nesse código.

// Já com symbols, ninguém vai acessar acidentalmente a propriedade, pois o código de terceiros não sabe dos symbols criados. Então é seguro adicionar símbolos aos objetos.

// Além disso, imagine que outro script também queira seu próprio identificador dentro do `user` para seus propósitos.

// Esse script pode criar seu próprio symbol `Symbol("id")` assim:

// ```js
// // ...
// let id = Symbol("id");

// user[id] = "Valor do id deles";
// ```

// Não haverá conflito entre nossos symbols e os deles, porque symbols são sempre diferentes, mesmo com o mesmo nome.

// ---

// Mas se usássemos a string `"id"` em vez de symbol, haveria conflito:

// ```js
// let user = { name: "John" };

// // Nosso script usa a propriedade "id"
// user.id = "Nosso valor de id";

// // Outro script também quer "id" para seu uso...

// user.id = "Valor do id deles";
// // Boom! Sobrescrito pelo outro script!
// ```

// ---

// ## Symbols em objeto literal

// Se quisermos usar um symbol em um objeto literal `{...}`, precisamos usar colchetes ao redor da chave:

// ```js
// let id = Symbol("id");

// let user = {
//   name: "John",
//   [id]: 123 // não "id": 123
// };
// ```

// Isso porque queremos usar o valor da variável `id` como chave, e não a string `"id"`.

// ---

// ## Symbols são ignorados pelo `for...in`

// Propriedades simbolizadas não participam do loop `for...in`.

// Exemplo:

// ```js
// let id = Symbol("id");
// let user = {
//   name: "John",
//   age: 30,
//   [id]: 123
// };

// for (let key in user) alert(key); // name, age (symbols não aparecem)

// // acesso direto pelo symbol funciona
// alert("Direto: " + user[id]); // Direto: 123
// ```

// `Object.keys(user)` também ignora symbols. Isso faz parte do princípio geral de "esconder propriedades simbólicas". Se outro script ou biblioteca fizer um loop no nosso objeto, ele não vai acessar uma propriedade simbolizada sem querer.

// Por outro lado, `Object.assign` copia propriedades de string e symbol:

// ```js
// let id = Symbol("id");
// let user = {
//   [id]: 123
// };

// let clone = Object.assign({}, user);

// alert(clone[id]); // 123
// ```

// Não é um paradoxo: é intencional. Ao clonar ou mesclar objetos, queremos copiar todas as propriedades, inclusive symbols.

// ---

// ## Symbols globais

// Normalmente, symbols são todos diferentes, mesmo com o mesmo nome.

// Mas às vezes queremos que symbols com o mesmo nome sejam exatamente o mesmo valor. Por exemplo, diferentes partes da aplicação querem acessar o symbol `"id"` que significa exatamente a mesma propriedade.

// Para isso, existe um registro global de symbols.

// Podemos criar symbols nele e acessá-los depois, garantindo que acessos repetidos pelo mesmo nome retornem o mesmo symbol.

// Para ler (ou criar se não existir) um symbol do registro global, usamos:

// ```js
// Symbol.for(chave)
// ```

// Esse método verifica o registro global: se existir um symbol com a chave, retorna ele; se não existir, cria um novo `Symbol(chave)` e o registra.

// Exemplo:

// ```js
// // lê do registro global
// let id = Symbol.for("id"); // se não existir, cria

// // lê de novo (talvez de outra parte do código)
// let idAgain = Symbol.for("id");

// // é o mesmo symbol
// alert(id === idAgain); // true
// ```

// Symbols do registro são chamados **symbols globais**. Se quisermos um symbol acessível em toda a aplicação, usamos esse recurso.

// ---

// ## Parece com Ruby

// Em algumas linguagens, como Ruby, existe um único symbol por nome.

// Em JavaScript, isso é verdade para symbols globais.

// ---

// ## Symbol.keyFor

// Vimos que `Symbol.for(key)` retorna um symbol global pelo nome.

// Para fazer o contrário — retornar o nome dado um symbol global — usamos:

// ```js
// Symbol.keyFor(sym)
// ```

// Exemplo:

// ```js
// let sym = Symbol.for("nome");
// let sym2 = Symbol.for("id");

// alert(Symbol.keyFor(sym));  // nome
// alert(Symbol.keyFor(sym2)); // id
// ```

// `Symbol.keyFor` usa o registro global para buscar a chave do symbol. Por isso, não funciona para symbols locais (não globais). Se o symbol não for global, retorna `undefined`.

// Mas todos os symbols têm a propriedade `.description`.

// Exemplo:

// ```js
// let globalSymbol = Symbol.for("nome");
// let localSymbol = Symbol("nome");

// alert(Symbol.keyFor(globalSymbol)); // nome (symbol global)
// alert(Symbol.keyFor(localSymbol));  // undefined (não global)

// alert(localSymbol.description); // nome
// ```

// ---

// ## Symbols do sistema

// Existem muitos **symbols do sistema** que o JavaScript usa internamente, e podemos usar para ajustar aspectos dos nossos objetos.

// Eles estão listados na especificação na tabela "Well-known symbols" (symbols bem conhecidos), como:

// * `Symbol.hasInstance`
// * `Symbol.isConcatSpreadable`
// * `Symbol.iterator`
// * `Symbol.toPrimitive`
// * e outros.

// Por exemplo, `Symbol.toPrimitive` nos permite descrever a conversão de objeto para valor primitivo (veremos isso em breve).

// Outros symbols ficarão familiares quando estudarmos os recursos de linguagem correspondentes.

// ---

// ## Resumo

// * Symbol é um tipo primitivo para identificadores únicos.

// * Symbols são criados com `Symbol()` e podem ter uma descrição opcional.

// * Symbols são sempre valores diferentes, mesmo com o mesmo nome. Se quiser symbols com o mesmo nome serem iguais, use o registro global: `Symbol.for(key)` cria ou retorna um symbol global.

// * Symbols têm dois usos principais:

//   1. **Propriedades "ocultas" em objetos.** Para adicionar uma propriedade em um objeto que pertence a outro script ou biblioteca, usar symbol como chave evita conflitos e acesso acidental, pois símbolos não aparecem em loops `for...in` nem são acessíveis sem o próprio símbolo.

//   2. **Symbols do sistema**, que permitem customizar comportamentos internos de objetos.

// * Symbols não são 100% ocultos: `Object.getOwnPropertySymbols(obj)` retorna todos os symbols do objeto, e `Reflect.ownKeys(obj)` retorna todas as chaves, incluindo symbols. Porém, a maioria das funções e bibliotecas não usa esses métodos.

// ---


