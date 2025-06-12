// Aqui está o texto totalmente adaptado para o português:

// ---

// ## Métodos de array

// Arrays oferecem diversos métodos. Para facilitar, neste capítulo estão divididos em grupos.

// ### Adicionar/remover itens

// Já conhecemos métodos que adicionam ou removem itens do início ou do fim:

// * `arr.push(...items)` – adiciona itens ao final,
// * `arr.pop()` – remove um item do final,
// * `arr.shift()` – remove um item do início,
// * `arr.unshift(...items)` – adiciona itens no início.

// Outros métodos úteis:

// #### splice

// Como deletar um elemento de um array?

// Arrays são objetos, então poderíamos tentar usar `delete`:

// ```js
// let arr = ["I", "go", "home"];

// delete arr[1]; // remove "go"

// alert(arr[1]); // undefined
// alert(arr.length); // 3
// ```

// O elemento ficou `undefined`, mas o comprimento continua 3. Para remover o elemento *e* encurtar o array, usamos métodos especiais.

// O `arr.splice(start[, deleteCount, elem1, ..., elemN])` é um canivete suíço: insere, remove ou substitui elementos. Modifica o `arr` a partir de `start`: remove `deleteCount` elementos e, se fornecidos, insere `elem1...elemN`. Retorna um array com os elementos removidos.

// Exemplos:

// * **Remover:**

//   ```js
//   let arr = ["I", "study", "JavaScript"];
//   arr.splice(1, 1); // remove 1 elemento a partir do índice 1
//   alert(arr); // ["I", "JavaScript"]
//   ```

// * **Substituir:**

//   ```js
//   let arr = ["I", "study", "JavaScript", "right", "now"];
//   arr.splice(0, 3, "Let's", "dance");
//   alert(arr); // ["Let's", "dance", "right", "now"]
//   ```

// * **Retornar removidos:**

//   ```js
//   let arr = ["I", "study", "JavaScript", "right", "now"];
//   let removed = arr.splice(0, 2);
//   alert(removed); // ["I", "study"]
//   ```

// * **Inserir sem remover:**

//   ```js
//   let arr = ["I", "study", "JavaScript"];
//   arr.splice(2, 0, "complex", "language");
//   alert(arr); // ["I", "study", "complex", "language", "JavaScript"]
//   ```

// * **Índices negativos funcionam:**

//   ```js
//   let arr = [1, 2, 5];
//   arr.splice(-1, 0, 3, 4);
//   alert(arr); // [1, 2, 3, 4, 5]
//   ```

// ---

// #### slice

// O `arr.slice([start], [end])` é mais simples: retorna um novo array contendo elementos do índice `start` até `end` (não incluso). Os dois parâmetros podem ser negativos:

// ```js
// let arr = ["t", "e", "s", "t"];
// alert(arr.slice(1, 3)); // ["e", "s"]
// alert(arr.slice(-2)); // ["s", "t"]
// ```

// Sem argumentos, `arr.slice()` faz uma cópia rasa do array.

// ---

// #### concat

// O `arr.concat(arg1, arg2, ...)` cria e retorna um novo array que inclui os itens do `arr` e de cada argumento (arrays ou valores). Se o argumento for array, todos os seus elementos são copiados:

// ```js
// let arr = [1, 2];
// alert(arr.concat([3, 4])); // [1, 2, 3, 4]
// alert(arr.concat([3, 4], 5, 6)); // [1, 2, 3, 4, 5, 6]
// ```

// Arrays-like (objetos com `length`) são adicionados como um objeto, a não ser que tenham `Symbol.isConcatSpreadable = true`, caso em que são “espalhados” como arrays.

// ---

// ### Iteração: forEach

// O `arr.forEach(fn)` executa `fn(item, index, array)` para cada elemento, descartando o valor de retorno:

// ```js
// ["Bilbo", "Gandalf", "Nazgul"].forEach((item, idx, arr) => {
//   alert(`${item} está no índice ${idx} em ${arr}`);
// });
// ```

// ---

// ### Pesquisa no array

// #### indexOf / lastIndexOf / includes

// * `arr.indexOf(item, from)` retorna o índice da primeira ocorrência (ou -1 se não encontrar).
// * `arr.lastIndexOf(item, from)` faz a mesma coisa, mas da direita para a esquerda.
// * `arr.includes(item)` retorna `true` se o array contém o item.
//   Note que `indexOf` usa `===` (zero ≠ false), e `includes` detecta `NaN` corretamente.

