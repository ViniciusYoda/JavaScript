// ---
// ## Map e Set

// Até agora, aprendemos sobre as seguintes estruturas de dados complexas:

// * **Objetos** são usados para armazenar coleções com chaves.
// * **Arrays** são usados para armazenar coleções ordenadas.

// Mas isso não é suficiente para a vida real. É por isso que **Map** e **Set** também existem.

// ---
// ### Map

// **Map** é uma coleção de itens de dados com chaves, assim como um **Objeto**. Mas a principal diferença é que o **Map** permite chaves de qualquer tipo.

// Métodos e propriedades são:

// * `new Map()` – cria o mapa.
// * `map.set(key, value)` – armazena o valor pela chave.
// * `map.get(key)` – retorna o valor pela chave, `undefined` se a `key` não existir no mapa.
// * `map.has(key)` – retorna `true` se a `key` existir, `false` caso contrário.
// * `map.delete(key)` – remove o elemento (o par chave/valor) pela chave.
// * `map.clear()` – remove tudo do mapa.
// * `map.size` – retorna a contagem atual de elementos.

// Por exemplo:

// ```javascript
// let map = new Map();

// map.set('1', 'str1');   // uma chave string
// map.set(1, 'num1');     // uma chave numérica
// map.set(true, 'bool1'); // uma chave booleana

// // lembra do Objeto regular? ele converteria as chaves para string
// // Map mantém o tipo, então estes dois são diferentes:
// alert( map.get(1)   ); // 'num1'
// alert( map.get('1') ); // 'str1'

// alert( map.size ); // 3
// ```

// Como podemos ver, ao contrário dos objetos, as chaves não são convertidas para strings. Qualquer tipo de chave é possível.

// ---
// #### `map[key]` não é a forma correta de usar um `Map`

// Embora `map[key]` também funcione, por exemplo, podemos definir `map[key] = 2`, isso está tratando `map` como um objeto JavaScript simples, o que implica em todas as limitações correspondentes (apenas chaves de string/símbolo e assim por diante).

// Então, devemos usar os métodos do `map`: `set`, `get` e assim por diante.

// ---
// #### Map também pode usar objetos como chaves.

// Por exemplo:

// ```javascript
// let john = { name: "John" };

// // para cada usuário, vamos armazenar sua contagem de visitas
// let visitsCountMap = new Map();

// // john é a chave para o mapa
// visitsCountMap.set(john, 123);

// alert( visitsCountMap.get(john) ); // 123
// ```

// Usar objetos como chaves é uma das características mais notáveis e importantes do **Map**. O mesmo não vale para **Object**. Uma string como chave em **Object** está tudo bem, mas não podemos usar outro **Object** como chave em **Object**.

// Vamos tentar:

// ```javascript
// let john = { name: "John" };
// let ben = { name: "Ben" };

// let visitsCountObj = {}; // tentar usar um objeto

// visitsCountObj[ben] = 234; // tentar usar o objeto ben como chave
// visitsCountObj[john] = 123; // tentar usar o objeto john como chave, o objeto ben será substituído

// // Isso é o que foi escrito!
// alert( visitsCountObj["[object Object]"] ); // 123
// ```

// Como `visitsCountObj` é um objeto, ele converte todas as chaves **Object**, como `john` e `ben` acima, para a mesma string `"[object Object]"`. Definitivamente não é o que queremos.

// ---
// #### Como o `Map` compara chaves

// Para testar a equivalência de chaves, o **Map** usa o algoritmo `SameValueZero`. É aproximadamente o mesmo que a igualdade estrita `===`, mas a diferença é que `NaN` é considerado igual a `NaN`. Então, `NaN` também pode ser usado como chave.

// Este algoritmo não pode ser alterado ou personalizado.

// ---
// #### Encadeamento (Chaining)

// Cada chamada `map.set` retorna o próprio mapa, então podemos "encadear" as chamadas:

// ```javascript
// map.set('1', 'str1')
//   .set(1, 'num1')
//   .set(true, 'bool1');
// ```

// ---
// #### Iteração sobre Map

// Para percorrer um `map`, existem 3 métodos:

// * `map.keys()` – retorna um iterável para chaves,
// * `map.values()` – retorna um iterável para valores,
// * `map.entries()` – retorna um iterável para entradas `[key, value]`, é usado por padrão em `for..of`.

// Por exemplo:

