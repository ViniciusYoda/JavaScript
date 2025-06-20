// -----

// ## Parâmetros Rest e Sintaxe Spread

// Muitas funções embutidas do JavaScript suportam um número arbitrário de argumentos.

// Por exemplo:

//   * `Math.max(arg1, arg2, ..., argN)` – retorna o maior dos argumentos.
//   * `Object.assign(dest, src1, ..., srcN)` – copia propriedades de `src1..N` para `dest`.

// ...e assim por diante.

// Neste capítulo, aprenderemos como fazer o mesmo. E também, como passar arrays para essas funções como parâmetros.

// -----

// ### Parâmetros Rest `...`

// Uma função pode ser chamada com qualquer número de argumentos, não importa como ela seja definida.

// Como aqui:

// ```javascript
// function sum(a, b) {
//   return a + b;
// }
// alert( sum(1, 2, 3, 4, 5) );
// ```

// Não haverá erro por causa de argumentos "excessivos". Mas, é claro, no resultado apenas os dois primeiros serão contados, então o resultado no código acima é `3`.

// O restante dos parâmetros pode ser incluído na definição da função usando três pontos `...` seguidos pelo nome do array que os conterá. Os pontos significam literalmente "agrupar os parâmetros restantes em um array".

// Por exemplo, para agrupar todos os argumentos no array `args`:

// ```javascript
// function sumAll(...args) { // args é o nome para o array
//   let sum = 0;

//   for (let arg of args) sum += arg;

//   return sum;
// }
// alert( sumAll(1) ); // 1
// alert( sumAll(1, 2) ); // 3
// alert( sumAll(1, 2, 3) ); // 6
// ```

// Podemos optar por obter os primeiros parâmetros como variáveis e agrupar apenas o restante.

// Aqui os dois primeiros argumentos vão para variáveis e o restante vai para o array `titles`:

// ```javascript
// function showName(firstName, lastName, ...titles) {
//   alert( firstName + ' ' + lastName ); // Julius Caesar

//   // o restante vai para o array titles
//   // ou seja, titles = ["Consul", "Imperator"]
//   alert( titles[0] ); // Consul
//   alert( titles[1] ); // Imperator
//   alert( titles.length ); // 2
// }
// showName("Julius", "Caesar", "Consul", "Imperator");
// ```

// -----

// #### Os parâmetros rest devem estar no final

// Os parâmetros rest agrupam todos os argumentos restantes, então o seguinte não faz sentido e causa um erro:

// ```javascript
// function f(arg1, ...rest, arg2) { // arg2 depois de ...rest ?!
//   // erro
// }
// ```

// O `...rest` deve estar sempre por último.

// -----

// #### A variável "arguments"

// Existe também um objeto especial semelhante a um array chamado `arguments` que contém todos os argumentos por seu índice.

// Por exemplo:

// ```javascript
// function showName() {
//   alert( arguments.length );
//   alert( arguments[0] );
//   alert( arguments[1] );

//   // é iterável
//   // for(let arg of arguments) alert(arg);
// }

// // mostra: 2, Julius, Caesar
// showName("Julius", "Caesar");

// // mostra: 1, Ilya, undefined (sem segundo argumento)
// showName("Ilya");
// ```

// Antigamente, os parâmetros rest não existiam na linguagem, e usar `arguments` era a única maneira de obter todos os argumentos da função. E ainda funciona, podemos encontrá-lo em códigos antigos.

// Mas a desvantagem é que, embora `arguments` seja semelhante a um array e iterável, não é um array. Ele não suporta métodos de array, então não podemos chamar `arguments.map(...)` por exemplo.

// Além disso, ele sempre contém todos os argumentos. Não podemos capturá-los parcialmente, como fizemos com os parâmetros rest.

// Portanto, quando precisamos desses recursos, os parâmetros rest são preferidos.

// -----

// #### Funções de seta não possuem "arguments"

// Se acessarmos o objeto `arguments` de uma função de seta, ele os pega da função "normal" externa.

// Aqui está um exemplo:

// ```javascript
// function f() {
//   let showArg = () => alert(arguments[0]);
//   showArg();
// }
// f(1); // 1
// ```

// Como lembramos, as funções de seta não têm seu próprio `this`. Agora sabemos que elas também não têm o objeto especial `arguments`.

// -----

// ### Sintaxe Spread

// Acabamos de ver como obter um array da lista de parâmetros.

// Mas às vezes precisamos fazer exatamente o inverso.

// Por exemplo, existe uma função embutida `Math.max` que retorna o maior número de uma lista:

// ```javascript
// alert( Math.max(3, 5, 1) ); // 5
// ```

// Agora, digamos que temos um array `[3, 5, 1]`. Como chamamos `Math.max` com ele?

// Passá-lo "como está" não funcionará, porque `Math.max` espera uma lista de argumentos numéricos, não um único array:

// ```javascript
// let arr = [3, 5, 1];
// alert( Math.max(arr) ); // NaN
// ```

