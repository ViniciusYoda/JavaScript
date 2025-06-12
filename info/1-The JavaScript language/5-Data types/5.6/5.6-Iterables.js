// **Iteráveis**

// Objetos iteráveis são uma generalização dos arrays. Esse é um conceito que permite tornar qualquer objeto utilizável em um loop `for..of`.

// Claro, arrays são iteráveis. Mas há muitos outros objetos internos que também são iteráveis. Por exemplo, strings também são iteráveis.

// Se um objeto não é tecnicamente um array, mas representa uma coleção (como uma lista ou conjunto) de algo, então `for..of` é uma ótima sintaxe para percorrê-lo. Vamos ver como fazer isso funcionar.

// **Symbol.iterator**

// Podemos entender facilmente o conceito de iteráveis criando um por conta própria.

// Por exemplo, temos um objeto que não é um array, mas parece adequado para `for..of`.

// Como um objeto que representa um intervalo de números:

// ```js
// let range = {
//   from: 1,
//   to: 5
// };

// // Queremos que o for..of funcione assim:
// // for(let num of range) ... num = 1, 2, 3, 4, 5
// ```

// Para tornar o objeto `range` iterável (e assim permitir o uso de `for..of`), precisamos adicionar a ele um método chamado `Symbol.iterator` (um símbolo interno especial para isso).

// * Quando `for..of` começa, ele chama esse método uma vez (ou gera erro se ele não existir). Esse método deve retornar um *iterador* – um objeto com o método `next`.
// * A partir daí, o `for..of` trabalha apenas com o objeto retornado.
// * Quando `for..of` quiser o próximo valor, ele chama `next()` nesse objeto.
// * O resultado de `next()` deve ter o formato `{done: Boolean, value: qualquer}`, onde `done=true` significa que o loop terminou; caso contrário, `value` é o próximo valor.

// Aqui está a implementação completa com comentários:

// ```js
// let range = {
//   from: 1,
//   to: 5
// };

// // 1. Quando o for..of começa, ele chama isso:
// range[Symbol.iterator] = function() {

//   // 2. Retorna o objeto iterador:
//   return {
//     current: this.from,
//     last: this.to,

//     // 3. next() é chamado em cada iteração
//     next() {
//       // 4. Retorna o valor no formato {done:.., value:...}
//       if (this.current <= this.last) {
//         return { done: false, value: this.current++ };
//       } else {
//         return { done: true };
//       }
//     }
//   };
// };

// // Agora funciona!
// for (let num of range) {
//   alert(num); // 1, depois 2, 3, 4, 5
// }
// ```

// Note a principal característica dos iteráveis: a separação de responsabilidades.

// * O objeto `range` em si não tem o método `next()`.
// * Em vez disso, outro objeto – um chamado “iterador” – é criado pela chamada `range[Symbol.iterator]()`, e é ele quem gera os valores.

// Portanto, o objeto iterador é separado do objeto que está sendo iterado.

// **Unindo iterável e iterador**

// Tecnicamente, podemos simplificar e fazer com que o próprio objeto `range` seja o iterador:

// ```js
// let range = {
//   from: 1,
//   to: 5,

//   [Symbol.iterator]() {
//     this.current = this.from;
//     return this;
//   },

//   next() {
//     if (this.current <= this.to) {
//       return { done: false, value: this.current++ };
//     } else {
//       return { done: true };
//     }
//   }
// };

// for (let num of range) {
//   alert(num); // 1, depois 2, 3, 4, 5
// }
// ```

// Agora `range[Symbol.iterator]()` retorna o próprio objeto `range`, que tem o método `next()` e guarda o progresso da iteração em `this.current`. Isso é mais curto, e às vezes suficiente.

// A desvantagem é que agora não podemos ter dois loops `for..of` simultâneos sobre o mesmo objeto, porque eles compartilhariam o estado da iteração. Mas isso é raro, até mesmo em cenários assíncronos.

// **Iteradores infinitos**

// Também é possível criar iteradores infinitos. Por exemplo, `range.to = Infinity` torna o intervalo infinito. Ou podemos criar um objeto iterável que gera uma sequência infinita de números pseudoaleatórios.

// Não há limites para o `next`: ele pode retornar quantos valores forem necessários.

// Claro, um loop `for..of` sobre esse iterador seria infinito, mas podemos sempre interrompê-lo com `break`.

// **String é iterável**

// Arrays e strings são os iteráveis embutidos mais usados.

// No caso das strings, `for..of` percorre seus caracteres:

// ```js
// for (let char of "teste") {
//   alert(char); // t, depois e, s, t, e
// }
// ```