// ```javascript
// let recipeMap = new Map([
//   ['cucumber', 500],
//   ['tomatoes', 350],
//   ['onion',    50]
// ]);

// // iterar sobre chaves (vegetables)
// for (let vegetable of recipeMap.keys()) {
//   alert(vegetable); // cucumber, tomatoes, onion
// }

// // iterar sobre valores (amounts)
// for (let amount of recipeMap.values()) {
//   alert(amount); // 500, 350, 50
// }

// // iterar sobre entradas [key, value]
// for (let entry of recipeMap) { // o mesmo que of recipeMap.entries()
//   alert(entry); // cucumber,500 (e assim por diante)
// }
// ```

// ---
// #### A ordem de inserção é usada

// A iteração segue a mesma ordem em que os valores foram inseridos. O **Map** preserva essa ordem, ao contrário de um **Object** regular.

// Além disso, o **Map** possui um método `forEach` integrado, semelhante ao **Array**:

// ```javascript
// // executa a função para cada par (chave, valor)
// recipeMap.forEach( (value, key, map) => {
//   alert(`${key}: ${value}`); // cucumber: 500 etc
// });
// ```

// ---
// #### `Object.entries`: Map a partir de Object

// Quando um **Map** é criado, podemos passar um array (ou outro iterável) com pares chave/valor para inicialização, assim:

// ```javascript
// // array de pares [key, value]
// let map = new Map([
//   ['1',  'str1'],
//   [1,    'num1'],
//   [true, 'bool1']
// ]);

// alert( map.get('1') ); // str1
// ```

// Se tivermos um objeto simples e quisermos criar um **Map** a partir dele, podemos usar o método embutido `Object.entries(obj)` que retorna um array de pares chave/valor para um objeto exatamente nesse formato.

// Então, podemos criar um mapa a partir de um objeto assim:

// ```javascript
// let obj = {
//   name: "John",
//   age: 30
// };

// let map = new Map(Object.entries(obj));

// alert( map.get('name') ); // John
// ```

// Aqui, `Object.entries` retorna o array de pares chave/valor: `[ ["name","John"], ["age", 30] ]`. É exatamente isso que o **Map** precisa.

// ---
// #### `Object.fromEntries`: Object a partir de Map

// Acabamos de ver como criar um **Map** a partir de um objeto simples com `Object.entries(obj)`.

// Existe o método `Object.fromEntries` que faz o inverso: dado um array de pares `[key, value]`, ele cria um objeto a partir deles:

// ```javascript
// let prices = Object.fromEntries([
//   ['banana', 1],
//   ['orange', 2],
//   ['meat', 4]
// ]);

// // agora prices = { banana: 1, orange: 2, meat: 4 }
// alert(prices.orange); // 2
// ```

// Podemos usar `Object.fromEntries` para obter um objeto simples a partir de um **Map**.

// Por exemplo, armazenamos os dados em um **Map**, mas precisamos passá-los para um código de terceiros que espera um objeto simples.

// Aqui está:

// ```javascript
// let map = new Map();
// map.set('banana', 1);
// map.set('orange', 2);
// map.set('meat', 4);

// let obj = Object.fromEntries(map.entries()); // cria um objeto simples (*)

// // pronto!
// // obj = { banana: 1, orange: 2, meat: 4 }
// alert(obj.orange); // 2
// ```

// Uma chamada para `map.entries()` retorna um iterável de pares chave/valor, exatamente no formato certo para `Object.fromEntries`.

// Também poderíamos encurtar a linha `(*)`:

// ```javascript
// let obj = Object.fromEntries(map); // omitir .entries()
// ```

// É o mesmo, porque `Object.fromEntries` espera um objeto iterável como argumento. Não necessariamente um array. E a iteração padrão para `map` retorna os mesmos pares chave/valor que `map.entries()`. Então, obtemos um objeto simples com as mesmas chaves/valores do `map`.

// ---
// ### Set

// Um **Set** é um tipo especial de coleção – um "conjunto de valores" (sem chaves), onde cada valor pode ocorrer apenas uma vez.

// Seus principais métodos são:

// * `new Set([iterable])` – cria o conjunto, e se um objeto `iterable` for fornecido (geralmente um array), copia os valores dele para o conjunto.
// * `set.add(value)` – adiciona um valor, retorna o próprio conjunto.
// * `set.delete(value)` – remove o valor, retorna `true` se o `value` existia no momento da chamada, caso contrário `false`.
// * `set.has(value)` – retorna `true` se o valor existir no conjunto, caso contrário `false`.
// * `set.clear()` – remove tudo do conjunto.
// * `set.size` – é a contagem de elementos.