// E certamente não podemos listar manualmente os itens no código `Math.max(arr[0], arr[1], arr[2])`, porque podemos não ter certeza de quantos existem. À medida que nosso script é executado, pode haver muitos, ou pode não haver nenhum. E isso ficaria feio.

// A **sintaxe spread** (espalhamento) vem ao resgate\! Ela se parece com os parâmetros rest, também usando `...`, mas faz exatamente o oposto.

// Quando `...arr` é usado na chamada da função, ele "expande" um objeto iterável `arr` na lista de argumentos.

// Para `Math.max`:

// ```javascript
// let arr = [3, 5, 1];
// alert( Math.max(...arr) ); // 5 (spread transforma o array em uma lista de argumentos)
// ```

// Também podemos passar múltiplos iteráveis dessa forma:

// ```javascript
// let arr1 = [1, -2, 3, 4];
// let arr2 = [8, 3, -8, 1];
// alert( Math.max(...arr1, ...arr2) ); // 8
// ```

// Podemos até combinar a sintaxe spread com valores normais:

// ```javascript
// let arr1 = [1, -2, 3, 4];
// let arr2 = [8, 3, -8, 1];
// alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
// ```

// Além disso, a sintaxe spread pode ser usada para mesclar arrays:

// ```javascript
// let arr = [3, 5, 1];
// let arr2 = [8, 9, 15];

// let merged = [0, ...arr, 2, ...arr2];

// alert(merged); // 0,3,5,1,2,8,9,15 (0, depois arr, depois 2, depois arr2)
// ```

// Nos exemplos acima, usamos um array para demonstrar a sintaxe spread, mas qualquer iterável servirá.

// Por exemplo, aqui usamos a sintaxe spread para transformar a string em um array de caracteres:

// ```javascript
// let str = "Hello";
// alert( [...str] ); // H,e,l,l,o
// ```

// A sintaxe spread internamente usa iteradores para coletar elementos, da mesma forma que `for..of` faz.

// Então, para uma string, `for..of` retorna caracteres e `...str` se torna `"H","e","l","l","o"`. A lista de caracteres é passada para o inicializador de array `[...str]`.

// Para essa tarefa em particular, também poderíamos usar `Array.from`, porque ele converte um iterável (como uma string) em um array:

// ```javascript
// let str = "Hello";
// // Array.from converte um iterável em um array
// alert( Array.from(str) ); // H,e,l,l,o
// ```

// O resultado é o mesmo que `[...str]`.

// Mas há uma diferença sutil entre `Array.from(obj)` e `[...obj]`:

//   * `Array.from` opera tanto em **array-likes** quanto em **iteráveis**.
//   * A sintaxe spread funciona apenas com **iteráveis**.

// Portanto, para a tarefa de transformar algo em um array, `Array.from` tende a ser mais universal.

// -----

// ### Copiar um array/objeto

// Lembra quando falamos sobre `Object.assign()` no passado?

// É possível fazer a mesma coisa com a sintaxe spread.

// ```javascript
// let arr = [1, 2, 3];

// let arrCopy = [...arr]; // espalha o array em uma lista de parâmetros
//                         // então coloca o resultado em um novo array

// // os arrays têm o mesmo conteúdo?
// alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// // os arrays são iguais?
// alert(arr === arrCopy); // false (não é a mesma referência)

// // modificar nosso array inicial não modifica a cópia:
// arr.push(4);
// alert(arr); // 1, 2, 3, 4
// alert(arrCopy); // 1, 2, 3
// ```

// Observe que é possível fazer a mesma coisa para fazer uma cópia de um objeto:

// ```javascript
// let obj = { a: 1, b: 2, c: 3 };

// let objCopy = { ...obj }; // espalha o objeto em uma lista de parâmetros
//                           // então retorna o resultado em um novo objeto

// // os objetos têm o mesmo conteúdo?
// alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// // os objetos são iguais?
// alert(obj === objCopy); // false (não é a mesma referência)

// // modificar nosso objeto inicial não modifica a cópia:
// obj.d = 4;
// alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
// alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
// ```

// Essa forma de copiar um objeto é muito mais curta do que `let objCopy = Object.assign({}, obj)` ou para um array `let arrCopy = Object.assign([], arr)`, então preferimos usá-la sempre que possível.

// -----

// ### Resumo

// Quando vemos `"..."` no código, é ou **parâmetros rest** ou a **sintaxe spread**.

// Há uma maneira fácil de diferenciá-los:

//   * Quando `...` está no final dos parâmetros da função, são **"parâmetros rest"** e agrupam o restante da lista de argumentos em um array.
//   * Quando `...` ocorre em uma chamada de função ou algo semelhante, é chamado de **"sintaxe spread"** e expande um array em uma lista.

// Padrões de uso:

//   * **Parâmetros rest** são usados para criar funções que aceitam qualquer número de argumentos.
//   * A **sintaxe spread** é usada para passar um array para funções que normalmente exigem uma lista de muitos argumentos.

// Juntos, eles ajudam a transitar entre uma lista e um array de parâmetros com facilidade.

// Todos os argumentos de uma chamada de função também estão disponíveis na variável "old-style" `arguments`: um objeto iterável semelhante a um array.