// Claro! Aqui está a tradução completa e adaptada para o português do conteúdo sobre **iterações assíncronas e geradores assíncronos**:

// ---

// # Iteração e Geradores Assíncronos

// A **iteração assíncrona** permite percorrer dados que chegam de forma assíncrona e sob demanda. Por exemplo, ao baixar algo pela internet em partes. E os **geradores assíncronos** tornam isso ainda mais prático.

// Vamos ver primeiro um exemplo simples para entender a sintaxe e depois um caso real de uso.

// ---

// ## Relembrando Iteráveis

// A ideia é ter um objeto (como o `range` abaixo) que possa ser percorrido com `for..of`:

// ```js
// let range = {
//   from: 1,
//   to: 5
// };
// ```

// Queremos que `for (let value of range)` funcione e nos dê os valores de 1 a 5.

// Para isso, adicionamos a capacidade de iteração ao objeto usando o método especial `Symbol.iterator`:

// 1. Esse método é chamado quando o `for..of` começa.
// 2. Ele deve retornar um objeto com o método `next()`.
// 3. O `next()` retorna `{ done: true/false, value: <valor> }`.

// Exemplo:

// ```js
// let range = {
//   from: 1,
//   to: 5,

//   [Symbol.iterator]() {
//     return {
//       current: this.from,
//       last: this.to,

//       next() {
//         if (this.current <= this.last) {
//           return { done: false, value: this.current++ };
//         } else {
//           return { done: true };
//         }
//       }
//     };
//   }
// };

// for (let value of range) {
//   alert(value); // 1, 2, 3, 4, 5
// }
// ```

// ---

// ## Iteráveis Assíncronos

// Usamos **iterações assíncronas** quando os valores são obtidos com atraso (por exemplo, após um `setTimeout`, ou requisições de rede).

// ### Para criar um iterável assíncrono:

// * Use `Symbol.asyncIterator` em vez de `Symbol.iterator`.
// * O método `next()` deve retornar uma **Promise**.
// * Para iterar, use `for await (let item of iterable)`.

// Exemplo — range assíncrono com delay de 1 segundo:

// ```js
// let range = {
//   from: 1,
//   to: 5,

//   [Symbol.asyncIterator]() {
//     return {
//       current: this.from,
//       last: this.to,

//       async next() {
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         if (this.current <= this.last) {
//           return { done: false, value: this.current++ };
//         } else {
//           return { done: true };
//         }
//       }
//     };
//   }
// };

// (async () => {
//   for await (let value of range) {
//     alert(value); // 1, 2, 3, 4, 5 (com 1s de intervalo)
//   }
// })();
// ```

// ### Diferenças:

// |                  | Iteradores        | Iteradores Assíncronos |
// | ---------------- | ----------------- | ---------------------- |
// | Método           | `Symbol.iterator` | `Symbol.asyncIterator` |
// | `next()` retorna | valor direto      | `Promise`              |
// | Laço             | `for..of`         | `for await..of`        |

// > ⚠️ O operador spread `...` e outros recursos síncronos **não funcionam** com iteradores assíncronos.

// ---

// ## Relembrando Geradores

// **Geradores** (funções com `function*`) geram valores com `yield`, ideais para criar iteradores de forma mais compacta:

// ```js
// function* gerarSequencia(inicio, fim) {
//   for (let i = inicio; i <= fim; i++) {
//     yield i;
//   }
// }

// for (let valor of gerarSequencia(1, 5)) {
//   alert(valor); // 1 a 5
// }
// ```

// Podemos usar isso no próprio `Symbol.iterator`:

// ```js
// let range = {
//   from: 1,
//   to: 5,

//   *[Symbol.iterator]() {
//     for (let valor = this.from; valor <= this.to; valor++) {
//       yield valor;
//     }
//   }
// };
// ```

// > ⚠️ Geradores síncronos **não podem usar `await`**.

// ---

// ## Geradores Assíncronos

// Quando queremos gerar valores com atrasos (como vindos da rede), usamos **geradores assíncronos**:

// ### Sintaxe:

// * Use `async function*` para criar.
// * Use `for await..of` para iterar.

// ```js
// async function* gerarSequencia(inicio, fim) {
//   for (let i = inicio; i <= fim; i++) {
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     yield i;
//   }
// }

// (async () => {
//   for await (let valor of gerarSequencia(1, 5)) {
//     alert(valor); // 1 a 5 com delay
//   }
// })();
// ```

// > O `generator.next()` retorna uma **Promise**, por isso usamos `await`.

// ---

// ## Iterável Assíncrono com `Symbol.asyncIterator`

// Assim como usamos geradores no `Symbol.iterator`, podemos usar **geradores assíncronos** no `Symbol.asyncIterator`:

// ```js
// let range = {
//   from: 1,
//   to: 5,

//   async *[Symbol.asyncIterator]() {
//     for (let valor = this.from; valor <= this.to; valor++) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       yield valor;
//     }
//   }
// };

// (async () => {
//   for await (let valor of range) {
//     alert(valor);
//   }
// })();
// ```

// > É possível ter os dois métodos (`Symbol.iterator` e `Symbol.asyncIterator`) no mesmo objeto, mas é raro e pode confundir.

// ---

// ## Exemplo Real: Dados Paginados

// Muitos serviços retornam **dados paginados**, como:

// * GitHub: lista de commits

//   * URL: `https://api.github.com/repos/<repo>/commits`
//   * Retorna 30 commits por página e um link para a próxima.

// ### Nosso objetivo:

// Criar uma função `fetchCommits(repo)` que use iteração assíncrona para processar todas as páginas automaticamente:

// ```js
// async function* fetchCommits(repo) {
//   let url = `https://api.github.com/repos/${repo}/commits`;

//   while (url) {
//     const response = await fetch(url, {
//       headers: { 'User-Agent': 'Nosso script' },
//     });

//     const commits = await response.json();

//     let nextPage = response.headers.get('Link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
//     url = nextPage;

//     for (let commit of commits) {
//       yield commit;
//     }
//   }
// }
// ```

// ### Uso:

// ```js
// (async () => {
//   let contador = 0;

//   for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
//     console.log(commit.author.login);

//     if (++contador === 100) break; // Limita a 100 commits
//   }
// })();
// ```

// ---

// ## Resumo

// ### Diferenças principais entre iteradores síncronos e assíncronos:

// |                     | Iterador          | Iterador Assíncrono           |
// | ------------------- | ----------------- | ----------------------------- |
// | Método              | `Symbol.iterator` | `Symbol.asyncIterator`        |
// | Retorno de `next()` | `{value, done}`   | `Promise` com `{value, done}` |
// | Laço                | `for..of`         | `for await..of`               |

// ### Diferenças entre geradores:

// |                     | Gerador         | Gerador Assíncrono            |
// | ------------------- | --------------- | ----------------------------- |
// | Declaração          | `function*`     | `async function*`             |
// | Retorno de `next()` | `{value, done}` | `Promise` com `{value, done}` |

// ---

// **Conclusão:**
// Iteradores e geradores assíncronos são ideais para trabalhar com **dados que chegam em partes ou com atraso**, como em **downloads, uploads** e **APIs paginadas**. Eles tornam o código mais limpo, claro e eficiente para lidar com fluxos assíncronos de dados.

// Se quiser, posso também gerar uma versão PDF ou Markdown para você estudar offline. Deseja isso?
