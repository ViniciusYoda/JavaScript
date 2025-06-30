// Claro! Aqui está a tradução completa e adaptada para o português do texto sobre **Promisificação**:

// ---

// ### Promisificação

// **“Promisificação”** é uma palavra longa para uma transformação simples: converter uma função que utiliza *callback* em uma função que retorna uma *Promise*.

// Esse tipo de transformação é muito útil na prática, já que muitas funções e bibliotecas ainda utilizam *callbacks*. Porém, as *Promises* são mais convenientes de usar, então faz sentido "promisificá-las".

// Para entender melhor, vejamos um exemplo.

// Imagine que temos a função `loadScript(src, callback)` do capítulo de introdução a *callbacks*:

// ```javascript
// function loadScript(src, callback) {
//   let script = document.createElement('script');
//   script.src = src;

//   script.onload = () => callback(null, script);
//   script.onerror = () => callback(new Error(`Erro ao carregar o script: ${src}`));

//   document.head.append(script);
// }
// ```

// Uso:

// ```javascript
// loadScript('caminho/script.js', (err, script) => {
//   // ...
// });
// ```

// A função acima carrega um script a partir do `src` fornecido e, ao terminar, chama o `callback(err)` em caso de erro ou `callback(null, script)` em caso de sucesso. Esse é um padrão comum no uso de *callbacks*, como já vimos.

// Agora vamos **promisificá-la**.

// Vamos criar uma nova função chamada `loadScriptPromise(src)`, que faz a mesma coisa (carrega o script), mas retorna uma *Promise* em vez de usar um *callback*.

// Ou seja, passamos apenas o `src` (sem *callback*) e recebemos uma *Promise* que será resolvida com o script em caso de sucesso, ou rejeitada com um erro caso contrário.

// Veja como fica:

// ```javascript
// let loadScriptPromise = function(src) {
//   return new Promise((resolve, reject) => {
//     loadScript(src, (err, script) => {
//       if (err) reject(err);
//       else resolve(script);
//     });
//   });
// };
// ```

// Uso:

// ```javascript
// loadScriptPromise('caminho/script.js').then(...).catch(...);
// ```

// Como podemos ver, a nova função é apenas um **"envoltório" (wrapper)** em torno da função original `loadScript`. Ela fornece um *callback* personalizado que traduz a lógica de erro e sucesso para `resolve` e `reject` da *Promise*.

// Agora `loadScriptPromise` se encaixa perfeitamente em um código baseado em *Promises*. Se você prefere usar *Promises* ao invés de *callbacks* (e logo veremos mais motivos para isso), essa versão será bem mais conveniente.

// ---

// ### Criando uma função auxiliar: `promisify`

// Na prática, talvez você precise promisificar várias funções. Nesse caso, faz sentido criar uma função auxiliar que faça isso por você.

// Vamos chamá-la de `promisify(f)`. Ela recebe uma função `f` (que usa *callback*) e retorna uma nova função *promisificada*.

// ```javascript
// function promisify(f) {
//   return function (...args) {
//     return new Promise((resolve, reject) => {
//       function callback(err, result) {
//         if (err) reject(err);
//         else resolve(result);
//       }

//       args.push(callback); // adiciona o callback personalizado aos argumentos
//       f.call(this, ...args); // chama a função original
//     });
//   };
// }
// ```

// Uso:

// ```javascript
// let loadScriptPromise = promisify(loadScript);
// loadScriptPromise('caminho/script.js').then(...);
// ```

// O código pode parecer um pouco complexo, mas é basicamente o mesmo que escrevemos anteriormente, ao *promisificar* a função `loadScript`.

// A chamada `promisify(f)` retorna um *wrapper* em torno da função `f`. Esse *wrapper* retorna uma *Promise* e chama a função original, passando um *callback* que lida com `resolve` e `reject`.

// Essa versão de `promisify` assume que a função original usa um *callback* com **dois argumentos**: `callback(err, result)`, o que é o mais comum.

// ---

// ### Suporte para múltiplos resultados

// Mas... e se a função original usar um *callback* com **vários resultados**, como: `callback(err, res1, res2, ...)`?

// Podemos melhorar nossa função auxiliar para lidar com isso.

// Vamos criar uma versão mais avançada de `promisify`:

// * Quando chamada como `promisify(f)`, ela funciona como antes.
// * Quando chamada como `promisify(f, true)`, ela retorna uma *Promise* que se resolve com um **array de resultados** do *callback*.

// ```javascript
// function promisify(f, manyArgs = false) {
//   return function (...args) {
//     return new Promise((resolve, reject) => {
//       function callback(err, ...results) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(manyArgs ? results : results[0]);
//         }
//       }

//       args.push(callback);
//       f.call(this, ...args);
//     });
//   };
// }
// ```

// Uso:

// ```javascript
// let fPromisificada = promisify(f, true);
// fPromisificada(...).then(arrayDeResultados => ..., erro => ...);
// ```

// Como você pode ver, essa versão é quase igual à anterior, com a diferença de que ela pode retornar **todos os resultados** do *callback* se `manyArgs` for verdadeiro.

// ---

// ### Observações importantes

// * Para formatos de *callback* mais "exóticos", como os que **não usam erro** (`callback(result)`), você pode fazer a *promisificação manualmente*, sem o uso da função auxiliar.
// * Existem bibliotecas com funções de *promisificação* mais flexíveis, como a [`es6-promisify`](https://www.npmjs.com/package/es6-promisify).
// * No Node.js, já existe a função nativa [`util.promisify`](https://nodejs.org/api/util.html#utilpromisifyoriginal) para isso.

// ---

// ### Nota final

// A *promisificação* é uma excelente abordagem — especialmente quando você usa `async/await` (que veremos no capítulo sobre **Async/Await**) —, mas **não substitui completamente os callbacks**.

// Lembre-se:

// * Uma *Promise* só pode ter **um único resultado**.
// * Já um *callback* pode ser chamado **várias vezes**.

// Portanto, só devemos *promisificar* funções que **chamam o *callback* apenas uma vez**. Chamadas subsequentes serão ignoradas pela *Promise*.

// ---

// Se quiser, posso gerar exemplos práticos com `fs.readFile`, funções do Node, ou funções do navegador usando `promisify`. Deseja isso?