// ```js
// const arr = [NaN];
// alert(arr.indexOf(NaN)); // -1
// alert(arr.includes(NaN)); // true
// ```

// ---

// #### find / findIndex / findLastIndex

// Para arrays de objetos, permite encontrar elementos segundo uma condição:

// * `arr.find(fn)` retorna *o primeiro* item que satisfaz `fn`.
// * `findIndex(fn)` retorna o índice desse item (ou -1).
// * `findLastIndex(fn)` busca de trás para frente.

// ```js
// let users = [
//   {id:1, name:"John"},
//   {id:2, name:"Pete"},
//   {id:3, name:"Mary"}
// ];
// let user = users.find(u => u.id == 1);
// alert(user.name); // John
// ```

// ---

// #### filter

// Para pegar *todos* os itens que satisfazem uma condição:

// ```js
// let someUsers = users.filter(u => u.id < 3);
// alert(someUsers.length); // 2
// ```

// ---

// ### Transformação do array

// #### map

// Transforma cada item segundo uma função, retornando um novo array:

// ```js
// let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
// alert(lengths); // [5, 7, 6]
// ```

// ---

// #### sort(fn)

// Ordena o array **in place**. Por padrão, converte tudo para string, o que pode causar resultados inesperados:

// ```js
// let arr = [1, 2, 15];
// arr.sort();
// alert(arr); // [1, 15, 2]
// ```

// Para ordenar numericamente:

// ```js
// arr.sort((a, b) => a - b);
// ```

// E para strings com regras de idioma, use `localeCompare`:

// ```js
// let countries = ['Österreich', 'Andorra', 'Vietnam'];
// countries.sort((a, b) => a.localeCompare(b));
// ```

// ---

// #### reverse

// Inverte o array **in place**:

// ```js
// let arr = [1, 2, 3, 4, 5];
// arr.reverse();
// alert(arr); // [5, 4, 3, 2, 1]
// ```

// ---

// ### split e join

// Convertendo string em array e vice-versa:

// ```js
// let names = 'Bilbo, Gandalf, Nazgul';
// let arr = names.split(', ');
// for (let name of arr) alert(`Mensagem para ${name}.`);
// let str = arr.join(';');
// alert(str); // "Bilbo;Gandalf;Nazgul"
// ```

// ---

// ### reduce / reduceRight

// Usados para calcular um **único valor** a partir de um array:

// ```js
// let arr = [1, 2, 3, 4, 5];
// let sum = arr.reduce((acc, cur) => acc + cur, 0);
// alert(sum); // 15
// ```

// Se `initial` não for fornecido, `reduce` usa o primeiro elemento e começa do segundo — mas isso pode causar erros se o array estiver vazio.

// `reduceRight` faz o mesmo, mas da direita para a esquerda.

// ---

// ### Array.isArray

// Verifica se um valor é array:

// ```js
// Array.isArray({}); // false
// Array.isArray([]); // true
// ```

// ---

// ### thisArg

// Muitos métodos de callback (`find`, `filter`, `map` etc.) aceitam um segundo parâmetro opcional `thisArg` que define o valor de `this` dentro da função callback:

// ```js
// let army = {minAge:18, maxAge:27,
//   canJoin(user) { return user.age >= this.minAge && user.age < this.maxAge; }
// };
// let users = [{age:16},{age:20},{age:23},{age:30}];
// let soldiers = users.filter(army.canJoin, army);
// alert(soldiers.length); // 2
// ```

// ---

// ### Resumo rápido

// | Grupo             | Métodos                                                                              |
// | ----------------- | ------------------------------------------------------------------------------------ |
// | Adicionar/Remover | `push`, `pop`, `shift`, `unshift`, `splice`                                          |
// | Get subarray      | `slice`, `concat`                                                                    |
// | Pesquisar         | `indexOf`, `lastIndexOf`, `includes`, `find`, `findIndex`, `findLastIndex`, `filter` |
// | Iterar            | `forEach`                                                                            |
// | Transformar       | `map`, `sort`, `reverse`, `split`, `join`, `reduce`, `reduceRight`                   |
// | Outras            | `Array.isArray`, `some`, `every`, `fill`, `copyWithin`, `flat`, `flatMap`            |

// > 📌 Nota: `sort`, `reverse` e `splice` **modificam o array original**.

// Praticar é a melhor forma de fixar. Consulte este resumo sempre que precisar – logo esses métodos estarão no seu fluxo natural de pensamento.