// E funciona corretamente com *pares substitutos* (caracteres que ocupam dois códigos UTF-16):

// ```js
// let str = '𝒳😂';
// for (let char of str) {
//   alert(char); // 𝒳, depois 😂
// }
// ```

// **Chamando o iterador explicitamente**

// Para entender melhor, podemos usar um iterador diretamente.

// Vamos percorrer uma string da mesma forma que o `for..of`, mas com chamadas diretas:

// ```js
// let str = "Olá";

// let iterator = str[Symbol.iterator]();

// while (true) {
//   let result = iterator.next();
//   if (result.done) break;
//   alert(result.value); // exibe os caracteres um por um
// }
// ```

// Isso raramente é necessário, mas dá mais controle sobre o processo. Por exemplo, podemos pausar e retomar a iteração depois.

// **Iteráveis e "array-like"**

// Dois termos parecidos mas diferentes:

// * *Iteráveis* são objetos que implementam o método `Symbol.iterator`.
// * *Array-like* (semelhantes a arrays) são objetos que possuem índices numéricos e uma propriedade `length`.

// No dia a dia, lidamos com objetos que são iteráveis, "array-like", ou ambos.

// Por exemplo, strings são ambos: iteráveis e "array-like".

// Mas o objeto `range` mostrado acima é iterável, mas não "array-like".

// E este objeto é "array-like", mas não iterável:

// ```js
// let arrayLike = {
//   0: "Olá",
//   1: "Mundo",
//   length: 2
// };

// // Erro (não tem Symbol.iterator)
// for (let item of arrayLike) {}
// ```

// Tanto iteráveis quanto "array-likes" geralmente não são arrays de verdade: não têm `push`, `pop` etc.

// Como trabalhamos com eles como se fossem arrays?

// **Array.from**

// Existe o método universal `Array.from`, que converte um iterável ou "array-like" em um *array de verdade*. Assim, podemos usar os métodos de array normalmente.

// Exemplo com objeto "array-like":

// ```js
// let arrayLike = {
//   0: "Olá",
//   1: "Mundo",
//   length: 2
// };

// let arr = Array.from(arrayLike);
// alert(arr.pop()); // Mundo
// ```

// Exemplo com um iterável:

// ```js
// let arr = Array.from(range);
// alert(arr); // 1,2,3,4,5
// ```

// A sintaxe completa também permite uma função de mapeamento:

// ```js
// Array.from(obj[, mapFn, thisArg])
// ```

// * `mapFn` é aplicada a cada elemento antes de adicioná-lo ao array.
// * `thisArg` define o `this` da função `mapFn`.

// Exemplo:

// ```js
// let arr = Array.from(range, num => num * num);
// alert(arr); // 1, 4, 9, 16, 25
// ```

// Transformando string em array de caracteres (considerando pares substitutos):

// ```js
// let str = '𝒳😂';
// let chars = Array.from(str);

// alert(chars[0]); // 𝒳
// alert(chars[1]); // 😂
// alert(chars.length); // 2
// ```

// É equivalente a:

// ```js
// let chars = [];
// for (let char of str) {
//   chars.push(char);
// }
// ```

// Podemos até criar um `slice` que respeita pares substitutos:

// ```js
// function slice(str, start, end) {
//   return Array.from(str).slice(start, end).join('');
// }

// let str = '𝒳😂𩷶';

// alert(slice(str, 1, 3)); // 😂𩷶
// alert(str.slice(1, 3));  // caracteres quebrados
// ```

// **Resumo**

// Objetos que podem ser usados em `for..of` são chamados de *iteráveis*.

// * Tecnicamente, iteráveis devem implementar o método `Symbol.iterator`.

//   * O resultado de `obj[Symbol.iterator]()` é chamado de *iterador*.
//   * Um iterador deve ter o método `next()` que retorna `{done: Boolean, value: qualquer}`.
// * O `Symbol.iterator` é chamado automaticamente pelo `for..of`, mas também pode ser chamado manualmente.
// * Iteráveis embutidos como strings e arrays já implementam `Symbol.iterator`.
// * O iterador de strings reconhece corretamente pares substitutos.

// Objetos com índices e `length` são chamados *"array-like"*. Podem ter outras propriedades e métodos, mas não os métodos embutidos dos arrays.

// A maioria dos métodos embutidos em JavaScript aceita iteráveis ou "array-likes", pois isso é mais abstrato do que esperar arrays puros.

// `Array.from(obj[, mapFn, thisArg])` transforma iteráveis ou "array-likes" em arrays reais, e permite aplicar uma função a cada item durante a conversão.
