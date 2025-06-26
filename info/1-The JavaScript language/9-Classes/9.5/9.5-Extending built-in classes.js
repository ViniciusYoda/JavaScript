// -----

// ## Estendendo Classes Nativas

// Classes nativas como `Array`, `Map` e outras também são extensíveis.

// Por exemplo, aqui `PowerArray` herda do `Array` nativo:

// ```javascript
// // adiciona mais um método a ele (pode fazer mais)
// class PowerArray extends Array {
//   isEmpty() {
//     return this.length === 0;
//   }
// }

// let arr = new PowerArray(1, 2, 5, 10, 50);
// alert(arr.isEmpty()); // false

// let filteredArr = arr.filter(item => item >= 10);
// alert(filteredArr); // 10, 50
// alert(filteredArr.isEmpty()); // false
// ```

// Observe algo muito interessante. Métodos nativos como `filter`, `map` e outros retornam novos objetos exatamente do tipo herdado `PowerArray`. Sua implementação interna usa a propriedade `constructor` do objeto para isso.

// No exemplo acima,

// `arr.constructor === PowerArray`

// Quando `arr.filter()` é chamado, ele cria internamente o novo array de resultados usando exatamente `arr.constructor`, não o `Array` básico. Isso é realmente muito legal, porque podemos continuar usando os métodos de `PowerArray` no resultado.

// Mais ainda, podemos personalizar esse comportamento.

// Podemos adicionar um **getter estático** especial `Symbol.species` à classe. Se ele existir, deve retornar o construtor que o JavaScript usará internamente para criar novas entidades em `map`, `filter` e assim por diante.

// Se quisermos que métodos nativos como `map` ou `filter` retornem arrays regulares, podemos retornar `Array` em `Symbol.species`, como aqui:

// ```javascript
// class PowerArray extends Array {
//   isEmpty() {
//     return this.length === 0;
//   }

//   // métodos nativos usarão este como o construtor
//   static get [Symbol.species]() {
//     return Array;
//   }
// }

// let arr = new PowerArray(1, 2, 5, 10, 50);
// alert(arr.isEmpty()); // false

// // filter cria um novo array usando arr.constructor[Symbol.species] como construtor
// let filteredArr = arr.filter(item => item >= 10);

// // filteredArr não é PowerArray, mas Array
// alert(filteredArr.isEmpty()); // Erro: filteredArr.isEmpty is not a function
// ```

// Como você pode ver, agora `.filter` retorna `Array`. Assim, a funcionalidade estendida não é passada adiante.

// -----

// ### Outras coleções funcionam de forma semelhante

// Outras coleções, como `Map` e `Set`, funcionam de forma semelhante. Elas também usam `Symbol.species`.

// -----

// ### Nenhuma herança estática em classes nativas

// Objetos nativos têm seus próprios métodos estáticos, por exemplo, `Object.keys`, `Array.isArray`, etc.

// Como já sabemos, as classes nativas se estendem umas às outras. Por exemplo, `Array` estende `Object`.

// Normalmente, quando uma classe estende outra, ambos os métodos estáticos e não estáticos são herdados. Isso foi detalhadamente explicado no artigo [Propriedades e Métodos Estáticos](https://www.google.com/search?q=%23propriedades-e-metodos-estaticos).

// Mas as classes nativas são uma exceção. Elas não herdam estáticos umas das outras.

// Por exemplo, tanto `Array` quanto `Date` herdam de `Object`, então suas instâncias têm métodos de `Object.prototype`. Mas `Array.[[Prototype]]` não referencia `Object`, então não existe, por exemplo, o método estático `Array.keys()` (ou `Date.keys()`).

// Aqui está a estrutura da imagem para `Date` e `Object`:

// ```mermaid
// graph TD
//     A[função Date] --> B[Date.prototype];
//     C[função Object];
//     B --> D[Object.prototype];
// ```

// Como você pode ver, não há ligação entre `Date` e `Object`. Eles são independentes, apenas `Date.prototype` herda de `Object.prototype`.

// Essa é uma diferença importante da herança entre objetos nativos em comparação com o que obtemos com `extends`.