// ---
// ## Object.keys, values, entries

// Vamos nos afastar das estruturas de dados individuais e falar sobre as iterações sobre elas.

// No capítulo anterior, vimos os métodos `map.keys()`, `map.values()`, `map.entries()`.

// Esses métodos são genéricos, há um acordo comum para usá-los em estruturas de dados. Se criarmos nossa própria estrutura de dados, devemos implementá-los também.

// Eles são suportados para:

// * **Map**
// * **Set**
// * **Array**

// Objetos simples também suportam métodos semelhantes, mas a sintaxe é um pouco diferente.

// ---
// ### Object.keys, values, entries

// Para objetos simples, os seguintes métodos estão disponíveis:

// * `Object.keys(obj)` – retorna um **array** de chaves.
// * `Object.values(obj)` – retorna um **array** de valores.
// * `Object.entries(obj)` – retorna um **array** de pares `[key, value]`.

// Por favor, observe as distinções (comparado ao map, por exemplo):

// |             | **Map** | **Object** |
// | :---------- | :----------- | :----------------- |
// | **Sintaxe** | `map.keys()` | `Object.keys(obj)` |
// | **Retorna** | iterável     | "real" Array       |

// A primeira diferença é que precisamos chamar `Object.keys(obj)`, e não `obj.keys()`.

// Por que isso? A principal razão é a flexibilidade. Lembre-se, objetos são a base de todas as estruturas complexas em JavaScript. Então, podemos ter um objeto próprio como `data` que implementa seu próprio método `data.values()`. E ainda podemos chamar `Object.values(data)` nele.

// A segunda diferença é que os métodos `Object.*` retornam objetos "reais" de array, não apenas um iterável. Isso é principalmente por razões históricas.

// Por exemplo:

// ```javascript
// let user = {
//   name: "John",
//   age: 30
// };

// // Object.keys(user) = ["name", "age"]
// // Object.values(user) = ["John", 30]
// // Object.entries(user) = [ ["name","John"], ["age",30] ]
// ```

// Aqui está um exemplo de uso de `Object.values` para iterar sobre os valores das propriedades:

// ```javascript
// let user = {
//   name: "John",
//   age: 30
// };

// // iterar sobre os valores
// for (let value of Object.values(user)) {
//   alert(value); // John, depois 30
// }
// ```

// ---
// ### Object.keys/values/entries ignoram propriedades simbólicas

// Assim como um loop `for..in`, esses métodos ignoram propriedades que usam `Symbol(...)` como chaves.

// Geralmente isso é conveniente. Mas se também quisermos chaves simbólicas, existe um método separado `Object.getOwnPropertySymbols` que retorna um array apenas de chaves simbólicas. Além disso, existe um método `Reflect.ownKeys(obj)` que retorna **todas** as chaves.

// ---
// ### Transformando objetos

// Objetos não possuem muitos métodos que existem para arrays, por exemplo, `map`, `filter` e outros.

// Se quisermos aplicá-los, podemos usar `Object.entries` seguido por `Object.fromEntries`:

// 1.  Use `Object.entries(obj)` para obter um array de pares chave/valor de `obj`.
// 2.  Use métodos de array nesse array, por exemplo, `map`, para transformar esses pares chave/valor.
// 3.  Use `Object.fromEntries(array)` no array resultante para transformá-lo de volta em um objeto.

// Por exemplo, temos um objeto com preços e gostaríamos de duplicá-los:

// ```javascript
// let prices = {
//   banana: 1,
//   orange: 2,
//   meat: 4,
// };

// let doublePrices = Object.fromEntries(
//   // converter prices para array, mapear cada par chave/valor para outro par
//   // e então fromEntries retorna o objeto
//   Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
// );

// alert(doublePrices.meat); // 8
// ```

// Pode parecer difícil à primeira vista, mas torna-se fácil de entender depois de usá-lo uma ou duas vezes. Podemos fazer cadeias poderosas de transformações dessa maneira.