// A principal característica é que chamadas repetidas de `set.add(value)` com o mesmo valor não fazem nada. Essa é a razão pela qual cada valor aparece em um **Set** apenas uma vez.

// Por exemplo, temos visitantes chegando e gostaríamos de lembrar de todos. Mas visitas repetidas não devem levar a duplicatas. Um visitante deve ser "contado" apenas uma vez.

// **Set** é exatamente o que você precisa para isso:

// ```javascript
// let set = new Set();

// let john = { name: "John" };
// let pete = { name: "Pete" };
// let mary = { name: "Mary" };

// // visitas, alguns usuários vêm várias vezes
// set.add(john);
// set.add(pete);
// set.add(mary);
// set.add(john);
// set.add(mary);

// // set mantém apenas valores únicos
// alert( set.size ); // 3

// for (let user of set) {
//   alert(user.name); // John (depois Pete e Mary)
// }
// ```

// A alternativa ao **Set** poderia ser um array de usuários, e o código para verificar duplicatas em cada inserção usando `arr.find`. Mas o desempenho seria muito pior, porque esse método percorre todo o array verificando cada elemento. O **Set** é muito mais otimizado internamente para verificações de unicidade.

// ---
// #### Iteração sobre Set

// Podemos percorrer um conjunto com `for..of` ou usando `forEach`:

// ```javascript
// let set = new Set(["oranges", "apples", "bananas"]);

// for (let value of set) alert(value);

// // o mesmo com forEach:
// set.forEach((value, valueAgain, set) => {
//   alert(value);
// });
// ```

// Observe a coisa engraçada. A função de callback passada em `forEach` tem 3 argumentos: um `value`, depois o *mesmo valor* `valueAgain`, e depois o objeto alvo. De fato, o mesmo valor aparece nos argumentos duas vezes.

// Isso é para compatibilidade com o **Map**, onde o callback passado para `forEach` tem três argumentos. Parece um pouco estranho, com certeza. Mas isso pode ajudar a substituir o **Map** pelo **Set** em certos casos com facilidade, e vice-versa.

// Os mesmos métodos que o **Map** tem para iteradores também são suportados:

// * `set.keys()` – retorna um objeto iterável para valores,
// * `set.values()` – o mesmo que `set.keys()`, para compatibilidade com **Map**,
// * `set.entries()` – retorna um objeto iterável para entradas `[value, value]`, existe para compatibilidade com **Map**.

// ---
// ### Resumo

// **Map** – é uma coleção de valores com chaves.

// Métodos e propriedades:

// * `new Map([iterable])` – cria o mapa, com `iterable` opcional (ex: array) de pares `[key,value]` para inicialização.
// * `map.set(key, value)` – armazena o valor pela chave, retorna o próprio mapa.
// * `map.get(key)` – retorna o valor pela chave, `undefined` se a `key` não existir no mapa.
// * `map.has(key)` – retorna `true` se a `key` existir, `false` caso contrário.
// * `map.delete(key)` – remove o elemento pela chave, retorna `true` se a `key` existia no momento da chamada, caso contrário `false`.
// * `map.clear()` – remove tudo do mapa.
// * `map.size` – retorna a contagem atual de elementos.

// As diferenças de um **Object** regular:

// * Qualquer tipo de chave, objetos podem ser chaves.
// * Métodos convenientes adicionais, a propriedade `size`.

// **Set** – é uma coleção de valores únicos.

// Métodos e propriedades:

// * `new Set([iterable])` – cria o conjunto, com `iterable` opcional (ex: array) de valores para inicialização.
// * `set.add(value)` – adiciona um valor (não faz nada se o `value` existir), retorna o próprio conjunto.
// * `set.delete(value)` – remove o valor, retorna `true` se o `value` existia no momento da chamada, caso contrário `false`.
// * `set.has(value)` – retorna `true` se o valor existe no conjunto, caso contrário `false`.
// * `set.clear()` – remove tudo do conjunto.
// * `set.size` – é a contagem de elementos.

// A iteração sobre **Map** e **Set** é sempre na ordem de inserção, então não podemos dizer que essas coleções são desordenadas, mas não podemos reordenar elementos ou obter diretamente um elemento pelo seu número.